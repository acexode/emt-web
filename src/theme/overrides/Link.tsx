// ----------------------------------------------------------------------

export default function Link() {
  return {
    MuiLink: {
      defaultProps: {
        underline: 'hover'
      },

      styleOverrides: {
        root: {
          color:'hsl(0, 100%, 27%)'
        }
      }
    }
  };
}
