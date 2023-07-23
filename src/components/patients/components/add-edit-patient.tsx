
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
    age: yup.string().required("Age is required"),
    type: yup.string().required("*Type is required"),
    status:yup.string().required("*Status ")
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


 

      useEffect(()=>{
          if(edit){
            reset(formData)
          }else{
            reset()
          }
      },[edit])

    const handleToggle =() => toggle()

    const onSubmit = async(data:any) =>{
        let newData = {
            ...data,
          };
          delete newData?.id
          setLoading(true)
          let text = edit ? "Record Updated" : "Record Added";
          try {
            let res;
            if (edit) {
              res = await axiosInstance.put(
                `/patients/${formData?.id}/update`,
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
                />
                <p style={{ color: "red", fontSize: 12 }}>
                  {errors?.firstName?.message?.toString()}
                </p>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
                <label>Last Name</label>
                <TextField
                    defaultValue={formData?.lastName}
                    variant="outlined"
                    fullWidth
                    {...register('lastName')}
                    type="text"
                />
                <p style={{ color: "red", fontSize: 12 }}>
                  {errors?.lastName?.message?.toString()}
                </p>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
                <label>Age</label>
                <TextField
                    defaultValue={formData?.age}
                    variant="outlined"
                    fullWidth
                    {...register('age')}
                    type="text"
                />
                <p style={{ color: "red", fontSize: 12 }}>
                  {errors?.age?.message?.toString()}
                </p>
            </Grid>
             
    
            
            <Grid item xs={12} sm={6} lg={6}>
            <label>Select Type</label>
              <TextField
                 variant="outlined"
                fullWidth
                select
                 type="text"
                {...register("type")}
               
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {incidentTypes?.map((level) => (
                  <MenuItem value={level}>{level}</MenuItem>
                ))}
              </TextField>
                <p style={{ color: "red", fontSize: 12 }}>
                  {errors?.type?.message?.toString()}
                </p>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
            <label>Select Status</label>
              <TextField
                 variant="outlined"
                fullWidth
                select
                 type="text"
                {...register("status")}
               
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {status?.map((level) => (
                  <MenuItem value={level}>{level}</MenuItem>
                ))}
              </TextField>
                <p style={{ color: "red", fontSize: 12 }}>
                  {errors?.status?.message?.toString()}
                </p>
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