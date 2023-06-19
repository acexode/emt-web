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
        title: "M&E",
        path: PATH_DASHBOARD.m_and_e.root,
        icon: ICONS.reports,
        children: [
          { title: "State", path: PATH_DASHBOARD.m_and_e.state },
          { title: "LGA", path: PATH_DASHBOARD.m_and_e.lga },
          { title: "HF", path: PATH_DASHBOARD.m_and_e.hf },
        ],
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
          { title: "User Management", path: PATH_DASHBOARD.settings.userManagement },
          { title: "Facility Management", path: PATH_DASHBOARD.settings.facilityManagement },
          { title: "Questions", path: PATH_DASHBOARD.settings.questionsManagement },
        ],
      },
      { title: "Log Out", path: PATH_AUTH.login, icon: ICONS.exit },
    ],
  },
];

export default sidebarConfig;
