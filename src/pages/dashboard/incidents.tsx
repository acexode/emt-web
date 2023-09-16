// @ts-nocheck

import { FC, useEffect, useState,lazy } from "react";
import axiosInstance from "../../services/api_service";
import { SIGNAL_URL } from "../../services/baseurl";
import signalRService from "../../services/SignalRService";
import {Snackbar,Button,IconButton} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
const CustomTable = lazy(() => import("../../components/incidents/table"))


const TABLE_HEAD = [
  { id: "s/n", label: "S/N", alignRight: false },
  { id: "patientViewModel.firstName", label: "Patient", alignRight: false },
  { id: "incidentCategory", label: "Category", alignRight: false },
  { id: "incidentLocation", label: "Location", alignRight: false },
  { id: "ambulanceViewModel.name", label: "Ambulance", alignRight: false },
  { id: "incidentDate", label: "Date", alignRight: false },
  { id: "emergencyTreatmentCenterViewModel.name", label: "Treatment Center", alignRight: false },
  // { id: "incidentStatusType", label: "Incident Status", alignRight: false },
  { id: "eventStatusType", label: "Event Status", alignRight: false },
  { id: "" },
];


const Incidents: FC = () => {
  const [incidents, setIncidents] = useState<any>([]);
  const [loading,setLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const [message,setMessage] = useState('')

  const handleClose = (event:any, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    signalRService.startConnection(`${SIGNAL_URL}/pulser`); // Replace with actual hub URL
    
    // Add event listeners to receive updates from the hub
    signalRService.connection.on('ReceiveMessage', (message) => {
      // console.log('Received message:', message);
      const resMessage = JSON.parse(message)
      let text = `${resMessage?.UpdateStatus} by ambulance ${resMessage?.AmbulanceName}`
      setMessage(text)
      setOpen(true)
      const updatedIncidents = incidents?.map((incident) => {
        if (incident?.id === resMessage?.IncidentId) {
            // Update the eventStatusType for the matching incident
            return {
                ...incident,
                eventStatusType: resMessage.UpdateStatus
            };
        } else {
            return incident;
        }
      });
      setIncidents(updatedIncidents)
    });

    return () => {
      signalRService.closeConnection();
    };
  }, [incidents]);

  const fetchIncidents = () =>{
    setLoading(true)
    axiosInstance
      .get(`Incidents/get`)
      .then((res) => {
        setIncidents(res?.data?.data)
      })
      .catch((error) => {
        console.log(error);
      }).finally(()=>{
        setLoading(false)
      })
  }
  useEffect(() => {
    fetchIncidents()
  }, []);

  const action = (
    <>
  
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
     <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
        anchorOrigin={{ vertical:'top', horizontal:'center' }}
      />
    <CustomTable page_title='Incidents' loading={loading} table_Head={TABLE_HEAD} dataList={incidents} fetchAllData={fetchIncidents} /></>

  );
};

export default Incidents;
