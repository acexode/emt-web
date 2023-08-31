// @ts-nocheck

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    MenuItem,
    TextField,
  } from "@mui/material";
  import{ FC, useEffect, useState } from "react";
  import {useForm} from "react-hook-form"
  import { useSnackbar } from "notistack";

  import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../../../services/api_service";
import { MIconButton } from "../../@material-extend";
import closeFill from "@iconify/icons-eva/close-fill";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import { errorMessages } from "../../../constants";

  interface IAddEditServiceProvider {
    edit?: boolean,
    modal:boolean,
    toggle: any;
    formData?:any;
    fetchAllUsers?:any;
    locations?:any
  }

  const schema = yup.object().shape({
      name: yup.string().required("*Name is required"),
      location: yup.string().required("*Location is required"),
      address1: yup.string().required("*Address 1 is required"),
      address2: yup.string().required("*Address 2 is required"),
      landmark: yup.string().required("*Landmark is required"),
      hospitalTypeId: yup.string(),
      stateId: yup.string(),
      lgaId: yup.string(),
   
  });
 

export  const AddEditServiceProviderETC:FC<IAddEditServiceProvider> = ({edit,formData,modal,toggle,fetchAllUsers}) =>{
    const {
        register,
        handleSubmit,
        reset,
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
      const [loading,setLoading] = useState(false)
      const [hospitalTypes,setHospitalTypes] = useState<any>([])
      const [states,setStates] = useState<any>([])
      const [lgas,setLgas] = useState<any>([])
      const { enqueueSnackbar, closeSnackbar } = useSnackbar();


      useEffect(()=>{
          if(edit){
            reset(formData)
          }else{
            reset()
          }
      },[edit])

      useEffect(()=>{
          axiosInstance.get('HospitalTypes/get').then(res =>{
            const obj = res?.data?.data?.map((dt: { name: any; id:number}) =>{
              return {
                  label: dt?.name,
                  value: dt?.id
              }
          })
          setHospitalTypes(obj)
          }).catch(error =>{
            console.log(error)
          })
      },[])
      useEffect(()=>{
          axiosInstance.get('States/get').then(res =>{
            const obj = res?.data?.data?.map((dt: { name: any; id:number}) =>{
              return {
                  label: dt?.name,
                  value: dt?.id
              }
          })
          setStates(obj)
          }).catch(error =>{
            console.log(error)
          })
      },[])
      useEffect(()=>{
          axiosInstance.get('Lgas/get').then(res =>{
            const obj = res?.data?.data?.map((dt: { name: any; id:number}) =>{
              return {
                  label: dt?.name,
                  value: dt?.id
              }
          })
          setLgas(obj)
          }).catch(error =>{
            console.log(error)
          })
      },[])

 

    const handleToggle =() => toggle()

    const onSubmit = async(data:any) =>{
        let newData = {
            ...data,
            id:formData?.id
          };
        
          setLoading(true)
          let text = edit ? "ETC Updated" : "ETC Added";
          try {
            let res;
            if (edit) {
              res = await axiosInstance.put(
                `EmergencyCenters/update`,
                newData
              );
            } else {
              res = await axiosInstance.post(`EmergencyCenters/add`, data);
            }
            console.log(res);
            enqueueSnackbar(`${text}`, {
                variant: "success",
                action: (key) => (
                  <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                    <Icon icon={closeFill} />
                  </MIconButton>
                ),
              });
            reset();
            handleToggle();
            fetchAllUsers()
          } catch (error:any) {
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

  
    return (
        <Dialog
        open={modal}
        onClose={handleToggle}
        maxWidth="md"
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{edit ? "Edit ETC": "Add ETC"}</DialogTitle>
           <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
           
         
            
            <Grid item xs={12} sm={6} lg={6}>
              
            <label>Enter Name</label>
            <TextField
              variant="outlined"
              fullWidth                      
              type="text"
              {...register('name')}
              helperText={errors?.name?.message?.toString()}
              FormHelperTextProps={{
              className:"helperTextColor"
              }}
            />
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              
            <label>Enter Location</label>
            <TextField
              variant="outlined"
              fullWidth                      
              type="text"
              {...register('location')}
              helperText={errors?.location?.message?.toString()}
              FormHelperTextProps={{
              className:"helperTextColor"
              }}
            />
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              
            <label>Enter Landmark</label>
            <TextField
              variant="outlined"
              fullWidth                      
              type="text"
              {...register('landmark')}
              helperText={errors?.landmark?.message?.toString()}
              FormHelperTextProps={{
              className:"helperTextColor"
              }}
            />
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              
            <label>Enter Address 1</label>
            <TextField
              variant="outlined"
              fullWidth                      
              type="text"
              multiline
              {...register('address1')}
              helperText={errors?.address1?.message?.toString()}
              FormHelperTextProps={{
              className:"helperTextColor"
              }}
            />
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
            <label>Enter Address 2</label>
            <TextField
              variant="outlined"
              fullWidth                      
              type="text"
              multiline
              {...register('address2')}
              helperText={errors?.address2?.message?.toString()}
              FormHelperTextProps={{
              className:"helperTextColor"
              }}
            />
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              
            <label>Select Hospital Type</label>
            <TextField
                variant="outlined"
                fullWidth
                select
                type="text"
                defaultValue={formData?.hospitalTypeId}
                {...register('hospitalTypeId',{valueAsNumber:true})}
                helperText={errors?.hospitalTypeId?.message?.toString()}
                FormHelperTextProps={{
                className:"helperTextColor"
                }}
            >
                 <MenuItem  value={""}>
                        <em>None</em>
                    </MenuItem>
                    {hospitalTypes?.map((hospital:any,index:number) =>(
                       <MenuItem  key={index} value={hospital?.value}>
                      {hospital?.label}
                   </MenuItem>
                    ))}
            </TextField>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              
            <label>Select State</label>
            <TextField
                variant="outlined"
                fullWidth
                select
                type="text"
                defaultValue={formData?.stateId}

                {...register('stateId',{valueAsNumber:true})}
                helperText={errors?.stateId?.message?.toString()}
                FormHelperTextProps={{
                className:"helperTextColor"
                }}
            >
                 <MenuItem  value={""}>
                        <em>None</em>
                    </MenuItem>
                    {states?.map((state:any,index:number) =>(
                       <MenuItem  key={index} value={state?.value}>
                      {state?.label}
                   </MenuItem>
                    ))}
            </TextField>
            </Grid>
    
            <Grid item xs={12} sm={6} lg={6}>
              
            <label>Select LGA</label>
            <TextField
                variant="outlined"
                fullWidth
                select
                type="text"
                defaultValue={formData?.lgaId}
                {...register('lgaId',{valueAsNumber:true})}
                helperText={errors?.lgaId?.message?.toString()}
                FormHelperTextProps={{
                className:"helperTextColor"
                }}
            >
                 <MenuItem  value={""}>
                        <em>None</em>
                    </MenuItem>
                    {lgas?.map((lga:any,index:number) =>(
                       <MenuItem  key={index} value={lga?.value}>
                      {lga?.label}
                   </MenuItem>
                    ))}
            </TextField>
            </Grid>
    
            
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToggle} sx={{background:"grey",  '&:hover': {
          // Define the hover styles here
          backgroundColor: 'lightgray',
        
        },}} color="info" >
            Close
          </Button>
          <LoadingButton
                size="medium"
                type="submit"
                variant="contained"
                loading={loading}
                // onClick={onSubmit} 
            >
                Submit
            </LoadingButton>
         
        </DialogActions>
           </form>
      </Dialog>
    )
  }