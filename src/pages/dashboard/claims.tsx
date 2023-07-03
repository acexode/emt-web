import { FC, useEffect, useState,lazy } from "react";
import axiosInstance from "../../services/api_service";
const CustomTable = lazy(() => import("../../components/claims/table"))


const TABLE_HEAD = [
  { id: "s/n", label: "S/N", alignRight: false },
  { id: "category", label: "Category", alignRight: false },
  { id: "location", label: "Location", alignRight: false },
  { id: "ambulance_type", label: "Ambulance Type", alignRight: false },
  { id: "date", label: "Date", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "" },
];

 
const Claims: FC = () => {
  const [claims, setClaims] = useState([]);
  const [loading,setLoading] = useState(true)

  const fetchAllData = () =>{
    setLoading(true)
    axiosInstance
      .get(`claims`)
      .then((res) => {
        setClaims(res?.data);
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
    <><CustomTable page_title='Claims' loading={loading} table_Head={TABLE_HEAD} dataList={claims} fetchAllData={fetchAllData} /></>

  );
};

export default Claims;
