import { FC, useEffect, useState,lazy } from "react";
import axiosInstance from "../../services/api_service";

const CustomTable = lazy(() => import("../../components/runsheets/runSheets"))


const TABLE_HEAD = [
  { id: "s/n", label: "S/N", alignRight: false },
  { id: "incident_code", label: "Incident Code", alignRight: false },
  { id: "date", label: "Date", alignRight: false },
  { id: "run_time", label: "Run Time", alignRight: false },
  { id: "ambulance_name", label: "Ambulance", alignRight: false },
  { id: "" },
];

const data = [
    {
        incident_code:"IN23402",
        date:"20-07-2023",
        run_time:"190mins",
        ambulance_name: "R & R Ambulance Service"
    },
    {
        incident_code:"IN23411",
        date:"20-03-2023",
        run_time:"180mins",
        ambulance_name: "Hibalance Ambulance Service"
    },
    {
        incident_code:"IN23987",
        date:"20-07-2023",
        run_time:"100mins",
        ambulance_name: "PneumaRS Ambulance Service"
    },

]
 
const NemsasRunSheets: FC = () => {
  const [incidents, setIncidents] = useState(data);
  const [loading,setLoading] = useState(false)

  const fetchAllData = () =>{
    setLoading(true)
    axiosInstance
      .get(`runsheets`)
      .then((res) => {
        setIncidents(res?.data);
      })
      .catch((error) => {
        console.log(error);
      }).finally(()=>{
        setLoading(false)
      })
  }
  useEffect(() => {
    // fetchAllData()
  }, []);
  return (
    <><CustomTable page_title='Ambulance Run Sheets' loading={loading} table_Head={TABLE_HEAD} dataList={incidents} fetchAllData={fetchAllData} /></>

  );
};

export default NemsasRunSheets;
