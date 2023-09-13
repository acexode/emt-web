import { styled } from "@mui/material/styles";
// material
import { Box, Button, Typography, Container } from "@mui/material";
// components
import Page from "../components/Page";
import SeverErrorIllustration from "../assets/illustration_500";
import { useAuthUserContext } from "../context/authUser.context";
import { useSnackbar } from "notistack";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  paddingTop:45,
  // paddingBottom: theme.spacing(3)
}));

// ----------------------------------------------------------------------

export default function Page401() {
  const { handleSignOut  } = useAuthUserContext();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = async () => {
    try {
      handleSignOut();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Unable to logout", { variant: "error" });
    }
  };

  return (
    <RootStyle title="401 Unauthorized User | EMT">
      <Container>
        <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
          <Typography variant="h3" paragraph>
            401 Unauthorized User
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            You are not authorized to view the dashboard
          </Typography>

          <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />

          <Button
            size="large"
            variant="contained"
            onClick={handleLogout}
          >
            Log out
          </Button>
        </Box>
      </Container>
    </RootStyle>
  );
}
