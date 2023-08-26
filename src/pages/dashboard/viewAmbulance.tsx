import {
    Container,
    Grid,
    ListItem,
    ListItemText,
    Typography,
    Card,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button
  } from "@mui/material";
  import { FC, useEffect, useState } from "react";
  import {  useLocation, useNavigate } from "react-router-dom";
  
  import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
  import Page from "../../components/Page";
  import { PATH_DASHBOARD } from "../../routes/paths";
  import useSettings from "../../hooks/useSettings";
import { formatter, numberToWords } from "../../utility";
import { IClaims } from "../../types/claims";
import axiosInstance from "../../services/api_service";
import { MIconButton } from "../../components/@material-extend";
import { useSnackbar } from "notistack";
import closeFill from "@iconify/icons-eva/close-fill";
import { Icon } from "@iconify/react";
import AlertDialog from "./components/confirmDialog";
  
  const ViewAmbulance: FC = () => {
    const { themeStretch } = useSettings();
    const [content, SetContent] = useState<IClaims>();
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
            "title": row?.title,
            "incidentId": row?.incidentId,
            "runSheetId": row?.runSheetId,
            "incidentFeeId": row?.incidentFeeId,
            "ambulanceId": row?.ambulanceId,
            "hospitalId": row?.hospitalId,
            "status": status,
            "totalPrice": row?.totalPrice
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
            res = await axiosInstance.put(
              `Claims/update`,
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
          } catch (error) {
            console.log(error);
            enqueueSnackbar("Error updating claim!", {
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
                <Box sx={{mb:2}}>Provider Details</Box>
                    <Grid container spacing={2}>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Provider ID
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.incidentViewModel?.ambulanceViewModel?.code || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Provider NHIA/SHIA ID
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.incidentViewModel?.ambulanceViewModel?.ambulanceId || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        location
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.incidentViewModel?.ambulanceViewModel?.location || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
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
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                       Provider Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.incidentViewModel?.ambulanceViewModel?.name || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    </Grid>
            </Card>
          <Card sx={{ p: 3, pb: 10, mb: 2 }}>
            <Box sx={{mb:2}}>List Of Services</Box>
                <Grid container spacing={2}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>S/N</TableCell>
                        <TableCell align="right">Incident Date</TableCell>
                        <TableCell align="right">Incident Code</TableCell>
                        <TableCell align="right">Patient Code</TableCell>
                        <TableCell align="right">Patient Name</TableCell>
                        <TableCell align="right">NHIA/SHIA</TableCell>
                        <TableCell align="right">Service Type</TableCell>
                        <TableCell align="right">Distance</TableCell>
                        <TableCell align="right">Rate</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* {content?.listOfServices?.map((services: any,index:any) =>(
                        <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {index + 1}
                        </TableCell>
                        <TableCell align="right">{services?.incidentDate}</TableCell>
                        <TableCell align="right">{services?.incidentCode}</TableCell>
                        <TableCell align="right">{services?.patientCode}</TableCell>
                        <TableCell align="right">{services?.patientName}</TableCell>
                        <TableCell align="right">{services?.nhia}</TableCell>
                        <TableCell align="right">{services?.serviceType}</TableCell>
                        <TableCell align="right">{services?.distance}</TableCell>
                        <TableCell align="right">{services?.rate} Per Km</TableCell>
                        </TableRow>
                      ))} */}
                        
                        <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            
                        </TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">Total Cost</TableCell>
                        <TableCell align="right">{formatter.format(content?.totalPrice ?? 0)}</TableCell>
                    </TableRow>
                </TableBody>
                    </Table>
                    <Grid item sm={12}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                       Total Amount in Words
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{numberToWords(content?.totalPrice ?? 0)+ " Naira only" || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                 </Grid>
            </Card>


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
        <AlertDialog open={open} handleClose={handleClose} loading={loading} handleSubmit={handleClaims} title={title} />

      </Page>
    );
  };
  
  export default ViewAmbulance;
  