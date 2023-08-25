export interface IPatients {
    id: number
    firstName: string
    middleName: string
    lastName: string
    doB: string
    sex: number
    phoneNumber: string
    nhia: string
    address: string
    incident_Id: number
    ambulance_Id: number
    etC_Id: number
    medicalInterventions: MedicalIntervention[]
    notes: any[]
    drugs: any[]
    runsheet: any
    extraDetails: ExtraDetails
  }
  
  export interface MedicalIntervention {
    id: number
    patientId: number
    isAlert: boolean
    canSpeak: boolean
    isInPain: boolean
    unResponsive: boolean
    mainComplaint: string
    primarySurvey: string
    physicalExaminationFindings: string
    ivFluidType: string
    sizeOfFluid: string
    locationOfIvInfusion: string
    totalIvFluidVolumeGiven: string
    oxygen: string
    remarks: string
    dateAdded: string
    timeTaken: string
    pulse: number
    bloodPressure: number
    resp: number
    glucose: number
    sp02: number
    notes: string
    mediicalIntervention: string
  }
  
  export interface ExtraDetails {
    ambulanceName: string
    incidentCode: string
    incidentCategory: string
    incidentId: number
    arrivalTime: any
    triageCategory: string
  }
  