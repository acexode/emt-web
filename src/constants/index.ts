export  const  emt = "emt";
export const app_title = "NIEMS"

export const userType = {
    etc_user: "ExportEmergencyTreatmentUser",
    ambulance_user: "ExportAndDeleteNemsasAdmin"
}

export const userTypesArray = [ "SuperAdministrator", "AmbulanceUserCreate", "AmbulanceUserRead", "AmbulanceUserUpdate", "BasicAmbulanceUser", "EmergencyTreatmentUserCreate", "EmergencyTreatmentUserRead", "EmergencyTreatmentUserUpdate", "EmergencyTreatmentUserExport", "BasicEmergencyTreatmentUser", "ExportEmergencyTreatmentUser", "SemsasPIUUserCreate", "SemsasPIUUserRead", "SemsasPIUUserUpdate", "SemsasPIUUserExport", "BasicSemsasPIUUserUser", "ExportSemsasPIUUser", "SemsasMAndEUserCreate", "SemsasMAndEUserRead", "SemsasMAndEUserUpdate", "SemsasMAndEUserExport", "BasicSemsasMAndEUser", "ExportSemsasMAndEUser", "NemsasMAndEUserCreate", "NemsasMAndEUserRead", "NemsasMAndEUserUpdate", "NemsasMAndEUserExport", "BasicNemsasMAndEUser", "ExportNemsasMAndEUser", "NemsasAdminCreate", "NemsasAdminRead", "NemsasAdminUpdate", "NemsasAdminExport", "NemsasAdminDelete", "BasicNemsasAdmin", "ExportAndDeleteNemsasAdmin" ]


export const errorMessages = {
    403 :  "User does not have permission.",
    401: "Unauthorized user.",
    400: "We're sorry, but something went wrong with your request. Please make sure all the required information is correctly filled out and try again.",
    404: "Data not found",
    500: "Oops! Something went wrong on our end. Our team has been notified about this issue, and we're working to fix it as quickly as possible. We apologize for any inconvenience this may have caused. Please try again later.",

}

export const roles =  {
    PARTNERS: {
        label:"PARTNERS",
        value:"PARTNERS"
    },
    SUPERADMINISTRATOR:{
        label:"SUPER ADMIN",
        value:"SUPERADMINISTRATOR"
    },
    AMBULANCEUSER:{
        label:"AMBULANCE USER",
        value:"AMBULANCEUSER"
    },
    EMERGENCYTREATMENTUSER:{
        label:"EMT USER",
        value:"EMERGENCYTREATMENTUSER"
    },
    NEMSASADMIN:{
        label:"NEMSAS ADMIN",
        value:"NEMSASADMIN"
    },
    NEMSASMANAGER:{
        label:"NEMSAS MANAGER",
        value:"NEMSASMANAGER"
    },
    NEMSASUSER:{
        label:"NEMSAS USER",
        value:"NEMSASUSER",
    },
    SEMSASMANAGER:{
        label:"SEMSAS MANAGER",
        value:"SEMSASMANAGER"
    },
    SEMSASUSER:{
        label:"SEMSAS USER",
        value:"SEMSASUSER"
    },
    SEMSASDISPATCH:{
        label:"SEMSAS DISPATCHER",
        value:"SEMSASDISPATCH"
    },
}
