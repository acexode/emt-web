// import { IStateQuestion } from "../pages/dashboard/types"
import { IGovernaceStructure, IServiceCard ,IGovernaceStructure2, IBHCPFSystem, IClaims} from "./types"

export const cardData:IServiceCard[] =[
    {
      color: "#26b76e",
      title:"Incidents",
      value:"8",
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
      title:"Ambulance",
      value:"33",
	  show:false
  
    },
    {
      color: "#ff825c",
      title:"Service Providers",
      value:"369",
	  show:false
  
    },
  
  ]
export const cardData2:IServiceCard[] =[
    {
      color: "#26b76e",
      title:"States with functional and accredited Ambulance Service providers",
      value:"12",
	  show:true,
    percentage:70
  
    },
    {
      color: "#536cbe",
      title:"LGAs with functional and accredited Ambulance Service providers",
      value:"80",
	    show:true,
      percentage:80
  
    },
    {
      color: "#4ca8ff",
      title:"States with functional and accredited Emergency Treatment Centres",
      value:"18",
	  show:true,
    percentage:70

    },
    {
      color: "#4ca8ff",
      title:"LGAs with functional and accredited Emergency Treatment Centres",
      value:"20",
	  show:true,
    percentage:70

    },
  
  ]
export const claimsData:IClaims[] =[
    {
      color: "#90EE90",
      title:"Total",
      value:"101",  
    },
    {
      color: "#00ab55",
      title:"Approved",
      value:"80",
    },
    {
      color: "hsl(3, 34%, 61%)",
      title:"Rejected",
      value:"11",
    },
    {
      color: "#D3D3D3",
      title:"Pending Review",
      value:"10",
    },
  ]
export const ambData:IClaims[] =[
    {
      color: "#90EE90",
      title:"Incidents",
      value:"101",  
    },
    {
      color: "#D3D3D3",
      title:"Referrals",
      value:"10",
    },
  ]

  export const governanceStructure:IGovernaceStructure[] = [
    {
        structure:"SOC Meeting",
        functionality: "Non-Functional",
        no_of_session: 2
    },
    {
        structure:"State Gateway Forum",
        functionality: "Functional",
        no_of_session: 2
    },
    {
        structure:"SPHCB TMT",
        functionality: "Non-Functional",
        no_of_session: 2
    },

  ]

  export const governanceStructure2:IGovernaceStructure2[] = [
    {
        structure: "PHCs with functional WDCs",
        actual: 230,
        percentage: 88
    },
    
    {
        structure: "LGHA advisory team meeting Conducted (atleast once)",
        actual: 200,
        percentage: 50
    },

  ]

  export const bhcpf_system:IBHCPFSystem[] = [
    {
        service_type:"Planned supervisory visit",
        q1: 84,
        q2: 90
    },
    {
        service_type:"Supervisory visit conducted by state/LGA team",
        q1: 84,
        q2: 43
    },
    {
        service_type:"Supervisory visit conducted",
        q1: 45,
        q2: 65
    },
    {
        service_type:"Sensitization/Awareness planned",
        q1: 3,
        q2: 3
    },
    {
        service_type:"Sensitization conducted",
        q1: 3,
        q2: 3
    },

  ]

  export const  Service_Delivery_DATA = [
    { name: 'Q1 2023', data: [30, 90, 60, 50, 40,70] },
    { name: 'Q2 2023', data: [40, 70, 90, 80, 10,90] }
   

]
  export const  perfomance_score_data = [
    { name: 'Q1 2023', data: [30, 90, 60, 50, 40,70,40, 70, 90, 80] },
    { name: 'Q2 2023', data: [40, 70, 90, 80,90,30, 90, 60, 50, 40] }
   

]

export const incidentsData = [
	{
		category: "Paediatric",
		location:"Bwari",
		ambulance_type:"BLS",
		date: "4-05-2021",
		status: "Dispatched"
	},
	{
		category: "Paediatric",
		location:"Bwari",
		ambulance_type:"BLS",
		date: "4-05-2021",
		status: "Resolved"
	},
	{
		category: "Paediatric",
		location:"Bwari",
		ambulance_type:"BLS",
		date: "4-05-2021",
		status: "No Dispatch Needed"
	}
]
export const claimsData2 = [
	{
		service_provider: "Paediatric",
		incident_code:"IN123123",
		patient_name:"Jane Doe",
		date: "4-05-2021",
		status: "Rejected"
	},
	{
		service_provider: "Paediatric",
		incident_code:"IN432564",
		patient_name:"John Doe",
		date: "4-05-2021",
		status: "Accepted"
	},
	{
		service_provider: "Paediatric",
		incident_code:"IN875345",
		patient_name:"Janet Doe",
		date: "4-05-2021",
		status: "Accepted"
	}
]

export const ambulance_run_sheets =[
  {
    incident_no: "002",
    ambulance_service_provider:"R & R Ambulance Service"
  },
  {
    incident_no: "003",
    ambulance_service_provider:"Hibalance Ambulance Service"
  },
  {
    incident_no: "004",
    ambulance_service_provider:"PneumaRS Ambulance Service"
  },
  {
    incident_no: "005",
    ambulance_service_provider:"R & R Ambulance Service"
  },

]


// {
//   color: "#26b76e",
//   title:"States with NEMSAS established",
//   value:"56%",
// show:false

// },
// {
//   color: "#536cbe",
//   title:"States with a minimum staffing requirements",
//   value:"71%",
// show:false

// },
// {
//   color: "#4ca8ff",
//   title:"States with Dispatch Protocols at EMS",
//   value:"49%",
// show:false

// },