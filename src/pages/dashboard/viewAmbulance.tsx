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
  import {  useLocation } from "react-router-dom";
  
  import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
  import Page from "../../components/Page";
  import { PATH_DASHBOARD } from "../../routes/paths";
  import useSettings from "../../hooks/useSettings";
import { formatter } from "../../utility";
  
  const ViewAmbulance: FC = () => {
    const { themeStretch } = useSettings();
    const [content, SetContent] = useState<any>(null);
    // const [loading,setLoading] = useState(true)
    const {
        state: { row},
      } = useLocation();
        useEffect(()=>{
          const objectData = {
            providerId:"A890823",
            nhia: "KG73276",
            request:"1521",
            provider_name:"R & R Ambulance Service",
            listOfServices :[
              {
                incidentDate:"22 July, 2023",
                incidentCode:"A782436",
                patientCode:"D632763",
                patientName:"John Peter",
                nhia:"G897237",
                serviceType:"ALS",
                distance:"75k",
                rate:"800"
              },
            ],
            price:"60000",
            amountInWords:"Sixty Thousand Naira Only"
          }
            SetContent(objectData)
        },[row])
  
        const handlePrint = () => {
          window.print();
        }
    return (
      <Page title={`View Ambulance Claim | EMT`}>
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
                        <Typography sx={{color:"#7b939c"}} >{content?.providerId || "Not Available"}</Typography>
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
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                       Request No
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.request || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                       Provider Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.provider_name || "Not Available"}</Typography>
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
                      {content?.listOfServices?.map((services: any,index:any) =>(
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
                      ))}
                        
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
                        <TableCell align="right">{formatter.format(content?.price)}</TableCell>
                    </TableRow>
                </TableBody>
                    </Table>
                    <Grid item sm={12}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                       Total Amount in Words
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.amountInWords || "Not Available"}</Typography>
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
          <Card sx={{ p: 3, pb: 4, mb: 2 }}>
                <Grid container spacing={2}>
                <Grid item sm={12}>
                <ListItem>
                    <ListItemText primary={<Typography>
                    Serial NO: FCT360/
                    </Typography>} 
                    secondary={
                    <Typography sx={{color:"#7b939c"}} >AD9178932</Typography>
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
          
            >
                Approve
            </Button>
            <Button
                size="medium"
                type="submit"
                variant="contained"
                className="hidebtn"
            >
                Reject
            </Button>
        </Container>
      </Page>
    );
  };
  
  export default ViewAmbulance;
  