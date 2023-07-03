import { FC, useEffect, useState,lazy } from "react";
import axiosInstance from "../../services/api_service";

const CustomTable = lazy(() => import("../../components/incidents/table"))


const TABLE_HEAD = [
  { id: "s/n", label: "S/N", alignRight: false },
  { id: "category", label: "Category", alignRight: false },
  { id: "location", label: "Location", alignRight: false },
  { id: "ambulance_type", label: "Ambulance Type", alignRight: false },
  { id: "date", label: "Date", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "" },
];

 
const Incidents: FC = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading,setLoading] = useState(true)

  const fetchIncidents = () =>{
    setLoading(true)
    axiosInstance
      .get(`incidents`)
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
    fetchIncidents()
  }, []);
  return (
    <><CustomTable page_title='Incidents' loading={loading} table_Head={TABLE_HEAD} dataList={incidents} fetchAllData={fetchIncidents} /></>

  );
};

export default Incidents;
