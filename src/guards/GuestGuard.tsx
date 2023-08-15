 import { Navigate, useSearchParams } from 'react-router-dom';
// hooks
 // routes
import { useAuthUserContext } from '../context/authUser.context';

// ----------------------------------------------------------------------
 
export default function GuestGuard({ children }:any) {
  const {userState:{signedIn}} = useAuthUserContext()
  
  const [searchParams] = useSearchParams();
   if (signedIn) {
    if (searchParams.get('redirectUrl')) {
      return <Navigate to={searchParams.get('redirectUrl') ?? ""} />;
    }
  }

  return <>{children}</>;
}
