import { useEffect, useState ,lazy} from 'react'
import axiosInstance from '../../services/api_service';

const CustomTable = lazy(() => import("../../components/serviceproviders/serviceTable"))

const TABLE_HEAD = [
  { id: "sn", label: "S/N", alignRight: false },
  { id: "code", label: "Code", alignRight: false },
  { id: "description", label: "Description", alignRight: false },
  { id: "price", label: "Price", alignRight: false },
  { id: "dateAdded", label: "Date Added", alignRight: false },
  { id: "" },
];


const ServiceProvidersManagement = () => {
  const [serviceProviders, setServiceProviders] = useState<any>([]);
  const [loading,setLoading] = useState(true)

  const fetchAllServiceProviders = () =>{
    setLoading(true)
    axiosInstance
      .get(`ServicesAndFees/get`)
      .then((res) => {
        setServiceProviders(res?.data?.data)
      })
      .catch((error) => {
        console.log(error);
      }).finally(()=>{
        setLoading(false)
      })
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