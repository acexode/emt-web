import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Stack, Link, Container, Typography } from "@mui/material";
// routes
import { PATH_AUTH } from "../../routes/paths";

// layouts
// components
import Page from "../../components/Page";
import { MHidden } from "../../components/@material-extend";
import LoginForm from "../../components/authentication/login";
import { app_title } from "../../constants";
import Logo from "../../components/Logo";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
    // flexDirection:'row'
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
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 5,
              alignItems: "center",
            }}
          >
            <Logo />
          </Stack>
          <Stack direction="row" alignItems="center" sx={{ mb: 5,mt:5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Sign in to the {app_title} Portal
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Enter your details below.
              </Typography>
            </Box>
          </Stack>

          <LoginForm />

          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?&nbsp;
              <Link
                variant="subtitle2"
                component={RouterLink}
                to={PATH_AUTH.register}
              >
                Get started
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
