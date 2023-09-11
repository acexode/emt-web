
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
    Autocomplete
  } from "@mui/material";
  import React, { FC, useEffect, useState } from "react";
  import {useForm} from "react-hook-form"
  import { useSnackbar } from "notistack";

  import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../../../services/api_service";
import { MIconButton } from "../../@material-extend";
import closeFill from "@iconify/icons-eva/close-fill";
import { Icon } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { errorMessages } from "../../../constants";

const status = [
  "Discharged",
  "Awaiting Discharge",
  "Treatment In Progress"
]

const incidentTypes = ["Domestic Accidents","Fire Accidents"]
  interface IAddEditPatient {
    edit?: boolean,
    modal:boolean,
    toggle: any;
    formData?:any;
    fetchAllUsers?:any;
    locations?:any
  }

  const schema = yup.object().shape({
    firstName: yup.string().required("*First Name  is required"),
    lastName: yup.string().required("*Last Name  is required"),
    middleName: yup.string(),
    doB: yup.string().required("Date of birth is required"),
    sex: yup.number(),
    phoneNumber:yup.string(),
    nhia:yup.string(),
    address:yup.string(),
  });

export  const AddEditPatient:FC<IAddEditPatient> = ({edit,formData,modal,toggle,fetchAllUsers}) =>{
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
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
      const [loading,setLoading] = useState(false)
      const { enqueueSnackbar, closeSnackbar } = useSnackbar();
      const defaultDOB = formData?.doB?.split("T")[0]

      useEffect(()=>{
          if(edit){
            reset(formData)
            setValue("doB",defaultDOB)
          }else{
            reset()
          }
      },[edit])

    const handleToggle =() => toggle()

    const onSubmit = async(data:any) =>{
        let newData = {
            ...data,
          };
          setLoading(true)
          let text = edit ? "Record Updated" : "Record Added";
          try {
            let res;
            if (edit) {
              res = await axiosInstance.put(
                `/Patients/update`,
                newData
              );
            } else {
              res = await axiosInstance.post(`/users/create`, newData);
            }
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
          } catch (error) {
            console.log(error);
            const errorMessage = errorMessages[error?.response?.status]
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
        <DialogTitle id="alert-dialog-title">{edit ? "Edit Record": "Add Record"}</DialogTitle>
           <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={6}>
                <label>First Name</label>
                <TextField
                    defaultValue={formData?.firstName}
                    variant="outlined"
                    fullWidth
                    {...register('firstName')}
                    type="text"
                    helperText={errors?.firstName?.message?.toString()}
                    FormHelperTextProps={{
                    className:"helperTextColor"
                    }}
                />
                
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
                <label>Middle Name</label>
                <TextField
                    defaultValue={formData?.middleName}
                    variant="outlined"
                    fullWidth
                    {...register('middleName')}
                    type="text"
                  
                />
               
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
                <label>Last Name</label>
                <TextField
                    defaultValue={formData?.lastName}
                    variant="outlined"
                    fullWidth
                    {...register('lastName')}
                    type="text"
                    helperText={errors?.lastName?.message?.toString()}
                    FormHelperTextProps={{
                    className:"helperTextColor"
                    }}
                />
                
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
                <label>Date of birth</label>
                <TextField
                     defaultValue={defaultDOB} 
                    variant="outlined"
                    fullWidth
                    {...register('doB')}
                    type="date"
                />
              
            </Grid>
            
            <Grid item xs={12} sm={6} lg={6}>
            <label>Select Gender</label>
              <TextField
                 variant="outlined"
                fullWidth
                defaultValue={formData?.sex} 
                select
                 type="text"
                {...register("sex")}
               
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>
                Male
                </MenuItem>
                <MenuItem value={0}>
                 Female
                </MenuItem>
                
              </TextField>
               
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
                <label>Phone Number</label>
                <TextField
                    defaultValue={formData?.phoneNumber}
                    variant="outlined"
                    fullWidth
                    {...register('phoneNumber')}
                    type="text"
                    
                /> 
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
                <label>NHIA</label>
                <TextField
                    defaultValue={formData?.nhia}
                    variant="outlined"
                    fullWidth
                    {...register('nhia')}
                    type="text"
                    
                /> 
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
                <label>Address</label>
                <TextField
                    defaultValue={formData?.address}
                    variant="outlined"
                    fullWidth
                    multiline
                    {...register('address')}
                    type="text"
                    
                /> 
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