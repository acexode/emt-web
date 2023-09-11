import { FC } from "react";
import useSettings from "../../hooks/useSettings";
import { Container} from "@mui/material";
import Page from "../../components/Page";
import NamsasDashboard from "./components/nemsas_dashboard";
import ETCDashboard from "./components/etc_dashboard";
// import { userType } from "../../constants";
import { useAuthUserContext } from "../../context/authUser.context";

const GeneralApp: FC = () => {
  const { themeStretch } = useSettings();
  const {
    userState: { userProfile },
  } = useAuthUserContext();

  return (
    <Page title="General: App | NEMSAS">
      <Container maxWidth={themeStretch ? false : "xl"}>
        {userProfile?.etcId >= 1 ? <ETCDashboard />  :   <NamsasDashboard /> }
  
   
      </Container>
    </Page>
  );
};

export default GeneralApp;
