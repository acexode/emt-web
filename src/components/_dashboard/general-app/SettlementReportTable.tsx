import { FC, useState } from "react";

// material
import { useTheme } from "@mui/material/styles";
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
import { fPercent } from "../../../utility/index";

//
import Label from "../../Label";
import Scrollbar from "../../Scrollbar";
import { IGovernaceStructure, IGovernaceStructure2 } from "../../../db/types";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

interface ISettlementReportTable {
  data: IGovernaceStructure[];
  data2: IGovernaceStructure2[];
}

const GovernmentStructure: FC<ISettlementReportTable> = ({ data, data2 }) => {
  const theme = useTheme();
  const [seriesData, setSeriesData] = useState(2019);
  const handleChangeSeriesData = (event: { target: { value: any } }) => {
    setSeriesData(Number(event.target.value));
  };

  const options = ["1", "2", "3"];
  return (
    <Card>
      <CardHeader
        title="GOVERNANCE STRUCTURE"
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
        <TableContainer sx={{ minWidth: 70 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>STRUCTURE</TableCell>
                <TableCell>FUNCTIONALITY</TableCell>
                <TableCell>NO OF SESSION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{`${row?.structure}`}</TableCell>

                  <TableCell>
                    <Label
                      variant={
                        theme.palette.mode === "light" ? "ghost" : "filled"
                      }
                      color={
                        (row?.functionality === "Functional" && "success") ||
                        (row?.functionality === "Non-Functional" && "error")
                      }
                    >
                      {row?.functionality}
                    </Label>
                  </TableCell>
                  <TableCell>{row?.no_of_session}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>STRUCTURE</TableCell>
                <TableCell>ACTUAL</TableCell>
                <TableCell>PERCENTAGE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data2.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{`${row?.structure}`}</TableCell>
                  <TableCell>{`${row?.actual}`}</TableCell>
                  <TableCell>{fPercent(row?.percentage)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
};

export default GovernmentStructure;
