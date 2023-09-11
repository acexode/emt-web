
import {
    Container,
    Grid,
    ListItem,
    ListItemText,
    Typography,
    Card,
    Box,
 
    Button
  } from "@mui/material";
  import { FC, useEffect, useState } from "react";
  import {  useLocation, useNavigate } from "react-router-dom";
  
  import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
  import Page from "../../components/Page";
  import { PATH_DASHBOARD } from "../../routes/paths";
  import useSettings from "../../hooks/useSettings";
import { formatDate2 } from "../../utility";
// import { IClaims } from "../../types/claims";
import axiosInstance from "../../services/api_service";
import { MIconButton } from "../../components/@material-extend";
import { useSnackbar } from "notistack";
import closeFill from "@iconify/icons-eva/close-fill";
import { Icon } from "@iconify/react";
import AlertDialog from "./components/confirmDialog";
// import CustomAmbMiniTable from "../../components/claims/ambMiniTable";

// const TABLE_HEAD = [
//   { id: "s/n", label: "S/N", alignRight: false },
//   { id: "medicalIntervention", label: "Medical Intervention", alignRight: false },
//   { id: "code", label: "Code", alignRight: false },
//   { id: "dose", label: "Dose", alignRight: false },
//   { id: "quantity", label: "Quantity", alignRight: false },
//   { id: "price", label: "Price", alignRight: false },
//   { id: "" },
// ];

  const ViewAmbulance: FC = () => {
    const { themeStretch } = useSettings();
    const [content, SetContent] = useState<any>();
    const [loading,setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [confirmationPayload, setConfirmationPayload] = useState<any>(null);
    const [title,setTitle] = useState("")
    let navigate = useNavigate();

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
      setLoading(false)
    };
    const {
        state: { row},
      } = useLocation();
        useEffect(()=>{
            SetContent(row)
        },[row])
  
        const handlePrint = () => {
          window.print();
        }
        const onHandleSubmit = async (status:any) => {
          let newVal = {
            "id": row?.id,
            "claimStatusType": status,
          }
          let t = status === "Approved" ? "Approving Claim" : "Rejecting Claim"
              handleClickOpen();
              setTitle(t)
          setConfirmationPayload(newVal);
            
        };
        const handleClaims = async() =>{
          setLoading(true)
          try {
            let res;
            res = await axiosInstance.post(
              `Claims/acceptOrRejectClaim`,
              confirmationPayload
            );
            navigate(PATH_DASHBOARD.claims.root);
            enqueueSnackbar(res?.data?.message, {
              variant: "success",
              action: (key) => (
                <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                  <Icon icon={closeFill} />
                </MIconButton>
              ),
            });
          } catch (error:any) {
            console.log(error);
            enqueueSnackbar(error?.response?.data?.message, {
                variant: "error",
                action: (key) => (
                  <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                    <Icon icon={closeFill} />
                  </MIconButton>
                ),
              });
            console.error("An unexpected error happened occurred:", error);
          } finally{
            setLoading(false)
          }
        }

        console.log({content});
    return (
      <Page title={`View Ambulance Claim | NEMSAS`}>
        <Container maxWidth={themeStretch ? false : "lg"}>
          <HeaderBreadcrumbs
            heading={`Ambulance Claims`}
            links={[
              { name: "Dashboard", href: PATH_DASHBOARD.root },
              { name: `Claims`, href: PATH_DASHBOARD.claims.root },
              { name: "List" },
            ]}
          />
         
          <Grid container spacing={1} mb={2} justifyContent="space-between">
              <Grid item sm={8}>
              <Typography variant="h6" component="div">
         NATIONAL EMERGENCY MEDICAL SERVICE AND AMBULANCE SYSTEM (NEMSAS)
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
                <Box sx={{mb:2}}>Claims Details</Box>
                    <Grid container spacing={2}>
                   
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Title
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.title || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Status
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.status || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                   
                  
                    </Grid>
            </Card>
          <Card sx={{ p: 3, pb: 10, mb: 2 }}>
                <Box sx={{mb:2}}>Provider Details</Box>
                    <Grid container spacing={2}>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Provider Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.serviceProvider || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Provider NHIA/SHIA ID
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.nhia || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    {/* <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        location
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.location || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid> */}
                    {/* <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                       Request No
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.request || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid> */}
                    {/* <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                       Provider Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.incidentViewModel?.ambulanceViewModel?.name || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid> */}
                    </Grid>
            </Card>
          <Card sx={{ p: 3, pb: 10, mb: 2 }}>
                <Box sx={{mb:2}}>Incident Details</Box>
                    <Grid container spacing={2}>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                         Category
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.incidentCategory || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Code
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.incidentViewModel?.serialNo || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Date
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.incidentDate || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        location
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.location || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                       Status
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.incidentViewModel?.eventStatusType || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                       Time
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.incidentViewModel?.incidentTime || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                       Distance Covered (km)
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.distanceCovered}</Typography>
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
                        <Typography sx={{color:"#7b939c"}} >{content?.patient?.firstName || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                         Last Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.patient?.lastName|| "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                   
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                         Phone Number
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{ content?.patient?.phoneNumber || "Nil"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Sex
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.patient?.sex === 0 ? "Female" : "Male" || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Date of birth
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{formatDate2(content?.patient?.doB) || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                         NHIA/SHIA NO
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{ content?.patient?.nhia || "Nil"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                   
             
                    </Grid>
            </Card>
            {/* <CustomAmbMiniTable table_Head={TABLE_HEAD} dataList={content?.drugsList} totalAmount={content?.totalAmount} /> */}
        

          <Card className="showVerificationCards" sx={{ p: 3, pb: 10, mb: 2 }}>
                <Box sx={{mb:2}}>EASP Verification</Box>
                    <Grid container spacing={2}>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Prepared By
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} ></Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Signature/Date
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} ></Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={2}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        ID NO
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} ></Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Supervisor Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} ></Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={2}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        ID NO
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} ></Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Supervisor Signature/Date
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} ></Typography>
                      } />
                    </ListItem>
                    </Grid> 
                    </Grid>
            </Card>
          <Card className="showVerificationCards" sx={{ p: 3, pb: 10, mb: 2 }}>
                <Box sx={{mb:2}}>EMSASA Verification</Box>
                    <Grid container spacing={2}>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Verified By
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} ></Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={2}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                       EMSAS ID
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} ></Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                       Signature/Date
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} ></Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Stamp
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} ></Typography>
                      } />
                    </ListItem>
                    </Grid>
                
                    </Grid>
            </Card>
          
            <Button
                size="medium"
                type="submit"
                variant="contained"
                className="btnCustom hidebtn"
                sx={{mr:2}}
                onClick={() => onHandleSubmit("Approved")}
            >
                Approve
            </Button>
            <Button
                size="medium"
                type="submit"
                variant="contained"
                className="hidebtn"
                onClick={() => onHandleSubmit("Rejected")}
            >
                Reject
            </Button>
        </Container>
        <AlertDialog  open={open} handleClose={handleClose} loading={loading} handleSubmit={handleClaims} title={title} />

      </Page>
    );
  };
  
  export default ViewAmbulance;
  