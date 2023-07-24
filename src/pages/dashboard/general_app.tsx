import { FC } from "react";
import useSettings from "../../hooks/useSettings";
import { Container} from "@mui/material";
import Page from "../../components/Page";
// import { useAuthUserContext } from "../../context/authUser.context";
import NamsasDashboard from "./components/nemsas_dashboard";
import ETCDashboard from "./components/etc_dashboard";
import tokenService from "../../services/tokenService";
import { userType } from "../../constants";

const GeneralApp: FC = () => {
  const { themeStretch } = useSettings();
  // const {
  //   userState: { userProfile },
  // } = useAuthUserContext();
  const user = tokenService.getUser();


  return (
    <Page title="General: App | NEMSAS">
      <Container maxWidth={themeStretch ? false : "xl"}>
        {user?.type === userType.etc_user ? <ETCDashboard />  :   <NamsasDashboard /> }
  
   
      </Container>
    </Page>
  );
};

export default GeneralApp;
