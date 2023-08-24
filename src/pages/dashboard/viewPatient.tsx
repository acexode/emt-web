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
    Autocomplete
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
  
const TABLE_HEAD = [
  { id: "sn", label: "S/N", alignRight: false },
  { id: "drugName", label: "Medical Intervention", alignRight: false },
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
  { id: "mainComplaint", label: "Complaint", alignRight: false },
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
    const [content, SetContent] = useState<any>(null);
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      control,
    } = useForm({
      mode: "onTouched",
      criteriaMode: "firstError",
      shouldFocusError: true,
      shouldUnregister: false,
      shouldUseNativeValidation: false,
      delayError: undefined,
      defaultValues: {
        incidentDrugs: [{ drugId:'', drugName: '', serviceCode: '',quantity: '', dose:'',price:'', remark:'',incident_Id:'',ambulanceId:'',emergencyTreatmentCenterId:'',patientId:'' }],
      },
    });
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
    const [loading,setLoading] = useState(false)
    const {
        state: { row,options},
      } = useLocation();
             useEffect(()=>{
      
            SetContent(row)
        },[row])
  
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
              // fetchAllData()
            } catch (error: any) {
              enqueueSnackbar("Error!", {
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
        setValue(`incidentDrugs[${index}].drugId`, selectedIntervention?.id || '');
        setValue(`incidentDrugs[${index}].drugName`, selectedIntervention?.intervention || '');
        setValue(`incidentDrugs[${index}].incident_Id`, row?.incident_Id || '');
        setValue(`incidentDrugs[${index}].ambulanceId`, row?.ambulance_Id || '');
        setValue(`incidentDrugs[${index}].emergencyTreatmentCenterId`, row?.etC_Id || '');
        setValue(`incidentDrugs[${index}].patientId`, row?.id || '');
        setValue(`incidentDrugs[${index}].serviceCode`, selectedIntervention?.code || '');
        setValue(
          `incidentDrugs[${index}].price`,
          selectedIntervention?.price?.toString() || ''
        );
        };

        // console.log({content,row})
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
                        <Typography sx={{color:"#7b939c"}} >{content?.incidentCode || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                       Incident Type
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.incidentType || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      Ambulance Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.ambulance_name || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      Mental Status
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.mental_status || "Not Available"}</Typography>
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
                        <Typography sx={{color:"#7b939c"}} >{content?.firstName || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      Middle Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.middleName || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      Last Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.lastName || "Not Available"}</Typography>
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
                        <Typography sx={{color:"#7b939c"}} >{content?.sex === 0 ? "Female" : "Male" || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      Address
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.address || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      NHIA/No
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.nhia || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                    Arrival Time
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.arrivalTime || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Main Complaints/Impression
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.mainComplaints || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Primary Survey
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.primary_survey || "Not Available"}</Typography>
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
                            <Typography sx={{color:"#7b939c"}} >{content?.physical_exam_findings || "Not Available"}</Typography>
                        } />
                        </ListItem>
                        </Grid>
                        <Grid item sm={6}>
                        <ListItem>
                        <ListItemText primary={<Typography>
                        Triage Category
                        </Typography>} 
                        secondary={
                            <Typography sx={{color:"#7b939c"}} >{content?.triage_category || "Not Available"}</Typography>
                        } />
                        </ListItem>
                        </Grid>
                    </Grid>
            </Card> 
            {/* <Card sx={{ p: 3, pb: 10, mb: 2 }}>
                <Box sx={{mb:2}}>Vital Sign</Box>
                    <Grid container spacing={2}>
                        <Grid item sm={4}>
                        <ListItem>
                        <ListItemText primary={<Typography>
                       Time
                        </Typography>} 
                        secondary={
                            <Typography sx={{color:"#7b939c"}} >{content?.time || "Not Available"}</Typography>
                        } />
                        </ListItem>
                        </Grid>
                        <Grid item sm={4}>
                        <ListItem>
                        <ListItemText primary={<Typography>
                       Pulse
                        </Typography>} 
                        secondary={
                            <Typography sx={{color:"#7b939c"}} >{content?.pulse || "Not Available"}</Typography>
                        } />
                        </ListItem>
                        </Grid>
                        <Grid item sm={4}>
                        <ListItem>
                        <ListItemText primary={<Typography>
                       Blood Pressure
                        </Typography>} 
                        secondary={
                            <Typography sx={{color:"#7b939c"}} >{content?.blood_pressure || "Not Available"}</Typography>
                        } />
                        </ListItem>
                        </Grid>
                        <Grid item sm={4}>
                        <ListItem>
                        <ListItemText primary={<Typography>
                       Resp
                        </Typography>} 
                        secondary={
                            <Typography sx={{color:"#7b939c"}} >{content?.resp || "Not Available"}</Typography>
                        } />
                        </ListItem>
                        </Grid>
                        <Grid item sm={4}>
                        <ListItem>
                        <ListItemText primary={<Typography>
                       Glucose
                        </Typography>} 
                        secondary={
                            <Typography sx={{color:"#7b939c"}} >{content?.glucose || "Not Available"}</Typography>
                        } />
                        </ListItem>
                        </Grid>
                        <Grid item sm={4}>
                        <ListItem>
                        <ListItemText primary={<Typography>
                            Sp02
                        </Typography>} 
                        secondary={
                            <Typography sx={{color:"#7b939c"}} >{content?.so02 || "Not Available"}</Typography>
                        } />
                        </ListItem>
                        </Grid>
                    </Grid>
            </Card> 
            
            <Card sx={{ p: 3, pb: 10, mb: 2 }}>
                <Box sx={{mb:2}}>Immediate Treatment</Box>
                    <Grid container spacing={2}>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      Time
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.immediate_treatment_time || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      Medical Intervention
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.medical_intervention || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                     Dose
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.dose || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                     IV
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.iv || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    </Grid>
            </Card> */}
            <CustomUsableTable2 table_Head={TABLE_HEAD2} dataList={row?.medicalInterventions} />
            <CustomUsableTable table_Head={TABLE_HEAD} dataList={row?.drugs} />
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
              <Grid item xs={6} sm={2} lg={2}>
              <label>Service Code</label>
              <TextField
              disabled
                {...register(`incidentDrugs[${index}].serviceCode`, { required: 'Service Code is required' })}
                error={!!errors.incidentDrugs?.[index]?.serviceCode}
                helperText={errors.incidentDrugs?.[index]?.serviceCode?.message}
              />
              </Grid>
             
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
              <Grid item xs={6} sm={2} lg={2}>
              <label>Amount</label>
              <TextField
                value={calculateAmount(field.price, field.quantity)}
                disabled
              />
              </Grid>
              <Grid item xs={6} sm={3} lg={3}>
              <label>Remark</label>
              <TextField
              type="text"
              multiline
                {...register(`incidentDrugs[${index}].remark`)}
                // error={!!errors.incidentDrugs?.[index]?.remark}
                // helperText={errors.incidentDrugs?.[index]?.remark?.message}
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

      <Button type="button" onClick={() => append({ drugId:'', drugName: '', serviceCode: '',quantity: '', dose:'',price:'', remark:'',incident_Id:'',ambulanceId:'',emergencyTreatmentCenterId:'',patientId:'' })}>
        Add More
      </Button>
      {/* <Grid item mb={4} xs={12} sm={12} mt={4} lg={12}>
        <TextField
          value={parseFloat(watch('totalAmount', 0)).toFixed(2)}
          disabled
          label="Total Amount"
        />

      </Grid> */}
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
  