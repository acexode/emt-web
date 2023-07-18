
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
// import { levels } from "../../../constants";

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
    email: yup.string().email().required("Email Address is required"),
    // password: yup.string().required("*Password is required").min(8),
    role: yup.string().required("*Role is required"),
    access: yup.string().required("*Access is required"),
    type: yup.string().required("*Type is required"),
  });
  const access =[
    {
    access:"Admin",
    id:"Admin"
  },
    {
    access:"RO",
    id:"RO"
  },
    {
    access:"RW",
    id:"RW"
  },
]
  const level =[
    {
    type:"National",
    id:"National"
  },
    {
    type:"State",
    id:"State"
  },
    {
    type:"Lga",
    id:"Lga"
  },
    {
    type:"Ward",
    id:"Ward"
  },
]
const roles = [
    { id: "facility_web", name: 'Facility Web' },
    { id: "lga_web", name: 'LGA Web' },
    { id: "state_web", name: 'State Web' },
    { id: "national_web", name: 'National Web' },
    { id: "facility_app", name: 'Facility App' },
    { id: "lga_app", name: 'LGA App' },
    { id: "state_app", name: 'State App' },
    { id: "super_admin", name: 'Super Admin' },
    { id: "hrh_admin", name: 'HRH Admin' }
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
        // axiosInstance.get(`/locations/states`).then(res =>{
        //   const options = res?.data?.map((dt:any) =>{
        //     return {
        //       label: dt?.name,
        //       id: dt?.id
        //     }
        //   })
        //   if(watchLevel === levels.state || watchLevel === levels.national){
        //     setLocations(options)
        //   }else{
        //     setStates(options)
        //   }
        // }).catch(error =>{
        //   console.log(error)
        // })
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
                `/users/${formData?.id}/update`,
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
    const handleAutocompleteChange = (event, value) => {
      setValue('locationId', value?.id || ''); // Set the value of 'locationId' field
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
            <Grid item xs={12} sm={6} lg={6}>
                <label>Password</label>
                <TextField
                    defaultValue={formData?.password}
                    variant="outlined"
                    fullWidth
                    {...register('password')}
                    type="text"
                />
                
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
            <label>Select Role</label>
              <TextField
                 variant="outlined"
                fullWidth
                 required
                select
                 type="number"
                {...register("role")}
               
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {roles?.map((role) => (
                  <MenuItem value={role.id}>{role?.name}</MenuItem>
                ))}
              </TextField>
                <p style={{ color: "red", fontSize: 12 }}>
                  {errors?.role?.message?.toString()}
                </p>
            </Grid>
            
            <Grid item xs={12} sm={6} lg={6}>
            <label>Select Type</label>
              <TextField
                 variant="outlined"
                fullWidth
                select
                 type="number"
                {...register("type")}
               
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {level?.map((level) => (
                  <MenuItem value={level.id}>{level.type}</MenuItem>
                ))}
              </TextField>
                <p style={{ color: "red", fontSize: 12 }}>
                  {errors?.type?.message?.toString()}
                </p>
            </Grid>
    
            <Grid item xs={12} sm={6} lg={6}>
            <label>Select State</label>
            <Autocomplete
              options={locations}
              getOptionLabel={(option) => option.label}
              onChange={handleAutocompleteChange}
               renderInput={(params) => <TextField {...params} />}
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