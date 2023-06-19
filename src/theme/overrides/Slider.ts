// ----------------------------------------------------------------------

export default function Slider(theme: { palette: { mode: string; action: { disabled: any; }; text: { disabled: any; }; grey: { [x: string]: any; }; }; }) {
  const isLight = theme.palette.mode === 'light';

  return {
    MuiSlider: {
      defaultProps: {
        size: 'small'
      },

      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: theme.palette.action.disabled
          }
        },
        markLabel: {
          fontSize: 13,
          color: theme.palette.text.disabled
        },
        valueLabel: {
          borderRadius: 8,
          backgroundColor: theme.palette.grey[isLight ? 800 : 700]
        }
      }
    }
  };
}
