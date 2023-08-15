// material
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
// components
//
import minH from "../assets/minh.png"
import { MHidden } from '../components/@material-extend';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(4, 5, 0, 4)
  }
}));

// ----------------------------------------------------------------------



export default function AuthLayout({ children }:any) {
  return (
    <HeaderStyle>
      <a style={{cursor:"pointer"}} href="https://www.health.gov.ng/" target="_blank" rel="noopener noreferrer">  <img src={minH} width="200" /> </a>
      <MHidden width="smDown">
        <Typography
          variant="body2"
          sx={{
            mt: { md: -2 }
          }}
        >
          {children}
        </Typography>
      </MHidden>
    </HeaderStyle>
  );
}
