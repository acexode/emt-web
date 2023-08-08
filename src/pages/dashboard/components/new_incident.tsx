import {
    Box,
    Card,
    Container,
    Grid,
    TextField,
    MenuItem,
    FormLabel,
  } from "@mui/material";
  import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
  import Page from "../../../components/Page";
  import { PATH_DASHBOARD } from "../../../routes/paths";
  import { useForm } from "react-hook-form";
  import * as yup from "yup"; 
  import { yupResolver } from "@hookform/resolvers/yup";
   import { useSnackbar } from "notistack";
  import { useLocation, useNavigate } from "react-router-dom";
  import useSettings from "../../../hooks/useSettings";
  import { MIconButton } from "../../../components/@material-extend";
  import closeFill from "@iconify/icons-eva/close-fill";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import axiosInstance from "../../../services/api_service";
import MapSelector from "./map";
import AlertDialog from "./confirmDialog";
import { Icon } from "@iconify/react";


const treatmentTypes =[
    "Federal Medical Centre, Abuja",
    "Gwarimpa General Hospital, Abuja",
    "Garki General Hospital, Abuja"
]
const ambulance =[
    {
      ambulance_code: "002",
      ambulance_service_provider:"R & R Ambulance Service"
    },
    {
      ambulance_code: "003",
      ambulance_service_provider:"Hibalance Ambulance Service"
    },
    {
      ambulance_code: "004",
      ambulance_service_provider:"PneumaRS Ambulance Service"
    },
    {
      ambulance_code: "005",
      ambulance_service_provider:"R & R Ambulance Service"
    },
  
  ]

  const schema = yup.object().shape({
    incidentDate: yup.string().required("*Incident Date is required"),
    incidentTime: yup.string().required("*Incident Time is required"),
    callerNumber: yup.string().required("*Caller ID is required"),
    callerName: yup.string().required("*Caller Name is required"),
    callerIsPatient: yup.string().required("*Field is required"),
    sex: yup.string().required("*Sex is required"),
    incidentLocation: yup.string().required("*Incident Location is required"),
    street: yup.string().required("*Street is required"),
    districtWard: yup.string().required("*District Ward is required"),
    areaCouncil: yup.string().required("*Area Council is required"),
    zipCode: yup.string().required("*Zip Code is required"),
    incidentCategory: yup.string(),
    canResolveWithoutAmbulance: yup.string(),
    ambulance: yup.string(),
    ambulanceType: yup.string(),
    treatmentCenter: yup.string(),
    dispatchFullName: yup.string(),
    dispatcherId: yup.string(),
    dispatchDate: yup.string(),
    supervisorFirstName: yup.string(),
    supervisorLastName: yup.string(),
    supervisorMiddleName: yup.string(),
    supervisorDate: yup.string(),
    serialNo: yup.string(),
});

  const category = ["RTA","Domestic Accident", "Chemical Accident","Industrial Accident", "Obstetric Emergency"," Neonatal (<5yrs)","Paediatric (<5yrs)","Banditry/Terrorism","Bomblast","Fire Accident","Geriatric Emergency","Others"]
    const ambulance_type =["BLS","ALS","ICU","Mobile Clinic","Boat Ambulance","KEKE (Rural Ambulance)","MotorBike Ambulance"]
  const NewIncidentForm = () => {
    const { themeStretch } = useSettings();
    const [latitude, setSelectedLatitude] = useState(null);
    const [longitude, setSelectedLongitude] = useState(null);
    const [loading,setLoading] = useState(false)
    const { state } = useLocation();
    const row = state?.row || null;
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
      } = useForm({
        mode: "onTouched",
        criteriaMode: "firstError",
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false,
        delayError: undefined,
        resolver: yupResolver(schema),
      });
      const watchIsCaseSolvedWithAmbulance = watch("canResolveWithoutAmbulance") === "Yes"
    const [confirmationPayload, setConfirmationPayload] = useState(null);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    let navigate = useNavigate();
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    useEffect(()=>{
        if(row){
          reset(row)
        }else{
          reset()
        }
    },[row])
  
