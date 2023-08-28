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
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableContainer,
    TableHead,
    IconButton
  } from "@mui/material";
  import React, { FC, useEffect, useState } from "react";
  import {useForm, useFieldArray, Controller} from "react-hook-form"
  import { useSnackbar } from "notistack";
import {RemoveCircleOutline} from "@mui/icons-material"
  import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import closeFill from "@iconify/icons-eva/close-fill";
import { LoadingButton } from "@mui/lab";
import axiosInstance from "../../services/api_service";
import Scrollbar from "../Scrollbar";
import { useAuthUserContext } from "../../context/authUser.context";
import { errorMessages } from "../../constants";
import { MIconButton } from "../@material-extend";
import { Icon } from "@iconify/react";



  interface IAddEditClaims {
    edit?: boolean,
    modal:boolean,
    toggle: any;
    formData?:any
    fetchAllData?:any
  }
const headLabel = [
 "S/N", "Medical Intervention",  "Unit Cost", "Dose","Quantity","Amount",""
]
  const schema = yup.object().shape({
    patientId: yup.string(),
  });
 


export  const AddEditClaims:FC<IAddEditClaims> = ({edit,formData,modal,toggle,fetchAllData}) =>{
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
        control,
        watch,
        getValues
      } = useForm({
        mode: "onTouched",
        criteriaMode: "firstError",
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false,
        delayError: undefined,
        resolver: yupResolver(schema),
        defaultValues: {
          incidentDrugs: [{ medicalIntervention: '', dose: '', price: '', quantity: '',unitCost:'' }],
        },
      });
      const [loading,setLoading] = useState(false)
      const { enqueueSnackbar, closeSnackbar } = useSnackbar();
      const [options,setOptions] = useState<any>([])
      const [patients,setPatients] = useState<any>([])
      const [patientData,setPatientData] = useState<any>()
      const {
        userState: { userProfile },
      } = useAuthUserContext();
   
      const watchQuantity = watch()
      const { fields, append, remove } = useFieldArray({
        control,
        name: 'incidentDrugs',
      });
      useEffect(()=>{
        axiosInstance.get("ServicesAndFees/get").then(res =>{
          const obj = res?.data?.data?.map((dt: { code: any; description: any; price: any; id: any; })=>{
            return {
                code :dt?.code,
                intervention:dt?.description,
                price: dt?.price,
                id:dt?.id
              }
          })
          setOptions(obj)
        }).catch(error =>{
          console.log(error);
        })
    },[])
      useEffect(()=>{
        let val = {
          id: userProfile?.etcId
        }
        axiosInstance.post('Patients/getByAssignedETC',val).then(res =>{
          const obj = res?.data?.data?.map((dt) =>{
            return {
              incident_id: dt?.incident_Id,
              patientId: dt?.id,
              emergencyTreatmentCenterId:  dt?.etC_Id,
              label: `${dt?.firstName} ${dt?.middleName} ${dt?.lastName}`
            }
          })
          setPatients(obj)
        }).catch(error =>{
          console.log(error);
        })
    },[])

    // useEffect(()=>{
    //   axiosInstance
    //   .get(`Incidents/get`)
    //   .then((res) => {
    //     console.log(res?.data?.data);
    //     const obj = res?.data?.data?.map((dt) =>{
    //       return {
    //         incident_id: dt?.id,
    //           patientId: dt?.patientViewModel?.id,
    //           emergencyTreatmentCenterId:  dt?.emergencyTreatmentCenterViewModel?.id,
    //           label: `${dt?.patientViewModel?.firstName} ${dt?.patientViewModel?.middleName} ${dt?.patientViewModel?.lastName}`
    //       }
    //     })
    //     setPatients(obj)
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    // },[])





      const calculateAmount = (unitCost:number, quantity:number) => {
        if (unitCost && quantity) {
          return (parseInt(unitCost) * parseInt(quantity)).toFixed(2);
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
          // console.log({newData})
          delete newData?.totalAmount
          setLoading(true)
          let text = edit ? "Claim Updated" : "Claim Added";
          try {
            let res;
            if (edit) {
              res = await axiosInstance.put(
                `Claims/update`,
                newData
              );
            } else {
              res = await axiosInstance.post(`Claims/add`, newData);
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
            fetchAllData()
          } catch (error) {
              const errorMessage =errorMessages[error?.response?.status]
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
  
    const handleAutocompleteChange = (index:number, intervention:any) => {
      //  // Update the corresponding fields in the form data
     setValue(`incidentDrugs[${index}].medicalIntervention`, intervention?.intervention || '');
     setValue(`incidentDrugs[${index}].serviceFeeId`, intervention?.id || '');
    //  setValue(`incidentDrugs[${index}].dose`, intervention?.code || '');
     setValue(`incidentDrugs[${index}].unitCost`, intervention?.price || '');
     setValue(`incidentDrugs[${index}].patientId`, patientData?.patientId || '');
     setValue(`incidentDrugs[${index}].emergencyTreatmentCenterId`, patientData?.emergencyTreatmentCenterId || '');
     setValue(`incidentDrugs[${index}].incidentId`, patientData?.incidentId || '');
    
     };

     const handleSetPrice=(val:any,index:number) =>{
       let boom = getValues(`incidentDrugs[${index}].unitCost`)
       let price = calculateAmount(boom,val)
        setValue(`incidentDrugs[${index}].price`, parseInt(price)|| '');
     }
     const handlePatientName = (e:any,val:any) =>{
      let obj = {
        patientId : val?.patientId,
     incidentId: val?.incident_id,
     emergencyTreatmentCenterId: val?.emergencyTreatmentCenterId,
      }
      setPatientData(obj)

     }
  
    return (
        <Dialog
        open={modal}
        onClose={handleToggle}
        maxWidth="lg"
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{edit ? "Edit Claim": "Add Claim"}</DialogTitle>
           <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={6}>
            <label>Select Patient</label>
               <Autocomplete
                  options={patients}
                  fullWidth
                  getOptionLabel={(option) => option.label}
                  onChange={handlePatientName}
                  renderInput={(params) => <TextField {...params}  />}
                />
                <p style={{ color: "red", fontSize: 12 }}>
                  {errors?.patientId?.message?.toString()}
                </p>
            </Grid>
       
            </Grid>
            <Scrollbar>
              <TableContainer>
                  <Table>
                  <TableHead>
                    <TableRow>
                  
                      {headLabel.map((headCell:string,index:number) => (
                        <TableCell
                          key={index}
                          width={400}
                        >
                      {headCell}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                    <TableBody>
                    {fields.map((field, index) => (
                       
                 <TableRow>

                
                        <TableCell
                           align="left"
                          >
                            <Box>{index+1}</Box>
                          </TableCell>
                     
               
                      <TableCell
                            style={{ width: '200rem' }}
                            >
                                 <Autocomplete
                          options={options}
                          fullWidth
                          getOptionLabel={(option) => option.intervention}
                          // onChange={(e) => handleAutocompleteChange(index,e.target.textContent)}
                          onChange={(_event, selectedOption) => handleAutocompleteChange(index, selectedOption)}

                          renderInput={(params) => <TextField {...params}  />}
                        />
                            </TableCell>
                           
                            <TableCell
                            align="right"
                            style={{ width: '60rem' }}
                            >
                               <TextField
                        type="number"
                        inputProps={{ step: '0.01' }}
                        disabled
                        {...register(`incidentDrugs[${index}].unitCost`, { required: 'Unit Cost is required', pattern: /^\d+(\.\d{1,2})?$/ })}
                        error={!!errors.incidentDrugs?.[index]?.unitCost}
                        helperText={errors.incidentDrugs?.[index]?.unitCost?.message}
                      />
                              </TableCell>
                              <TableCell
                            align="right"
                            style={{ width: '60rem' }}
                            >
                               <TextField
                        {...register(`incidentDrugs[${index}].dose`, { required: 'Dose is required' })}
                        error={!!errors.incidentDrugs?.[index]?.dose}
                        helperText={errors.incidentDrugs?.[index]?.dose?.message}
                      />
                              </TableCell>
                            <TableCell
                            align="right"
                            style={{ width: '60rem' }}

                            >
                               <TextField
                        type="number"
                        {...register(`incidentDrugs[${index}].quantity`, { required: 'Quantity is required', pattern: /^\d+$/ })}
                        error={!!errors.incidentDrugs?.[index]?.quantity}
                        helperText={errors.incidentDrugs?.[index]?.quantity?.message}
                        onChange={(e) => handleSetPrice(e.target.value,index)}
                      />
                              </TableCell>
                            <TableCell
                            align="right"
                            style={{ width: '80rem' }}
                            >
                               <TextField
                                disabled
                                {...register(`incidentDrugs[${index}].price`)}
                        
                                  />
                              </TableCell>
                            <TableCell
                            align="left"
                            >
                              <IconButton size="small" onClick={() => remove(index)}>
                        <RemoveCircleOutline />
                      </IconButton>
                              </TableCell>
                      </TableRow>
                   
                  ))}
                      
                    </TableBody>
                  </Table>
              </TableContainer>
            </Scrollbar>

      <Button type="button" onClick={() => append({ medicalIntervention: '', dose: '', unitCost: '', quantity: '',price:'' })}>
        Add More
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