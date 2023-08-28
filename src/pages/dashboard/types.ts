export interface IIncident {
    id: number
    callerName: string
    incidentCode:string
    callerNumber: string
    incidentDate: string
    incidentTime: string
    sex: string
    incidentLocation: string
    districtWard: string
    street: string
    areaCouncil: string
    zipCode: string
    incidentCategory: string
    canResolveWithoutAmbulance: string
    ambulance: string
    ambulanceType: string
    treatmentCenter: string
    dispatchFullName: string
    dispatcherId: string
    dispatchDate: string
    supervisorFirstName: string
    supervisorMiddleName: string
    supervisorLastName: string
    supervisorDate: string
    serialNo: string
    callerIsPatient: string
    longitude: number
    latitude: number
    dateAdded: string
  }
  

  export interface Incident {
    id: number
    callerName: string
    callerNumber: string
    incidentDate: string
    incidentCode?:string
    incidentTime: string
    description: string
    recommendation: string
    traiageCategory: string
    // nhiAorSHIA: string
    triageCategory: string
    sex: string
    incidentLocation: string
    districtWard: string
    street: string
    areaCouncil: string
    zipCode: string
    incidentCategory: string
    canResolveWithoutAmbulance: string
    treatmentCenter: string
    dispatchFullName: string
    dispatcherId: string
    dispatchDate: string
    supervisorFirstName: any
    supervisorMiddleName: any
    supervisorLastName: any
    supervisorDate: any
    serialNo: string
    callerIsPatient: string
    longitude: number
    latitude: number
    ambulanceStart: string
    ambulanceStop: string
    dateStop: string
    eventStatusType: string
    incidentStatusType: string
    patientViewModel: PatientViewModel
    emergencyTreatmentCenterViewModel: EmergencyTreatmentCenterViewModel
    ambulanceViewModel: AmbulanceViewModel
  }
  
  export interface PatientViewModel {
    id: number
    firstName: string
    middleName: string
    lastName: string
    doB: string
    sex: number
    phoneNumber: string
    medicalInterventions: any[]
  }
  
  export interface EmergencyTreatmentCenterViewModel {
    id: number
    name: string
    hospitalTypeId: number
    stateId: number
    lgaId: number
    location: string
    address1: string
    address2: string
    landmark: string
    dateAdded: string
  }
  
  export interface AmbulanceViewModel {
    id: number
    name: string
    code: string
    location: string
    nhiAorSHIA: string
    ambulanceTypeId: number
    wardId: number
    ambulanceId: number
    dateAdded: string
    ambulanceTypeViewModel: any
  }
  

  