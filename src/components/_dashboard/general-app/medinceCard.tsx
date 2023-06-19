// @ts-nocheck

import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Box } from "@mui/material";
//
import { BaseOptionChart } from "../../charts";

// ----------------------------------------------------------------------

const CHART_DATA = [
  { name: "Q1 2023", data: [30, 90, 60] },
  { name: "Q2 2023", data: [40, 70, 90] },
];

export default function MedicineCard() {
  const chartOptions = merge(BaseOptionChart(), {
    colors: ["#26b76e"],
    xaxis: {
      categories: [
        "Conducted upgrades (infra)",
        "Purchased Ess. Medicines",
        "Reported Stock-Out",
      ],
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: 15,
      },
    },
  });

  return (
    <Card>
      <CardHeader title="ESSENTIAL MEDICINE AND INFRASTRUCTURE" />

      <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
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
