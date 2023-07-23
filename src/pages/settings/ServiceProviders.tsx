import { useEffect, useState ,lazy} from 'react'
// import axiosInstance from '../../services/api_service';

const CustomTable = lazy(() => import("../../components/serviceproviders/serviceTable"))
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
  { id: "type", label: "Type", alignRight: false },
  { id: "state", label: "State", alignRight: false },
  { id: "" },
];


const ServiceProvidersManagement = () => {
  const [serviceProviders, setServiceProviders] = useState<any>([]);
  const [loading,setLoading] = useState(true)

  const fetchAllServiceProviders = () =>{
    setLoading(true)
    const data = []; 
    const getRandomValue = (array: string | any[]) => {
      const randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    };
    for (let i = 1; i <= 10; i++) {
      const obj = {
        sn: i,
        type: getRandomValue(["Ambulance", "ETC"]),
        state: getRandomValue(states)
      };
      data.push(obj);
    }
    setServiceProviders(data)
    setLoading(false)
    // setLoading(true)
    // axiosInstance
    //   .get(`serviceProviders`)
    //   .then((res) => {
    //     if(res?.data?.name === "SequelizeAccessDeniedError"){
    //       setServiceProviders([])
    //     }
    //     else{
    //       setServiceProviders(res?.data)
    //     }
   
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   }).finally(()=>{
    //     setLoading(false)
    //   })
  }
  useEffect(() => {
    fetchAllServiceProviders()
  }, []);
  return (
    <>
    <CustomTable page_title='Service Providers' loading={loading} table_Head={TABLE_HEAD} dataList={serviceProviders} fetchAllData={fetchAllServiceProviders} />
    </>
  )
}

export default ServiceProvidersManagement