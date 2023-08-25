import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
// material
import { Box, Button, Typography, Container } from "@mui/material";
// components
import Page from "../components/Page";
import SeverErrorIllustration from "../assets/illustration_500";
import { PATH_DASHBOARD } from "../routes/paths";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  paddingTop:45,
  // paddingBottom: theme.spacing(3)
}));

// ----------------------------------------------------------------------

export default function Page500() {
  return (
    <RootStyle title="500 Internal Server Error | BHCPF">
      <Container>
        <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
          <Typography variant="h3" paragraph>
            500 Internal Server Error
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            There was an error, please try again later.
          </Typography>

          <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />

          <Button
              to={PATH_DASHBOARD.root}
            size="large"
            variant="contained"
            component={RouterLink}
          >
            Go to Home
          </Button>
        </Box>
      </Container>
    </RootStyle>
  );
}
