import { FC, useState } from "react";

// material
import {

  Card,
  Table,

  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  TableContainer,
  TextField,
} from "@mui/material";
// utils

//
import Scrollbar from "../../Scrollbar";
import { IBHCPFSystem } from "../../../db/types";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

interface IBHCPSYSTEM {
  data: IBHCPFSystem[];
}

const BHCPFTable: FC<IBHCPSYSTEM> = ({ data }) => {
  const [seriesData, setSeriesData] = useState(2019);
  const handleChangeSeriesData = (event: { target: { value: any } }) => {
    setSeriesData(Number(event.target.value));
  };

  const options = ["1", "2", "3", "4"];
  return (
    <Card>
      <CardHeader
        title="BHCPF SYSTEM STRENGTHENING"
        sx={{ mb: 3 }}
        action={
          <>
            <label
              style={{
                fontSize: 14,
                marginRight: 8,
              }}
            >
              Quarter
            </label>
            <TextField
              select
              fullWidth
              value={seriesData}
              SelectProps={{ native: true }}
              onChange={handleChangeSeriesData}
              sx={{
                width: 70,
                "& fieldset": { border: "0 !important" },
                "& select": {
                  pl: 1,
                  py: 0.5,
                  pr: "24px !important",
                  typography: "subtitle2",
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0.75,
                  bgcolor: "background.neutral",
                },
                "& .MuiNativeSelect-icon": {
                  top: 4,
                  right: 0,
                  width: 20,
                  height: 20,
                },
              }}
            >
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </TextField>
          </>
        }
      />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 70, height: 380 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Service/Activity Type</TableCell>
                <TableCell>Q1</TableCell>
                <TableCell>Q2</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{`${row?.service_type}`}</TableCell>

                  <TableCell>{row?.q1}</TableCell>
                  <TableCell>{row?.q2}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
};

export default BHCPFTable;
