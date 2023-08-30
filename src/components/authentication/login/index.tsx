import {FC,useState} from 'react'
 import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthUserContext } from "../../../context/authUser.context";
 import { Link as RouterLink } from 'react-router-dom';

import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
 import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import {  TextField, InputAdornment, IconButton,Link} from '@mui/material';
import { Stack } from '@mui/system';
  import { PATH_AUTH } from '../../../routes/paths';
import LoadingButton from '@mui/lab/LoadingButton';

const schema = yup.object().shape({
    email: yup.string().email().required("Email Address is required"),
    password: yup.string().required("*Password is required").min(8),
  });

const LoginForm:FC = () => {
     const [showPassword, setShowPassword] = useState(false);
    const [isLoading,setIsLoading] = useState(false)
    const {handleSignInUser} = useAuthUserContext()

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
      const handleShowPassword = () => {
        setShowPassword((show) => !show);
      };
      const onSubmit = async (data: any) => {
        try { 
            setIsLoading(true)
              await handleSignInUser(data);
            
        } catch (error) {
          console.log(error);
           
        }
        finally{
            setIsLoading(false)
        }
      };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
 
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

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...register('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            
            helperText={errors?.password?.message?.toString()}
            FormHelperTextProps={{
              className:"helperTextColor"
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          

          <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.forgotPassword}>
            Forgot password ?
          </Link>
      
        </Stack>

        <LoadingButton  fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
          Login
        </LoadingButton>
    </form>
  )
}

export default LoginForm