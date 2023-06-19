import { ReactNode } from "react";

export interface IAuthContext {
    userState: any;
    handleSignOut: () => void;
    handleSignInUser?: any;
}

export interface Props {
    children?: ReactNode;
    // any props that come into the component
}
