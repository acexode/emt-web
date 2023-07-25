// @ts-nocheck

import { Icon } from "@iconify/react";
import ReactApexChart from "react-apexcharts";
import trendingUpFill from "@iconify/icons-eva/trending-up-fill";
import trendingDownFill from "@iconify/icons-eva/trending-down-fill";
// material
import { alpha, useTheme, styled } from "@mui/material/styles";
import { Box, Card, Typography, Stack, } from "@mui/material";
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
// utils
import { fNumber, fPercent } from "../../../utility/index";
import { FC, useState } from "react";

// ----------------------------------------------------------------------

const IconWrapperStyle = styled("div")(({ theme }: any) => ({
  width: 24,
  height: 24,
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16),
}));

// ----------------------------------------------------------------------

const PERCENT = 2.6;
const TOTAL_USER = 18765;
const CHART_DATA = [44, 55, 13, 43];

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" sx={{color:props.value < 50 ? "red" :"green"}} size={60} {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const ServicesCardTwo: FC<IServiceCard> = ({ title, color, value, show,percentage }) => {
  const [progress, setProgress] = useState(percentage);
  const theme = useTheme();

  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 3, height: 180 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography sx={{fontSize:"0.8rem",color:"#212b36"}}>{title}</Typography>
        <Typography variant="h4">{value}</Typography>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ mt: 2, mb: 1 }}
        >
          {show && (
            <>
              <IconWrapperStyle
                sx={{
                  ...(PERCENT < 0 && {
                    color: "error.main",
                    bgcolor: alpha(theme.palette.error.main, 0.16),
                  }),
                }}
              >
                <Icon
                  width={16}
                  height={16}
                  icon={PERCENT >= 0 ? trendingUpFill : trendingDownFill}
                />
              </IconWrapperStyle>
              <Typography component="span" variant="subtitle2">
                {PERCENT > 0 && "+"}
                {fPercent(PERCENT)}
              </Typography>
            </>
          )}
        </Stack>
      </Box>
      <CircularProgressWithLabel value={progress}  />
    
    </Card>
  );
};

export default ServicesCardTwo;
