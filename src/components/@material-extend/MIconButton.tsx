import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// material
import { IconButton } from '@mui/material';
//
import { ButtonAnimate } from '../animate';

// ----------------------------------------------------------------------
interface MIconButtonProps {
  children?: React.ReactNode;
  [key: string]: any;
}

const MIconButton = forwardRef<HTMLButtonElement, MIconButtonProps>(
  ({ children, ...other }, ref) => (
    <ButtonAnimate>
      <IconButton ref={ref} {...other}>
        {children}
      </IconButton>
    </ButtonAnimate>
  )
);
export default MIconButton;
