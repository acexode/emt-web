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
import { formatDate2, formatter } from "../../utility";
// import { IClaims } from "../../types/claims";
import AlertDialog from "./components/confirmDialog";
import { useSnackbar } from "notistack";
import axiosInstance from "../../services/api_service";
import { MIconButton } from "../../components/@material-extend";
import closeFill from "@iconify/icons-eva/close-fill";
import { Icon } from "@iconify/react";

  const ViewETC: FC = () => {
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
      <Page title={`View ETC Claim | EMT`}>
        <Container maxWidth={themeStretch ? false : "lg"}>
          <HeaderBreadcrumbs
            heading={`ETC Claims`}
            links={[
              { name: "Dashboard", href: PATH_DASHBOARD.root },
              { name: `Claims`, href: PATH_DASHBOARD.claims.root },
              { name: "List" },
            ]}
          />
         <Grid container spacing={1} mb={2} justifyContent="space-between">
              <Grid item sm={6}>
              <Typography variant="h6" component="div">
          NEMSAS: TREATMENT CENTRE REIMBURSEMENT
          </Typography>
              </Grid>
              <Grid item sm={6} display="flex" justifyContent="end">
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
                <Box sx={{mb:2}}>Facility Details</Box>
                    <Grid container spacing={2}>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Facility Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.serviceProvider || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Facility NEMSAS Code
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{"Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Facility NHIA/SHIA Code
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{"Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Incident Code
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{"Not Available"}</Typography>
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
                        <Typography sx={{color:"#7b939c"}} >{content?.patient?.lastName || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    {/* <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Patient Code
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{"Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid> */}
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Patient Address
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{ content?.patient?.address || "Nil"}</Typography>
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
                        Patient NHIA/SHIA NO
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{ content?.patient?.nhia || "Nil"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                   
             
                    </Grid>
            </Card>
          <Card sx={{ p: 3, pb: 10, mb: 2 }}>
            <Box sx={{mb:2}}>Bill ID</Box>
                <Grid container spacing={2}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>S/N</TableCell>
                        <TableCell align="right">Medical Intervention</TableCell>
                        <TableCell align="right">Dose</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                        {/* <TableCell align="right">Amount</TableCell> */}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                      {content?.details?.map((bills:any,index:any) =>(
                        <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {index + 1}
                        </TableCell>
                        <TableCell align="right">{bills?.medicalIntervention || "Nil"}</TableCell>
                        <TableCell align="right">{bills?.dose}</TableCell>
                        <TableCell align="right">{bills?.quantity}</TableCell>
                        <TableCell align="right">{formatter.format(bills?.price)}</TableCell>
                        {/* <TableCell align="right">{formatter.format(bills?.price * bills?.quantity)}</TableCell> */}
                        </TableRow>
                      ))}
                     
                        <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            
                        </TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                        {/* <TableCell align="right"></TableCell> */}
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">{formatter.format(content?.totalAmount)}</TableCell>
                    </TableRow>
                </TableBody>
                    </Table>
                    {/* <Grid item sm={12}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                       Total Amount in Words
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{ numberToWords(content?.totalAmount) + " Naira only" || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid> */}
                 </Grid>
            </Card>


          <Card className="showVerificationCards" sx={{ p: 3, pb: 10, mb: 2 }}>
                <Box sx={{mb:2}}>ETC Verification</Box>
            
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
                <Box sx={{mb:2}}>SSHIA/NHIA</Box>
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
          {/* <Card sx={{ p: 3, pb: 4, mb: 2 }}>
                <Grid container spacing={2}>
                <Grid item sm={12}>
                <ListItem>
                    <ListItemText primary={<Typography>
                    Serial NO: FCT360/
                    </Typography>} 
                    secondary={
                    <Typography sx={{color:"#7b939c"}} >{content?.serialNo || "Not Available"}</Typography>
                    } />
                </ListItem>
                </Grid>
            
                </Grid>
            </Card> */}
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
  
  export default ViewETC;
  