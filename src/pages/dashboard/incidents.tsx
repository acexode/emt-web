import { FC, useEffect, useState,lazy } from "react";
import axiosInstance from "../../services/api_service";

const CustomTable = lazy(() => import("../../components/incidents/table"))


const TABLE_HEAD = [
  { id: "s/n", label: "S/N", alignRight: false },
  { id: "incidentCategory", label: "Category", alignRight: false },
  { id: "incidentLocation", label: "Location", alignRight: false },
  { id: "ambulanceType", label: "Ambulance Type", alignRight: false },
  { id: "incidentDate", label: "Date", alignRight: false },
  { id: "treatmentCenter", label: "Treatment Center", alignRight: false },
  { id: "" },
];

 
const Incidents: FC = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading,setLoading] = useState(false)

  const fetchIncidents = () =>{
    setLoading(true)
    axiosInstance
      .get(`Incidents/get`)
      .then((res) => {
        setIncidents(res?.data?.data)
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
