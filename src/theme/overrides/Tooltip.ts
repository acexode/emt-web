// ----------------------------------------------------------------------

export default function Tooltip(theme: { palette: { mode: string; grey: { [x: string]: any; }; }; }) {
  const isLight = theme.palette.mode === 'light';

  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.grey[isLight ? 800 : 700]
        },
        arrow: {
          color: theme.palette.grey[isLight ? 800 : 700]
        }
      }
    }
  };
}
