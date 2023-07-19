import { FC } from "react";
import useSettings from "../../hooks/useSettings";
import { Container} from "@mui/material";
import Page from "../../components/Page";
// import { useAuthUserContext } from "../../context/authUser.context";
import ETCDashboard from "./components/etc_dashboard";
import AmbulanceDashboard from "./components/ambulance_dashboard";
import tokenService from "../../services/tokenService";
import { userType } from "../../constants";

const GeneralApp: FC = () => {
  const { themeStretch } = useSettings();
  // const {
  //   userState: { userProfile },
  // } = useAuthUserContext();
  const user = tokenService.getUser();


  return (
    <Page title="General: App | EMT">
      <Container maxWidth={themeStretch ? false : "xl"}>
        {user?.type === userType.etc_user ? <ETCDashboard />  :   <AmbulanceDashboard /> }
  
   
      </Container>
    </Page>
  );
};

export default GeneralApp;
