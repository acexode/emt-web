function path(root: string, sublink: string) {
    return `${root}${sublink}`;
  }
  
  const ROOTS_AUTH = '/auth';
  const ROOTS_DASHBOARD = '/dashboard';
  
  // ----------------------------------------------------------------------
  
  export const PATH_AUTH = {
    root: ROOTS_AUTH,
    login: path(ROOTS_AUTH, '/login'),
    loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
    register: path(ROOTS_AUTH, '/register'),
    registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
    resetPassword: path(ROOTS_AUTH, '/reset-password'),
    forgotPassword: path(ROOTS_AUTH, '/forgot-password'),
    verify: path(ROOTS_AUTH, '/verify')
  };

  export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    general: {
      app: path(ROOTS_DASHBOARD, '/app'),
      
    },
    incidents: {
      root: path(ROOTS_DASHBOARD, '/incidents'),
      newIncidents: path(ROOTS_DASHBOARD,'/new-incidents'),
      viewIncident: path(ROOTS_DASHBOARD,'/view-incidents')

    },
    patients: {
      root: path(ROOTS_DASHBOARD, '/patients'),
      viewPatient: path(ROOTS_DASHBOARD, '/view_patient'),
    },
    claims: {
      root: path(ROOTS_DASHBOARD, '/claims'),
      viewEtc: path(ROOTS_DASHBOARD, '/claims/view-etc-claim'),
      viewAmbulance: path(ROOTS_DASHBOARD, '/claims/view-ambulance-claim'),
    },
    ambulance_run_sheets: {
      root: path(ROOTS_DASHBOARD, '/ambulance_run_sheets'),
      viewRunSheet: path(ROOTS_DASHBOARD, '/view_runsheet'),
    },
    nemsas_run_sheets: {
      root: path(ROOTS_DASHBOARD, '/nemsas_run_sheets'),
    },
    settings: {
      root: path(ROOTS_DASHBOARD, '/settings'),
      userManagement: path(ROOTS_DASHBOARD,'/settings/users'),
      serviceProviders: path(ROOTS_DASHBOARD,'/settings/service-providers')
     
    },
   
  };

  export const PATH_PAGE = {
    page404: '/404',
    page500: '/500',
   };