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
  