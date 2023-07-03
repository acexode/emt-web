import { FC } from "react";
import useSettings from "../../hooks/useSettings";
import { Container, Grid } from "@mui/material";
import Page from "../../components/Page";
import { cardData } from "../../db";
import { ServicesCard } from "../../components/_dashboard/general-app";




const GeneralApp: FC = () => {
  const { themeStretch } = useSettings();
//   const {
//     userState: { userProfile },
//   } = useAuthUserContext();

  return (
    <Page title="General: App | EMT">
      <Container maxWidth={themeStretch ? false : "xl"}>
      <Grid container spacing={3}>
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
          </Grid>
      </Container>
    </Page>
  );
};

export default GeneralApp;
