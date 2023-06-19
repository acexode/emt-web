// ----------------------------------------------------------------------

export default function Link() {
  return {
    MuiLink: {
      defaultProps: {
        underline: 'hover'
      },

      styleOverrides: {
        root: {
          color:'hsl(150,55%,47%)'
        }
      }
    }
  };
}
