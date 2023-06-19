// ----------------------------------------------------------------------

export default function Menu(theme: { palette: { action: { selected: any; hover: any; }; }; }) {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: theme.palette.action.selected,
            '&:hover': {
              backgroundColor: theme.palette.action.hover
            }
          }
        }
      }
    }
  };
}
