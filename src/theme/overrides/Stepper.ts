// ----------------------------------------------------------------------

export default function Stepper(theme: { palette: { divider: any; }; }) {
  return {
    MuiStepConnector: {
      styleOverrides: {
        line: {
          borderColor: theme.palette.divider
        }
      }
    }
  };
}
