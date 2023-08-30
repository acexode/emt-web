import {FC,useState} from 'react'
 import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthUserContext } from "../../../context/authUser.context";
import {  TextField} from '@mui/material';
import { Stack } from '@mui/system';
import LoadingButton from '@mui/lab/LoadingButton';

const schema = yup.object().shape({
    email: yup.string().email().required("Email Address is required"),
  });

  interface IForm {
    setSent:any,
    setEmail:any
  }
const ResetPasswordForm:FC<IForm> = ({setEmail,setSent}) => {
    const [isLoading,setIsLoading] = useState(false)
    const {handleForgotPassword} = useAuthUserContext()

    const {
        register,
        handleSubmit,
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
    
      const onSubmit = async (data: any) => {
        try { 
            setIsLoading(true)
        
            const res = await handleForgotPassword(data);
            if(res?.response?.status === 200){
              setEmail(data?.email)
              setSent(true)
            }
            
        } catch (error) {
          console.log(error);
           
        }
        finally{
            setIsLoading(false)
        }
      };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} mb={3}>
 
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...register('email')}
             helperText={errors?.email?.message?.toString()}
             FormHelperTextProps={{
              className:"helperTextColor"
            }}
          />

        
        </Stack>
        <LoadingButton  fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
          Reset Password
        </LoadingButton>
    </form>
  )
}

export default ResetPasswordForm