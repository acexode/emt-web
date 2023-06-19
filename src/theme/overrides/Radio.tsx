// ----------------------------------------------------------------------

export default function Radio(theme: { spacing: (arg0: number) => any; }) {
  return {
    MuiRadio: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
          svg: {
            fontSize: 24,
            '&[font-size=small]': {
              fontSize: 20
            }
          }
        }
      }
    }
  };
}
