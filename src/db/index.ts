// import { IStateQuestion } from "../pages/dashboard/types"
import { IGovernaceStructure, IServiceCard ,IGovernaceStructure2, IBHCPFSystem} from "./types"

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

export const questions = [
	{
		"id": 1,
		"section": 1,
		"subSection": 1,
		"serial": 1.1,
		"sectionTitle": "Governance",
		"question": "Has the State provided BHCPF counterpart funds for (2022) fiscal year?",
		"responseOptions": "[\"Yes\", \"No\"]",
		"responseInputType": "radio",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	},
	{
		"id": 2,
		"section": 1,
		"subSection": 2,
		"serial": 1.2,
		"sectionTitle": "Governance",
		"question": "Is there a functional SOC in place at the state level?",
		"responseOptions": "[\"Yes\", \"No\"]",
		"responseInputType": "radio",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	},
	{
		"id": 3,
		"section": 1,
		"subSection": 3,
		"serial": 1.3,
		"sectionTitle": "Governance",
		"question": "When was the last SOC meeting held?",
		"responseOptions": "yy-mm",
		"responseInputType": "date",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	},
	{
		"id": 4,
		"section": 1,
		"subSection": 4,
		"serial": 1.4,
		"sectionTitle": "Governance",
		"question": "Is there a functional State Gateway Forum in place at the state level?",
		"responseOptions": "[\"Yes\", \"No\"]",
		"responseInputType": "radio",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	},
	{
		"id": 5,
		"section": 1,
		"subSection": 5,
		"serial": 1.5,
		"sectionTitle": "Governance",
		"question": "When last was the state Gateway forum meeting conducted?",
		"responseOptions": "yy-mm",
		"responseInputType": "date",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	},
	{
		"id": 6,
		"section": 1,
		"subSection": 6,
		"serial": 1.6,
		"sectionTitle": "Governance",
		"question": "Is there a functional (Minutes and attendance) SPHCB Top Management Team (TMT) available in the State?",
		"responseOptions": "[\"Yes\", \"No\"]",
		"responseInputType": "radio",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	},
	{
		"id": 7,
		"section": 1,
		"subSection": 7,
		"serial": 1.7,
		"sectionTitle": "Governance",
		"question": "Was BHCPF included and discussed at the TMT meeting?",
		"responseOptions": "[\"Yes\", \"No\"]",
		"responseInputType": "radio",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	},
	{
		"id": 8,
		"section": 1,
		"subSection": 8,
		"serial": 1.8,
		"sectionTitle": "Governance",
		"question": "When last was the TMT meeting conducted?",
		"responseOptions": "yy-mm",
		"responseInputType": "date",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	},
	{
		"id": 9,
		"section": 1,
		"subSection": 9,
		"serial": 1.9,
		"sectionTitle": "Governance",
		"question": "Number of LGA where LGHA advisory meetings were conducted (hint: a maximum of 3 meetings/qtr)",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	},
	{
		"id": 10,
		"section": 2,
		"subSection": 1,
		"serial": 2.1,
		"sectionTitle": "Finance and Financial Management",
		"question": "Rounds (number) of DFF sent to PHCs  by State since inception of BHCPF",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	},
	{
		"id": 11,
		"section": 2,
		"subSection": 2,
		"serial": 2.2,
		"sectionTitle": "Finance and Financial Management",
		"question": "Number of PHCs that submitted business plans  to the state",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	},
	{
		"id": 12,
		"section": 2,
		"subSection": 3,
		"serial": 2.3,
		"sectionTitle": "Finance and Financial Management",
		"question": "Number of PHCs that received DFF within the 10days of the first month of the quarter",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	},
	{
		"id": 13,
		"section": 2,
		"subSection": 4,
		"serial": 2.4,
		"sectionTitle": "Finance and Financial Management",
		"question": "Number of PHCs that submitted retirement documents for the quarter under review",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	},
	{
		"id": 14,
		"section": 3,
		"subSection": 1,
		"serial": 3.1,
		"sectionTitle": "Purchasing and Payment Systems",
		"question": "Number of PHCs that have received capitation funds from NHIS Gateway for BMPHS",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	},
	{
		"id": 15,
		"section": 3,
		"subSection": 2,
		"serial": 3.2,
		"sectionTitle": "Purchasing and Payment Systems",
		"question": "Does the State have partners supporting BHCPF implementation?",
		"responseOptions": "[\"Yes\", \"No\"]",
		"responseInputType": "radio",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	},
	{
		"id": 16,
		"section": 3,
		"subSection": 3,
		"serial": 3.3,
		"sectionTitle": "Purchasing and Payment Systems",
		"question": "Number of partners supporting the SPHCDA on BHCPF implementation",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	},
	{
		"id": 17,
		"section": 3,
		"subSection": 4,
		"serial": 3.4,
		"sectionTitle": "Purchasing and Payment Systems",
		"question": "Name(s) of Partner(s) supporting BHCPF implementation",
		"responseOptions": "",
		"responseInputType": "text",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	},
	{
		"id": 18,
		"section": 4,
		"subSection": 1,
		"serial": 4.1,
		"sectionTitle": "Essential Drugs",
		"question": "Number of PHCs that reported/experienced stock out within the quarter under review",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	},
	{
		"id": 19,
		"section": 4,
		"subSection": 2,
		"serial": 4.2,
		"sectionTitle": "Essential Drugs",
		"question": "Number of PHCs that purchased essential medicines from DMA/accredited pharmacies",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	},
	{
		"id": 20,
		"section": 4,
		"subSection": 3,
		"serial": 4.3,
		"sectionTitle": "Essential Drugs",
		"question": "How does the State supply/restock essential medicines to the PHCS?",
		"responseOptions": "[\"DMA\",\"Accredited Pharmacy Distributors\",\"DRF\", \"Open Market\",\"Others\"]",
		"responseInputType": "checkbox",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	},
	{
		"id": 21,
		"section": 5,
		"subSection": 1,
		"serial": 5.1,
		"sectionTitle": "Human Resource For Health",
		"question": "Number of ad-hoc midwives engaged/recruited with BHCPF ( 5% HRH)",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	},
	{
		"id": 22,
		"section": 6,
		"subSection": 1,
		"serial": 6.1,
		"sectionTitle": "Infrastructure and Equipments",
		"question": "Number of PHCs that conducted infrastructural repairs or upgrades with DFF for the quarter under review",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	},
	{
		"id": 23,
		"section": 7,
		"subSection": 1,
		"serial": 7.1,
		"sectionTitle": "Service Selection and Design",
		"question": "Number of BHCPF facilities accredited by NHIA Gateway",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	},
	{
		"id": 24,
		"section": 8,
		"subSection": 1,
		"serial": 8.1,
		"sectionTitle": "Supervision and Facility Management",
		"question": "Number of planned supervisory visits by SPHCB/A",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	},
	{
		"id": 25,
		"section": 8,
		"subSection": 2,
		"serial": 8.2,
		"sectionTitle": "Supervision and Facility Management",
		"question": "Number of supervisory visits conducted by SPHCB/A",
		"responseOptions": "[\"Yes\", \"No\"]",
		"responseInputType": "radio",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	},
	{
		"id": 26,
		"section": 8,
		"subSection": 3,
		"serial": 8.3,
		"sectionTitle": "Supervision and Facility Management",
		"question": "Number of planned supervisory visits by state CHIPS-PIU",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	},
	{
		"id": 27,
		"section": 8,
		"subSection": 4,
		"serial": 8.4,
		"sectionTitle": "Supervision and Facility Management",
		"question": "Number of planned supervisory visits conducted by state CHIPS-PIU",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	},
	{
		"id": 28,
		"section": 9,
		"subSection": 1,
		"serial": 9.1,
		"sectionTitle": "Community Linkages",
		"question": "Number of sensitization/awareness creation services planned by the  State facilities",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	},
	{
		"id": 29,
		"section": 9,
		"subSection": 2,
		"serial": 9.2,
		"sectionTitle": "Community Linkages",
		"question": "Number of sensitization/awareness creation services conducted by the State facilities",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	},
	{
		"id": 30,
		"section": 9,
		"subSection": 3,
		"serial": 9.3,
		"sectionTitle": "Community Linkages",
		"question": "Number of PHCs with functional WDCs",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	},
	{
		"id": 31,
		"section": 10,
		"subSection": 1,
		"serial": 10.1,
		"sectionTitle": "Quality Improvement",
		"question": "Number of BHCPF facilities where quality assessment was conducted in the quarter under review",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T20:05:10.000Z",
		"updatedAt": "2023-05-09T20:05:10.000Z"
	}
]

