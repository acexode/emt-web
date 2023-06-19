// @ts-nocheck

import { merge } from "lodash";
import { FC, useState } from "react";
import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Box } from "@mui/material";
//
import { BaseOptionChart } from "../../charts";

// ----------------------------------------------------------------------

interface IDeliveryCard {
  title: string;
  categories: string[];
  chartData: any;
}

const DeliveryCard: FC<IDeliveryCard> = ({ categories, chartData, title }) => {
  const chartOptions = merge(BaseOptionChart(), {
    colors: ["#26b76e"],
    xaxis: {
      categories: categories,
      labels: {
        rotate: -45,
        maxHeight: 80,
        maxWidth: 100,
        trim: true,
      },
      tickPlacement: "on",
      tooltip: {
        enabled: true,
      },
    },
  });

  return (
    <Card>
      <CardHeader title={title} />

      <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={chartData}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
};
export default DeliveryCard;
