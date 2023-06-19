import { Box, Card, Grid, Stack, TextField, Autocomplete } from "@mui/material";
import { FC } from "react";

const q = [1, 2, 3];
const states = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Benue",
  "Borno",
  "Bayelsa",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Federal Capital Territory",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kebbi",
  "Kaduna",
  "Kano",
  "Kogi",
  "Katsina",
  "Kwara",
  "Lagos",
  "Nassarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];
const year = new Date().getFullYear();
const years = Array.from(new Array(10), (val, index) => index + year);
const SelectDropDownCard: FC = () => {
  return (
    <Grid item xs={12} md={12}>
      <Card sx={{ p: 3, pb: 10 }}>
        <Stack spacing={3}>
          {/* <Box sx={{ pb: 3 }}>
              User Access (<small>This defines the user's access level</small>)
            </Box> */}

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 3, sm: 2 }}
          >
            {/* <Autocomplete
              // select
              fullWidth
              // label="Role"
              placeholder="Quarter"
              // {...getFieldProps('access.role')}
              // SelectProps={{ native: true }}
              options={q}
              renderInput={(params) => (
                <TextField {...params} label="Quarter" />
              )}
            /> */}
            <Autocomplete
              // select
              fullWidth
              // label="Role"

              placeholder="Year"
              // {...getFieldProps('access.role')}
              // SelectProps={{ native: true }}
              options={years}
              renderInput={(params) => <TextField {...params} label="Year" />}
            />
            <Autocomplete
              // select
              fullWidth
              // label="Role"
              placeholder="State"
              // {...getFieldProps('access.role')}
              // SelectProps={{ native: true }}
              options={states}
              renderInput={(params) => <TextField {...params} label="State" />}
            />
          </Stack>
        </Stack>
      </Card>
    </Grid>
  );
};

export default SelectDropDownCard;
