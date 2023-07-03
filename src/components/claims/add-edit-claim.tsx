
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
import { MIconButton } from "../../@material-extend";
import closeFill from "@iconify/icons-eva/close-fill";
import { Icon } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axiosInstance from "../../services/api_service";


  interface IAddEditClaims {
    edit?: boolean,
    modal:boolean,
    toggle: any;
    formData?:any
    fetchAllData?:any
  }

  const schema = yup.object().shape({
    category: yup.string().required("*Category is required"),
    location: yup.string().required("*Location is required"),
    ambulance_type: yup.string().required("*Ambulance Type is required"),
    date: yup.string().required("*Date is required"),
    status: yup.string().required("*Status is required"),
  });
  const status =[
    {
    name:"Dispatched",
    id:0
  },
    {
    name:"Resolved",
    id:1
  },
    {
    name:"No Dispatch Needed",
    id:2
  },
    {
    name:"No Action",
    id:3
  },
]
  const ambulanceTypes =[
    {
    type:"Keke",
    id:0
  },
    {
    type:"BLS",
    id:1
  },
    {
    type:"ALS",
    id:2
  },
    {
    type:"Motor Bike",
    id:3
  },
]
const category = [
    { id: 0, name: 'Paedetric' },
    { id: 1, name: 'Neonatal' },
    { id: 2, name: 'General Surgery' },
   
  ]

export  const AddEditClaims:FC<IAddEditClaims> = ({edit,formData,modal,toggle,fetchAllData}) =>{
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue
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
      const [locations,setLocations] = useState([])
   

    //   useEffect(()=>{
    //       axiosInstance.get('locations').then(res =>{
    //         const options = res?.data?.map((dt) =>{
    //           return {
    //             label: dt?.name,
    //             id: dt?.id
    //           }
    //         })
    //         setLocations(options)
    //       }).catch(error =>{
    //         console.log(error)
    //       })
    //   },[])

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
            ...data
          };
        //   delete newData?.id
        //   setLoading(true)
        //   let text = edit ? "Claim Updated" : "Claim Added";
        //   try {
        //     let res;
        //     if (edit) {
        //       res = await axiosInstance.put(
        //         `/users/${formData?.id}/update`,
        //         newData
        //       );
        //     } else {
        //       res = await axiosInstance.post(`/users/create`, newData);
        //     }
        //     enqueueSnackbar(`${text}`, {
        //         variant: "success",
        //         action: (key) => (
        //           <MIconButton size="small" onClick={() => closeSnackbar(key)}>
        //             <Icon icon={closeFill} />
        //           </MIconButton>
        //         ),
        //       });
        //     reset();
        //     handleToggle();
        //     fetchAllData()
        //   } catch (error: any) {
        //     enqueueSnackbar("Error!", {
        //         variant: "error",
        //         action: (key) => (
        //           <MIconButton size="small" onClick={() => closeSnackbar(key)}>
        //             <Icon icon={closeFill} />
        //           </MIconButton>
        //         ),
        //       });
        //   } finally{
        //     setLoading(false)
        //   }
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
        <DialogTitle id="alert-dialog-title">{edit ? "Edit Claim": "Add Claim"}</DialogTitle>
           <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            
          <Grid item xs={12} sm={6} lg={6}>
            <label>Select Category</label>
              <TextField
                 variant="outlined"
                fullWidth
                 required
                select
                 type="text"
                {...register("category")}
               
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {category?.map((role) => (
                  <MenuItem value={role.id}>{role?.name}</MenuItem>
                ))}
              </TextField>
                <p style={{ color: "red", fontSize: 12 }}>
                  {errors?.category?.message?.toString()}
                </p>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
            <label>Select Location</label>
            <Autocomplete
              options={locations}
              getOptionLabel={(option) => option.label}
              onChange={handleAutocompleteChange}
              renderInput={(params) => <TextField {...params}  label="Select an option" />}
            />
            
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
            <label>Select Ambulance Type</label>
              <TextField
                 variant="outlined"
                fullWidth
                select
                 type="text"
                {...register("ambulance_type")}
               
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {ambulanceTypes?.map((type) => (
                  <MenuItem value={type?.id}>{type?.type}</MenuItem>
                ))}
              </TextField>
                <p style={{ color: "red", fontSize: 12 }}>
                  {errors?.ambulance_type?.message?.toString()}
                </p>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
                <label>Date</label>
                <TextField
                    defaultValue={formData?.date}
                    variant="outlined"
                    fullWidth
                    {...register('date')}
                    type="date"
                />
                <p style={{ color: "red", fontSize: 12 }}>
                  {errors?.date?.message?.toString()}
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
                {status?.map((stat) => (
                  <MenuItem value={stat.id}>{stat.name}</MenuItem>
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