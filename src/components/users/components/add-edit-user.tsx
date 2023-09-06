
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
import { errorMessages, userTypesArray } from "../../../constants";
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
    organisations?:any
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
    .min(8), 
    phoneNumber: yup.string(),
    userType: yup.string(),
    sex: yup.number(),
    // organisationName: yup.string(),
    // supervisorUserId: yup.string(),
    // stateId: yup.number(),
    // lgaId: yup.number(),
    // wardId: yup.number()
    

  });


export  const AddEditUser:FC<IAddEditUser> = ({edit,formData,modal,toggle,fetchAllUsers,organisations}) =>{
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
      const [ambulanceServices, setAmbulanceServices] = useState([]);
      const [etcServices, setETCServices] = useState([]);
      const [users,setUsers] = useState<any>([])
      const [orgVal,setOrgVal] = useState("")
      const [supervisorUserId,setSupervisorUserId] = useState("")
      const [wards,setWards] = useState<any>([])
      const [states,setStates] = useState<any>([])
      const [lgas,setLgas] = useState<any>([])
      const [defaultOrg,setDefaultOrg] = useState(null)
      const {
        userState: { userProfile },
      } = useAuthUserContext();
      const watchUserType = watch("realUserType")
      const watchState = watch("stateId")
      const watchLga = watch("lgaId")

      useEffect(()=>{
        try {
           Promise.all([
            axiosInstance.get(`Ambulances/get`),
            axiosInstance.get(`EmergencyCenters/get`),
          ]).then(([ambRes, etcRes]) =>{
            const dataAmb = ambRes?.data?.data?.map((dt) =>{
              return {
                label: dt?.name,
                value: dt?.id
              }
            })
            const dataEtc = etcRes?.data?.data?.map((dt) =>{
              return {
                label: dt?.name,
                value: dt?.id
              }
            })
            setAmbulanceServices(dataAmb)
            setETCServices(dataEtc)
            
          }).catch(error =>{
            console.log(error)
          })
          
        } catch (error) {
          console.log(error);
         
        } 
      },[])

   
     useEffect(()=>{
      if(watchLga){
        axiosInstance.post('Wards/getByLga',{id:watchLga}).then(res =>{
          const obj = res?.data?.data?.map((dt: { name: any; id:number}) =>{
            return {
                label: dt?.name,
                value: dt?.id
            }
        })
        setWards(obj)
        }).catch(error =>{
          console.log(error)
        })
      }
     
  },[watchLga])

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
    if(watchState){
      axiosInstance.post('Lgas/getByStateId',{id:watchState}).then(res =>{
      
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
    }
  
  },[watchState])
     useEffect(()=>{
     if(orgVal?.length > 0){
      let val ={
        value: orgVal
      }
      axiosInstance.post('Account/getUsersByOrganisationName',val).then(res =>{
        console.log(res?.data)
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

      useEffect(()=>{
          if(formData){
              let newVal = {
                label: formData?.organisationName,
                value: formData?.organisationName
              }
              setDefaultOrg(newVal)
          } 
      },[formData])
    

    const handleToggle =() => toggle()

    const onSubmit = async(data:any) =>{
        let newData = {
            ...data,
            organisationName: orgVal,
            supervisorUserId:supervisorUserId,
            wardId: data?.wardId ? data?.wardId : null
          };
          // console.log(newData);
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
            // const errorMessage = errorMessages[error?.response?.status]
            enqueueSnackbar(error?.response?.data?.data, {
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
      setOrgVal(value?.label)
      setValue('organisationName', value?.value || '');
      if(watchUserType === "ETC"){
        setValue("etcId",value?.value)
      }
      else{
        setValue("ambulanceId",value?.value)
      }
    };
    // const handleUserChange = (event, value) => {
    //   setSupervisorUserId(value?.value)
    //   setValue('supervisorUserId', value?.value || '');
    // };


  
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
                defaultValue={formData?.sex}
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
           {!edit && <>
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
           </>}
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
            <label>Select User Role</label>
              <TextField
                 variant="outlined"
                fullWidth
                select
                 type="text"
                {...register("userType")}
                defaultValue={formData?.userType}
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
            <label>Select User Type</label>
              <TextField
                 variant="outlined"
                fullWidth
                select
                 type="text"
                {...register("realUserType")}
                defaultValue={formData?.ambulanceId ? "Ambulance" :"ETC" }
              
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"ETC"}>
                 ETC
                </MenuItem>
                <MenuItem value={"Ambulance"}>
                Ambulance
                </MenuItem>
               
              </TextField>
               
            </Grid>
            <Grid item xs={12} sm={4} lg={4}>
            <label>Select Organization</label>
          {watchUserType === "ETC"  ? <Autocomplete
              options={etcServices}
              getOptionLabel={(option) => option.label}
              onChange={handleAutocompleteChange}
              defaultValue={defaultOrg}
              helperText={errors?.organisationName?.message?.toString()}
              FormHelperTextProps={{
              className:"helperTextColor"
          }}
               renderInput={(params) => <TextField {...params} />}
            /> : 
            <Autocomplete
              options={ambulanceServices}
              getOptionLabel={(option) => option.label}
              onChange={handleAutocompleteChange}
              defaultValue={defaultOrg}

              helperText={errors?.organisationName?.message?.toString()}
              FormHelperTextProps={{
              className:"helperTextColor"
          }}
               renderInput={(params) => <TextField {...params} />}
            /> 
            }
            
            </Grid>
            <Grid item xs={12} sm={4} lg={4}>
            <label>Select Supervisor</label>
            <TextField
                 variant="outlined"
                fullWidth
                select
                 type="text"
                {...register("supervisorUserId")}
                defaultValue={formData?.supervisorUserId}
               
               
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {users?.map((user) => (
                  <MenuItem value={user?.value}>{user?.label}</MenuItem>
                ))}
              </TextField>
            {/* <Autocomplete
              options={users}
              getOptionLabel={(option) => option.label}
              onChange={handleUserChange}
               renderInput={(params) => <TextField {...params} />}
            /> */}
            
            </Grid>
           
            <Grid item xs={12} sm={4} lg={4}>
              
              <label>Select State</label>
              <TextField
                  variant="outlined"
                  fullWidth
                  select
                  defaultValue={formData?.state_Id}

                  type="text"
                  {...register('stateId',{valueAsNumber:true})}
                
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
      
              <Grid item xs={12} sm={4} lg={4}>
                
              <label>Select LGA</label>
              <TextField
                  variant="outlined"
                  fullWidth
                  select
                  defaultValue={formData?.lga_Id}
                  type="text"
                  {...register('lgaId',{valueAsNumber:true})}
                
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
      
            <Grid item xs={12} sm={4} lg={4}>
              
            <label>Select Ward</label>
            <TextField
                variant="outlined"
                fullWidth
                select
                type="text"
                defaultValue={formData?.ward_Id || null}
                multiline
                {...register('wardId')}
                // helperText={errors?.wardId?.message?.toString()}
                FormHelperTextProps={{
                className:"helperTextColor"
                }}
            >
                <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {wards?.map((ward:any,index:number) =>(
                   <MenuItem key={index} value={ward?.value}>
                 {ward?.label}
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