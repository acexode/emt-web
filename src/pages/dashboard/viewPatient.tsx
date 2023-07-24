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
  
  import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
  import Page from "../../components/Page";
  import { PATH_DASHBOARD } from "../../routes/paths";
  import useSettings from "../../hooks/useSettings";
  
  const ViewPatient: FC = () => {
    const { themeStretch } = useSettings();
    const [content, SetContent] = useState<any>(null);
    // const [loading,setLoading] = useState(true)
    // const {
    //     state: { row},
    //   } = useLocation();
        useEffect(()=>{
          const objectData = {
            incidentCode:"A89748",
            incidentType: "Road Accident",
            ambulance_name:"R & R Ambulance Service",
           patientName:"Jane Peter",
           age: "34 years",
           gender:"Female",
           address:"No. 3, Ken Street, Life Camp",
           nhia:"A3786236",
           arrivalTime: "10:02pm 24th July, 2023",
           mainComplaints:"Chest Pain",
           primary_survey:"N/A",
           physical_exam_findings:"Normal",
           triage_category: "Urgent",
           time:"9:47pm",
           pulse:"88",
           blood_pressure:"147/91 ",
           resp:"32 b/m ",
           glucose:"10.9 mmol/L",
           so02:"76%",
           mental_status:"Unresponsive",
           immediate_treatment_time:"9:48pm ",
           medical_intervention:"Cardiopulmonary resuscitation",
           dose:"Nil",
           iv:"No"
          }
            SetContent(objectData)
        },[])
  
        const handlePrint = () => {
          window.print();
        }
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
                      Patient Name
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.patientName || "Not Available"}</Typography>
                      } />
                    </ListItem>
                    </Grid>
                    <Grid item sm={6}>
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
                      Gender
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >{content?.gender || "Not Available"}</Typography>
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
        </Container>
      </Page>
    );
  };
  
  export default ViewPatient;
  