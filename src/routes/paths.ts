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
    verify: path(ROOTS_AUTH, '/verify')
  };

  export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    general: {
      app: path(ROOTS_DASHBOARD, '/app'),
      
    },
    incidents: {
      root: path(ROOTS_DASHBOARD, '/incidents'),

    },
    claims: {
      root: path(ROOTS_DASHBOARD, '/claims'),

    },
    settings: {
      root: path(ROOTS_DASHBOARD, '/settings'),
     
    },
   
  };

  export const PATH_PAGE = {
    page404: '/404',
    page500: '/500',
   };