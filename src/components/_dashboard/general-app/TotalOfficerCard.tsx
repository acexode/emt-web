// @ts-nocheck

import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Box } from "@mui/material";
//
import { BaseOptionChart } from "../../charts";

// ----------------------------------------------------------------------

const CHART_DATA = [
  { data: [30, 90, 60, 50, 40] },
];

export default function HumanResourcesCard() {
  const chartOptions = merge(BaseOptionChart(), {
    colors: ["#26b76e"],
    // xaxis: {
    //   categories: [
    //     "Midwives Engaged",
    //     "Total Midwives @ BHCPF PHC",
    //     "Midwives Engaged with 5%",
    //     "Other Cadre Engaged",
    //     "Total No. of Tech staffs",
    //   ],
    //   labels: {
    //     rotate: -45,
    //     maxHeight: 80,
    //     maxWidth: 100,
    //     trim: true,
    //   },
    // },
  });

  return (
    <Card>
      <CardHeader title="QUALITY ASSURANCE" />

      <Box sx={{ mt: 3, mx: 3, height: 405 }} dir="ltr">
        <ReactApexChart
          type="bar"
          series={CHART_DATA}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}
