import React, { Suspense, lazy } from "react";
import { Navigate, useLocation, useRoutes } from "react-router-dom";
// import AuthGuard from "../guards/AuthGuard";
import LoadingScreen from "../components/LoadingScreen";
import GuestGuard from "../guards/GuestGuard";
import LogoOnlyLayout from "../layouts/LogoOnlyLayout";
// import DashboardLayout from "../layouts/dashboard";
// import NotFound from "../pages/not_found";

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
    // {
    //   path: "dashboard",
    //   element: (
    //     <AuthGuard>
    //       <DashboardLayout />
    //     </AuthGuard>
    //   ),
    //   children: [
    //     { path: "", element: <Navigate to="/dashboard/app" replace /> },
    //     { path: "app", element: <GeneralApp /> },
    //     {
    //       path: "m-and-e",

    //       children: [
    //         // { path: '/', element: <Navigate to="/m-and-e/state" replace /> },
    //         { path: "state", element: <StatePage /> },
    //         { path: "lga", element: <LGAPage /> },
    //         { path: "hf", element: <HFPage /> },
    //         { path: "view-assessment", element: <ViewQuarter /> },
    //         { path: "view-state-assessment", element: <ViewQuarterState /> },
    //         { path: "view-hf-assessment", element: <ViewHFQuarter /> },
    //         { path: "new-assessment", element: <NewAssessmentForm /> },
    //         { path: "new-assessment-lga", element: <NewAssessmentFormLGA /> },
    //         { path: "new-assessment-hf", element: <NewAssessmentFormHF /> },
    //       ],
    //     },
    //     {
    //       path: "settings",
    //       children: [
    //         { path: "user", element: <UserManagement /> },
    //         { path: "facility", element: <FacilityManagement /> },
    //         { path: "questions", element: <QuestionsSettings /> },
           
    //       ],
    //     },
    //   ],
    // },
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
// const GeneralApp = Loadable(
//   lazy(() => import("../pages/dashboard/general_app"))
// );


const Page500 = Loadable(lazy(() => import("../pages/Page500")));
const NotFound = Loadable(lazy(() => import("../pages/Page404")));
// const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
