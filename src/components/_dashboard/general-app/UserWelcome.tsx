import PropTypes from "prop-types";
// material
import { styled } from "@mui/material/styles";
import { Typography, Card, CardContent } from "@mui/material";
import SeoIllustration from "../../../assets/SeoIllustration";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  backgroundColor: "hsl(7,100%,95%)",
  [theme.breakpoints.up("md")]: {
    height: "100%",
    display: "flex",
    textAlign: "left",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

// ----------------------------------------------------------------------

AppWelcome.propTypes = {
  displayName: PropTypes.string,
};

export default function AppWelcome({ displayName }: any) {
  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
        }}
      >
        <Typography gutterBottom variant="h4" sx={{color:"#7b0a31"}}>
          Welcome back 👋
          <br /> {!displayName ? "..." : displayName}!
        </Typography>

        <Typography
          variant="body2"
          sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: "auto" ,color:"#ad6174"}}
        >
          This Platform will enable you have real time access to vital
          information on EMT. You can track the utilisation of funds for the provision of
          basic healthcare services and generate reports to share with
          stakeholders.
        </Typography>
      </CardContent>

      <SeoIllustration
        sx={{
          p: 3,
          width: 360,
          margin: { xs: "auto", md: "inherit" },
        }}
      />
    </RootStyle>
  );
}
