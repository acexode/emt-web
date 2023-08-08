import { useEffect, useState ,lazy} from 'react'
import axiosInstance from '../../services/api_service';
// import axiosInstance from '../../services/api_service';

const CustomTable = lazy(() => import("../../components/users/userTable"))
const states = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Federal Capital Territory",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara"
  ];

const TABLE_HEAD = [
  { id: "sn", label: "S/N", alignRight: false },
  { id: "firstName", label: "First Name", alignRight: false },
  { id: "lastName", label: "Last Name", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "role", label: "Role", alignRight: false },
  { id: "type", label: "Type", alignRight: false },
  { id: "state", label: "State", alignRight: false },
  { id: "" },
];


const UserManagement = () => {
  const [users, setUsers] = useState<any>([]);
  const [loading,setLoading] = useState(true)

    useEffect(()=>{
    axiosInstance
    .get(`Account/getUsers`)
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
      console.log(error);
    })
  },[])
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
        email: getRandomValue(["example1@example.com", "example2@example.com", "example3@example.com"]),
        role: getRandomValue(["Admin", "User", "Manager"]),
        type: getRandomValue(["Type1", "Type2", "Type3"]),
        state: getRandomValue(states)
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
    <CustomTable page_title='Users' loading={loading} table_Head={TABLE_HEAD} dataList={users} fetchAllUsers={fetchAllUsers} />
    </>
  )
}

export default UserManagement