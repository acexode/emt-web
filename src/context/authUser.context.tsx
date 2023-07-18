// @ts-nocheck

import { userActions } from "../actions/user.actions";
import { authUserReducer } from "../reducers/user.reducer";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { IAuthContext, Props } from "./types";
// import axiosInstance from "../services/api_service";
import tokenService from "../services/tokenService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../services/baseurl";
import { useSnackbar } from "notistack";
import closeFill from "@iconify/icons-eva/close-fill";
import { Icon } from "@mui/material";
import { MIconButton } from "../components/@material-extend";

const initialState = {
  userProfile: null,
  signedIn: false,
  token: "",
  userRole: "",
};

const AuthUserContext = createContext({} as IAuthContext);

const AuthUserProvider = ({ children }: Props) => {
  const [userState, dispatch] = useReducer(authUserReducer, initialState);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const user = tokenService.getUser();
  const navigate = useNavigate();
  // useEffect(() => {
  //   dispatch({
  //     type: userActions.SET_USER_PROFILE,
  //     payload: user,
  //   });
  // }, []);
  const handleSignOut = () => {
    // tokenService.clearStorage();
    dispatch({
      type: userActions.SIGN_OUT,
      payload: false,
    });
    // window.location.href = "/auth/login";
    navigate("/auth/login");
    enqueueSnackbar("Logout success", {
      variant: "success",
      action: (key) => (
        <MIconButton size="small" onClick={() => closeSnackbar(key)}>
          <Icon icon={closeFill} />
        </MIconButton>
      ),
    });
  };

  const handleSignInUser = async (data: any) => {
    try {
      let userType = data?.email === "etc@test.com" ? "etc" : "ambulance"
      // const res = await axios.post(`${BASE_URL}/auth/login`, data);
      let user ={
        ...data,
        type:userType
      }

      // tokenService.setToken(res.data?.token);
      tokenService.setUser(JSON.stringify(user));
      // dispatch({
      //   type: userActions.SIGN_IN,
      //   payload: res?.data,
      // });
      enqueueSnackbar("Login success", {
        variant: "success",
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        ),
      });

      window.location.href = "/dashboard/app";
    } catch (error: any) {
      console.log(error);
      enqueueSnackbar("Login Failed", {
        variant: "error",
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        ),
      });
      return error;
    }
  };

  const value = {
    userState,
    handleSignOut,
    handleSignInUser,
  };

  return (
    <AuthUserContext.Provider value={value}>
      {children}
    </AuthUserContext.Provider>
  );
};

function useAuthUserContext() {
  const context = useContext(AuthUserContext);
  if (context === undefined) {
    throw new Error("AuthUserContext must be within an App Provider");
  }
  return context;
}

export { useAuthUserContext, AuthUserProvider };
