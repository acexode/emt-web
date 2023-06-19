 import { Navigate, useSearchParams } from 'react-router-dom';
// hooks
 // routes
import { PATH_DASHBOARD } from '../routes/paths';
import { useAuthUserContext } from '../context/authUser.context';

// ----------------------------------------------------------------------
 
export default function GuestGuard({ children }:any) {
  const {userState:{signedIn}} = useAuthUserContext()
  
  const [searchParams] = useSearchParams();
   if (signedIn) {
    if (searchParams.get('redirectUrl')) {
      return <Navigate to={searchParams.get('redirectUrl') ?? ""} />;
    }
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  return <>{children}</>;
}
