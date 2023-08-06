// material
import { Box } from "@mui/material";
import logo from "../assets/emtLogo.svg";
import { useLocation } from "react-router-dom";
// ----------------------------------------------------------------------

export default function Logo({ sx }: any) {
  const { pathname } = useLocation();
  const itsAuth = pathname === "/auth/login";
  return (
    <Box sx={{ width: itsAuth ? 120 : 60, height: 40, ...sx }}>
      <img alt="screen" src={logo} style={{width:itsAuth ? "79px": "50px", borderRadius:"50%"}} />
    </Box>
  );
}
