import { FC } from "react";
import {  Card, CardHeader, Grid ,Typography} from "@mui/material";
 import { cardData, cardData2, claimsData } from "../../../db";
import {  FinancialCard, HumanResourcesCard, ServicesCard, UserWelcome } from "../../../components/_dashboard/general-app";
import ClaimsCard from "../../../components/_dashboard/general-app/ClaimsCard";
import ServicesCardTwo from "../../../components/_dashboard/general-app/ServiceCardTwo";
import { useAuthUserContext } from "../../../context/authUser.context";
import AmbulanceMap from "../../../components/_dashboard/general-app/map";

const NEMSASDashboard: FC = () => {
   const {
    userState: { userProfile },
  } = useAuthUserContext();

  const newAmbulances = [
    { id: 1, lat: 9.0820, lng: 8.6753, name: 'Ambulance 1' }, // Example location within Nigeria (Abuja)
    { id: 2, lat: 6.5244, lng: 3.3792, name: 'Ambulance 2' }, // Example location within Nigeria (Lagos)
    { id: 3, lat: 7.5244, lng: 5.3792, name: 'Ambulance 3' }, // Example location within Nigeria (Lagos)
    { id: 4, lat: 5.5244, lng: 6.3792, name: 'Ambulance 4' }, // Example location within Nigeria (Lagos)
    { id: 5, lat: 6.5244, lng: 7.3792, name: 'Ambulance 5' }, // Example location within Nigeria (Lagos)
    // Add more ambulances here
  ];

  return (
    <Grid container spacing={3}>
    <Grid item xs={12} md={12}>
          <UserWelcome displayName={userProfile?.firstName ?? "NEMSAS User"} />
        </Grid>
        
    <Grid item xs={12} md={12} sx={{mb:-2, mt:4}}>
        <Typography variant="subtitle1">Accreditions <Typography variant="caption">(As of Today)</Typography> </Typography>
        </Grid>
    {cardData2?.map((dt, index) => (
          <Grid item xs={12} md={3} key={index}>
            <ServicesCardTwo
              color={dt?.color}
              title={dt?.title}
              value={dt?.value}
              show={dt?.show}
              percentage={dt?.percentage}
            />
          </Grid>
        ))}
    {cardData?.map((dt, index) => (
          <Grid item xs={12} md={3} key={index}>
            <ServicesCard
              color={dt?.color}
              title={dt?.title}
              value={dt?.value}
              show={dt?.show}
            />
          </Grid>
        ))}
        <Grid item xs={12} md={12} sx={{mb:-2, mt:4}}>
        <Typography variant="subtitle1">Claims</Typography>
        </Grid>
        {claimsData?.map((dt, index) => (
          <Grid item xs={12} md={6} key={index}>
            <ClaimsCard
              color={dt?.color}
              title={dt?.title}
              value={dt?.value}
            />
          </Grid>
        ))}
        <Grid item xs={12} md={6} lg={6}>
          <FinancialCard />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <HumanResourcesCard />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Card>
          <CardHeader title="DISPATCHED AMBULANCES" />
          <AmbulanceMap newAmbulances={newAmbulances} />
          </Card>
        </Grid>
        </Grid>
  );
};

export default NEMSASDashboard;
