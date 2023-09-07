import { FC, useEffect, useState,lazy } from "react";
// import { claimsData2 } from "../../db";
import axiosInstance from "../../services/api_service";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {Box} from '@mui/material';
// import tokenService from "../../services/tokenService";
import { userType } from "../../constants";
import { useAuthUserContext } from "../../context/authUser.context";
const CustomTable = lazy(() => import("../../components/claims/table"))
const CustomClaimAmbTable = lazy(() => import("../../components/claims/ambClaims"))


const TABLE_HEAD = [
  { id: "s/n", label: "S/N", alignRight: false },
  { id: "serviceProvider", label: "Service Provider", alignRight: false },
  { id: "incidentCategory", label: "Incident Category", alignRight: false },
  { id: "patientName", label: "Patient Name", alignRight: false },
  { id: "incidentDate", label: "Incident Date", alignRight: false },
  { id: "totalAmount", label: "Total Amount", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "" },
];

const TABLE_HEAD_AMB = [
  { id: "s/n", label: "S/N", alignRight: false },
  { id: "incidentCategory", label: "Incident Category", alignRight: false },
  { id: "patientName", label: "Patient Name", alignRight: false },
  { id: "incidentDate", label: "Incident Date", alignRight: false },
  { id: "distanceCovered", label: "Distance Covered", alignRight: false },
  { id: "nhia", label: "NHIA", alignRight: false },
  { id: "totalAmount", label: "Total Price", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "" },
];
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
 
const Claims: FC = () => {
  const [ambulanceClaims, setAmbulanceClaims] = useState([]);
  const [etcClaims, setETCClaims] = useState([]);
  const [loading,setLoading] = useState(false)
  const [value, setValue] = useState(0);
  const {
    userState: { userProfile },
  } = useAuthUserContext();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const fetchAllData = async () => {
    setLoading(true);
    let obj = {
      id: userProfile?.ambulanceId
    };
    let obj2 = {
      id: 1
    };
  
    try {
      const ambRes = await axiosInstance.post(`Claims/getByAssignedAmbulance`, obj);
      setAmbulanceClaims(ambRes?.data?.data ?? []);
    } catch (error) {
      console.log("Error fetching ambulance claims:", error);
    }
  
    try {
      const etcRes = await axiosInstance.post(`Claims/getByAssignedETC`, obj2);
      setETCClaims(etcRes?.data?.data ?? []);
    } catch (error) {
      console.log("Error fetching ETC claims:", error);
    }
  
    setLoading(false);
  };
  
  useEffect(() => {
    fetchAllData();
  }, []);
  

  return (
    <>
    {userType.etc_user === userProfile?.userRole ?      <CustomTable page_title='Emergency Treatment Centre' loading={loading} table_Head={TABLE_HEAD} dataList={etcClaims} fetchAllData={fetchAllData} type="etc" />
 : 
    <Box sx={{ width: '100%' }}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' ,mx:6}}>
      <Tabs value={value} onChange={handleChange}  TabIndicatorProps={{
      style: {
        backgroundColor: 'hsl(0, 100%, 27%)', // Change this to the desired color
      },
    }}
        aria-label="basic tabs example">
        <Tab label="Ambulance Claims" {...a11yProps(0)} />
        <Tab label="ETC Claims" {...a11yProps(1)} />
    
      </Tabs>
    </Box>
    <TabPanel value={value} index={0}>
    <CustomClaimAmbTable page_title='Ambulance' loading={loading} table_Head={TABLE_HEAD_AMB} dataList={ambulanceClaims} fetchAllData={fetchAllData} type="ambulance" />

    </TabPanel>
    <TabPanel value={value} index={1}>
    <CustomTable page_title='Emergency Treatment Centre' loading={loading} table_Head={TABLE_HEAD} dataList={etcClaims} fetchAllData={fetchAllData} type="etc" />
    </TabPanel>
    </Box>
      }
    
    </>

  );
};

export default Claims;
