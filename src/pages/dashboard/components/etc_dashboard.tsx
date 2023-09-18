import { FC, useEffect, useState } from "react";
import {  Grid ,Typography} from "@mui/material";
import {  UserWelcome } from "../../../components/_dashboard/general-app";
import ClaimsCard from "../../../components/_dashboard/general-app/ClaimsCard";
import { useAuthUserContext } from "../../../context/authUser.context";
import axiosInstance from "../../../services/api_service";
import { IClaims } from "../../../db/types";

const ETCDasboard: FC = () => {
   const {
    userState: { userProfile },
  } = useAuthUserContext();

  const [totalIncidents,setTotalIncidents] = useState<any>()
  const [totalPatients,setTotalPatients] = useState<any>()
  const [totalClaims,setTotalClaims]= useState<any>()
  const [totalApprovedClaims,setTotalApprovedClaims]= useState<any>()
  const [totalRejectedClaims,setTotalRejectedClaims]= useState<any>()
  const [totalPendingClaims,setTotalPendingClaims]= useState<any>()

  useEffect(()=>{
    let val = {
      id: userProfile?.etcId
    }
    axiosInstance
    .post(`Incidents/getByAssignedETC`,val)
    .then((res) => {
   
      setTotalIncidents(res?.data?.data?.length)
    })
    .catch((error) => {
      console.log(error);
    })
  },[])

  useEffect(()=>{
    let val = {
      id: userProfile?.etcId
    }
      axiosInstance.post('Patients/getByAssignedETC',val).then(res =>{
        setTotalPatients(res?.data?.data?.length)
      }).catch(error =>{
        console.log(error);
      })
  },[])
  
  useEffect(() => {
    let obj2 = {
      id: userProfile?.etcId
    };
    axiosInstance.post(`Claims/getByAssignedETC`, obj2).then((res) =>{
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


  const ambData:IClaims[] =[
    {
      color: "#90EE90",
      title:"Incidents",
      value:totalIncidents,  
    },
    {
      color: "#D3D3D3",
      title:"Patient Records",
      value:totalPatients,
    },
  ]
  
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
  return (
    <Grid container spacing={3}>
    <Grid item xs={12} md={12}>
          <UserWelcome displayName={userProfile?.firstName ?? "ETC User"} />
        </Grid>
        
        <Grid item xs={12} md={12} sx={{mb:-2, mt:4}}>
        <Typography variant="h4">ETC - {userProfile?.organisationName} ({userProfile?.state?.name.toUpperCase()})</Typography>
        </Grid>
        {ambData?.map((dt, index) => (
          <Grid item xs={12} md={6} key={index}>
            <ClaimsCard
              color={dt?.color}
              title={dt?.title}
              value={dt?.value}
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
        </Grid>
  );
};

export default ETCDasboard;
