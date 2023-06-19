// ----------------------------------------------------------------------

export default function Popover(theme: { customShadows: { z12: any; }; }) {
  return {
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: theme.customShadows.z12
        }
      }
    }
  };
}