export const lgaQuestions = [
	{
		"id": 1,
		"section": 1,
		"subSection": 1,
		"serial": 1.1,
		"sectionTitle": "Governance",
		"question": "Has the State provided BHCPF counterpart funds for (2022) fiscal year?",
		"responseOptions": "[\"Yes\", \"No\"]",
		"responseInputType": "radio",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	},
	{
		"id": 2,
		"section": 1,
		"subSection": 2,
		"serial": 1.2,
		"sectionTitle": "Governance",
		"question": "Is there a functional SOC in place at the state level?",
		"responseOptions": "[\"Yes\", \"No\"]",
		"responseInputType": "radio",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	},
	{
		"id": 3,
		"section": 1,
		"subSection": 3,
		"serial": 1.3,
		"sectionTitle": "Governance",
		"question": "When was the last SOC meeting held?",
		"responseOptions": "yy-mm",
		"responseInputType": "date",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	},
	{
		"id": 4,
		"section": 1,
		"subSection": 4,
		"serial": 1.4,
		"sectionTitle": "Governance",
		"question": "Is there a functional State Gateway Forum in place at the state level?",
		"responseOptions": "[\"Yes\", \"No\"]",
		"responseInputType": "radio",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	},
	{
		"id": 5,
		"section": 1,
		"subSection": 5,
		"serial": 1.5,
		"sectionTitle": "Governance",
		"question": "When last was the state Gateway forum meeting conducted?",
		"responseOptions": "yy-mm",
		"responseInputType": "date",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	},
	{
		"id": 6,
		"section": 1,
		"subSection": 6,
		"serial": 1.6,
		"sectionTitle": "Governance",
		"question": "Is there a functional (Minutes and attendance) SPHCB Top Management Team (TMT) available in the State?",
		"responseOptions": "[\"Yes\", \"No\"]",
		"responseInputType": "radio",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	},
	{
		"id": 7,
		"section": 1,
		"subSection": 7,
		"serial": 1.7,
		"sectionTitle": "Governance",
		"question": "Was BHCPF included and discussed at the TMT meeting?",
		"responseOptions": "[\"Yes\", \"No\"]",
		"responseInputType": "radio",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	},
	{
		"id": 8,
		"section": 1,
		"subSection": 8,
		"serial": 1.8,
		"sectionTitle": "Governance",
		"question": "When last was the TMT meeting conducted?",
		"responseOptions": "yy-mm",
		"responseInputType": "date",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	},
	{
		"id": 9,
		"section": 1,
		"subSection": 9,
		"serial": 1.9,
		"sectionTitle": "Governance",
		"question": "Number of LGA where LGHA advisory meetings were conducted (hint: a maximum of 3 meetings/qtr)",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	},
	{
		"id": 10,
		"section": 2,
		"subSection": 1,
		"serial": 2.1,
		"sectionTitle": "Finance and Financial Management",
		"question": "Rounds (number) of DFF sent to PHCs  by State since inception of BHCPF",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	},
	{
		"id": 11,
		"section": 2,
		"subSection": 2,
		"serial": 2.2,
		"sectionTitle": "Finance and Financial Management",
		"question": "Number of PHCs that submitted business plans  to the state",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	},
	{
		"id": 12,
		"section": 2,
		"subSection": 3,
		"serial": 2.3,
		"sectionTitle": "Finance and Financial Management",
		"question": "Number of PHCs that received DFF within the 10days of the first month of the quarter",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	},
	{
		"id": 13,
		"section": 2,
		"subSection": 4,
		"serial": 2.4,
		"sectionTitle": "Finance and Financial Management",
		"question": "Number of PHCs that submitted retirement documents for the quarter under review",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	},
	{
		"id": 14,
		"section": 3,
		"subSection": 1,
		"serial": 3.1,
		"sectionTitle": "Purchasing and Payment Systems",
		"question": "Number of PHCs that have received capitation funds from NHIS Gateway for BMPHS",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	},
	{
		"id": 15,
		"section": 3,
		"subSection": 2,
		"serial": 3.2,
		"sectionTitle": "Purchasing and Payment Systems",
		"question": "Does the State have partners supporting BHCPF implementation?",
		"responseOptions": "[\"Yes\", \"No\"]",
		"responseInputType": "radio",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	},
	{
		"id": 16,
		"section": 3,
		"subSection": 3,
		"serial": 3.3,
		"sectionTitle": "Purchasing and Payment Systems",
		"question": "Number of partners supporting the SPHCDA on BHCPF implementation",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	},
	{
		"id": 17,
		"section": 3,
		"subSection": 4,
		"serial": 3.4,
		"sectionTitle": "Purchasing and Payment Systems",
		"question": "Name(s) of Partner(s) supporting BHCPF implementation",
		"responseOptions": "",
		"responseInputType": "text",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	},
	{
		"id": 18,
		"section": 4,
		"subSection": 1,
		"serial": 4.1,
		"sectionTitle": "Essential Drugs",
		"question": "Number of PHCs that reported/experienced stock out within the quarter under review",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	},
	{
		"id": 19,
		"section": 4,
		"subSection": 2,
		"serial": 4.2,
		"sectionTitle": "Essential Drugs",
		"question": "Number of PHCs that purchased essential medicines from DMA/accredited pharmacies",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	},
	{
		"id": 20,
		"section": 4,
		"subSection": 3,
		"serial": 4.3,
		"sectionTitle": "Essential Drugs",
		"question": "How does the State supply/restock essential medicines to the PHCS?",
		"responseOptions": "[\"DMA\",\"Accredited Pharmacy Distributors\",\"DRF\", \"Open Market\",\"Others\"]",
		"responseInputType": "select",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	},
	{
		"id": 21,
		"section": 5,
		"subSection": 1,
		"serial": 5.1,
		"sectionTitle": "Human Resource For Health",
		"question": "Number of ad-hoc midwives engaged/recruited with BHCPF ( 5% HRH)",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	},
	{
		"id": 22,
		"section": 6,
		"subSection": 1,
		"serial": 6.1,
		"sectionTitle": "Infrastructure and Equipments",
		"question": "Number of PHCs that conducted infrastructural repairs or upgrades with DFF for the quarter under review",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	},
	{
		"id": 23,
		"section": 7,
		"subSection": 1,
		"serial": 7.1,
		"sectionTitle": "Service Selection and Design",
		"question": "Number of BHCPF facilities accredited by NHIA Gateway",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	},
	{
		"id": 24,
		"section": 8,
		"subSection": 1,
		"serial": 8.1,
		"sectionTitle": "Supervision and Facility Management",
		"question": "Number of planned supervisory visits by SPHCB/A",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	},
	{
		"id": 25,
		"section": 8,
		"subSection": 2,
		"serial": 8.2,
		"sectionTitle": "Supervision and Facility Management",
		"question": "Number of supervisory visits conducted by SPHCB/A",
		"responseOptions": "[\"Yes\", \"No\"]",
		"responseInputType": "radio",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	},
	{
		"id": 26,
		"section": 8,
		"subSection": 3,
		"serial": 8.3,
		"sectionTitle": "Supervision and Facility Management",
		"question": "Number of planned supervisory visits by state CHIPS-PIU",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	},
	{
		"id": 27,
		"section": 8,
		"subSection": 4,
		"serial": 8.4,
		"sectionTitle": "Supervision and Facility Management",
		"question": "Number of planned supervisory visits conducted by state CHIPS-PIU",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	},
	{
		"id": 28,
		"section": 9,
		"subSection": 1,
		"serial": 9.1,
		"sectionTitle": "Community Linkages",
		"question": "Number of sensitization/awareness creation services planned by the  State facilities",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	},
	{
		"id": 29,
		"section": 9,
		"subSection": 2,
		"serial": 9.2,
		"sectionTitle": "Community Linkages",
		"question": "Number of sensitization/awareness creation services conducted by the State facilities",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	},
	{
		"id": 30,
		"section": 9,
		"subSection": 3,
		"serial": 9.3,
		"sectionTitle": "Community Linkages",
		"question": "Number of PHCs with functional WDCs",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	},
	{
		"id": 31,
		"section": 10,
		"subSection": 1,
		"serial": 10.1,
		"sectionTitle": "Quality Improvement",
		"question": "Number of BHCPF facilities where quality assessment was conducted in the quarter under review",
		"responseOptions": "",
		"responseInputType": "number",
		"createdAt": "2023-05-09T06:06:17.000Z",
		"updatedAt": "2023-05-09T06:06:17.000Z"
	}
]