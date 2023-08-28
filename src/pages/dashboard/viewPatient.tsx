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
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableContainer,
    TableHead,
    IconButton

  } from "@mui/material";
  import { FC, useEffect, useState } from "react";
  import {useForm, useFieldArray} from "react-hook-form"

  import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
  import Page from "../../components/Page";
  import { PATH_DASHBOARD } from "../../routes/paths";
  import useSettings from "../../hooks/useSettings";
import { RemoveCircleOutline } from "@mui/icons-material";
import { formatDate2, formatDateTime } from "../../utility";
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
import Scrollbar from "../../components/Scrollbar";
  
const TABLE_HEAD = [
  { id: "sn", label: "S/N", alignRight: false },
  { id: "drug.description", label: "Medical Intervention", alignRight: false },
  { id: "drug.code", label: "Code", alignRight: false },
  { id: "quantity", label: "Quantity", alignRight: false },
  { id: "dose", label: "Dose", alignRight: false },
  // { id: "drug.price", label: "Unit Cost", alignRight: false },
  { id: "price", label: "Total Amount", alignRight: false },
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
const headLabel = [
  "S/N", "Medical Intervention",  "Unit Cost", "Dose","Quantity","Amount",""
 ]

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
      getValues
    } = useForm({
      mode: "onTouched",
      criteriaMode: "firstError",
      shouldFocusError: true,
      shouldUnregister: false,
      shouldUseNativeValidation: false,
      delayError: undefined,
      defaultValues: {
        incidentDrugs: [{ serviceFeeId:'',unitCost:'', medicalIntervention: '', quantity: '', dose:'',price:'', remark:'',incidentId:'',ambulanceId:'',emergencyTreatmentCenterId:'',patientId:'' }],
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
          let newData = {
              ...data
            };
            // delete newData?.totalAmount
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
      
        const handleSetPrice=(val:any,index:number) =>{
          let boom = getValues(`incidentDrugs[${index}].unitCost`)
          let price = calculateAmount(boom,val)
           setValue(`incidentDrugs[${index}].price`, parseInt(price)|| '');
        }
        const handleAutocompleteChange = (index:number, intervention:string) => {
         const selectedIntervention = options.find(
          (int:any) => int.intervention === intervention
        );
        // Update the corresponding fields in the form data
        setValue(`incidentDrugs[${index}].serviceFeeId`, selectedIntervention?.id || '');
        setValue(`incidentDrugs[${index}].medicalIntervention`, selectedIntervention?.intervention || '');
        setValue(`incidentDrugs[${index}].incidentId`, row?.incident_Id);
        setValue(`incidentDrugs[${index}].ambulanceId`, row?.ambulance_Id );
        setValue(`incidentDrugs[${index}].emergencyTreatmentCenterId`, row?.etC_Id );
        setValue(`incidentDrugs[${index}].patientId`, row?.id || '');
        // setValue(`incidentDrugs[${index}].serviceCode`, selectedIntervention?.code || '');
        setValue(
          `incidentDrugs[${index}].unitCost`,
          selectedIntervention?.price?.toString() || ''
        );
        };

        // console.log({content});
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
                        <Typography sx={{color:"#7b939c"}} >{loadingData ? <Skeleton variant="rectangular" width={100} height={30} />  : formatDateTime(content?.runsheet?.arrivalTime) || "Not Available"}</Typography>
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
              <Scrollbar>
              <TableContainer>
                  <Table>
                  <TableHead>
                    <TableRow>
                  
                      {headLabel.map((headCell:string,index:number) => (
                        <TableCell
                          key={index}
                          width={400}
                        >
                      {headCell}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                    <TableBody>
                    {fields.map((field, index) => (
                       
                 <TableRow>

                
                        <TableCell
                           align="left"
                          >
                            <Box>{index+1}</Box>
                          </TableCell>
                     
               
                      <TableCell
                            style={{ width: '200rem' }}
                            >
                                 <Autocomplete
                                  options={options}
                                  getOptionLabel={(option) => option.intervention}
                                  onChange={(e) => handleAutocompleteChange(index,e.target.textContent)}
                                
                                  renderInput={(params) => <TextField {...params}  />}
                                />
                            </TableCell>
                           
                            <TableCell
                            align="right"
                            style={{ width: '60rem' }}
                            >
                             <TextField
                              type="number"
                              disabled
                              inputProps={{ step: '0.01' }}
                              {...register(`incidentDrugs[${index}].unitCost`, { required: 'Unit Cost is required', pattern: /^\d+(\.\d{1,2})?$/ })}
                              error={!!errors.incidentDrugs?.[index]?.unitCost}
                              helperText={errors.incidentDrugs?.[index]?.unitCost?.message}
                            />
                              </TableCell>
                              <TableCell
                            align="right"
                            style={{ width: '60rem' }}
                            >
                               <TextField
                        {...register(`incidentDrugs[${index}].dose`, { required: 'Dose is required' })}
                        error={!!errors.incidentDrugs?.[index]?.dose}
                        helperText={errors.incidentDrugs?.[index]?.dose?.message}
                      />
                              </TableCell>
                            <TableCell
                            align="right"
                            style={{ width: '60rem' }}

                            >
                               <TextField
                        type="number"
                        {...register(`incidentDrugs[${index}].quantity`, { required: 'Quantity is required', valueAsNumber:true, pattern: /^\d+$/ })}
                        error={!!errors.incidentDrugs?.[index]?.quantity}
                        helperText={errors.incidentDrugs?.[index]?.quantity?.message}
                        onChange={(e) => handleSetPrice(e.target.value,index)}
                      />
                              </TableCell>
                            <TableCell
                            align="right"
                            style={{ width: '80rem' }}
                            >
                               <TextField
                                disabled
                                {...register(`incidentDrugs[${index}].price`)}
                        
                                  />
                              </TableCell>
                            <TableCell
                            align="left"
                            >
                              <IconButton size="small" onClick={() => remove(index)}>
                        <RemoveCircleOutline />
                      </IconButton>
                              </TableCell>
                      </TableRow>
                   
                  ))}
                      
                    </TableBody>
                  </Table>
              </TableContainer>
            </Scrollbar>
            <Button type="button" onClick={() => append({serviceFeeId:'',unitCost:'', medicalIntervention: '', quantity: '', dose:'',price:'', remark:'',incidentId:'',ambulanceId:'',emergencyTreatmentCenterId:'',patientId:'' })}>
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
        
     </Grid>
               </form>
           </Card>
         
              </Container>
            </Page>
    );
  };
  
  export default ViewPatient;
  