// @ts-nocheck

import { Icon } from "@iconify/react";
import ReactApexChart from "react-apexcharts";
import trendingUpFill from "@iconify/icons-eva/trending-up-fill";
import trendingDownFill from "@iconify/icons-eva/trending-down-fill";
// material
import { alpha, useTheme, styled } from "@mui/material/styles";
import { Box, Card, Typography, Stack } from "@mui/material";
// utils
import { fNumber, fPercent } from "../../../utility/index";
import { FC } from "react";

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
const CHART_DATA = [{ data: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26] }];

const ServicesCard: FC<IServiceCard> = ({ title, color, value, show }) => {
  const theme = useTheme();

  const chartOptions = {
    colors: color,
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: "68%", borderRadius: 2 } },
    labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName: any) => fNumber(seriesName),
        title: {
          formatter: () => "",
        },
      },
      marker: { show: false },
    },
  };

  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 3, height: 150 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{title}</Typography>
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

        <Typography variant="h4">{value}</Typography>
      </Box>

      <ReactApexChart
        type="bar"
        series={CHART_DATA}
        options={chartOptions}
        width={60}
        height={36}
      />
    </Card>
  );
};

export default ServicesCard;
