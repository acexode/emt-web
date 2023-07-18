import { FC } from "react";
import useSettings from "../../hooks/useSettings";
import { Container, Grid ,Typography} from "@mui/material";
import Page from "../../components/Page";
import { cardData, cardData2, claimsData } from "../../db";
import { ServicesCard } from "../../components/_dashboard/general-app";
import ClaimsCard from "../../components/_dashboard/general-app/ClaimsCard";

const GeneralApp: FC = () => {
  const { themeStretch } = useSettings();
//   const {
//     userState: { userProfile },
//   } = useAuthUserContext();

  return (
    <Page title="General: App | EMT">
      <Container maxWidth={themeStretch ? false : "xl"}>
      <Grid container spacing={3}>
      {cardData2?.map((dt, index) => (
            <Grid item xs={12} md={4} key={index}>
              <ServicesCard
                color={dt?.color}
                title={dt?.title}
                value={dt?.value}
                show={dt?.show}
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

      
          </Grid>
      </Container>
    </Page>
  );
};

export default GeneralApp;
