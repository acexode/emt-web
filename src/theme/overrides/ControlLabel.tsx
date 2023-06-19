// ----------------------------------------------------------------------

export default function ControlLabel(theme: { typography: { body2: any; }; spacing: (arg0: number) => any; palette: { text: { disabled: any; }; }; }) {
  return {
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          ...theme.typography.body2
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginTop: theme.spacing(1)
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.text.disabled
        }
      }
    }
  };
}
