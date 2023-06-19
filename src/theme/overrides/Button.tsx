// ----------------------------------------------------------------------

export default function Button(theme: { palette: { grey: any[]; action: { hover: any; }; }; customShadows: { z8: any; primary: any; secondary: any; info: any; success: any; warning: any; error: any; }; }) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          background: "hsl(150, 100%, 34%)",
          color:"#fff",
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: "hsl(148, 37%, 59%)",
            
          }
        },
        sizeLarge: {
          height: 48
        },
        // contained
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: theme.customShadows.z8,
          '&:hover': {
            backgroundColor: "hsl(148, 37%, 59%)"
          }
        },
        containedPrimary: {
          boxShadow: theme.customShadows.primary
        },
        containedSecondary: {
          boxShadow: theme.customShadows.secondary
        },
        containedInfo: {
          boxShadow: theme.customShadows.info
        },
        containedSuccess: {
          boxShadow: theme.customShadows.success
        },
        containedWarning: {
          boxShadow: theme.customShadows.warning
        },
        containedError: {
          boxShadow: theme.customShadows.error
        },
        // outlined
        outlinedInherit: {
          border: `1px solid ${theme.palette.grey[500_32]}`,
          '&:hover': {
            backgroundColor: "hsl(148, 37%, 59%)"
          }
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover
          }
        }
      }
    }
  };
}
