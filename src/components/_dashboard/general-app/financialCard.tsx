// @ts-nocheck

import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Box } from "@mui/material";
//
import { BaseOptionChart } from "../../charts";

// ----------------------------------------------------------------------

const CHART_DATA = [{ data: [30, 90, 60, 50] }];

export default function FinancialCard() {
  const chartOptions = merge(BaseOptionChart(), {
    colors: "#26b76e",
    xaxis: {
      categories: [
        "Received DFF on time",
        "Received capitation",
        "With >1 account no",
        "Submitted BP",
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
      <CardHeader title="FINANCING AND FINANCIAL MANAGEMENT" />

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
