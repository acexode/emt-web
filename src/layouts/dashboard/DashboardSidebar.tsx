// @ts-nocheck

import { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
// material
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  Link,
  Stack,
  Drawer,
  Tooltip,
  Typography,
  CardActionArea,
} from "@mui/material";
// hooks
import useCollapseDrawer from "../../hooks/useCollapseDrawer";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// components
import Logo from "../../components/Logo";
import MyAvatar from "../../components/MyAvatar";
import Scrollbar from "../../components/Scrollbar";
import NavSection from "../../components/NavSection";
import { MHidden } from "../../components/@material-extend";
//
import sidebarConfig, { sidebarETCConfig } from "./SidebarConfig";
import { useAuthUserContext } from "../../context/authUser.context";
import tokenService from "../../services/tokenService";
import { userType } from "../../constants";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const COLLAPSE_WIDTH = 102;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    transition: theme.transitions.create("width", {
      duration: theme.transitions.duration.complex,
    }),
  },
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

function IconCollapse({ onToggleCollapse, collapseClick }: any) {
  return (
    <Tooltip title="NEMSAS Menu">
      <CardActionArea
        onClick={onToggleCollapse}
        sx={{
          width: 18,
          height: 18,
          display: "flex",
          cursor: "pointer",
          borderRadius: "50%",
          alignItems: "center",
          color: "text.primary",
          justifyContent: "center",
          border: "solid 1px currentColor",
          ...(collapseClick && {
            borderWidth: 2,
          }),
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: "currentColor",
            transition: (theme) => theme.transitions.create("all"),
            ...(collapseClick && {
              width: 0,
              height: 0,
            }),
          }}
        />
      </CardActionArea>
    </Tooltip>
  );
}

export default function DashboardSidebar({
  isOpenSidebar,
  onCloseSidebar,
}: any) {
  const { pathname } = useLocation();
  const [sidebar, setsidebar] = useState<any>();
  const {
    userState: { userProfile },
  } = useAuthUserContext();
  useEffect(() => {
    if(userProfile?.userRole === userType.etc_user){
      setsidebar(sidebarETCConfig);
    }
    else{
      setsidebar(sidebarConfig);
    }
  }, [userProfile]);

  const {
    isCollapse,
    collapseClick,
    collapseHover,
    onToggleCollapse,
    onHoverEnter,
    onHoverLeave,
  } = useCollapseDrawer();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          px: 2.5,
          pt: 3,
          pb: 2,
          ...(isCollapse && {
            alignItems: "center",
          }),
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            component={RouterLink}
            to="/dashboard/app"
            sx={{ display: "inline-flex",alignItems:"center", textDecoration: "none" }}
          >
            <Logo />
            <Typography
              gutterBottom
              variant="h6"
              sx={{
                fontSize: "0.6rem",
                // ml: 2,
                color: "#000",
                mb:0
              }}
            >
             NEMSAS
            </Typography>
          </Box>


        </Stack>

        {isCollapse ? (
          <MyAvatar sx={{ mx: "auto", mb: 2 }} />
        ) : (
          <Link
            underline="none"
            component={RouterLink}
            to={PATH_DASHBOARD.general.app}
          >
            <AccountStyle>
              <MyAvatar />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: "#000" }}>
                { userProfile?.username}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {userProfile?.userRole === userType.etc_user ? "ETC" : "NEMSAS"}
                </Typography>
              </Box>
            </AccountStyle>
          </Link>
        )}
      </Stack>

      <NavSection navConfig={sidebar} isShow={!isCollapse} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse ? COLLAPSE_WIDTH : DRAWER_WIDTH,
        },
        ...(collapseClick && {
          position: "absolute",
        }),
      }}
    >
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
              ...(isCollapse && {
                width: COLLAPSE_WIDTH,
              }),
              ...(collapseHover && {
                borderRight: 0,
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
                boxShadow: (theme) => theme.customShadows.z20,
                bgcolor: (theme) =>
                  alpha(theme.palette.background.default, 0.88),
              }),
            },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
