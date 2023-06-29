import { FC } from "react";
import useSettings from "../../hooks/useSettings";
import { Container } from "@mui/material";
import Page from "../../components/Page";




const GeneralApp: FC = () => {
  const { themeStretch } = useSettings();
//   const {
//     userState: { userProfile },
//   } = useAuthUserContext();

  return (
    <Page title="General: App | EMT">
      <Container maxWidth={themeStretch ? false : "xl"}>
 
      </Container>
    </Page>
  );
};

export default GeneralApp;
