import { FC, useEffect, useState,lazy } from "react";
import axiosInstance from "../../services/api_service";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {Box} from '@mui/material';

const CustomTable = lazy(() => import("../../components/serviceproviders/serviceTable"))
const CustomTableETC = lazy(() => import("../../components/serviceproviders/serviceTableETC"))

const TABLE_HEAD_ETC = [
  { id: "s/n", label: "S/N", alignRight: false },
  { id: "name", label: "Name", alignRight: false },
  { id: "location", label: "location", alignRight: false },
  { id: "landmark", label: "Landmark", alignRight: false },
  { id: "hospitalType", label: "Hospital Type", alignRight: false },
  { id: "address1", label: "Address 1", alignRight: false },
  { id: "address2", label: "Address 2", alignRight: false },
  { id: "lga", label: "LGA", alignRight: false },
  { id: "state", label: "State", alignRight: false },
  { id: "dateAdded", label: "Date Added", alignRight: false },
  { id: "" },
];
const TABLE_HEAD_AMB = [
  { id: "s/n", label: "S/N", alignRight: false },
  { id: "name", label: "Name", alignRight: false },
  { id: "location", label: "Location", alignRight: false },
  { id: "code", label: "Code", alignRight: false },
  { id: "dateAdded", label: "Date Added", alignRight: false },
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
  const [ambulanceServices, setAmbulanceServices] = useState([]);
  const [etcServices, setETCServices] = useState([]);
  const [loading,setLoading] = useState(false)
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const fetchAllData = async () => {
    setLoading(true)
    try {
      const [ambRes, etcRes] = await Promise.all([
        axiosInstance.get(`Ambulances/get`),
        axiosInstance.get(`EmergencyCenters/get`),
      ]);
      setAmbulanceServices(ambRes?.data?.data)
      setETCServices(etcRes?.data?.data)
    } catch (error) {
      console.log(error);
     
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <>
   
    <Box sx={{ width: '100%' }}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' ,mx:6}}>
      <Tabs value={value} onChange={handleChange}  TabIndicatorProps={{
      style: {
        backgroundColor: 'hsl(0, 100%, 27%)', // Change this to the desired color
      },
    }}
        aria-label="basic tabs example">
        <Tab label="Ambulance Services" {...a11yProps(0)} />
        <Tab label="ETC Services" {...a11yProps(1)} />
    
      </Tabs>
    </Box>
    <TabPanel value={value} index={0}>
    <CustomTable page_title='Ambulance' loading={loading} table_Head={TABLE_HEAD_AMB} dataList={ambulanceServices} fetchAllData={fetchAllData}   />

    </TabPanel>
    <TabPanel value={value} index={1}>
    <CustomTableETC page_title='Emergency Treatment Centre' loading={loading} table_Head={TABLE_HEAD_ETC} dataList={etcServices} fetchAllData={fetchAllData} />
    </TabPanel>
    </Box>
     
    
    </>

  );
};

export default Claims;
