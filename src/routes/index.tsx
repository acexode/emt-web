import { Suspense, lazy } from "react";
import { Navigate, useLocation, useRoutes } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
// import AuthGuard from "../guards/AuthGuard";
import GuestGuard from "../guards/GuestGuard";
import DashboardLayout from "../layouts/dashboard";
import LogoOnlyLayout from "../layouts/LogoOnlyLayout";

const Loadable = (Component: any) => (props: JSX.IntrinsicAttributes) => {
  const { pathname } = useLocation();
  const isDashboard = pathname.includes("/dashboard");

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: "fixed",
            }),
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: "register",
          element: <GuestGuard>{/* <Register /> */}</GuestGuard>,
        },
        { path: "login-unprotected", element: <Login /> },
      ],
    },
    {
      path: "dashboard",
      element: (
          <DashboardLayout />
        // <AuthGuard>
        // </AuthGuard>
      ),
      children: [
        { path: "", element: <Navigate to="/dashboard/app" replace /> },
        { path: "app", element: <GeneralApp /> },
        {
          path: "incidents", element: <Incidents />
        },
        {
          path: "new-incidents", element: <NewIncidentForm />
        },
        {
          path: "patients", element: <Patients />
        },
        {
          path: "ambulance_run_sheets", element: <RunSheets />
        },
        {
          path: "claims",element: <Claims />
        },
        {
          path: "claims/view-etc-claim",element: <ViewETC />
        },
        {
          path: "claims/view-ambulance-claim",element: <ViewAmbulance />
        },
        {
          path: "settings",
          children: [
            { path: "users", element: <UserManagement /> },
            { path: "service-providers", element: <ServiceProvidersManagement /> },
          
          ],
        },
      ],
    },
    {
      path: "*",
      element: <LogoOnlyLayout />,
      children: [
        { path: "500", element: <Page500 /> },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },

    { path: "*", element: <Navigate to="/404" replace /> },
    { path: "/", element: <Navigate to="/dashboard/app" replace /> },
  ]);
}

const Login = Loadable(lazy(() => import("../pages/authentication/login")));
const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/general_app"))
);
const Incidents = Loadable(
  lazy(() => import("../pages/dashboard/incidents"))
);
const Claims = Loadable(
  lazy(() => import("../pages/dashboard/claims"))
);
const Patients = Loadable(
  lazy(() => import("../pages/dashboard/patients"))
);
const RunSheets = Loadable(
  lazy(() => import("../pages/dashboard/run_sheets"))
);
const ViewAmbulance = Loadable(
  lazy(() => import("../pages/dashboard/viewAmbulance"))
);
const ViewETC = Loadable(
  lazy(() => import("../pages/dashboard/viewEtc"))
);
const NewIncidentForm = Loadable(
  lazy(() => import("../pages/dashboard/components/new_incident"))
);
const ServiceProvidersManagement = Loadable(
  lazy(() => import("../pages/settings/ServiceProviders"))
);
const UserManagement = Loadable(
  lazy(() => import("../pages/settings/User"))
);


const Page500 = Loadable(lazy(() => import("../pages/Page500")));
const NotFound = Loadable(lazy(() => import("../pages/Page404")));
// const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
