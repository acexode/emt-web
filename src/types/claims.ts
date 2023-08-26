export interface IClaims {
    id: number
    title: string
    incidentId: number
    runSheetId: number
    incidentFeeId: number
    ambulanceId: number
    hospitalId: number
    status: string
    totalPrice: number
    distanceCovered: number
    dateAdded: string
    incidentViewModel: IncidentViewModel
    runsheetViewModel: RunsheetViewModel
  }
  
  export interface IncidentViewModel {
    id: number
    callerName: string
    callerNumber: string
    incidentDate: string
    incidentTime: string
    description: string
    recommendation: string
    traiageCategory: string
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
    supervisorFirstName: string
    supervisorMiddleName: string
    supervisorLastName: string
    supervisorDate: string
    serialNo: string
    callerIsPatient: string
    longitude: number
    latitude: number
    ambulanceStart: string
    ambulanceStop: string
    dateStop: string
    incidentStatusType: string
    patientViewModel: PatientViewModel
    emergencyTreatmentCenterViewModel: EmergencyTreatmentCenterViewModel
    ambulanceViewModel: AmbulanceViewModel
    drugList:DrugList
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
    ambulanceTypeId: number
    wardId: number
    nhiAorSHIA: string
    ambulanceId: number
    dateAdded: string
    ambulanceTypeViewModel: any
  }
  
  export interface RunsheetViewModel {
    id: number
    title: string
    incidentId: number
    ambulanceId: number
    routeFrom: string
    routeTo: string
    takeOffTime: string
    arrivalTime: string
    medicUserId: string
    hospiceUserId: string
    totalMinutesToHospital: number
    dateAdded: string
    incidentViewModel: any
  }
  
  export interface PatientViewModel {
    id: number
    firstName: string
    middleName: string
    lastName: string
    nhia: string
    doB: string
    sex: number
    phoneNumber: string
    address: string
    medicalInterventions: any[]
  }

  export interface DrugList{
    drugName:string,
    quantity:number,
    dose: number,
    price:number
  }