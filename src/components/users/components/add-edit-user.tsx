
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
import { userTypesArray } from "../../../constants";
import { useAuthUserContext } from "../../../context/authUser.context";

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
    userName: yup.string().required("*Username  is required"),
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
    organisationName: yup.string(),
    supervisorUserId: yup.string(),
    

  });


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
      const [organisations,setOrganisations] = useState<any>([])
      const [users,setUsers] = useState<any>([])
      const [orgVal,setOrgVal] = useState("")
      const {
        userState: { userProfile },
      } = useAuthUserContext();

     useEffect(()=>{
        axiosInstance.get('Account/listOrganisations').then(res =>{
          let obj = res?.data?.data?.map((dt) =>{
            return {
              label: dt?.name,
              value: dt?.name
            }
          })
          setOrganisations(obj)
        }).catch(error =>{
          console.log(error);
        })
     },[])

     useEffect(()=>{
     if(orgVal?.length > 0){
      let val ={
        value: orgVal
      }
      axiosInstance.post('Account/getUsersByOrganisationName',val).then(res =>{
        let obj = res?.data?.data?.map((dt)=>{
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
     },[orgVal?.length])

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
            ambulanceId: userProfile?.ambulanceId,
            etcId: userProfile?.etcId,
          };
          // delete newData?.id
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
            console.log(error)
            enqueueSnackbar(error?.message, {
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
      setOrgVal(value?.value)
      setValue('organisationName', value?.value || '');
    };
    const handleUserChange = (event, value) => {
      setValue('supervisorUserId', value?.value || '');
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
                <label>Username</label>
                <TextField
                    defaultValue={formData?.userName}
                    variant="outlined"
                    fullWidth
                    {...register('userName')}
                    helperText={errors?.userName?.message?.toString()}
                    FormHelperTextProps={{
                    className:"helperTextColor"
                }}
                    type="text"
                />
               
            </Grid>
            <Grid item xs={12} sm={4} lg={4}>
                <label>First Name</label>
                <TextField
                    defaultValue={formData?.firstName}
                    variant="outlined"
                    fullWidth
                    {...register('firstName')}
                    helperText={errors?.firstName?.message?.toString()}
                    FormHelperTextProps={{
                    className:"helperTextColor"
                }}
                    type="text"
                />
               
            </Grid>
            <Grid item xs={12} sm={4} lg={4}>
                <label>Middle Name</label>
                <TextField
                    defaultValue={formData?.middleName}
                    variant="outlined"
                    fullWidth
                    {...register('middleName')}
                    helperText={errors?.middleName?.message?.toString()}
                    FormHelperTextProps={{
                    className:"helperTextColor"
                }}
                    type="text"
                />
               
            </Grid>
            <Grid item xs={12} sm={4} lg={4}>
                <label>Last Name</label>
                <TextField
                    defaultValue={formData?.lastName}
                    variant="outlined"
                    fullWidth
                    {...register('lastName')}
                    helperText={errors?.lastName?.message?.toString()}
                    FormHelperTextProps={{
                    className:"helperTextColor"
                }}
                    type="text"
                />
               
            </Grid>
            <Grid item xs={12} sm={4} lg={4}>
                <label>Email</label>
                <TextField
                    defaultValue={formData?.email}
                    variant="outlined"
                    fullWidth
                    {...register('email')}
                    helperText={errors?.email?.message?.toString()}
                    FormHelperTextProps={{
                    className:"helperTextColor"
                }}
                    type="email"
                />
                
            </Grid>
            <Grid item xs={12} sm={4} lg={4}>
            <label>Select Gender</label>
              <TextField
                 variant="outlined"
                fullWidth
                select
                 type="text"
                {...register("sex")}
                helperText={errors?.sex?.message?.toString()}
                FormHelperTextProps={{
                className:"helperTextColor"
            }}
               
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
            <Grid item xs={12} sm={4} lg={4}>
                <label>Password</label>
                <TextField
                    defaultValue={formData?.password}
                    variant="outlined"
                    fullWidth
                    {...register('password')}
                    helperText={errors?.password?.message?.toString()}
                    FormHelperTextProps={{
                    className:"helperTextColor"
                }}
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
                    helperText={errors?.confirmPassword?.message?.toString()}
                    FormHelperTextProps={{
                    className:"helperTextColor"
                }}
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
                    helperText={errors?.phoneNumber?.message?.toString()}
                    FormHelperTextProps={{
                    className:"helperTextColor"
                }}
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
                helperText={errors?.userType?.message?.toString()}
                FormHelperTextProps={{
                className:"helperTextColor"
            }}
               
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {userTypesArray?.map((user) => (
                  <MenuItem value={user}>{user}</MenuItem>
                ))}
              </TextField>
                <p style={{ color: "red", fontSize: 12 }}>
                  {errors?.userType?.message?.toString()}
                </p>
            </Grid>
    
            <Grid item xs={12} sm={4} lg={4}>
            <label>Select Organization</label>
            <Autocomplete
              options={organisations}
              getOptionLabel={(option) => option.label}
              onChange={handleAutocompleteChange}
              helperText={errors?.organisationName?.message?.toString()}
              FormHelperTextProps={{
              className:"helperTextColor"
          }}
               renderInput={(params) => <TextField {...params} />}
            />
            
            </Grid>
            <Grid item xs={12} sm={4} lg={4}>
            <label>Select Supervisor</label>
            <Autocomplete
              options={users}
              getOptionLabel={(option) => option.label}
              onChange={handleUserChange}
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