import {
    Container,
    Grid,
    Typography,
    Card,
    FormLabel,
    TextField,
    FormControlLabel,
    Checkbox,
    MenuItem
  } from "@mui/material";
  import { FC, useEffect, useState} from "react";
  import {  useLocation, useNavigate } from "react-router-dom";
  import { useForm } from "react-hook-form";
  import * as yup from "yup"; 
  import { yupResolver } from "@hookform/resolvers/yup";
  import { LoadingButton } from "@mui/lab";
  import closeFill from "@iconify/icons-eva/close-fill";

  import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
  import Page from "../../components/Page";
  import { PATH_DASHBOARD } from "../../routes/paths";
  import useSettings from "../../hooks/useSettings";
import axiosInstance from "../../services/api_service";
import AlertDialog from "./components/confirmDialog";
import { useSnackbar } from "notistack";
import { MIconButton } from "../../components/@material-extend";
import { Icon } from "@iconify/react";
  
  const schema = yup.object().shape({
    // incidentCode: yup.string().required("*Incident Code is required"),
    // ambulanceServiceProvider: yup.string().required("*Ambulance Service Provider is required"),
    // facilityName: yup.string().required("*Facility name is required"),
    medicUserId: yup.string().required("*Receiving officer is required"),
    approve: yup.boolean(),
    // dateOfTransfer: yup.string().required("*Date is required"),
    // transferTime: yup.string().required("*Time of transfer is required"),
    
});

  const ViewRunSheet: FC = () => {
    const { themeStretch } = useSettings();
    const [ambulances,setAmbulances] = useState<any>([])
    const [treatmentCentres,setTreatmentCentres] = useState<any>([])
    const [loading,setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [confirmationPayload, setConfirmationPayload] = useState(null);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

    const handleCheckboxClick = () => {
      setIsCheckboxChecked(!isCheckboxChecked);
    };


    let navigate = useNavigate();
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        mode: "onTouched",
        criteriaMode: "firstError",
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false,
        delayError: undefined,
        resolver: yupResolver(schema),
      });
    const {
        state: { data},
      } = useLocation();

      const defaultDate = data?.incidentViewModel?.runsheetViewModel?.arrivalTime
      ? new Date(data.incidentViewModel.runsheetViewModel.arrivalTime)
      : new Date();
      const defaultTime = `${defaultDate.getHours().toString().padStart(2, '0')}:${defaultDate.getMinutes().toString().padStart(2, '0')}`;
      const [selectedDate, setSelectedDate] = useState(defaultDate?.toISOString().split('T')[0]);
      const [selectedTime, setSelectedTime] = useState(defaultTime);
      const [users,setUsers] = useState([])

      
      useEffect(() => {
        setSelectedDate(defaultDate.toISOString().split('T')[0]);
        setSelectedTime(defaultTime);
      }, [data]);

      useEffect(()=>{
        if(data){
         let val ={
           value: data?.incidentViewModel?.emergencyTreatmentCenterViewModel?.name
         }
         axiosInstance.post('Account/getUsersByOrganisationName',val).then(res =>{
           let obj = res?.data?.data?.map((dt:any)=>{
             return {
               label: `${dt?.firstName} ${dt?.lastName}`,
               value: dt?.id
             }
           })
           setUsers(obj)
         }).catch(error =>{
           console.log(error)
         })
        }
        },[data])

      useEffect(()=>{
        axiosInstance
        .get(`Ambulances/get`)
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
  
      const onHandleSubmit = async (data2:any) => {
        let newVal = {
            ...data2,
            id:data?.id,
            incidentId: data?.incidentId,
            hospiceUserId: data?.hospiceUserId,
            patient_Id: data?.patient_Id,
            etC_Id: data?.etC_Id,
            runSheetId: data?.runSheetId,
          
        }
            handleClickOpen();
        setConfirmationPayload(newVal);
          
      };
       
        const handleIncidents = async() =>{
          setLoading(true)
          try {
            let res;
            res = await axiosInstance.put(
              `TransferForms/update`,
              confirmationPayload
            );
            navigate(PATH_DASHBOARD.ambulance_run_sheets.root);
            enqueueSnackbar(res?.data?.message, {
              variant: "success",
              action: (key) => (
                <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                  <Icon icon={closeFill} />
                </MIconButton>
              ),
            });
          } catch (error:any) {
            enqueueSnackbar(error?.response?.data?.title, {
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
      <Page title={`View Run Sheet | NEMSAS`}>
        <Container maxWidth={themeStretch ? false : "lg"}>
          <HeaderBreadcrumbs
            heading={`Review Patient Transfer Form`}
            links={[
              { name: "Dashboard", href: PATH_DASHBOARD.root },
              { name: `Run Sheet`, href: PATH_DASHBOARD.ambulance_run_sheets.root },
              { name: "List" },
            ]}
          />
          <form onSubmit={handleSubmit(onHandleSubmit)}>
              <Card sx={{ p: 3, pb: 10, mb: 2 }}>
                    <Grid container spacing={2}>
                    {/* <Grid item sm={6}>
                        <FormLabel >
                        Incident No
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth                      
                            type="text"
                            defaultValue={data?.incident_no}
                            {...register('incidentCode')}
                            helperText={errors?.incidentCode?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                        }}
                        >
                        </TextField>
                    </Grid> */}
                    <Grid item sm={6}>
                        <FormLabel >
                       Ambulance Service Provider
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth
                            select
                            type="text"
                            disabled
                            // {...register('ambulanceId')}
                            defaultValue={data?.incidentViewModel?.ambulanceViewModel?.id}
                            // helperText={errors?.ambulanceId?.message?.toString()}
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
                    <Grid item sm={6}>
                        <FormLabel >
                       Facility Name
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth
                            select
                            type="text"
                            disabled
                            defaultValue={data?.incidentViewModel?.emergencyTreatmentCenterViewModel?.id}
                        
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
                    <Grid item sm={6}>
                        <FormLabel >
                       Recieving Officer
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth
                            select
                            type="text"
                            defaultValue={data?.medicUserId}
                            {...register('medicUserId')}
                            helperText={errors?.medicUserId?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                            }}
                        >
                            <MenuItem value={""}>
                                None
                            </MenuItem>
                           {users?.map((user: any, index:number) =>(
                            <MenuItem value={user?.value} key={index}>
                                {user?.label}
                            </MenuItem>
                           ))} 
                        </TextField>
                                            </Grid>
                    
                    <Grid item sm={6}>
                        <FormLabel >
                        Date
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth                      
                            type="date"
                            disabled
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            // {...register('dateOfTransfer')}
                            // helperText={errors?.dateOfTransfer?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                        }}
                        >
                        </TextField>
                    </Grid>
                    <Grid item sm={6}>
                        <FormLabel >
                   Time of transfer
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth                
                            disabled      
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            type="time"
                            // {...register('transferTime')}
                            // helperText={errors?.transferTime?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                        }}
                       />
                        
                    </Grid>
                    <Grid item sm={6}>
                        <FormLabel >
                       Do you approve ?
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth
                            select
                            type="text"
                            {...register('approve')}
                            // helperText={errors?.ambulanceId?.message?.toString()}
                            // FormHelperTextProps={{
                            // className:"helperTextColor"
                            // }}
                        >
                            <MenuItem value={""}>
                                None
                            </MenuItem>
                            <MenuItem value={"true"} >
                               Yes
                            </MenuItem>              
                            <MenuItem value={"false"} >
                               No
                            </MenuItem>              
                        </TextField>
                    </Grid>
                    <Grid item sm={12} sx={{mt:2}}>
                    <FormControlLabel 
                     onClick={handleCheckboxClick}
                    control={<Checkbox defaultChecked={isCheckboxChecked} sx={{
                        color: "hsl(0, 100%, 27%)",
                        '&.Mui-checked': {
                        color: "hsl(0, 100%, 27%)",
                        },
                    }} />} 
                    label={<Typography sx={{fontSize:"1rem"}}  variant="subtitle2">I hereby confirm that I have recieved the patient from the Ambulance</Typography>}
                      />

                    </Grid>

                    </Grid>
              </Card>
    
              <LoadingButton
                size="large"
                type="submit"
                variant="contained"
                disabled={!isCheckboxChecked}
                >
                Submit
            </LoadingButton>
          </form>
          <AlertDialog open={open} handleClose={handleClose} loading={loading} handleSubmit={handleIncidents} title="Reviewing Patient Transfer Form" />

        </Container>
      </Page>
    );
  };
  
  export default ViewRunSheet;
  