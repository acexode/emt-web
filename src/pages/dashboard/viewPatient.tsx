// @ts-nocheck

import {
    Container,
    Grid,
    ListItem,
    ListItemText,
    Typography,
    Card,
    Box,
    Button,
    TextField,
    MenuItem
  } from "@mui/material";
  import { FC, useEffect, useState } from "react";
  import {useForm, useFieldArray} from "react-hook-form"

  import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
  import Page from "../../components/Page";
  import { PATH_DASHBOARD } from "../../routes/paths";
  import useSettings from "../../hooks/useSettings";
import { RemoveCircleOutline } from "@mui/icons-material";
import { medicalInterventions } from "../../db";
import { useLocation } from "react-router-dom";
import { formatDate2 } from "../../utility";
  
  const ViewPatient: FC = () => {
    const { themeStretch } = useSettings();
    const [content, SetContent] = useState<any>(null);
    const {
      register,
      handleSubmit,
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
      defaultValues: {
        items: [{ dateAndTime:'', medicalIntervention: '', serviceCode: '',quantity: '', dose:'',amount:'', remark:'' }],
      },
    });
    const { fields, append, remove } = useFieldArray({
      control,
      name: 'items',
    });
    const calculateAmount = (unitCost: number, quantity:any) => {
      if (unitCost && quantity) {
        return (unitCost * quantity).toFixed(2);
      }
      return '';
    };
    useEffect(() => {
      const updateTotalAmount = () => {
        let totalAmount = fields?.reduce(
          (sum, field) => sum + parseFloat(field.amount || '0'),
          0
        );
        setValue('totalAmount', totalAmount.toFixed(2));
      };
    
      updateTotalAmount();
    }, [fields, setValue]);
    const [loading,setLoading] = useState(false)
    const {
        state: { row},
      } = useLocation();
      // console.log({row});
        useEffect(()=>{
          // const objectData = {
          //   incidentCode:"A89748",
          //   incidentType: "Road Accident",
          //   ambulance_name:"R & R Ambulance Service",
          //  patientName:"Jane Peter",
          //  age: "34 years",
          //  gender:"Female",
          //  address:"No. 3, Ken Street, Life Camp",
          //  nhia:"A3786236",
          //  arrivalTime: "10:02pm 24th July, 2023",
          //  mainComplaints:"Chest Pain",
          //  primary_survey:"N/A",
          //  physical_exam_findings:"Normal",
          //  triage_category: "Urgent",
          //  time:"9:47pm",
          //  pulse:"88",
          //  blood_pressure:"147/91 ",
          //  resp:"32 b/m ",
          //  glucose:"10.9 mmol/L",
          //  so02:"76%",
          //  mental_status:"Unresponsive",
          //  immediate_treatment_time:"9:48pm ",
          //  medical_intervention:"Cardiopulmonary resuscitation",
          //  dose:"Nil",
          //  iv:"No"
          // }
            SetContent(row)
        },[row])
  
        const onSubmit = async(data:any) =>{
          console.log({data})
          // let newData = {
          //     ...data
          //   };
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
        const handlePrint = () => {
          window.print();
        }
        const handleMedicalInterventionChange = (index, intervention) => {
          // Find the selected intervention in the medicalInterventions array
          const selectedIntervention = medicalInterventions.find(
            (int) => int.intervention === intervention
          );
        
          // Update the corresponding fields in the form data
          setValue(`items[${index}].serviceCode`, selectedIntervention?.code || '');
          setValue(
            `items[${index}].unitCost`,
            selectedIntervention?.price?.toString() || ''
          );
        };
    return (
      <Page title={`View Patient Record | EMT`}>
        <Container maxWidth={themeStretch ? false : "lg"}>
          <HeaderBreadcrumbs
            heading={`Patient Record`}
            links={[
              { name: "Dashboard", href: PATH_DASHBOARD.root },
              { name: `Patient Records`, href: PATH_DASHBOARD.patients.root },
              { name: "View" },
            ]}
          />
         
          <Grid container spacing={1} mb={2} justifyContent="space-between">
              <Grid item sm={8}>
              <Typography variant="h6" component="div">
         {/* Patient Record */}
          </Typography>
              </Grid>
              <Grid item sm={4} display="flex" justifyContent="end">
              <Button
                size="medium"
                variant="contained"
                onClick={handlePrint}
                className="hidebtn"
            >
                Print
            </Button>
              </Grid>
         </Grid>
          <Card sx={{ p: 3, pb: 10, mb: 2 }}>
                <Box sx={{mb:2}}>Incident Details</Box>
                    <Grid container spacing={2}>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                       Incident Code
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.incidentCode || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                       Incident Type
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.incidentType || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      Ambulance Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.ambulance_name || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      Mental Status
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.mental_status || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    </Grid>
            </Card>
          <Card sx={{ p: 3, pb: 10, mb: 2 }}>
                <Box sx={{mb:2}}>Patient Details</Box>
                    <Grid container spacing={2}>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      First Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.firstName || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      Middle Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.middleName || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      Last Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.lastName || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      Date of birth
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{formatDate2(content?.doB) || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      Gender
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.sex === 0 ? "Female" : "Male" || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      Address
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.address || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      NHIA/No
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.nhia || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                    Arrival Time
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.arrivalTime || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Main Complaints/Impression
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.mainComplaints || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Primary Survey
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.primary_survey || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                </Grid>
            </Card>
            <Card sx={{ p: 3, pb: 10, mb: 2 }}>
                <Box sx={{mb:2}}>Information by Ambulance Service Provider</Box>
                    <Grid container spacing={2}>
                        <Grid item sm={6}>
                        <ListItem>
                        <ListItemText primary={<Typography>
                        Physical Exam Findings
                        </Typography>} 
                        secondary={
                            <Typography sx={{color:"#7b939c"}} >{content?.physical_exam_findings || "Not Available"}</Typography>
                        } />
                        </ListItem>
                        </Grid>
                        <Grid item sm={6}>
                        <ListItem>
                        <ListItemText primary={<Typography>
                        Triage Category
                        </Typography>} 
                        secondary={
                            <Typography sx={{color:"#7b939c"}} >{content?.triage_category || "Not Available"}</Typography>
                        } />
                        </ListItem>
                        </Grid>
                    </Grid>
            </Card> 
            <Card sx={{ p: 3, pb: 10, mb: 2 }}>
                <Box sx={{mb:2}}>Vital Sign</Box>
                    <Grid container spacing={2}>
                        <Grid item sm={4}>
                        <ListItem>
                        <ListItemText primary={<Typography>
                       Time
                        </Typography>} 
                        secondary={
                            <Typography sx={{color:"#7b939c"}} >{content?.time || "Not Available"}</Typography>
                        } />
                        </ListItem>
                        </Grid>
                        <Grid item sm={4}>
                        <ListItem>
                        <ListItemText primary={<Typography>
                       Pulse
                        </Typography>} 
                        secondary={
                            <Typography sx={{color:"#7b939c"}} >{content?.pulse || "Not Available"}</Typography>
                        } />
                        </ListItem>
                        </Grid>
                        <Grid item sm={4}>
                        <ListItem>
                        <ListItemText primary={<Typography>
                       Blood Pressure
                        </Typography>} 
                        secondary={
                            <Typography sx={{color:"#7b939c"}} >{content?.blood_pressure || "Not Available"}</Typography>
                        } />
                        </ListItem>
                        </Grid>
                        <Grid item sm={4}>
                        <ListItem>
                        <ListItemText primary={<Typography>
                       Resp
                        </Typography>} 
                        secondary={
                            <Typography sx={{color:"#7b939c"}} >{content?.resp || "Not Available"}</Typography>
                        } />
                        </ListItem>
                        </Grid>
                        <Grid item sm={4}>
                        <ListItem>
                        <ListItemText primary={<Typography>
                       Glucose
                        </Typography>} 
                        secondary={
                            <Typography sx={{color:"#7b939c"}} >{content?.glucose || "Not Available"}</Typography>
                        } />
                        </ListItem>
                        </Grid>
                        <Grid item sm={4}>
                        <ListItem>
                        <ListItemText primary={<Typography>
                            Sp02
                        </Typography>} 
                        secondary={
                            <Typography sx={{color:"#7b939c"}} >{content?.so02 || "Not Available"}</Typography>
                        } />
                        </ListItem>
                        </Grid>
                    </Grid>
            </Card> 
            
            <Card sx={{ p: 3, pb: 10, mb: 2 }}>
                <Box sx={{mb:2}}>Immediate Treatment</Box>
                    <Grid container spacing={2}>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      Time
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.immediate_treatment_time || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      Medical Intervention
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.medical_intervention || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                     Dose
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.dose || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                     IV
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.iv || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    </Grid>
            </Card>
            <Card sx={{ p: 3, pb: 10, mb: 2 }}>
              <Box sx={{mb:2}}>ETC Treatment</Box>
              <form onSubmit={handleSubmit(onSubmit)}>
        
              {fields.map((field, index) => (
                <Grid key={field.id} mb={2} container spacing={2}>
              <Grid item sm={12}>
              <Box>{index+1}).</Box>
              </Grid>
              <Grid item xs={12} sm={12} lg={12}>
              <label>Select Medical Intervention</label>
              <br />
                <TextField
                  {...register(`items[${index}].medicalIntervention`, { required: 'Medical Intervention is required' })}
                  error={!!errors.items?.[index]?.medicalIntervention}
                  select
                  helperText={errors.items?.[index]?.medicalIntervention?.message}
                  onChange={(e) => handleMedicalInterventionChange(index, e.target.value)}

                >
                   <MenuItem  value="">Select Medical Intervention</MenuItem>
                   {medicalInterventions.map((intervention,index) =>(
                      <MenuItem value={intervention.intervention}>{intervention.intervention}</MenuItem>
                   ))}
                 </TextField>
              </Grid>
              <Grid item xs={6} sm={2} lg={2}>
              <label>Service Code</label>
              <TextField
                {...register(`items[${index}].serviceCode`, { required: 'Service Code is required' })}
                error={!!errors.items?.[index]?.serviceCode}
                helperText={errors.items?.[index]?.serviceCode?.message}
              />
              </Grid>
             
              <Grid item xs={6} sm={2} lg={2}>
              <label>Unit Cost</label>
              <TextField
                type="number"
                inputProps={{ step: '0.01' }}
                {...register(`items[${index}].unitCost`, { required: 'Unit Cost is required', pattern: /^\d+(\.\d{1,2})?$/ })}
                error={!!errors.items?.[index]?.unitCost}
                helperText={errors.items?.[index]?.unitCost?.message}
              />
              </Grid>
              <Grid item xs={6} sm={2} lg={2}>
              <label>Dose</label>
              <TextField
              type="text"
                {...register(`items[${index}].dose`, { required: 'Dose is required' })}
                error={!!errors.items?.[index]?.dose}
                helperText={errors.items?.[index]?.dose?.message}
              />
              </Grid>
              <Grid item xs={6} sm={2} lg={2}>
              <label>Quantity</label>
              <TextField
                type="number"
                {...register(`items[${index}].quantity`, { required: 'Quantity is required', pattern: /^\d+$/ })}
                error={!!errors.items?.[index]?.quantity}
                helperText={errors.items?.[index]?.quantity?.message}
              />
              </Grid>
              <Grid item xs={6} sm={2} lg={2}>
              <label>Amount</label>
              <TextField
                value={calculateAmount(field.unitCost, field.quantity)}
                disabled
              />
              </Grid>
              <Grid item xs={6} sm={3} lg={3}>
              <label>Remark</label>
              <TextField
              type="text"
              multiline
                {...register(`items[${index}].remark`)}
                // error={!!errors.items?.[index]?.remark}
                // helperText={errors.items?.[index]?.remark?.message}
              />
              </Grid>
              <Button size="small" sx={{background:"grey", height:"40px", mt:6, '&:hover': {
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
      <Grid item mb={4} xs={12} sm={12} mt={4} lg={12}>
        <TextField
          value={parseFloat(watch('totalAmount', 0)).toFixed(2)}
          disabled
          label="Total Amount"
        />

      </Grid>
      <Button
              size="medium"
              type="submit"
              variant="contained"
              className="btnCustom"
              sx={{mr:2}}
        
          >
              Add New Treatment
          </Button>
          <Button
              size="medium"
              type="submit"
              variant="contained"
      
          >
              Discharge Patient
          </Button>
               </form>
           </Card>
         
              </Container>
            </Page>
    );
  };
  
  export default ViewPatient;
  