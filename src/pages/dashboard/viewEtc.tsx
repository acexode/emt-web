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
  
  const ViewETC: FC = () => {
    const { themeStretch } = useSettings();
    const [content, SetContent] = useState<any>(null);
    // const [loading,setLoading] = useState(true)
    const {
        state: { row},
      } = useLocation();
        useEffect(()=>{
          const objectData = {
            facility_name:"Gwarimpa General Hospital",
            facility_code:"A890823",
            facility_shia_code:"KG73276",
            incident_code:"H651521",
            patient_name:"John Doe",
            patient_code:"PA57873",
            patient_address:"21 Ajakuta Estate, Abuja",
            sex:"Male",
            age:"30 years",
            nhia:"NHIA32736",
            dob:"20 August, 1993",
            billsId: [
              {
                medicalIntervention: "Specialist Initial Consultation",
                serviceCode:"NHIS-010-001",
                quantity:"1",
                unitCost: "2000",
                amount:"200"
              },
              {
                medicalIntervention: "Partial Amputation of the pinna",
                serviceCode:"NHIS-022-016",
                quantity:"1",
                unitCost: "30000",
                amount:"3000"
              },
              {
                medicalIntervention: "Nursing Care (per day)",
                serviceCode:"NHIS-010-003",
                quantity:"13",
                unitCost: "1000",
                amount:"13000"
              },
              {
                medicalIntervention: "Hospital Bed Occupancy",
                serviceCode:"NHIS-010-005",
                quantity:"12",
                unitCost: "1000",
                amount:"1200"
              },
            ],
            totalAmount:"57000",
            amountInWords:"Fifty Seven Thousand Naira",
            serialNo:"SE39489"
          }
            SetContent(objectData)
        },[row])
  
        const handlePrint = () => {
          window.print();
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
                        <Typography sx={{color:"#7b939c"}} >{content?.facility_name || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Facility NEMSAS Code
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.facility_code || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Facility NHIA/SHIA Code
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.facility_shia_code || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Incident Code
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.incident_code || "Not Available"}</Typography>
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
                        Patient Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.patient_name || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Patient Code
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.patient_code || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Patient Address
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.patient_address || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={3}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Sex
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.sex || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={3}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Age
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.age || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Patient NHIA/SHIA NO
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.nhia || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        D.O.B
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.dob || "Not Available"}</Typography>
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
                        <TableCell align="right">Service Code</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Unit Cost</TableCell>
                        <TableCell align="right">Amount</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                      {content?.billsId?.map((bills:any,index:any) =>(
                        <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {index + 1}
                        </TableCell>
                        <TableCell align="right">{bills?.medicalIntervention}</TableCell>
                        <TableCell align="right">{bills?.serviceCode}</TableCell>
                        <TableCell align="right">{bills?.quantity}</TableCell>
                        <TableCell align="right">{formatter.format(bills?.unitCost)}</TableCell>
                        <TableCell align="right">{bills?.amount}</TableCell>
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
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">{formatter.format(content?.totalAmount)}</TableCell>
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
          <Card sx={{ p: 3, pb: 4, mb: 2 }}>
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
  
  export default ViewETC;
  