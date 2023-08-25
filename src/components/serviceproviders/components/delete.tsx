// @ts-nocheck

import React, { FC,useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
 
} from "@mui/material";
import { useSnackbar } from "notistack";
import axiosInstance from "../../../services/api_service";
import { MIconButton } from "../../@material-extend";
import closeFill from "@iconify/icons-eva/close-fill";
import { Icon } from "@mui/material";
// import { useAuthUserContext } from "../../../context/authUser.context";
import { LoadingButton } from "@mui/lab";
import {errorMessages} from "../../../constants/index"

interface IRemove {
    modal:boolean,
    toggle: any;
    id?:number;
    url?:string;
    fetchData?:any;
    param?:any
    type?:string
  }

export const Remove:FC<IRemove> = ({ id, param, fetchData, url,modal,toggle,type }) => {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleToggle =() => toggle()

  const removeRow = () => {
    setLoading(true);
    axiosInstance
    .request({
      method:'delete',
      url: url,
      data: {
        params: { [param]: id },
      },
    })
      .then((res) => {
        console.log(res);
        enqueueSnackbar(`Deleted!`, {
            variant: "success",
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} color="success" />
              </MIconButton>
            ),
          });
        fetchData();
      })
      .catch((error) => {
        let errorMessage = errorMessages[error?.response?.status]
        enqueueSnackbar(errorMessage, {
            variant: "error",
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} color="error" />
              </MIconButton>
            ),
          });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Dialog
        open={modal}
        onClose={handleToggle}
        maxWidth="sm"
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Delete ${type}`}</DialogTitle>

        <DialogContent>Are you sure you want to delete this?</DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleToggle}  sx={{background:"grey",  '&:hover': {
          // Define the hover styles here
          backgroundColor: 'lightgray',
        
        },}}  color="primary">
            Cancel
          </Button>
          <LoadingButton
                size="medium"
                variant="contained"
                loading={loading}
                onClick={removeRow} 
            >
                Delete
            </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};