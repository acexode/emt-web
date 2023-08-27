import { FC, useEffect, useState,lazy } from "react";
import { useAuthUserContext } from "../../context/authUser.context";
import axiosInstance from "../../services/api_service";

const CustomTable = lazy(() => import("../../components/runsheets/nemsas_runsheets"))


const TABLE_HEAD = [
  { id: "s/n", label: "S/N", alignRight: false },
  { id: "patientName", label: "Patient", alignRight: false },
  { id: "name", label: "Facility", alignRight: false },
  { id: "amb_name", label: "Ambulance", alignRight: false },
  { id: "routeFrom", label: "Route From", alignRight: false },
  { id: "routeTo", label: "Route To", alignRight: false },
  { id: "takeOffTime", label: "Take Off Time", alignRight: false },
  { id: "arrivalTime", label: "Arrival Time", alignRight: false },
  { id: "totalMinutesToHospital", label: "Total Time (mins)", alignRight: false },
  { id: "traiageCategory", label: "Triage Category", alignRight: false },
  { id: "price", label: "Price", alignRight: false },
  // { id: "approve", label: "Status", alignRight: false },
  { id: "" },
];

const NemsasRunSheets: FC = () => {
  const [ambulanceRunSheets, setAmbulanceRunsheets] = useState([]);
  const [loading,setLoading] = useState(false)
  const {
    userState: { userProfile },
  } = useAuthUserContext();

  const fetchAllData = () =>{
    let val = {
      id: userProfile?.ambulanceId
    }
    setLoading(true)
    axiosInstance
      .post(`Runsheets/getByAssignedAmbulance`,val)
      .then((res) => {
    
        setAmbulanceRunsheets(res?.data?.data);
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
    <><CustomTable page_title='Ambulance Run Sheets' loading={loading} table_Head={TABLE_HEAD} dataList={ambulanceRunSheets} fetchAllData={fetchAllData} /></>

  );
};

export default NemsasRunSheets;
