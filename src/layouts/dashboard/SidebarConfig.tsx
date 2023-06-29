// routes
import { PATH_DASHBOARD, PATH_AUTH } from "../../routes/paths";
// components
import SvgIconStyle from "../../components/SvgIconStyle";

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle
    src={`/static/icons/navbar/${name}.svg`}
    sx={{ width: "100%", height: "100%" }}
  />
);

const ICONS = {
  user: getIcon("ic_user"),
  dashboard: getIcon("ic_dashboard"),
  booking: getIcon("ic_booking"),
  reports: getIcon("ic_analytics"),
  finances: getIcon("ic_finances"),
  settings: getIcon("ic_settings"),
  exit: getIcon("ic_exit"),
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "general",
    items: [
      {
        title: "Dashboard",

        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard,
      },

      {
        title: "Incidents",
        path: PATH_DASHBOARD.incidents.root,
        icon: ICONS.reports,
      },
      {
        title: "Claims",
        path: PATH_DASHBOARD.claims.root,
        icon: ICONS.reports,
      },
    ],
  },

  // Misc
  // ----------------------------------------------------------------------
  {
    subheader: "Misc",
    items: [
      {
        title: "Settings",

        path: PATH_DASHBOARD.settings.root,
        icon: ICONS.settings,
        children: [
          { title: "", path: ''},
        ],
      },
      { title: "Log Out", path: PATH_AUTH.login, icon: ICONS.exit },
    ],
  },
];

export default sidebarConfig;
