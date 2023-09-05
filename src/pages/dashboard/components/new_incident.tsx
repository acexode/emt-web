// @ts-nocheck

import {
    Box,
    Card,
    Container,
    Grid,
    TextField,
    MenuItem,
    FormLabel,
    Chip
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
import {useEffect, useState } from "react";
import axiosInstance from "../../../services/api_service";
import MapSelector from "./map";
import AlertDialog from "./confirmDialog";
import { Icon } from "@iconify/react";
import MapWithSearchAndDraw from "../../../components/testMap";

  const schema = yup.object().shape({
    incidentDate: yup.string().required("*Incident Date is required"),
    incidentTime: yup.string().required("*Incident Time is required"),
    description: yup.string().required("*Incident Description is required"),
    callerNumber: yup.string().required("*Caller ID is required"),
    callerName: yup.string().required("*Caller Name is required"),
    callerIsPatient: yup.string().required("*Field is required"),
    sex: yup.string(),
    recommendation: yup.string().required("*Recommendation is required"),
    triageCategory: yup.string().required("*Triage Category is required"),
    incidentLocation: yup.string().required("*Incident Location is required"),
    street: yup.string().required("*Street is required"),
    districtWard: yup.string(),
    areaCouncil: yup.string().required("*Area Council is required"),
    zipCode: yup.string(),
    incidentCategory: yup.string(),
    canResolveWithoutAmbulance: yup.string(),
    ambulanceId: yup.string(),
    ambulanceType: yup.string(),
    emergencyTreatmentCenterId: yup.string(),
    // dispatchFullName: yup.string(),
    // dispatcherId: yup.string(),
    // dispatchDate: yup.string(),
    // supervisorFirstName: yup.string(),
    // supervisorLastName: yup.string(),
    // supervisorMiddleName: yup.string(),
    // supervisorDate: yup.string(),
    // serialNo: yup.string(),
    patient: yup.object().shape({
        firstName: yup.string().required('*First Name is required'),
        middleName: yup.string(),
        lastName: yup.string().required('*Last Name is required'),
        doB: yup.string(),
        // sex: yup.number().required('*Sex is required'),
        phoneNumber: yup.string(),
      }),
});

  const category = ["RTA","Domestic Accident", "Chemical Accident","Industrial Accident", "Obstetric Emergency"," Neonatal (<5yrs)","Paediatric (<5yrs)","Banditry/Terrorism","Bomblast","Fire Accident","Geriatric Emergency","Others"]
  const NewIncidentForm = () => {
    const { themeStretch } = useSettings();
  
    const [ambulances,setAmbulances] = useState<any>([])
    const [ambulanceTypes,setAmbulanceTypes] = useState<any>([])
    const [treatmentCentres,setTreatmentCentres] = useState<any>([])
    const [loading,setLoading] = useState(false)
    const [formDataLoaded, setFormDataLoaded] = useState(false);
    const { state } = useLocation();
    const row = state?.row || null;
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
        setValue
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
    const [latitude, setSelectedLatitude] = useState(row?.latitude ||  null);
    const [longitude, setSelectedLongitude] = useState(row?.longitude || null );
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const watchAmbulancetypeSelected = watch("ambulanceType")

    let navigate = useNavigate();
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
      setLoading(false)
    };
    useEffect(()=>{
        if(row){
          reset(row)
        }else{
          reset()
        }
    },[row])
  
  useEffect(()=>{
    if(watchAmbulancetypeSelected){
        axiosInstance
        .post(`Ambulances/getbyAmbulanceType`,{
            id:watchAmbulancetypeSelected
        })
        .then((res) => {
            const obj = res?.data?.data?.map((dt: { name: any; id:number}) =>{
                return {
                    label: dt?.name,
                    value: dt?.id
                }
            })
            setAmbulances(obj)
        })
        .catch((error) => {
          console.log(error);
        })
    }

  },[watchAmbulancetypeSelected])
  useEffect(()=>{
    axiosInstance
    .get(`AmbulanceTypes/get`)
    .then((res) => {
        const obj = res?.data?.data?.map((dt: { name: any; id:number}) =>{
            return {
                label: dt?.name,
                value: dt?.id
            }
        })
        setAmbulanceTypes(obj)
    })
    .catch((error) => {
      console.log(error);
    })
  },[])
  useEffect(()=>{
    axiosInstance
    .get(`EmergencyCenters/get`)
    .then((res) => {
        const obj = res?.data?.data?.map((dt: { name: any;id:number }) =>{
            return {
                label: dt?.name,
                value: dt?.id
            }
        })
        setTreatmentCentres(obj)
    })
    .catch((error) => {
      console.log(error);
    })
  },[])

  useEffect(() => {
    // Load form data from local storage
    const savedFormData = JSON.parse(localStorage.getItem("savedFormData"));
    if (savedFormData) {
      Object.keys(savedFormData).forEach((fieldName) => {
        setValue(fieldName, savedFormData[fieldName]);
      });
      setFormDataLoaded(true);
    }
  }, []);
  const formValues = watch();
  useEffect(() => {
    if(formDataLoaded){
        console.log("Saving form data to local storage...");
        // Save form data to local storage whenever form vaues change
        localStorage.setItem("savedFormData", JSON.stringify(formValues));
    }
   
  }, [formValues,formDataLoaded]);
   
   const onHandleSubmit = async (data:any) => {
    let newVal = {
        ...data,
        longitude,
        latitude,
        treatmentCenter:"",
        ambulanceName:""
    }
    delete newVal?.emergencyTreatmentCenterViewModel
    delete newVal?.ambulanceViewModel
    delete newVal?.patientViewModel
    delete newVal?.runsheetViewModel
    if(latitude === null && longitude === null){
        enqueueSnackbar("Latitude and Longitude is required!", {
            variant: "error",
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            ),
          });
    }
    else{
        handleClickOpen();
        setConfirmationPayload(newVal);
    }
      
      
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
    const defaultMapLocations = {
        x: longitude,
        y: latitude
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
                <Box sx={{mb:2}}>Patient Details</Box>
                    <Grid container spacing={2}>
                    <Grid item sm={4}>
                        <FormLabel >
                        First Name
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth                      
                            type="text"
                            {...register('patient.firstName')}
                            defaultValue={row?.patientViewModel?.firstName}
                            helperText={errors?.patient?.firstName?.message?.toString()}
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
                            {...register('patient.middleName')}
                            defaultValue={row?.patientViewModel?.middleName}
                            helperText={errors?.patient?.middleName?.message?.toString()}
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
                            {...register('patient.lastName')}
                            defaultValue={row?.patientViewModel?.lastName}
                            helperText={errors?.patient?.lastName?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                        }}
                        >
                        </TextField>
                    </Grid>
        
                    <Grid item sm={4}>
                        <FormLabel >
                        Phone Number
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth                      
                            type="text"
                            {...register('patient.phoneNumber')}
                            defaultValue={row?.patientViewModel?.phoneNumber}
                        
                        >
                        </TextField>
                    </Grid>
                    <Grid item sm={4}>
                        <FormLabel >
                        Date of birth
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth                      
                            type="date"
                            {...register('patient.doB')}
                            defaultValue={row?.patientViewModel?.doB}

                        >
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
                
                    
                    </Grid>
              </Card>
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
                    {/* <Grid item sm={4}>
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
                    </Grid> */}
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
                           
                        >
                        </TextField>
                    </Grid>
                    <Grid item sm={4}>
                        <FormLabel >
                    Area Council / LGA
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
                    <Grid item sm={4}>
                        <FormLabel >
                    Incident Description
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth                      
                            type="text"
                            multiline
                            {...register('description')}
                            helperText={errors?.description?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                        }}
                        >
                        </TextField>
                    </Grid>
                    <Grid item sm={4}>
                        <FormLabel >
                        Recommendation
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth                      
                            type="text"
                            multiline
                            {...register('recommendation')}
                            helperText={errors?.recommendation?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                        }}
                        >
                        </TextField>
                    </Grid>
                    <Grid item sm={4}>
                        <FormLabel >
                        Triage Category
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth
                            select
                            type="text"
                            {...register('triageCategory')}
                            defaultValue={row?.traiageCategory}
                            helperText={errors?.triageCategory?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                            }}
                        >
                            <MenuItem value={"Emergent"}>
                            <Chip label="Emergent" className={"emergentBg"} />    
                                </MenuItem>
                            {/* <MenuItem value={"Urgent"}>
                                    Urgent
                                </MenuItem> */}
                            <MenuItem value={"NonEmergent"}>
                                   
                                    <Chip label=" Non-Emergent" className={"nonEmergentBg"} />   
                                </MenuItem>
                        </TextField>
                    </Grid>
                    {/* <Grid item sm={6}>
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
                    </Grid> */}
                    
                    </Grid>
              </Card>
           
              <> 
             <Card sx={{ p: 3, pb: 10, mb: 5 }}>
                <Box sx={{mb:2}}>Ambulance Dispatch Information</Box>
                    <Grid container spacing={2}>
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
                                defaultValue={row?.ambulanceViewModel?.ambulanceTypeId}
                                {...register('ambulanceType')}
                                helperText={errors?.ambulanceType?.message?.toString()}
                                FormHelperTextProps={{
                                className:"helperTextColor"
                                }}
                            >
                                {ambulanceTypes.map((type:any,index:any) => (
                                    <MenuItem key={index} value={type?.value}>
                                        {type?.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item sm={6}>
                            <FormLabel >
                            Ambulance
                            </FormLabel>
                            <TextField
                                variant="outlined"
                                fullWidth
                                select
                                type="text"
                                {...register('ambulanceId')}
                                defaultValue={row?.ambulanceViewModel?.id}
                                helperText={errors?.ambulanceId?.message?.toString()}
                                FormHelperTextProps={{
                                className:"helperTextColor"
                                }}
                            >
                                <MenuItem value={""}>
                                    None
                                </MenuItem>
                            {ambulances?.map((amb:any, index:number) =>(
                                <MenuItem value={amb?.value} key={index}>
                                    {amb?.label}
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
                            defaultValue={row?.emergencyTreatmentCenterViewModel?.id}
                            {...register('emergencyTreatmentCenterId')}
                            helperText={errors?.emergencyTreatmentCenterId?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                            }}
                        >
                            <MenuItem value={""}>
                                None
                            </MenuItem>
                           {treatmentCentres?.map((treatment: any, index:number) =>(
                            <MenuItem value={treatment?.value} key={index}>
                                {treatment?.label}
                            </MenuItem>
                           ))} 
                        </TextField>
                   </Grid>
                    </Grid>
              </Card>
              {/* <Card sx={{ p: 3, pb: 10, mb: 5 }}>
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
              </Card> */}
              {/* <Card sx={{ p: 3, pb: 10, mb: 5 }}>
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
              </Card> */}
              {/* <Card sx={{ p: 3, pb: 10, mb: 5 }}>
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
              </Card> */}
              {/* <Card sx={{ p: 3, pb: 10, mb: 5 }}>
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
              </Card> */}
              <Card sx={{ p: 3, pb: 10, mb: 5 }}>
                <Box sx={{mb:2}}>Map Location</Box>
                    <Grid container spacing={2}>
                    <Grid item sm={12}>
                    <FormLabel >
                        Select a Location on the Map
                        </FormLabel>
                    <MapWithSearchAndDraw
                    setSelectedLatitude={setSelectedLatitude} 
                    setSelectedLongitude={setSelectedLongitude}
                    defaultMapLocations={defaultMapLocations}
                    />
                    </Grid>
                    </Grid>
              </Card>
             
              </>
            
              
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
  