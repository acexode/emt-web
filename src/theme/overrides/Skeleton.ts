// ----------------------------------------------------------------------

export default function Skeleton(theme: { palette: { background: { neutral: any; }; }; }) {
  return {
    MuiSkeleton: {
      defaultProps: {
        animation: 'wave'
      },

      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.neutral
        }
      }
    }
  };
}
