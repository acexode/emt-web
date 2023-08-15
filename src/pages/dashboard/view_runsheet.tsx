import {
    Container,
    Grid,
    Typography,
    Card,
    FormLabel,
    TextField,
    FormControlLabel,
    Checkbox
  } from "@mui/material";
  import { FC} from "react";
  import {  useLocation } from "react-router-dom";
  import { useForm } from "react-hook-form";
  import * as yup from "yup"; 
  import { yupResolver } from "@hookform/resolvers/yup";
  import { LoadingButton } from "@mui/lab";

  import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
  import Page from "../../components/Page";
  import { PATH_DASHBOARD } from "../../routes/paths";
  import useSettings from "../../hooks/useSettings";
  
  const schema = yup.object().shape({
    incidentCode: yup.string().required("*Incident Code is required"),
    ambulanceServiceProvider: yup.string().required("*Ambulance Service Provider is required"),
    facilityName: yup.string().required("*Facility name is required"),
    receivingOfficer: yup.string().required("*Receiving officer is required"),
    dateOfTransfer: yup.string().required("*Date is required"),
    transferTime: yup.string().required("*Time of transfer is required"),
});

  const ViewRunSheet: FC = () => {
    const { themeStretch } = useSettings();
    // const [loading,setLoading] = useState(true)
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

      const onHandleSubmit = (data:any) =>{
        console.log({data});
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
                    <Grid item sm={6}>
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
                    </Grid>
                    <Grid item sm={6}>
                        <FormLabel >
                       Ambulance Service Provider
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth                      
                            type="text"
                            defaultValue={data?.ambulance_service_provider}
                            {...register('ambulanceServiceProvider')}
                            helperText={errors?.ambulanceServiceProvider?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                        }}
                        >
                        </TextField>
                    </Grid>
                    <Grid item sm={6}>
                        <FormLabel >
                       Facility Name
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth                      
                            type="text"
                            defaultValue={data?.facilityName}
                            {...register('facilityName')}
                            helperText={errors?.facilityName?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                        }}
                        >
                        </TextField>
                    </Grid>
                    <Grid item sm={6}>
                        <FormLabel >
                       Recieving Officer
                        </FormLabel>
                        <TextField
                            variant="outlined"
                            fullWidth                      
                            type="text"
                            {...register('receivingOfficer')}
                            helperText={errors?.receivingOfficer?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                        }}
                        >
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
                            {...register('dateOfTransfer')}
                            helperText={errors?.dateOfTransfer?.message?.toString()}
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
                            type="time"
                            {...register('transferTime')}
                            helperText={errors?.transferTime?.message?.toString()}
                            FormHelperTextProps={{
                            className:"helperTextColor"
                        }}
                       />
                        
                    </Grid>
                    <Grid item sm={12} sx={{mt:2}}>
                    <FormControlLabel control={<Checkbox defaultChecked sx={{
                        color: "hsl(0, 100%, 27%)",
                        '&.Mui-checked': {
                        color: "hsl(0, 100%, 27%)",
                        },
                    }} />} label={<Typography sx={{fontSize:"1rem"}} variant="subtitle2">I hereby confirm that I have recieved the patient from the Ambulance</Typography>} />

                    </Grid>

                    </Grid>
              </Card>
    
              <LoadingButton
                size="large"
                type="submit"
                variant="contained"
                >
                Submit
            </LoadingButton>
          </form>
        </Container>
      </Page>
    );
  };
  
  export default ViewRunSheet;
  