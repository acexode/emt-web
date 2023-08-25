// @ts-nocheck

import {
    Container,
    Grid,
    ListItem,
    ListItemText,
    Typography,
    Card,
    Box,
    Button,
    TextField,
    Autocomplete,
    Skeleton

  } from "@mui/material";
  import { FC, useEffect, useState } from "react";
  import {useForm, useFieldArray} from "react-hook-form"

  import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
  import Page from "../../components/Page";
  import { PATH_DASHBOARD } from "../../routes/paths";
  import useSettings from "../../hooks/useSettings";
import { RemoveCircleOutline } from "@mui/icons-material";
import { formatDate2 } from "../../utility";
import axiosInstance from "../../services/api_service";
import {  useSnackbar } from "notistack";
import { MIconButton } from "../../components/@material-extend";
import closeFill from "@iconify/icons-eva/close-fill";
import { LoadingButton } from "@mui/lab";

import { Icon } from "@iconify/react";
import { useLocation } from "react-router-dom";
import CustomUsableTable from "../../components/DataGrid";
import CustomUsableTable2 from "../../components/DataTable";
import { IPatients } from "../../types/patient";
import { errorMessages } from "../../constants";
  
const TABLE_HEAD = [
  { id: "sn", label: "S/N", alignRight: false },
  { id: "medicalIntervention", label: "Medical Intervention", alignRight: false },
  { id: "quantity", label: "Quantity", alignRight: false },
  { id: "dose", label: "Dose", alignRight: false },
  { id: "price", label: "Price", alignRight: false },
  { id: "dateAdded", label: "Date Added", alignRight: false },
  { id: "" },
];
const TABLE_HEAD2 = [
  { id: "sn", label: "S/N", alignRight: false },
  { id: "bloodPressure", label: "Blood Pressure", alignRight: false },
  { id: "canSpeak", label: "Can speak?", alignRight: false },
  { id: "glucose", label: "Glucose", alignRight: false },
  { id: "isInPain", label: "Is in pain?", alignRight: false },
  // { id: "mainComplaint", label: "Complaint", alignRight: false },
  { id: "oxygen", label: "Oxygen", alignRight: false },
  { id: "pulse", label: "Pulse", alignRight: false },
  { id: "resp", label: "RESP", alignRight: false },
  { id: "sizeOfFluid", label: "Size of fluid", alignRight: false },
  { id: "sp02", label: "SP02", alignRight: false },
  { id: "unResponsive", label: "Unresponsive", alignRight: false,width:"400" },
  { id: "timeTaken", label: "Time Taken", alignRight: false,width:"400" },
  { id: "" },
];


  const ViewPatient: FC = () => {
    const { themeStretch } = useSettings();
    const [content, SetContent] = useState<IPatients>(null);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [loading,setLoading] = useState(false)
    const [loadingData,setLoadingData] = useState(false)
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      control,
      reset,
    } = useForm({
      mode: "onTouched",
      criteriaMode: "firstError",
      shouldFocusError: true,
      shouldUnregister: false,
      shouldUseNativeValidation: false,
      delayError: undefined,
      defaultValues: {
        incidentDrugs: [{ serviceFeeId:'', medicalIntervention: '', quantity: '', dose:'',price:'', remark:'',incident_Id:'',ambulanceId:'',emergencyTreatmentCenterId:'',patientId:'' }],
      },
    });
    const {
      state: { row,options},
    } = useLocation();
    const { fields, append, remove } = useFieldArray({
      control,
      name: 'incidentDrugs',
    });

    const calculateAmount = (unitCost: number, quantity:any) => {
      if (unitCost && quantity) {
        return (unitCost * quantity).toFixed(2);
      }
      return '';
    };
    // useEffect(() => {
    //   const updateTotalAmount = () => {
    //     let totalAmount = fields?.reduce(
    //       (sum, field) => sum + parseFloat(field.amount || '0'),
    //       0
    //     );
    //     setValue('totalAmount', totalAmount.toFixed(2));
    //   };
    
    //   updateTotalAmount();
    // }, [fields, setValue]);
  
        const fetchUser = () =>{
          setLoadingData(true)
          let val = {
            id: row?.id
          }
            axiosInstance.post('Patients/get',val).then(res =>{
              SetContent(res?.data?.data)
            }).catch(error =>{
              console.log(error);
            }).finally(()=>{
              setLoadingData(false)
            })
        }
        useEffect(() => {
          if(row?.id){
            fetchUser()
          }
        }, [row?.id]);
        const onSubmit = async(data:any) =>{
          // console.log({data})
          let newData = {
              ...data
            };
            delete newData?.totalAmount
            setLoading(true)
            let text ="Medical intervention Added";
            try {
             let res = await axiosInstance.post(`Patients/addPatientDrugSheet`, newData);
             console.log(res);
              enqueueSnackbar(`${text}`, {
                  variant: "success",
                  action: (key) => (
                    <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                      <Icon icon={closeFill} />
                    </MIconButton>
                  ),
                });
                fetchUser()
                reset()
            } catch (error) {
              let errorMessage = errorMessages[error?.response?.status]
              enqueueSnackbar(errorMessage, {
                  variant: "error",
                  action: (key) => (
                    <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                      <Icon icon={closeFill} />
                    </MIconButton>
                  ),
                });
            } finally{
              setLoading(false)
            }
      }
        const handlePrint = () => {
          window.print();
        }
      
        const handleAutocompleteChange = (index:number, intervention:string) => {
         const selectedIntervention = options.find(
          (int:any) => int.intervention === intervention
        );
        // Update the corresponding fields in the form data
        setValue(`incidentDrugs[${index}].serviceFeeId`, selectedIntervention?.id || '');
        setValue(`incidentDrugs[${index}].medicalIntervention`, selectedIntervention?.intervention || '');
        setValue(`incidentDrugs[${index}].incident_Id`, content?.incident_Id || '');
        setValue(`incidentDrugs[${index}].ambulanceId`, content?.ambulance_Id || '');
        setValue(`incidentDrugs[${index}].emergencyTreatmentCenterId`, content?.etC_Id || '');
        setValue(`incidentDrugs[${index}].patientId`, content?.id || '');
        // setValue(`incidentDrugs[${index}].serviceCode`, selectedIntervention?.code || '');
        setValue(
          `incidentDrugs[${index}].price`,
          selectedIntervention?.price?.toString() || ''
        );
        };
          return (
      <Page title={`View Patient Record | EMT`}>
        <Container maxWidth={themeStretch ? false : "lg"}>
          <HeaderBreadcrumbs
            heading={`Patient Record`}
            links={[
              { name: "Dashboard", href: PATH_DASHBOARD.root },
              { name: `Patient Records`, href: PATH_DASHBOARD.patients.root },
              { name: "View" },
            ]}
          />
         
          <Grid container spacing={1} mb={2} justifyContent="space-between">
              <Grid item sm={8}>
              <Typography variant="h6" component="div">
         {/* Patient Record */}
          </Typography>
              </Grid>
              <Grid item sm={4} display="flex" justifyContent="end">
              <Button
                size="medium"
                variant="contained"
                onClick={handlePrint}
                className="hidebtn"
            >
                Print
            </Button>
              </Grid>
         </Grid>
          <Card sx={{ p: 3, pb: 10, mb: 2 }}>
                <Box sx={{mb:2}}>Incident Details</Box>
                    <Grid container spacing={2}>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                       Incident Code
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{ loadingData ? <Skeleton variant="rectangular" width={100} height={30} />  : content?.extraDetails?.incidentCode || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                       Incident Type
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{loadingData ? <Skeleton variant="rectangular" width={100} height={30} />  : content?.extraDetails?.incidentCategory || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      Ambulance Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{loadingData ? <Skeleton variant="rectangular" width={100} height={30} />  : content?.extraDetails?.ambulanceName || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                   
                    </Grid>
            </Card>
          <Card sx={{ p: 3, pb: 10, mb: 2 }}>
                <Box sx={{mb:2}}>Patient Details</Box>
                    <Grid container spacing={2}>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      First Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{loadingData ? <Skeleton variant="rectangular" width={100} height={30} />  : content?.firstName || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      Middle Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{loadingData ? <Skeleton variant="rectangular" width={100} height={30} />  : content?.middleName || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      Last Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{loadingData ? <Skeleton variant="rectangular" width={100} height={30} />  : content?.lastName || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      Date of birth
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{formatDate2(content?.doB) || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      Gender
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{loadingData ? <Skeleton variant="rectangular" width={100} height={30} />  : content?.sex === 0 ? "Female" : "Male" || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      Address
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{loadingData ? <Skeleton variant="rectangular" width={100} height={30} />  : content?.address || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      NHIA/No
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{loadingData ? <Skeleton variant="rectangular" width={100} height={30} />  : content?.nhia || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                    Arrival Time
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{loadingData ? <Skeleton variant="rectangular" width={100} height={30} />  : content?.extraDetails?.arrivalTime || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Main Complaints/Impression
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{loadingData ? <Skeleton variant="rectangular" width={100} height={30} />  : content?.medicalInterventions[0]?.mainComplaint || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Primary Survey
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{loadingData ? <Skeleton variant="rectangular" width={100} height={30} />  : content?.medicalInterventions[0]?.primarySurvey || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                </Grid>
            </Card>
            <Card sx={{ p: 3, pb: 10, mb: 2 }}>
                <Box sx={{mb:2}}>Information by Ambulance Service Provider</Box>
                    <Grid container spacing={2}>
                        <Grid item sm={6}>
                        <ListItem>
                        <ListItemText primary={<Typography>
                        Physical Exam Findings
                        </Typography>} 
                        secondary={
                            <Typography sx={{color:"#7b939c"}} >{loadingData ? <Skeleton variant="rectangular" width={100} height={30} />  : content?.medicalInterventions[0]?.physicalExaminationFindings || "Not Available"}</Typography>
                        } />
                        </ListItem>
                        </Grid>
                        <Grid item sm={6}>
                        <ListItem>
                        <ListItemText primary={<Typography>
                        Triage Category
                        </Typography>} 
                        secondary={
                            <Typography sx={{color:"#7b939c"}} >{loadingData ? <Skeleton variant="rectangular" width={100} height={30} />  : content?.extraDetails?.triageCategory || "Not Available"}</Typography>
                        } />
                        </ListItem>
                        </Grid>
                    </Grid>
            </Card> 
           
            <CustomUsableTable2 table_Head={TABLE_HEAD2} dataList={content?.medicalInterventions} />
            <CustomUsableTable table_Head={TABLE_HEAD} dataList={content?.drugs} />
            <Card sx={{ p: 3, pb: 10, mb: 2 }}>
              <Box sx={{mb:2}}>ETC Treatment</Box>
              <form onSubmit={handleSubmit(onSubmit)}>
   
              {fields.map((field, index) => (
                <Grid key={field.id} mb={2} container spacing={2}>
              <Grid item sm={12}>
              <Box>{index+1}).</Box>
              </Grid>
              <Grid item xs={12} sm={12} lg={12}>
              <label>Select Medical Intervention</label>
              <br />
               
                  <Autocomplete
              options={options}
              getOptionLabel={(option) => option.intervention}
              onChange={(e) => handleAutocompleteChange(index,e.target.textContent)}
             
              renderInput={(params) => <TextField {...params}  />}
            />
              </Grid>
              {/* <Grid item xs={6} sm={2} lg={2}>
              <label>Service Code</label>
              <TextField
              disabled
                {...register(`incidentDrugs[${index}].serviceCode`, { required: 'Service Code is required' })}
                error={!!errors.incidentDrugs?.[index]?.serviceCode}
                helperText={errors.incidentDrugs?.[index]?.serviceCode?.message}
              />
              </Grid> */}
             
              <Grid item xs={6} sm={2} lg={2}>
              <label>Unit Cost</label>
              <TextField
                type="number"
                disabled
                inputProps={{ step: '0.01' }}
                {...register(`incidentDrugs[${index}].price`, { required: 'Unit Cost is required', pattern: /^\d+(\.\d{1,2})?$/ })}
                error={!!errors.incidentDrugs?.[index]?.price}
                helperText={errors.incidentDrugs?.[index]?.price?.message}
              />
              </Grid>
              <Grid item xs={6} sm={2} lg={2}>
              <label>Dose</label>
              <TextField
              type="text"
                {...register(`incidentDrugs[${index}].dose`, { required: 'Dose is required' })}
                error={!!errors.incidentDrugs?.[index]?.dose}
                helperText={errors.incidentDrugs?.[index]?.dose?.message}
              />
              </Grid>
              <Grid item xs={6} sm={2} lg={2}>
              <label>Quantity</label>
              <TextField
                type="number"
                {...register(`incidentDrugs[${index}].quantity`, { required: 'Quantity is required', pattern: /^\d+$/ })}
                error={!!errors.incidentDrugs?.[index]?.quantity}
                helperText={errors.incidentDrugs?.[index]?.quantity?.message}
              />
              </Grid>
            
              <Grid item xs={6} sm={3} lg={2}>
              <label>Remark</label>
              <TextField
              type="text"
              multiline
                {...register(`incidentDrugs[${index}].remark`)}
                // error={!!errors.incidentDrugs?.[index]?.remark}
                // helperText={errors.incidentDrugs?.[index]?.remark?.message}
              />
              </Grid>
              <Grid item xs={6} sm={2} lg={2} mr={4}>
              <label>Amount</label>
              <TextField
                value={calculateAmount(field.price, field.quantity)}
                disabled
              />
              </Grid>
              <Button size="small" sx={{background:"grey", height:"40px", mt:6, '&:hover': {
              // Define the hover styles here
              backgroundColor: 'lightgray',
            
            },}} type="button" onClick={() => remove(index)}>
                <RemoveCircleOutline />
              </Button>
              </Grid>
          ))}

      <Button type="button" onClick={() => append({ serviceFeeId:'', medicalIntervention: '', quantity: '', dose:'',price:'', remark:'',incident_Id:'',ambulanceId:'',emergencyTreatmentCenterId:'',patientId:'' })}>
        Add More
      </Button>
     
     <Grid mt={5}>
     <LoadingButton
              size="medium"
              type="submit"
              variant="contained"
              className="btnCustom"
              sx={{mr:2}}
              loading={loading}
        
          >
              Add New Treatment
          </LoadingButton>
          {/* <Button
              size="medium"
              type="submit"
              variant="contained"
      
          >
              Discharge Patient
          </Button> */}
     </Grid>
               </form>
           </Card>
         
              </Container>
            </Page>
    );
  };
  
  export default ViewPatient;
  