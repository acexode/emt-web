export interface IServiceCard{
    value: string,
    title: string,
    color:string ,
    show?:boolean
  }
export interface IClaims{
    value: string,
    title: string,
    color:string ,
  }

  export interface IGovernaceStructure {
    structure: string,
    functionality: string,
    no_of_session: number,
  }
  export interface IGovernaceStructure2 {
    structure: string,
    actual: number,
    percentage: number,
  }

  export interface IBHCPFSystem {
    service_type: string,
    q1: number,
    q2: number
  }