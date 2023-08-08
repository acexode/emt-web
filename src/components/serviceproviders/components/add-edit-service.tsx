import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    MenuItem,
    TextField,
  } from "@mui/material";
  import{ FC, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
  import {useForm} from "react-hook-form"
  import { useSnackbar } from "notistack";

  import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../../../services/api_service";
import { MIconButton } from "../../@material-extend";
import closeFill from "@iconify/icons-eva/close-fill";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";

  interface IAddEditServiceProvider {
    edit?: boolean,
    modal:boolean,
    toggle: any;
    formData?:any;
    fetchAllUsers?:any;
    locations?:any
  }

  const schema = yup.object().shape({
      code: yup.string().required("*Code is required"),
    description: yup.string().required("*Description is required"),
    price: yup.number().required("*price is required"),
    feeCategoryId: yup.number().required("*Fee Category is required"),
  });
 

export  const AddEditServiceProvider:FC<IAddEditServiceProvider> = ({edit,formData,modal,toggle,fetchAllUsers}) =>{
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
  
      } = useForm({
        mode: "onTouched",
        criteriaMode: "firstError",
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false,
        delayError: undefined,
        resolver: yupResolver(schema),
      });
      const [loading,setLoading] = useState(false)
      const [feescats,setFeesCats] = useState<any>([])
      const { enqueueSnackbar, closeSnackbar } = useSnackbar();


      useEffect(()=>{
          if(edit){
            reset(formData)
          }else{
            reset()
          }
      },[edit])

      useEffect(()=>{
          axiosInstance.get('FeeCategories/get').then(res =>{
            let newVal = res.data?.data?.map((dt: { description: any; id: any; })=>{
              return {
                label: dt?.description,
                value: dt?.id
              }
            })
            setFeesCats(newVal)
          }).catch(error =>{
            console.log(error)
          })
      },[])

    const handleToggle =() => toggle()

    const onSubmit = async(data:any) =>{
        let newData = {
            ...data,
            id:formData?.id
          };
          delete newData?.feeCategory
          delete newData?.dateAdded
          setLoading(true)
          let text = edit ? "Service Provider Updated" : "Service Provider Added";
          try {
            let res;
            if (edit) {
              res = await axiosInstance.put(
                `ServicesAndFees/update`,
                newData
              );
            } else {
              res = await axiosInstance.post(`ServicesAndFees/add`, data);
            }
            console.log(res);
            enqueueSnackbar(`${text}`, {
                variant: "success",
                action: (key) => (
                  <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                    <Icon icon={closeFill} />
                  </MIconButton>
                ),
              });
            reset();
            handleToggle();
            fetchAllUsers()
          } catch (error: any) {
            enqueueSnackbar(error?.message, {
                variant: "error",
                action: (key) => (
                  <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                    <Icon icon={closeFill} />
                  </MIconButton>
                ),
              });
          } finally{
            setLoading(false)
          }
    }

  
    return (
        <Dialog
        open={modal}
        onClose={handleToggle}
        maxWidth="md"
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{edit ? "Edit Service Provider": "Add Service Provider"}</DialogTitle>
           <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
           
         
            
            <Grid item xs={12} sm={6} lg={6}>
              
            <label>Enter Code</label>
            <TextField
              variant="outlined"
              fullWidth                      
              type="text"
              {...register('code')}
              helperText={errors?.code?.message?.toString()}
              FormHelperTextProps={{
              className:"helperTextColor"
              }}
            />
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              
            <label>Enter Description</label>
            <TextField
              variant="outlined"
              fullWidth                      
              type="text"
              {...register('description')}
              helperText={errors?.description?.message?.toString()}
              FormHelperTextProps={{
              className:"helperTextColor"
              }}
            />
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              
            <label>Enter Price</label>
            <TextField
              variant="outlined"
              fullWidth                      
              type="text"
              {...register('price', { valueAsNumber:true})}
              helperText={errors?.price?.message?.toString()}
              FormHelperTextProps={{
              className:"helperTextColor"
              }}
            />
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              
            <label>Select Fee category</label>
            <TextField
                variant="outlined"
                fullWidth
                select
                type="text"
                multiline
                {...register('feeCategoryId')}
                helperText={errors?.feeCategoryId?.message?.toString()}
                FormHelperTextProps={{
                className:"helperTextColor"
                }}
            >
                {feescats.map((cat: { value: string | number | readonly string[] | undefined; label: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; },index: Key | null | undefined) => (
                    <MenuItem key={index} value={cat?.value}>
                        {cat?.label}
                    </MenuItem>
                ))}
            </TextField>
            </Grid>
    
            
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToggle} sx={{background:"grey",  '&:hover': {
          // Define the hover styles here
          backgroundColor: 'lightgray',
        
        },}} color="info" >
            Close
          </Button>
          <LoadingButton
                size="medium"
                type="submit"
                variant="contained"
                loading={loading}
                // onClick={onSubmit} 
            >
                Submit
            </LoadingButton>
         
        </DialogActions>
           </form>
      </Dialog>
    )
  }