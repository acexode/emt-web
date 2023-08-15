
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

const states = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Federal Capital Territory",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara"
];
  interface IAddEditUser {
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
    middleName: yup.string().required("*Middle Name  is required"),
    email: yup.string().email().required("Email Address is required"),
    password: yup.string().min(8),
    confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .min(8)
    .required("Confirm Password is required"), 
    phoneNumber: yup.string(),
    userType: yup.string(),
    sex: yup.number(),
    street1: yup.string(),
    street2: yup.string(),
    city: yup.string(),
    state: yup.string(),
    superviserName: yup.string(),
    

  });

  const level =[
    {
    type:"SuperAdministrator",
    id:"SuperAdministrator"
  },
    {
    type:"ExportAndDeleteNemsasAdmin",
    id:"ExportAndDeleteNemsasAdmin"
  },
    {
    type:"ExportEmergencyTreatmentUser",
    id:"ExportEmergencyTreatmentUser"
  },
   
]

export  const AddEditUser:FC<IAddEditUser> = ({edit,formData,modal,toggle,fetchAllUsers}) =>{
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
      const [locationsLoading,setLocationsLoading] = useState(false)
      const { enqueueSnackbar, closeSnackbar } = useSnackbar();
      const [locations,setLocations] = useState([])
      // const [states,setStates] = useState([])
      const [lgas,setLgas] = useState([])
      const [stateId,setStateId] = useState("")
      const [lgaId,setLgaId] = useState("")

      useEffect(()=>{
        const options = states?.map((dt:any,index:number) =>{
          return {
            label: dt,
            id: index
          }
        })
        setLocations(options)
    },[])

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
          let text = edit ? "User Updated" : "User Added";
          try {
            let res;
            if (edit) {
              res = await axiosInstance.put(
                `Account/updateUser`,
                newData
              );
            } else {
              res = await axiosInstance.post(`Account/register`, newData);
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
    const handleAutocompleteChange = (event, value) => {
      setValue('state', value?.id || ''); // Set the value of 'locationId' field
    };
  
    return (
        <Dialog
        open={modal}
        onClose={handleToggle}
        maxWidth="md"
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{edit ? "Edit User": "Add User"}</DialogTitle>
           <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} lg={4}>
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
            <Grid item xs={12} sm={4} lg={4}>
                <label>Middle Name</label>
                <TextField
                    defaultValue={formData?.middleName}
                    variant="outlined"
                    fullWidth
                    {...register('middleName')}
                    type="text"
                />
                <p style={{ color: "red", fontSize: 12 }}>
                  {errors?.middleName?.message?.toString()}
                </p>
            </Grid>
            <Grid item xs={12} sm={4} lg={4}>
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
            <Grid item xs={12} sm={4} lg={4}>
                <label>Email</label>
                <TextField
                    defaultValue={formData?.email}
                    variant="outlined"
                    fullWidth
                    {...register('email')}
                    type="email"
                />
                <p style={{ color: "red", fontSize: 12 }}>
                  {errors?.email?.message?.toString()}
                </p>
            </Grid>
            <Grid item xs={12} sm={4} lg={4}>
            <label>Select Gender</label>
              <TextField
                 variant="outlined"
                fullWidth
                select
                 type="text"
                {...register("sex")}
               
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={0}>
                 Male
                </MenuItem>
                <MenuItem value={1}>
                 Female
                </MenuItem>
               
              </TextField>
               
            </Grid>
            <Grid item xs={12} sm={4} lg={4}>
                <label>Password</label>
                <TextField
                    defaultValue={formData?.password}
                    variant="outlined"
                    fullWidth
                    {...register('password')}
                    type="text"
                />
                
            </Grid>
            <Grid item xs={12} sm={4} lg={4}>
                <label>Confirm Password</label>
                <TextField
                    defaultValue={formData?.confirmPassword}
                    variant="outlined"
                    fullWidth
                    {...register('confirmPassword')}
                    type="text"
                />
                
            </Grid>
            <Grid item xs={12} sm={4} lg={4}>
                <label>Phone Number</label>
                <TextField
                    defaultValue={formData?.phoneNumber}
                    variant="outlined"
                    fullWidth
                    {...register('phoneNumber')}
                    type="text"
                />
                
            </Grid>
           
            
            <Grid item xs={12} sm={4} lg={4}>
            <label>Select Type</label>
              <TextField
                 variant="outlined"
                fullWidth
                select
                 type="text"
                {...register("userType")}
               
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {level?.map((level) => (
                  <MenuItem value={level.id}>{level.type}</MenuItem>
                ))}
              </TextField>
                <p style={{ color: "red", fontSize: 12 }}>
                  {errors?.userType?.message?.toString()}
                </p>
            </Grid>
    
            <Grid item xs={12} sm={4} lg={4}>
            <label>Select State</label>
            <Autocomplete
              options={locations}
              getOptionLabel={(option) => option.label}
              onChange={handleAutocompleteChange}
               renderInput={(params) => <TextField {...params} />}
            />
            
            </Grid>
            <Grid item xs={12} sm={4} lg={4}>
                <label>City</label>
                <TextField
                    defaultValue={formData?.city}
                    variant="outlined"
                    fullWidth
                    {...register('city')}
                    type="text"
                />
                
            </Grid>
            <Grid item xs={12} sm={4} lg={4}>
                <label>Street 1</label>
                <TextField
                    defaultValue={formData?.street1}
                    variant="outlined"
                    fullWidth
                    {...register('street1')}
                    type="text"
                />
                
            </Grid>
            <Grid item xs={12} sm={4} lg={4}>
                <label>Street 2</label>
                <TextField
                    defaultValue={formData?.street2}
                    variant="outlined"
                    fullWidth
                    {...register('street2')}
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