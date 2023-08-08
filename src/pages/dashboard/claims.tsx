import { FC, useEffect, useState,lazy } from "react";
// import { claimsData2 } from "../../db";
import axiosInstance from "../../services/api_service";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import tokenService from "../../services/tokenService";
import { userType } from "../../constants";
import { useAuthUserContext } from "../../context/authUser.context";
const CustomTable = lazy(() => import("../../components/claims/table"))


const TABLE_HEAD = [
  { id: "s/n", label: "S/N", alignRight: false },
  { id: "serviceProvider", label: "Service Provider", alignRight: false },
  { id: "incident_code", label: "Incident Code", alignRight: false },
  { id: "patient_name", label: "Patient Name", alignRight: false },
  { id: "date", label: "Incident Date", alignRight: false },
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
  const [claims, setClaims] = useState([]);
  const [loading,setLoading] = useState(false)
  const [value, setValue] = useState(0);
  const {
    userState: { userProfile },
  } = useAuthUserContext();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  const fetchAllData = () =>{
    setLoading(true)
    axiosInstance
      .get(`Claims/get`)
      .then((res) => {
        setClaims(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      }).finally(()=>{
        setLoading(false)
      })
  }
  useEffect(() => {
    fetchAllData()
  }, []);
  return (
    <>
    {userType.etc_user === userProfile?.userRole ?      <CustomTable page_title='Emergency Treatment Centre' loading={loading} table_Head={TABLE_HEAD} dataList={claims} fetchAllData={fetchAllData} type="etc" />
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
    <CustomTable page_title='Ambulance' loading={loading} table_Head={TABLE_HEAD} dataList={claims} fetchAllData={fetchAllData} type="ambulance" />

    </TabPanel>
    <TabPanel value={value} index={1}>
    <CustomTable page_title='Emergency Treatment Centre' loading={loading} table_Head={TABLE_HEAD} dataList={claims} fetchAllData={fetchAllData} type="etc" />
    </TabPanel>
    </Box>
      }
    
    </>

  );
};

export default Claims;
