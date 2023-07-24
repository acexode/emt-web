
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
    Autocomplete,
    Box,
    
  } from "@mui/material";
  import React, { FC, useEffect, useState } from "react";
  import {useForm, useFieldArray, Controller} from "react-hook-form"
  import { useSnackbar } from "notistack";
import {RemoveCircleOutline} from "@mui/icons-material"
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
    patientName: yup.string().required("*Patient Name is required"),
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
        setValue,
        control,
        watch
      } = useForm({
        mode: "onTouched",
        criteriaMode: "firstError",
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false,
        delayError: undefined,
        resolver: yupResolver(schema),
        defaultValues: {
          items: [{ medicalIntervention: '', serviceCode: '', unitCost: '', quantity: '' }],
        },
      });
      const [loading,setLoading] = useState(false)
      const { enqueueSnackbar, closeSnackbar } = useSnackbar();
      const [locations,setLocations] = useState([])
   
      const { fields, append, remove } = useFieldArray({
        control,
        name: 'items',
      });
      const calculateAmount = (unitCost, quantity) => {
        if (unitCost && quantity) {
          return (unitCost * quantity).toFixed(2);
        }
        return '';
      };
      useEffect(() => {
        const updateTotalAmount = () => {
          let totalAmount = fields?.reduce((sum, field) => sum + calculateAmount(field.unitCost, field.quantity), 0);
          setValue('totalAmount', parseFloat(totalAmount)?.toFixed(2));
        };
        updateTotalAmount();
      }, [fields, setValue]);
   

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
        <Grid item xs={12} sm={6} lg={6}>
            <label>Incident Code</label>
              <TextField
                 variant="outlined"
                fullWidth
                 required
                 type="text"
                {...register("incidentCode")}
               
              />
                
              
                <p style={{ color: "red", fontSize: 12 }}>
                  {errors?.incidentCode?.message?.toString()}
                </p>
            </Grid>
          {fields.map((field, index) => (
            <Grid key={field.id} mb={2} container spacing={2}>
           <Grid item sm={12}>
           <Box>{index+1}).</Box>
           </Grid>
           <Grid item xs={6} sm={3} lg={3}>
           <label>Medical Intervention</label>
            <TextField
              {...register(`items[${index}].medicalIntervention`, { required: 'Medical Intervention is required' })}
              error={!!errors.items?.[index]?.medicalIntervention}
              helperText={errors.items?.[index]?.medicalIntervention?.message}
            />
          </Grid>
          <Grid item xs={6} sm={3} lg={3}>
          <label>Service Code</label>
          <TextField
            {...register(`items[${index}].serviceCode`, { required: 'Service Code is required' })}
            error={!!errors.items?.[index]?.serviceCode}
            helperText={errors.items?.[index]?.serviceCode?.message}
          />
          </Grid>
          <Grid item xs={6} sm={3} lg={3}>
          <label>Unit Cost</label>
          <TextField
            type="number"
            inputProps={{ step: '0.01' }}
            {...register(`items[${index}].unitCost`, { required: 'Unit Cost is required', pattern: /^\d+(\.\d{1,2})?$/ })}
            error={!!errors.items?.[index]?.unitCost}
            helperText={errors.items?.[index]?.unitCost?.message}
          />
          </Grid>
          <Grid item xs={6} sm={3} lg={3}>
          <label>Quantity</label>
          <TextField
            type="number"
            {...register(`items[${index}].quantity`, { required: 'Quantity is required', pattern: /^\d+$/ })}
            error={!!errors.items?.[index]?.quantity}
            helperText={errors.items?.[index]?.quantity?.message}
          />
          </Grid>
          <Grid item xs={6} sm={3} lg={3}>
          <label>Amount</label>
          <TextField
            value={calculateAmount(field.unitCost, field.quantity)}
            disabled
          />
          </Grid>
          <Button size="small" sx={{background:"grey", height:"40px", mt:6,ml:2, '&:hover': {
          // Define the hover styles here
          backgroundColor: 'lightgray',
        
        },}} type="button" onClick={() => remove(index)}>
            <RemoveCircleOutline />
          </Button>
          </Grid>
      ))}

      <Button type="button" onClick={() => append({ medicalIntervention: '', serviceCode: '', unitCost: '', quantity: '' })}>
        Add Item
      </Button>
      <Grid item xs={12} sm={12} mt={4} lg={12}>
        <TextField
          value={parseFloat(watch('totalAmount', 0)).toFixed(2)}
          disabled
          label="Total Amount"
        />

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