 // @ts-nocheck

 import { forwardRef } from 'react';
// material
import { Avatar, useTheme } from '@mui/material';

// ----------------------------------------------------------------------

const MAvatar = forwardRef(({ color = 'default', sx, children, ...other }, ref) => {
  const theme = useTheme();

  if (color === 'default') {
    return (
      <Avatar ref={ref} sx={sx} {...other}>
        {children}
      </Avatar>
    );
  }

  return (
    <Avatar
      ref={ref}
      sx={{
        fontWeight: theme.typography.fontWeightMedium,
        color: "#000",
        backgroundColor: "#dadfe3",
        ...sx
      }}
      {...other}
    >
      {children}
    </Avatar>
  );
});

 
export default MAvatar;
