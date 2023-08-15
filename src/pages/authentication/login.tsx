// material
import { styled } from "@mui/material/styles";
import { Box, Stack, Container, Typography } from "@mui/material";
// routes
// components
import Page from "../../components/Page";
import LoginForm from "../../components/authentication/login";
import { app_title } from "../../constants";
import Logo from "../../components/Logo";
import AuthLayout from "../../layouts/AuthLayout";
import DashboardFooter from "../../layouts/dashboard/DashboardFooter";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <RootStyle title={`Login | ${app_title}`}>
      <AuthLayout>

      </AuthLayout>
      <Container maxWidth="sm">
        <ContentStyle>
      
          <Stack
          flexDirection={"row"}
          justifyContent="center"
          // gap="2rem"
          >
           <Logo />
          </Stack>
          <Stack direction="row" alignItems="center"  sx={{ mb: 5,mt:5 }}>
            <Box sx={{ flexGrow: 1, display:"flex", flexDirection:"column", alignItems:"center" }}>
              <Typography variant="h4" gutterBottom>
                Sign in to the {app_title} Portal
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
              (National integrated Emergency and medical services)
              </Typography>
              
            </Box>
          </Stack>

          <LoginForm />

    
        </ContentStyle>
        <DashboardFooter />
      </Container>
    </RootStyle>
  );
}
