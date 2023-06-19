

 import { Helmet } from 'react-helmet-async';
 import { forwardRef,  } from 'react';
// material
import { Box } from '@mui/material';
// utils

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = '', ...other }:any, ref) => {
 
  return (
    <Box ref={ref} {...other}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </Box>
  );
});

 

export default Page;
