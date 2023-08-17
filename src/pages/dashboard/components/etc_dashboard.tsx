import { FC } from "react";
import {  Grid ,Typography} from "@mui/material";
 import { ambData, claimsData } from "../../../db";
import {  UserWelcome } from "../../../components/_dashboard/general-app";
import ClaimsCard from "../../../components/_dashboard/general-app/ClaimsCard";
import { useAuthUserContext } from "../../../context/authUser.context";

const ETCDasboard: FC = () => {
   const {
    userState: { userProfile },
  } = useAuthUserContext();

  return (
    <Grid container spacing={3}>
    <Grid item xs={12} md={12}>
          <UserWelcome displayName={userProfile?.firstName ?? "ETC User"} />
        </Grid>
        
        <Grid item xs={12} md={12} sx={{mb:-2, mt:4}}>
        <Typography variant="h4">ETC - {userProfile?.organisationName}</Typography>
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

export default ETCDasboard;
