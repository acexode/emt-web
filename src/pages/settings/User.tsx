import { useEffect, useState ,lazy} from 'react'
import axiosInstance from '../../services/api_service';
const CustomTable = lazy(() => import("../../components/users/userTable"))

const TABLE_HEAD = [
  { id: "sn", label: "S/N", alignRight: false },
  { id: "firstName", label: "First Name", alignRight: false },
  { id: "lastName", label: "Last Name", alignRight: false },
  { id: "middleName", label: "Middle Name", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "userType", label: "User Type", alignRight: false },
  { id: "phone", label: "Phone", alignRight: false },
  { id: "" },
];


const UserManagement = () => {
  const [users, setUsers] = useState<any>([]);
  const [loading,setLoading] = useState(true)

    useEffect(()=>{
   
  },[])
  const fetchAllUsers = () =>{
    setLoading(true)
   
    axiosInstance
    .get(`Account/getUsers`)
    .then((res) => {
        setUsers(res?.data?.data)
    })
    .catch((error) => {
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
    <CustomTable page_title='Users' loading={loading} table_Head={TABLE_HEAD} dataList={users} fetchAllUsers={fetchAllUsers} />
    </>
  )
}

export default UserManagement