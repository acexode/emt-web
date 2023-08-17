import { FC,useEffect, useState,lazy } from "react";

import axiosInstance from "../../services/api_service";
import { useAuthUserContext } from "../../context/authUser.context";
import { ITransferSheets } from "../../types/transfer_form";
const CustomTable = lazy(() => import("../../components/runsheets/runSheets"))

const TABLE_HEAD = [
  { id: "s/n", label: "S/N", alignRight: false },
  { id: "patientName", label: "Patient", alignRight: false },
  { id: "name", label: "Facility", alignRight: false },
  { id: "amb_name", label: "Ambulance", alignRight: false },
  { id: "routeFrom", label: "Route From", alignRight: false },
  { id: "routeTo", label: "Route To", alignRight: false },
  { id: "takeOffTime", label: "Take Off Time", alignRight: false },
  { id: "arrivalTime", label: "Arrival Time", alignRight: false },
  { id: "traiageCategory", label: "Triage Category", alignRight: false },
  { id: "" },
];

const RunSheets: FC = () => {
  const [ambulanceRunSheets,setAmbulanceRunSheets] = useState<ITransferSheets[]>([]);
  const [loading,setLoading] = useState(true)

  const {
    userState: { userProfile },
  } = useAuthUserContext();

  const fetchAllAmbulanceRunSheets = () =>{
    let val = {
      id: userProfile?.etcId
    }
    setLoading(true)
    axiosInstance
      .post(`TransferForms/getByAssignedETC`,val)
      .then((res) => {
        setAmbulanceRunSheets(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      }).finally(()=>{
        setLoading(false)
      })
  }
  useEffect(() => {
    fetchAllAmbulanceRunSheets()
  }, []);

  return (
    <>
    <CustomTable page_title='Transfer Forms' loading={loading} table_Head={TABLE_HEAD} dataList={ambulanceRunSheets} fetchAllData={fetchAllAmbulanceRunSheets} /></>
  );
};

export default RunSheets;
