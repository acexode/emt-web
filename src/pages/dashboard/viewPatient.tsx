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
    Autocomplete,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableContainer,
    TableHead,
    IconButton,
    Chip,
    Tabs,
    Tab


  } from "@mui/material";
  import { FC, useEffect, useState } from "react";
  import {useForm, useFieldArray} from "react-hook-form"

  import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
  import Page from "../../components/Page";
  import { PATH_DASHBOARD } from "../../routes/paths";
  import useSettings from "../../hooks/useSettings";
import { RemoveCircleOutline } from "@mui/icons-material";
import { formatDate2, formatDateTime } from "../../utility";
import axiosInstance from "../../services/api_service";
import {  useSnackbar } from "notistack";
import { MIconButton } from "../../components/@material-extend";
import closeFill from "@iconify/icons-eva/close-fill";
import { LoadingButton } from "@mui/lab";

import { Icon } from "@iconify/react";
import { useLocation } from "react-router-dom";
import CustomUsableTable from "../../components/DataGrid";
import CustomUsableTable2 from "../../components/DataTable";
import { IPatients } from "../../types/patient";
import { errorMessages } from "../../constants";
import Scrollbar from "../../components/Scrollbar";
  
const TABLE_HEAD = [
  { id: "sn", label: "S/N", alignRight: false },
  { id: "drug.description", label: "Item", alignRight: false },
  { id: "drug.type", label: "Type", alignRight: false },
  { id: "drug.code", label: "Code", alignRight: false },
  { id: "quantity", label: "Quantity/Frequency", alignRight: false },
  { id: "dose", label: "Dose", alignRight: true },
  // { id: "drug.price", label: "Unit Cost", alignRight: false },
  { id: "price", label: "Total Amount", alignRight: false },
  { id: "dateAdded", label: "Date Added", alignRight: false },
  { id: "" },
];
const TABLE_HEAD2 = [
  { id: "sn", label: "S/N", alignRight: false },
  { id: "bloodPressure", label: "Blood Pressure", alignRight: false },
  { id: "canSpeak", label: "Can speak?", alignRight: false },
  { id: "glucose", label: "Glucose", alignRight: false },
  { id: "isInPain", label: "Is In Pain?", alignRight: false },
  { id: "isAlert", label: "Is Alert?", alignRight: false },
  // { id: "mainComplaint", label: "Complaint", alignRight: false },
  { id: "oxygen", label: "Oxygen", alignRight: false },
  { id: "pulse", label: "Pulse", alignRight: false },
  { id: "resp", label: "RESP", alignRight: false },
  { id: "sizeOfFluid", label: "Size of fluid", alignRight: false },
  { id: "ivFluidType", label: "IV Fluid Type", alignRight: false },
  { id: "totalIvFluidVolumeGiven", label: "Total IV fluid Volume Given", alignRight: false },
  { id: "locationOfIvInfusion", label: "IV Location", alignRight: false },
  { id: "sp02", label: "SP02", alignRight: false },
  { id: "unResponsive", label: "Unresponsive", alignRight: false,width:"400" },
  { id: "timeTaken", label: "Time Taken", alignRight: false,width:"400" },
  { id: "mediicalIntervention", label: "Treatment And Dose", alignRight: false },
  { id: "remarks", label: "Remarks", alignRight: false,width:"400" },
  { id: "notes", label: "Notes", alignRight: false,width:"400" },
  // { id: "" },
];
const headLabel = [
  "S/N", "Medical Intervention",  "Unit Cost","Quantity","Amount",""
 ]
