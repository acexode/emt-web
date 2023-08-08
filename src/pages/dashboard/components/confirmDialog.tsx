import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LoadingButton } from '@mui/lab';

interface IDialog {
    open: boolean,
    handleClose: () => void,
    loading: boolean,
    handleSubmit: () => any,
    title?:string

}
 const AlertDialog:React.FC<IDialog> = ({open,handleClose,loading,handleSubmit,title}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
         {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Are you sure you want to submit this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button
        size="medium"
        type="submit"
        variant="contained"
          onClick={handleClose}
          sx={{background:"hsl(3, 34%, 61%)"}}
      >
        No
      </Button>
          <LoadingButton
        size="medium"
        type="submit"
        variant="contained"
          loading={loading}
          onClick={handleSubmit}
      >
        Yes
      </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialog