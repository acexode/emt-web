import { useEffect, useState ,lazy} from 'react'
// import axiosInstance from '../../services/api_service';

const CustomTable = lazy(() => import("../../components/patients/patientTable"))
const status = [
    "Discharged",
    "Awaiting Discharge",
    "Treatment In Progress"
  ]

  const incidentTypes = ["Domestic Accidents","Fire Accidents"]

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

  const fetchAllUsers = () =>{
    setLoading(true)
    const data = []; 
    const getRandomValue = (array: string | any[]) => {
      const randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    };
    for (let i = 1; i <= 10; i++) {
      const obj = {
        sn: i,
        firstName: getRandomValue(["John", "Jane", "Mike", "Sarah"]),
        lastName: getRandomValue(["Doe", "Smith", "Johnson", "Brown"]),
        age: getRandomValue(["20 years", "30 years", "45 years"]),
        type: getRandomValue(incidentTypes),
        status: getRandomValue(status)
      };
      data.push(obj);
    }
    setUsers(data)
    setLoading(false)
    // axiosInstance
    //   .get(`users`)
    //   .then((res) => {
    //     if(res?.data?.name === "SequelizeAccessDeniedError"){
    //       setUsers([])
    //     }
    //     else{
            
    //       setUsers(res?.data)
    //     }
   
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   }).finally(()=>{
    //     setLoading(false)
    //   })
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