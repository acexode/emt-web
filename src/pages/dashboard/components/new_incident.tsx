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
  import { useNavigate } from "react-router-dom";
  
  import useSettings from "../../../hooks/useSettings";
//   import axiosInstance from "../../../services/api_service";
//   import { useAuthUserContext } from "../../../context/authUser.context";
  import { MIconButton } from "../../../components/@material-extend";
//   import closeFill from "@iconify/icons-eva/close-fill";
//   import { Icon } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// import AlertDialog from "./confirmDialog";
//   interface BodyType {
//     [key: string]: string;
//   }

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
    callerId: yup.string().required("*Caller ID is required"),
    sex: yup.string().required("*Sex is required"),
    incidentLocation: yup.string().required("*Incident Location is required"),
    street: yup.string().required("*Street is required"),
    districtWard: yup.string().required("*District Ward is required"),
    areaCouncil: yup.string().required("*Area Council is required"),
    zipCode: yup.string().required("*Zip Code is required"),
    incidentCategory: yup.string(),
    caseResolvedWithoutAmbulance: yup.string(),
    ambulanceCode: yup.string(),
    ambulanceType: yup.string(),
    treatmentCode: yup.string(),
    dispatcherFullname: yup.string(),
    dispatcherID: yup.string(),
    dispatcherDate: yup.string(),
    supervisorFirstName: yup.string(),
    supervisorLastName: yup.string(),
    supervisorMiddleInitial: yup.string(),
    supervisorDate: yup.string(),
    serialNo: yup.string(),
});

  const category = ["RTA","Domestic Accident", "Chemical Accident","Industrial Accident", "Obstetric Emergency"," Neonatal (<5yrs)","Paediatric (<5yrs)","Banditry/Terrorism","Bomblast","Fire Accident","Geriatric Emergency","Others"]
    const ambulance_type =["BLS","ALS","ICU","Mobile Clinic","Boat Ambulance","KEKE (Rural Ambulance)","MotorBike Ambulance"]
  const NewIncidentForm = () => {
    const { themeStretch } = useSettings();
    // const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
      } = useForm({
        mode: "onTouched",
        criteriaMode: "firstError",
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false,
        delayError: undefined,
        resolver: yupResolver(schema),
      });
      const watchIsCaseSolvedWithAmbulance = watch("caseResolvedWithoutAmbulance") === "Yes"
    // const [confirmationPayload, setConfirmationPayload] = useState(null);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    let navigate = useNavigate();
    // const handleClickOpen = () => {
    //   setOpen(true);
    // };
  
    // const handleClose = () => {
    //   setOpen(false);
    // };
  
   
   //TODO make sure to append FCT360/ to serial no
  
   const onHandleSubmit = async (data:any) => {
    console.log({data});
          navigate(PATH_DASHBOARD.incidents.root);
        enqueueSnackbar("Incident added!", {
          variant: "success",
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              {/* <Icon icon={closeFill} /> */}
            </MIconButton>
          ),
        });
        // const payload = {
        //   quarter: quarter,
        //   year: selectedYear,
        //   content: questions,
        //   locationId: userProfile?.locationId,
        //   userId: userProfile?.id,
        // };
        // questions can be sent to API to persist assessment
        // handleClickOpen();
    // setConfirmationPayload(payload);
      
  };
   
    // const handleSubmitAssessment = async() =>{
    //   setLoading(true)
    //   try {
    //     const res = await axiosInstance.post("/assessments/m-and-e", confirmationPayload);
    //     console.log(res);
        // navigate(PATH_DASHBOARD.m_and_e.hf);
        // enqueueSnackbar("Assessment added!", {
        //   variant: "success",
        //   action: (key) => (
        //     <MIconButton size="small" onClick={() => closeSnackbar(key)}>
        //       <Icon icon={closeFill} />
        //     </MIconButton>
        //   ),
        // });
    //   } catch (error) {
    //     enqueueSnackbar("Error adding Assessment!", {
    //         variant: "error",
    //         action: (key) => (
    //           <MIconButton size="small" onClick={() => closeSnackbar(key)}>
    //             <Icon icon={closeFill} />
    //           </MIconButton>
    //         ),
    //       });
    //     console.error("An unexpected error happened occurred:", error);
    //   } finally{
    //     setLoading(false)
    //   }
    // }
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
                        Caller ID (Phone Number)
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth                      
                            type="text"
                            {...register('callerId')}
                            helperText={errors?.callerId?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                        }}
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
                            {...register('caseResolvedWithoutAmbulance')}
                            helperText={errors?.caseResolvedWithoutAmbulance?.message?.toString()}
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
                            {...register('ambulanceCode')}
                            helperText={errors?.ambulanceCode?.message?.toString()}
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
                            {...register('treatmentCode')}
                            helperText={errors?.treatmentCode?.message?.toString()}
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
                            {...register('dispatcherFullname')}
                            helperText={errors?.dispatcherFullname?.message?.toString()}
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
                            {...register('dispatcherID')}
                            helperText={errors?.dispatcherID?.message?.toString()}
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
                            {...register('dispatcherDate')}
                            helperText={errors?.dispatcherDate?.message?.toString()}
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
                        Middle Initial
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth                      
                            type="text"
                            {...register('supervisorMiddleInitial')}
                            helperText={errors?.supervisorMiddleInitial?.message?.toString()}
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
          {/* <AlertDialog open={open} handleClose={handleClose} loading={loading} handleSubmit={handleSubmitAssessment} /> */}

        </Container>
      </Page>
    );
  };
  
  export default NewIncidentForm;
  