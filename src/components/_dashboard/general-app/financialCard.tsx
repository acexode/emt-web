// @ts-nocheck

import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Box } from "@mui/material";
//
import { BaseOptionChart } from "../../charts";

// ----------------------------------------------------------------------

const CHART_DATA = [{ data: [30, 90, 60, 50,40,20] }];

export default function FinancialCard() {
  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: [
        "Service Providers with minimum infrastructure and equipment requirements",
        "States to have adopted and deployed the NIEMS software",
        "States with established EMS control centres",
        "States with a minimum staffing requirements",
        "States with developed DispatchProt...",
        "States with installed and fun...",
      ],
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: 15,
      },
    },
    colors: ["#EACE09"],

    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: '12px',
        colors: ['#000']
      }
    },
  });

  return (
    <Card>
      <CardHeader title="INFRASTRUCTURE & EQUIPMENT" />

      <Box sx={{ mt: 3, mx: 3,height: 405 }} dir="ltr">
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
