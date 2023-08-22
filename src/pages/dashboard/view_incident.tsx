import {
    Container,
    Grid,
    ListItem,
    ListItemText,
    Typography,
    Card,
    Box,
    Button,
  } from "@mui/material";
  import { FC, useEffect, useState } from "react";
  import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
  import Page from "../../components/Page";
  import { PATH_DASHBOARD } from "../../routes/paths";
  import useSettings from "../../hooks/useSettings";
import { useLocation } from "react-router-dom";
import { Incident } from "./types";
import AmbulanceMap from "../../components/_dashboard/general-app/map"
import { formatDate2 } from "../../utility";
  
  const ViewIncident: FC = () => {
    const { themeStretch } = useSettings();
    const [content, SetContent] = useState<Incident>()
    const [ambulance,setAmbulance] = useState<any>([])
    // const [loading,setLoading] = useState(true)
    const {
        state: { row},
      } = useLocation();
        useEffect(()=>{
            SetContent(row)
            const newAmbulances = [
              { id: 1, lat: row?.latitude, lng: row?.longitude, name: 'Ambulance 1' }, // Example location within Nigeria (Abuja)
            ];
            setAmbulance(newAmbulances)
        },[row])

        const handlePrint = () => {
          window.print();
        }

      return (
      <Page title={`View Incident | EMT`}>
        <Container maxWidth={themeStretch ? false : "lg"}>
          <HeaderBreadcrumbs
            heading={`Incident`}
            links={[
              { name: "Dashboard", href: PATH_DASHBOARD.root },
              { name: `Incidents`, href: PATH_DASHBOARD.incidents.root },
              { name: "View" },
            ]}
          />
         
          <Grid container spacing={1} mb={2} justifyContent="space-between">
              <Grid item sm={8}>
              <Typography variant="h6" component="div">
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
                <Box sx={{mb:2}}>Patient Details</Box>
                    <Grid container spacing={2}>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                     First Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.patientViewModel?.firstName || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Last Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.patientViewModel?.lastName || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Middle Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.patientViewModel?.middleName || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Date
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{formatDate2(content?.patientViewModel?.doB) || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Gender
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.sex || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                
                    </Grid>
            </Card>
          <Card sx={{ p: 3, pb: 10, mb: 2 }}>
                <Box sx={{mb:2}}>Incident Details</Box>
                    <Grid container spacing={2}>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                       Caller Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.callerName || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                       Caller ID
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.callerNumber || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                       Gender
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.sex || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                       Event Status
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.eventStatusType || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                       Incident Code
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.incidentCode || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                       Incident Type
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.incidentCategory || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                       Incident Status
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.incidentStatusType || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      Incident Date
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.incidentDate || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                      Incident Time
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.incidentTime || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                     Incident Location
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.incidentLocation || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                     Incident Descrption
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.description || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                     Recommendation
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.recommendation || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                     Triage Category
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.traiageCategory || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                     Street
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.street || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                     District Ward
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.districtWard || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                     Area Council
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.areaCouncil || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                     Zip Code
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.zipCode || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Was the case resolved without Ambulance dispatch?
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.canResolveWithoutAmbulance || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    </Grid>
            </Card>
          <Card sx={{ p: 3, pb: 10, mb: 2 }}>
                <Box sx={{mb:2}}>Ambulance Details</Box>
                    <Grid container spacing={2}>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                       Ambulance Type
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.ambulanceViewModel?.name || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                       Ambulance
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.ambulanceViewModel?.ambulanceTypeId || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    </Grid>
            </Card>
          <Card sx={{ p: 3, pb: 10, mb: 2 }}>
                <Box sx={{mb:2}}>Treatment Center Details</Box>
                    <Grid container spacing={2}>
                    <Grid item sm={12}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                       Treatment Center
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.emergencyTreatmentCenterViewModel?.name || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                
                    </Grid>
            </Card>
          <Card sx={{ p: 3, pb: 10, mb: 2 }}>
                <Box sx={{mb:2}}>Dispatch Details</Box>
                    <Grid container spacing={2}>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                       Dispatch Full Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.dispatchFullName || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Date Dispatched
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.dispatchDate || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                
                    </Grid>
            </Card>
    
          <Card sx={{ p: 3, pb: 10, mb: 2 }}>
                <Box sx={{mb:2}}>Supervisor Details</Box>
                    <Grid container spacing={2}>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                     First Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.supervisorFirstName || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Last Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.supervisorLastName || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Middle Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.supervisorMiddleName || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={4}>
                    <ListItem>
                      <ListItemText primary={<Typography>
                        Date
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.supervisorDate || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                
                    </Grid>
            </Card>
          <Card sx={{ p: 3, pb: 10, mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <ListItem>
                  <ListItemText primary={<Typography>
                    Serial No
                  </Typography>} 
                  secondary={
                    <Typography sx={{color:"#7b939c"}} >{content?.serialNo || "Not Available"}</Typography>
                  } />
                </ListItem>
              </Grid>
            </Grid>
            </Card>
            <Card sx={{ p: 3, pb: 10, mb: 2 }}>
                <Box sx={{mb:2}}>Ambulance Location</Box>
                  <Grid container spacing={2}>
                    <Grid item sm={12}>
                    {ambulance.length > 0 &&  <AmbulanceMap newAmbulances={ambulance} />}
                    </Grid>
                  </Grid>
            </Card>
        </Container>
      </Page>
    );
  };
  
  export default ViewIncident;
  