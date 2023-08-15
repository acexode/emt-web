import { FC, Key, useEffect, useState } from "react";
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
    Skeleton
  } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/api_service";
import { useAuthUserContext } from "../../context/authUser.context";
import { ITransferSheets } from "../../types/transfer_form";
 
const RunSheets: FC = () => {
  const { themeStretch } = useSettings();
  const [ambulanceRunSheets,setAmbulanceRunSheets] = useState<ITransferSheets[]>([]);
  const [loading,setLoading] = useState(true)

  const {
    userState: { userProfile },
  } = useAuthUserContext();
  let navigate = useNavigate()
  const handleClick = (data:any) =>{
    navigate(PATH_DASHBOARD.ambulance_run_sheets.viewRunSheet,{
      state: {data}
    })
  }
  

  const fetchAllAmbulanceRunSheets = () =>{
    let val = {
      id: userProfile?.etcId
    }
    setLoading(true)
    axiosInstance
      .post(`Runsheets/getByAssignedETC`,val)
      .then((res) => {
        setAmbulanceRunSheets(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      }).finally(()=>{
        setLoading(false)
      })
  }
  useEffect(() => {
    fetchAllAmbulanceRunSheets()
  }, []);
  let dummyData = [...Array(5)]

  return (
    <Page title={`Ambulance Transfer Form | NEMSAS`}>
        <Container maxWidth={themeStretch ? false : "lg"}>
          <HeaderBreadcrumbs
            heading={`Ambulance Transfer Form`}
            links={[
              { name: "Dashboard", href: PATH_DASHBOARD.root },
              { name: `Ambulance Transfer Form`, href: PATH_DASHBOARD.ambulance_run_sheets.root },
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

            {loading ? dummyData?.map((_dm,index) =>(
              <Card sx={{ p: 3, mb: 2 ,cursor:"pointer"}} key={index}>
                  <Skeleton variant="rectangular" width={1000} height={70} />                               
          </Card>
            )) :  ambulanceRunSheets?.map((runSheets: { incidentViewModel: {
              incidentCategory: any; ambulanceViewModel: { name: any; }; incidentLocation: any; 
}; }, index: Key | null | undefined) =>(
                <Card sx={{ p: 3, mb: 2 ,cursor:"pointer"}} key={index} onClick={() => handleClick(runSheets)}>
                    <ListItem secondaryAction={  <Typography sx={{color:"hsl(0, 100%, 27%)", cursor:"pointer"}} >{   runSheets?.incidentViewModel?.ambulanceViewModel?.name || "Not Available"}</Typography>}>
                  <ListItemText primary={`Incident Category: ${runSheets?.incidentViewModel?.incidentCategory}`} />
                </ListItem>

                </Card>
            ))}
        </Container>
      </Page>

  );
};

export default RunSheets;
