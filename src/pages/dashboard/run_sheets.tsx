import { FC, useEffect, useState } from "react";
// import axiosInstance from "../../services/api_service";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import Page from "../../components/Page";
import { PATH_DASHBOARD } from "../../routes/paths";
import useSettings from "../../hooks/useSettings";
import {
    Container,
    Grid,
    ListItem,
    ListItemText,
    Typography,
    Card,
    Box,
    TextField,
  } from "@mui/material";
import { ambulance_run_sheets } from "../../db";
 
const RunSheets: FC = () => {
    const { themeStretch } = useSettings();

  const [ambulanceRunSheets, _setAmbulanceRunSheets] = useState(ambulance_run_sheets);
  // const [loading,setLoading] = useState(false)

  // const fetchAllAmbulanceRunSheets = () =>{
  //   setLoading(true)
  //   axiosInstance
  //     .get(`ambulance_run_sheets`)
  //     .then((res) => {
  //       setAmbulanceRunSheets(res?.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     }).finally(()=>{
  //       setLoading(false)
  //     })
  // }
  useEffect(() => {
    // fetchAllAmbulanceRunSheets()
  }, []);
  return (
    <Page title={`Ambulance Run Sheets | EMT`}>
        <Container maxWidth={themeStretch ? false : "lg"}>
          <HeaderBreadcrumbs
            heading={`Ambulance Run Sheets`}
            links={[
              { name: "Dashboard", href: PATH_DASHBOARD.root },
              { name: `Ambulande Run Sheets`, href: PATH_DASHBOARD.ambulance_run_sheets.root },
              { name: "List" },
            ]}
          />
           <Typography variant="h6" component="div">
          </Typography>
          <Grid container spacing={2} sx={{mb:1}} justifyContent={"end"}>
             <Grid item sm={4} >
                <Box sx={{mb:1}}>See List of Dates?</Box>
                <TextField
                    name="dates"
                    variant="outlined"
                    fullWidth
                    type="date"
                    />
            </Grid>
            </Grid>
            {ambulanceRunSheets?.map((runSheets, index) =>(
                <Card sx={{ p: 3, mb: 2 }} key={index}>
                    <ListItem secondaryAction={  <Typography sx={{color:"blue", cursor:"pointer"}} >{   runSheets?.ambulance_service_provider || "Not Available"}</Typography>}>
                  <ListItemText primary={`Incident No: ${runSheets?.incident_no}`} />
                </ListItem>

                </Card>
            ))}
        </Container>
      </Page>

  );
};

export default RunSheets;
