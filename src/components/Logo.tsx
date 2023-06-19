// material
import { Box } from "@mui/material";
// import logo from "../assets/logo-only.png";
import { useLocation } from "react-router-dom";
// ----------------------------------------------------------------------

export default function Logo({ sx }: any) {
  const { pathname } = useLocation();
  const itsAuth = pathname === "/auth/login";
  return (
    <Box sx={{ width: itsAuth ? 90 : 60, height: 40, ...sx }}>
      {/* <img alt="screen" src={logo} /> */}
    </Box>
  );
}
