import { FC } from "react";
import {  Grid ,Typography} from "@mui/material";
 import { ambData, claimsData } from "../../../db";
import {  UserWelcome } from "../../../components/_dashboard/general-app";
import ClaimsCard from "../../../components/_dashboard/general-app/ClaimsCard";
import { useAuthUserContext } from "../../../context/authUser.context";
import SwiperCard from "../../../components/_dashboard/general-app/swiperCard";

const AmbulanceDashboard: FC = () => {
   const {
    userState: { userProfile },
  } = useAuthUserContext();

  return (
    <Grid container spacing={3}>
    <Grid item xs={12} md={8}>
          <UserWelcome displayName={userProfile?.name ?? "John Doe"} />
        </Grid>
        <Grid item xs={12} md={4}>
          <SwiperCard />
        </Grid>
        <Grid item xs={12} md={12} sx={{mb:-2, mt:4}}>
        <Typography variant="h4">ETC - Gwarinpa General Hospital Dashboard</Typography>
        </Grid>
        {ambData?.map((dt, index) => (
          <Grid item xs={12} md={6} key={index}>
            <ClaimsCard
              color={dt?.color}
              title={dt?.title}
              value={dt?.value}
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
        </Grid>
  );
};

export default AmbulanceDashboard;
