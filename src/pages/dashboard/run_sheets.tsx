import { FC,useEffect, useState,lazy } from "react";

import axiosInstance from "../../services/api_service";
import { useAuthUserContext } from "../../context/authUser.context";
import { ITransferSheets } from "../../types/transfer_form";
const CustomTable = lazy(() => import("../../components/runsheets/runSheets"))

const TABLE_HEAD = [
  { id: "s/n", label: "S/N", alignRight: false },
  { id: "incidentViewModel?.patientViewModel.lastName", label: "Patient", alignRight: false },
  { id: "incidentViewModel.emergencyTreatmentCenterViewModel.name", label: "Facility", alignRight: false },
  { id: "incidentViewModel.ambulanceViewModel.name", label: "Ambulance", alignRight: false },
  { id: "arrivalTime", label: "Arrival Time", alignRight: false },
  { id: "incidentViewModel.traiageCategory", label: "Triage Category", alignRight: false },
  { id: "approve", label: "Status", alignRight: false },
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
        console.log(res?.data)
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