//   useEffect(()=>{
//     axiosInstance
//     .get(`Ambulances/get`)
//     .then((res) => {
//         console.log(res.data)
//     })
//     .catch((error) => {
//       console.log(error);
//     })
//   },[])
   
  
   const onHandleSubmit = async (data:any) => {
    let newSerialNo = `FCT360/${data?.serialNo}`
    let newVal = {
        ...data,
        longitude,
        latitude,
        serialNo:newSerialNo
    }
        handleClickOpen();
    setConfirmationPayload(newVal);
      
  };
   
    const handleIncidents = async() =>{
      setLoading(true)
      try {
        let res;
        if (row) {
            res = await axiosInstance.put(
              `Incidents/update`,
              confirmationPayload
            );
          } else {
            res = await axiosInstance.post(`Incidents/add`, confirmationPayload);
          }
        navigate(PATH_DASHBOARD.incidents.root);
        enqueueSnackbar(res?.data?.message, {
          variant: "success",
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          ),
        });
      } catch (error) {
        enqueueSnackbar("Error reporting incident!", {
            variant: "error",
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            ),
          });
        console.error("An unexpected error happened occurred:", error);
      } finally{
        setLoading(false)
      }
    }
    return (
      <Page title="Incident Form: Create new incident | EMT">
        <Container maxWidth={themeStretch ? false : "lg"}>
          <HeaderBreadcrumbs
            heading={"Incident Form"}
            links={[
              { name: "Dashboard", href: PATH_DASHBOARD.root },
              { name: "Incidents", href: PATH_DASHBOARD.incidents.root },
              { name: "New Incident Form" },
            ]}
          />
          <form onSubmit={handleSubmit(onHandleSubmit)}>
              <Card sx={{ p: 3, pb: 10, mb: 5 }}>
                <Box sx={{mb:2}}>Incident Details</Box>
                    <Grid container spacing={2}>
                    <Grid item sm={4}>
                        <FormLabel >
                        Incident Date
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth                      
                            type="date"
                            {...register('incidentDate')}
                            defaultValue={row?.incidentDate}
                            helperText={errors?.incidentDate?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                        }}
                        >
                        </TextField>
                    </Grid>
                    <Grid item sm={4}>
                        <FormLabel >
                        Incident Time
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth                      
                            type="time"
                            {...register('incidentTime')}
                            helperText={errors?.incidentTime?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                        }}
                        >
                        </TextField>
                    </Grid>
                   
                    <Grid item sm={4}>
                        <FormLabel >
                        Caller Name
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth                      
                            type="text"
                            {...register('callerName')}
                            helperText={errors?.callerName?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                        }}
                        >
                        </TextField>
                    </Grid>
                    <Grid item sm={4}>
                        <FormLabel >
                        Caller ID (Phone Number)
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth                      
                            type="text"
                            {...register('callerNumber')}
                            helperText={errors?.callerNumber?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                        }}
                        >
                        </TextField>
                    </Grid>
                    <Grid item sm={4}>
                        <FormLabel >
                        Is caller the patient ?
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth
                            select
                            type="text"
                            defaultValue={row?.callerIsPatient}
                            {...register('callerIsPatient')}
                            helperText={errors?.callerIsPatient?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                            }}
                        >
                            
                            <MenuItem value={"Yes"}>
                            Yes
                            </MenuItem>
                            <MenuItem value={"No"}>
                            No
                            </MenuItem>
                            
                        </TextField>
                    </Grid>
                    <Grid item sm={4}>
                        <FormLabel >
                        Gender
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth
                            select
                            type="text"
                            {...register('sex')}
                            defaultValue={row?.sex}
                            helperText={errors?.sex?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                            }}
                        >
                            
                            <MenuItem value={"Male"}>
                            Male
                            </MenuItem>
                            <MenuItem value={"Female"}>
                            Female
                            </MenuItem>
                            
                        </TextField>
                    </Grid>
                    <Grid item sm={4}>
                        <FormLabel >
                    Incident Location
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth                      
                            type="text"
                            {...register('incidentLocation')}
                            helperText={errors?.incidentLocation?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                        }}
                        >
                        </TextField>
                    </Grid>
                    <Grid item sm={4}>
                        <FormLabel >
                    Street
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth                      
                            type="text"
                            {...register('street')}
                            helperText={errors?.street?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                        }}
                        >
                        </TextField>
                    </Grid>
                    <Grid item sm={4}>
                        <FormLabel >
                    District Ward
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth                      
                            type="text"
                            {...register('districtWard')}
                            helperText={errors?.districtWard?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                        }}
                        >
                        </TextField>
                    </Grid>
                    <Grid item sm={4}>
                        <FormLabel >
                    Area Council
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth                      
                            type="text"
                            {...register('areaCouncil')}
                            helperText={errors?.areaCouncil?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                        }}
                        >
                        </TextField>
                    </Grid>
                    <Grid item sm={4}>
                        <FormLabel >
                    Zip Code
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth                      
                            type="text"
                            {...register('zipCode')}
                            helperText={errors?.zipCode?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                        }}
                        >
                        </TextField>
                    </Grid>
                    <Grid item sm={4}>
                        <FormLabel >
                        Incident Category
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth
                            select
                            type="text"
                            multiline
                            {...register('incidentCategory')}
                            defaultValue={row?.incidentCategory}
                            helperText={errors?.incidentCategory?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                            }}
                        >
                            {category.map((cat,index) => (
                                <MenuItem key={index} value={cat}>
                                    {cat}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item sm={6}>
                        <FormLabel >
                        Was the case resolved without Ambulance dispatch?
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth
                            select
                            type="text"
                            {...register('canResolveWithoutAmbulance')}
                            defaultValue={row?.canResolveWithoutAmbulance}
                            helperText={errors?.canResolveWithoutAmbulance?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                            }}
                        >
                            <MenuItem value={"Yes"}>
                                    Yes
                                </MenuItem>
                            <MenuItem value={"No"}>
                                    No
                                </MenuItem>
                        </TextField>
                    </Grid>
                    
                    </Grid>
              </Card>
             {!watchIsCaseSolvedWithAmbulance && <> <Card sx={{ p: 3, pb: 10, mb: 5 }}>
                <Box sx={{mb:2}}>Ambulance Dispatch Information</Box>
                    <Grid container spacing={2}>
                    <Grid item sm={6}>
                        <FormLabel >
                        Ambulance
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth
                            select
                            type="text"
                            {...register('ambulance')}
                            defaultValue={row?.ambulance}
                            helperText={errors?.ambulance?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                            }}
                        >
                            <MenuItem value={""}>
                                None
                            </MenuItem>
                           {ambulance.map((amb, index) =>(
                            <MenuItem value={amb.ambulance_code} key={index}>
                                {amb.ambulance_service_provider}
                            </MenuItem>
                           ))}                 
                        </TextField>
                    </Grid>
                    <Grid item sm={6}>
                        <FormLabel >
                       Ambulance Type
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth
                            select
                            type="text"
                            multiline
                            defaultValue={row?.ambulanceType}
                            {...register('ambulanceType')}
                            helperText={errors?.ambulanceType?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                            }}
                        >
                            {ambulance_type.map((type,index) => (
                                <MenuItem key={index} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    </Grid>
              </Card>
              <Card sx={{ p: 3, pb: 10, mb: 5 }}>
                <Box sx={{mb:2}}>Treatment Center Information</Box>
                    <Grid container spacing={2}>
                    <Grid item sm={6}>
                        <FormLabel >
                        Treatment Center
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth
                            select
                            type="text"
                            defaultValue={row?.treatmentCenter}
                            {...register('treatmentCenter')}
                            helperText={errors?.treatmentCenter?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                            }}
                        >
                            <MenuItem value={""}>
                                None
                            </MenuItem>
                           {treatmentTypes.map((treatment, index) =>(
                            <MenuItem value={treatment} key={index}>
                                {treatment}
                            </MenuItem>
                           ))} 
                        </TextField>
                   </Grid>
                    </Grid>
              </Card>
              <Card sx={{ p: 3, pb: 10, mb: 5 }}>
                <Box sx={{mb:2}}>Dispatcher Information</Box>
                    <Grid container spacing={2}>
                
                    <Grid item sm={4}>
                        <FormLabel >
                        Dispatcher Full Name
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth                      
                            type="text"
                            {...register('dispatchFullName')}
                            helperText={errors?.dispatchFullName?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                        }}
                        >
                        </TextField>
                    </Grid>
                    <Grid item sm={4}>
                        <FormLabel >
                        Dispatcher ID
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth                      
                            type="text"
                            {...register('dispatcherId')}
                            helperText={errors?.dispatcherId?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                        }}
                        >
                        </TextField>
                    </Grid>
                    <Grid item sm={4}>
                        <FormLabel >
                        Date
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth                      
                            type="date"
                            {...register('dispatchDate')}
                            helperText={errors?.dispatchDate?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                        }}
                        >
                        </TextField>
                    </Grid>
                     
                    </Grid>
              </Card>
              <Card sx={{ p: 3, pb: 10, mb: 5 }}>
                <Box sx={{mb:2}}>Supervisor's Information</Box>
                    <Grid container spacing={2}>
                
                    <Grid item sm={4}>
                        <FormLabel >
                        First Name
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth                      
                            type="text"
                            {...register('supervisorFirstName')}
                            helperText={errors?.supervisorFirstName?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                        }}
                        >
                        </TextField>
                    </Grid>
                    <Grid item sm={4}>
                        <FormLabel >
                         Last Name
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth                      
                            type="text"
                            {...register('supervisorLastName')}
                            helperText={errors?.supervisorLastName?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                        }}
                        >
                        </TextField>
                    </Grid>
                    <Grid item sm={4}>
                        <FormLabel >
                        Middle Name
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth                      
                            type="text"
                            {...register('supervisorMiddleName')}
                            helperText={errors?.supervisorMiddleName?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                        }}
                        >
                        </TextField>
                    </Grid>
                    <Grid item sm={4}>
                        <FormLabel >
                        Date
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth                      
                            type="date"
                            {...register('supervisorDate')}
                            helperText={errors?.supervisorDate?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                        }}
                        >
                        </TextField>
                    </Grid>
                     
                    </Grid>
              </Card>
              <Card sx={{ p: 3, pb: 10, mb: 5 }}>
                    <Grid container spacing={2}>
                
                    <Grid item sm={6}>
                        <FormLabel >
                        Serial No
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth                      
                            type="text"
                            {...register('serialNo')}
                            helperText={errors?.serialNo?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                        }}
                        >
                        </TextField>
                    </Grid>
                
              
                     
                    </Grid>
              </Card>
              <Card sx={{ p: 3, pb: 10, mb: 5 }}>
                <Box sx={{mb:2}}>Map Location</Box>
                    <Grid container spacing={2}>
                
                    <Grid item sm={12}>
                        <FormLabel >
                        Select a Location on the Map
                        </FormLabel>
                        <MapSelector 
                        setSelectedLatitude={setSelectedLatitude} 
                        setSelectedLongitude={setSelectedLongitude}
                        selectedLatitude={latitude}
                        selectedLongitude={longitude}
                         />
                    </Grid>
               
                
                     
                    </Grid>
              </Card>
              </>
              }
              
              <LoadingButton
                size="large"
                type="submit"
                variant="contained"
                >
                Submit
            </LoadingButton>
          </form>
          <AlertDialog open={open} handleClose={handleClose} loading={loading} handleSubmit={handleIncidents} title="Incident Reporting" />

        </Container>
      </Page>
    );
  };
  
  export default NewIncidentForm;
  