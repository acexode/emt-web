// @ts-nocheck

// material
import { alpha, styled } from '@mui/material/styles';
import { Stack, Toolbar, Typography } from '@mui/material';
// hooks

import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// components
import DatharmLogo from "../../assets/datharm.png"
// import FMLogo from "../../assets/fmh.jpg"
// ----------------------------------------------------------------------

const COLLAPSE_WIDTH = 102;

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 80;

const RootStyle = styled('div')(({ theme }) => ({
    bottom: 0,
    left: 0,
    zIndex: 99,
    width: '100%',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
    justifyContent:"end",
    height: APPBAR_MOBILE,
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
    padding: theme.spacing(0, 3),
    boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
    backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
    [theme.breakpoints.up('md')]: {
      height: APPBAR_DESKTOP,
      padding: theme.spacing(0, 5)
    }
}));



// ----------------------------------------------------------------------


export default function DashboardFooter() {
  const { isCollapse } = useCollapseDrawer();

  return (
    <RootStyle
      sx={{
        ...(isCollapse && {
          width: { lg: `calc(100% - ${COLLAPSE_WIDTH}px)` }
        })
      }}
    >
      <Stack alignItems={'end'}>

      <Typography
              gutterBottom
              variant="body1"
              sx={{
                fontSize: "1rem",
                ml: 2,
                fontWeight:500,
                cursor:"pointer",
                display:"flex",
                alignItems:"center",
                gap:"0.3rem"
              }}
            >
              Developed and Powered by <a  href="https://datharm.com/" target="_blank" rel="noopener noreferrer" style={{display:"flex", alignItems:"center", gap:"0.3rem", textDecoration:"none"}}>Datharm <img src={DatharmLogo} width="20" height="20" /> </a>
            </Typography>
       <Typography
              gutterBottom
              variant="body1"
              sx={{
                fontSize: "0.8rem",
                ml: 2,
                fontWeight:500,
                display:"flex",
                alignItems:"center",
                gap:"0.3rem"
              }}
            >
            Funded by Bill and Melinda Gates Foundation (BMGF) and supported through Sydani 
            </Typography>
      </Stack>
    </RootStyle>
  );
}
