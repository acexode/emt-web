import { FC, useEffect, useState } from "react";
import {  Card, CardHeader, Grid ,Typography} from "@mui/material";
 import { cardData2 } from "../../../db";
import {  FinancialCard, HumanResourcesCard, ServicesCard, UserWelcome } from "../../../components/_dashboard/general-app";
import ClaimsCard from "../../../components/_dashboard/general-app/ClaimsCard";
import ServicesCardTwo from "../../../components/_dashboard/general-app/ServiceCardTwo";
import { useAuthUserContext } from "../../../context/authUser.context";
import AmbulanceMap from "../../../components/_dashboard/general-app/map";
import axiosInstance from "../../../services/api_service";
import { IClaims, IServiceCard } from "../../../db/types";

const NEMSASDashboard: FC = () => {
  const [incidents, setIncidents] = useState([]);
  const [totalClaims,setTotalClaims]= useState<any>()
  const [totalApprovedClaims,setTotalApprovedClaims]= useState<any>()
  const [totalRejectedClaims,setTotalRejectedClaims]= useState<any>()
  const [totalPendingClaims,setTotalPendingClaims]= useState<any>()
  const [totalIncidents,setTotalIncidents] = useState<any>()
  const [totalAmbulances,setTotalAmbulances] = useState<any>()
  const [totalETC,setTotalETC] = useState<any>()

   const {
    userState: { userProfile },
  } = useAuthUserContext();

  useEffect(()=>{
    axiosInstance.get('Dashboard/dashboard').then(res =>{
      console.log(res?.data);
    }).catch(error =>{
      console.log(error)
    })
  },[])

  useEffect(() => {
  
    axiosInstance.get(`Claims/get`).then((res) =>{
      setTotalClaims(res?.data?.data?.length)
      const approved = res?.data?.data?.filter((dt: { status: string; }) => dt?.status === "Approved")
      const rejected = res?.data?.data?.filter((dt: { status: string; }) => dt?.status === "Rejected")
      const pending = res?.data?.data?.filter((dt: { status: string; }) => dt?.status === "New")
      setTotalApprovedClaims(approved?.length)
      setTotalRejectedClaims(rejected?.length)
      setTotalPendingClaims(pending?.length)
    }).catch(error =>{
      console.log(error)
    })
  }, []);

  useEffect(()=>{
    axiosInstance
    .get(`Incidents/get`)
    .then((res) => {
      setTotalIncidents(res?.data?.totalCount)
      const obj = res?.data?.data?.map((dt: { id: any; latitude: any; longitude: any; ambulanceViewModel: { name: any; }; }) =>{
        return {
          id: dt?.id,
          lat: dt?.latitude,
          lng:dt?.longitude,
          name:dt?.ambulanceViewModel?.name
        }
      })
      setIncidents(obj)
    })
    .catch((error) => {
      console.log(error);
    })
  },[])

  useEffect(()=>{
    axiosInstance.get(`Ambulances/get`).then(res =>{
      setTotalAmbulances(res?.data?.totalCount)
    }).catch(error =>{
      console.log(error)
    })
  },[])
  useEffect(()=>{
    axiosInstance.get(`EmergencyCenters/get`).then(res =>{
      setTotalETC(res?.data?.totalCount)
    }).catch(error =>{
      console.log(error)
    })
  },[])

  const claimsData:IClaims[] =[
    {
      color: "#90EE90",
      title:"Total",
      value:totalClaims,  
    },
    {
      color: "#00ab55",
      title:"Approved",
      value:totalApprovedClaims,
    },
    {
      color: "hsl(3, 34%, 61%)",
      title:"Rejected",
      value:totalRejectedClaims,
    },
    {
      color: "#D3D3D3",
      title:"Pending Review",
      value:totalPendingClaims,
    },
  ]

   const cardData:IServiceCard[] =[
    {
      color: "#26b76e",
      title:"Incidents",
      value:totalIncidents,
	  show:false
  
    },
    {
      color: "#536cbe",
      title:"Dispatches",
      value:"16",
	  show:false
  
    },
    {
      color: "#4ca8ff",
      title:"Ambulances",
      value:totalAmbulances,
	  show:false
  
    },
    {
      color: "#ff825c",
      title:"Emergency Centers",
      value:totalETC,
	  show:false
  
    },
  
  ]

  return (
    <Grid container spacing={3}>
    <Grid item xs={12} md={12}>
          <UserWelcome displayName={userProfile?.firstName ?? "NEMSAS User"} />
        </Grid>
        
    <Grid item xs={12} md={12} sx={{mb:-2, mt:4}}>
        <Typography variant="subtitle1">Accreditions <Typography variant="caption">(As of Today)</Typography> </Typography>
        </Grid>
    {cardData2?.map((dt, index) => (
          <Grid item xs={12} md={3} key={index}>
            <ServicesCardTwo
              color={dt?.color}
              title={dt?.title}
              value={dt?.value}
              show={dt?.show}
              percentage={dt?.percentage}
            />
          </Grid>
        ))}
    {cardData?.map((dt, index) => (
          <Grid item xs={12} md={3} key={index}>
            <ServicesCard
              color={dt?.color}
              title={dt?.title}
              value={dt?.value}
              show={dt?.show}
            />
          </Grid>
        ))}
        <Grid item xs={12} md={12} sx={{mb:-2, mt:4}}>
        <Typography variant="subtitle1">Claims</Typography>
        </Grid>
        {claimsData?.map((dt, index) => (
          <Grid item xs={12} md={6} key={index}>
            <ClaimsCard
              color={dt?.color}
              title={dt?.title}
              value={dt?.value}
            />
          </Grid>
        ))}
        <Grid item xs={12} md={6} lg={6}>
          <FinancialCard />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <HumanResourcesCard />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Card>
          <CardHeader title="DISPATCHED AMBULANCES" />
         { <AmbulanceMap newAmbulances={incidents} />}
          </Card>
        </Grid>
        </Grid>
  );
};

export default NEMSASDashboard;