const headLabel2 = [
  "S/N", "Drug",  "Unit Cost", "Dose","Quantity","Amount",""
 ]

 interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

  const ViewPatient: FC = () => {
    const { themeStretch } = useSettings();
    const [content, SetContent] = useState<IPatients>(null);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [loading,setLoading] = useState(false)
    const [loadingData,setLoadingData] = useState(false)
    const [value, setTabValue] = useState(0);
    const [medicinesOnly,setMedicinesOnly] = useState([])
    const [allMedicines,setAllMedicines] = useState([])

    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      control,
      reset,
      getValues,
      watch
    } = useForm({
      mode: "onTouched",
      criteriaMode: "firstError",
      shouldFocusError: true,
      shouldUnregister: false,
      shouldUseNativeValidation: false,
      delayError: undefined,
      defaultValues: {
        incidentDrugs: [{ serviceFeeId:'',unitCost:'', medicalIntervention: '', quantity: '', dose:0,price:'', remark:'',incidentId:'',ambulanceId:'',emergencyTreatmentCenterId:'',patientId:'' }],
      },
    });
    const {
      state: { row,options},
    } = useLocation();
    const { fields, append, remove } = useFieldArray({
      control,
      name: 'incidentDrugs',
    });
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
      setTabValue(newValue);
      reset()
    };

    useEffect(()=>{
      axiosInstance.get("ServicesAndFees/get").then(res =>{
        const isMed = res?.data?.data?.filter((dt) => dt?.feeCategory?.isMedicine).map((dt: { code: any; description: any; price: any; id: any;feeCategory:any })=>{
          return {
              code :dt?.code,
              intervention:`${dt?.description}`,
              price: dt?.price,
              id:dt?.id,
              isMedicine: dt?.feeCategory?.isMedicine
            }
        })
        const isNotMed = res?.data?.data?.filter((dt) => dt?.feeCategory?.isMedicine === false).map((dt: { code: any; description: any; price: any; id: any;feeCategory:any })=>{
          return {
              code :dt?.code,
              intervention:`${dt?.description}`,
              price: dt?.price,
              id:dt?.id,
              isMedicine: dt?.feeCategory?.isMedicine
            }
        })
        setMedicinesOnly(isMed)
        setAllMedicines(isNotMed)
      }).catch(error =>{
        console.log(error);
      })
  },[])


    const calculateAmount = (unitCost: number, quantity:any) => {
      if (unitCost && quantity) {
        return (unitCost * quantity).toFixed(2);
      }
      return '';
    };

  
        const fetchUser = () =>{
          setLoadingData(true)
          let val = {
            id: row?.id
          }
            axiosInstance.post('Patients/get',val).then(res =>{
              SetContent(res?.data?.data)
            }).catch(error =>{
              console.log(error);
            }).finally(()=>{
              setLoadingData(false)
            })
        }
        useEffect(() => {
          if(row?.id){
            fetchUser()
          }
        }, [row?.id]);
        const onSubmit = async(data:any) =>{
          let newData = {
              ...data
            };
            delete newData?.totalAmount
            setLoading(true)
            let text ="Item Added";
            try {
             let res = await axiosInstance.post(`Patients/addPatientDrugSheet`, newData);
             console.log(res);
              enqueueSnackbar(`${text}`, {
                  variant: "success",
                  action: (key) => (
                    <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                      <Icon icon={closeFill} />
                    </MIconButton>
                  ),
                });
                fetchUser()
                reset()
            } catch (error) {
              let errorMessage = errorMessages[error?.response?.status]
              console.log(error)
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
        const handlePrint = () => {
          window.print();
        }
      
        const handleSetPrice=(val:any,index:number) =>{
          let testPrice = getValues(`incidentDrugs`)
          let boom = getValues(`incidentDrugs[${index}].unitCost`)
          let price = calculateAmount(boom,val)
           setValue(`incidentDrugs[${index}].price`, parseInt(price)|| '');
           const totalPrice = testPrice?.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.price;
        }, 0);
        setValue('totalAmount', totalPrice);
        }
        const handleAutocompleteChange = (index:number, intervention:string) => {
         const selectedIntervention = options.find(
          (int:any) => int.intervention === intervention
        );
        // Update the corresponding fields in the form data
        setValue(`incidentDrugs[${index}].serviceFeeId`, selectedIntervention?.id || '');
        setValue(`incidentDrugs[${index}].medicalIntervention`, selectedIntervention?.intervention || '');
        setValue(`incidentDrugs[${index}].incidentId`, row?.incident_Id);
        setValue(`incidentDrugs[${index}].ambulanceId`, row?.ambulance_Id );
        setValue(`incidentDrugs[${index}].emergencyTreatmentCenterId`, row?.etC_Id );
        setValue(`incidentDrugs[${index}].patientId`, row?.id || '');
        // setValue(`incidentDrugs[${index}].serviceCode`, selectedIntervention?.code || '');
        setValue(
          `incidentDrugs[${index}].unitCost`,
          selectedIntervention?.price?.toString() || ''
        );
        };

        console.log({content});
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
                        <Typography sx={{color:"#7b939c"}} >{ loadingData ? <Skeleton variant="rectangular" width={100} height={30} />  : content?.extraDetails?.incidentCode || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                       Incident Type
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{loadingData ? <Skeleton variant="rectangular" width={100} height={30} />  : content?.extraDetails?.incidentCategory || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      Ambulance Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{loadingData ? <Skeleton variant="rectangular" width={100} height={30} />  : content?.extraDetails?.ambulanceName || "Not Available"}</Typography>
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
                        <Typography sx={{color:"#7b939c"}} >{loadingData ? <Skeleton variant="rectangular" width={100} height={30} />  : content?.firstName || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      Middle Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{loadingData ? <Skeleton variant="rectangular" width={100} height={30} />  : content?.middleName || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      Last Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{loadingData ? <Skeleton variant="rectangular" width={100} height={30} />  : content?.lastName || "Not Available"}</Typography>
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
                        <Typography sx={{color:"#7b939c"}} >{loadingData ? <Skeleton variant="rectangular" width={100} height={30} />  : content?.sex || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      Address
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{loadingData ? <Skeleton variant="rectangular" width={100} height={30} />  : content?.address || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      NHIA/No
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{loadingData ? <Skeleton variant="rectangular" width={100} height={30} />  : content?.nhia || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                    Arrival Time
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{loadingData ? <Skeleton variant="rectangular" width={100} height={30} />  : content?.runsheet
                        ?.arrivalTime ? formatDateTime(content?.runsheet
                        ?.arrivalTime) : "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Main Complaints/Impression
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{loadingData ? <Skeleton variant="rectangular" width={100} height={30} />  : content?.medicalInterventions[0]?.mainComplaint || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Primary Survey
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{loadingData ? <Skeleton variant="rectangular" width={100} height={30} />  : content?.medicalInterventions[0]?.primarySurvey || "Not Available"}</Typography>
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
                            <Typography sx={{color:"#7b939c"}} >{loadingData ? <Skeleton variant="rectangular" width={100} height={30} />  : content?.medicalInterventions[0]?.physicalExaminationFindings || "Not Available"}</Typography>
                        } />
                        </ListItem>
                        </Grid>
                        <Grid item sm={6}>
                        <ListItem>
                        <ListItemText primary={<Typography>
                        Triage Category
                        </Typography>} 
                        secondary={
                            <Typography sx={{color:"#7b939c"}} >{loadingData ? <Skeleton variant="rectangular" width={100} height={30} />  :  content?.extraDetails?.triageCategory ?  <Chip label={content?.extraDetails?.triageCategory} className={`${content?.extraDetails?.triageCategory === "Emergent" ? "emergentBg": "nonEmergentBg"}`} />  : "Not Available"}</Typography>
                        } />
                        </ListItem>
                        </Grid>
                    </Grid>
            </Card> 
           
            <CustomUsableTable2 table_Head={TABLE_HEAD2} dataList={content?.medicalInterventions} />
            <CustomUsableTable table_Head={TABLE_HEAD} dataList={content?.drugs} />
            <Card sx={{ p: 3, pb: 10, mb: 2 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange}  TabIndicatorProps={{
            style: {
              backgroundColor: 'hsl(0, 100%, 27%)', // Change this to the desired color
            },
          }}
           aria-label="basic tabs example">
          <Tab label="ETC Treatment" {...a11yProps(0)} />
          <Tab label="Drugs and Consumables" {...a11yProps(1)} />
          </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                                  options={allMedicines}
                                  getOptionLabel={(option) => option.intervention}
                                  onChange={(e) => handleAutocompleteChange(index,e.target.textContent)}
                                
                                  renderInput={(params) => <TextField {...params}  />}
                                />
                            </TableCell>
                           
                            <TableCell
                            align="right"
                            style={{ width: '60rem' }}
                            >
                             <TextField
                              type="number"
                              disabled
                              inputProps={{ step: '0.01' }}
                              {...register(`incidentDrugs[${index}].unitCost`, { required: 'Unit Cost is required', pattern: /^\d+(\.\d{1,2})?$/ })}
                              error={!!errors.incidentDrugs?.[index]?.unitCost}
                              helperText={errors.incidentDrugs?.[index]?.unitCost?.message}
                            />
                              </TableCell>
                              {/* <TableCell
                            align="right"
                            style={{ width: '60rem' }}
                            >
                               <TextField
                        {...register(`incidentDrugs[${index}].dose`)}
                       
                      />
                              </TableCell> */}
                            <TableCell
                            align="right"
                            style={{ width: '60rem' }}

                            >
                               <TextField
                        type="number"
                        {...register(`incidentDrugs[${index}].quantity`, { required: 'Quantity is required', valueAsNumber:true, pattern: /^\d+$/ })}
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
            <Button type="button" onClick={() => append({serviceFeeId:'',unitCost:'', medicalIntervention: '', quantity: '', dose:0,price:'', remark:'',incidentId:'',ambulanceId:'',emergencyTreatmentCenterId:'',patientId:'' })}>
        Add More
      </Button>
      <Grid item xs={12} sm={12} mt={4} lg={12}>
        <TextField
          value={parseFloat(watch('totalAmount', 0)).toFixed(2)}
          disabled
          label="Total Amount"
        />
      </Grid>
     
     <Grid mt={5}>
     <LoadingButton
              size="medium"
              type="submit"
              variant="contained"
              className="btnCustom"
              sx={{mr:2}}
              loading={loading}
        
          >
              Add New Treatment
          </LoadingButton>
        
     </Grid>
               </form>
          </TabPanel>
          <TabPanel value={value} index={1}>
          <form onSubmit={handleSubmit(onSubmit)}>
              <Scrollbar>
              <TableContainer>
                  <Table>
                  <TableHead>
                    <TableRow>
                  
                      {headLabel2.map((headCell:string,index:number) => (
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
                                  options={medicinesOnly}
                                  getOptionLabel={(option) => option.intervention}
                                  onChange={(e) => handleAutocompleteChange(index,e.target.textContent)}
                                
                                  renderInput={(params) => <TextField {...params}  />}
                                />
                            </TableCell>
                           
                            <TableCell
                            align="right"
                            style={{ width: '60rem' }}
                            >
                             <TextField
                              type="number"
                              disabled
                              inputProps={{ step: '0.01' }}
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
                        {...register(`incidentDrugs[${index}].dose`)}
                       
                      />
                              </TableCell>
                            <TableCell
                            align="right"
                            style={{ width: '60rem' }}

                            >
                               <TextField
                        type="number"
                        {...register(`incidentDrugs[${index}].quantity`, { required: 'Quantity is required', valueAsNumber:true, pattern: /^\d+$/ })}
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
            <Button type="button" onClick={() => append({serviceFeeId:'',unitCost:'', medicalIntervention: '', quantity: '', dose:'',price:'', remark:'',incidentId:'',ambulanceId:'',emergencyTreatmentCenterId:'',patientId:'' })}>
        Add More
      </Button>
      <Grid item xs={12} sm={12} mt={4} lg={12}>
        <TextField
          value={parseFloat(watch('totalAmount', 0)).toFixed(2)}
          disabled
          label="Total Amount"
        />
      </Grid>
     
     <Grid mt={5}>
     <LoadingButton
              size="medium"
              type="submit"
              variant="contained"
              className="btnCustom"
              sx={{mr:2}}
              loading={loading}
        
          >
              Add New Treatment
          </LoadingButton>
        
     </Grid>
               </form>
          </TabPanel>
           </Card>
         
              </Container>
            </Page>
    );
  };
  
  export default ViewPatient;
  