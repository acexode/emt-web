import { useEffect, useState ,lazy} from 'react'
import { useAuthUserContext } from '../../context/authUser.context';
import axiosInstance from '../../services/api_service';

const CustomTable = lazy(() => import("../../components/patients/patientTable"))
const TABLE_HEAD = [
  { id: "sn", label: "S/N", alignRight: false },
  { id: "firstName", label: "First Name", alignRight: false },
  { id: "lastName", label: "Last Name", alignRight: false },
  { id: "age", label: "Age", alignRight: false },
  { id: "incidentType", label: "Incident Type", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "" },
];


const Patients = () => {
  const [users, setUsers] = useState<any>([]);
  const [loading,setLoading] = useState(true)
  const {
    userState: { userProfile },
  } = useAuthUserContext();
  
  const fetchAllUsers = () =>{
    setLoading(true)
    let val = {
      id: userProfile?.etcId
    }
      axiosInstance.post('Patients/getByAssignedETC',val).then(res =>{
        setUsers(res?.data?.data)
      }).catch(error =>{
        console.log(error);
      }).finally(()=>{
        setLoading(false)
      })
  }
  useEffect(() => {
    fetchAllUsers()
  }, []);
  return (
    <>
    <CustomTable page_title='Patient Records' loading={loading} table_Head={TABLE_HEAD} dataList={users} fetchAllUsers={fetchAllUsers} type="patient" />
    </>
  )
}

export default Patients