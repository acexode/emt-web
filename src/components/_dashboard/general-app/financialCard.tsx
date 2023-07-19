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
    colors: ["#26b76e","#013767","#b76e00","#045e49","#00b8d9","#ff3030"],
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
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: '12px',
        colors: ['#fff']
      }
    },
  });

  return (
    <Card>
      <CardHeader title="INFRASTRUCTURE & EQUIPMENT" />

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
