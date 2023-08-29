// @ts-nocheck

// SignalRService.js or SignalRService.ts
import * as signalR from '@microsoft/signalr';

const signalRService = {
  connection: null,

  startConnection: (hubUrl: string) => {
    if (signalRService.connection) {
      return;
    }

    signalRService.connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .build();

    signalRService.connection.start()
      .then(() => {
        console.log('Connected to SignalR hub');
      })
      .catch((error: any) => {
        console.error('Error connecting to SignalR hub:', error);
      });
  },

  closeConnection: () => {
    if (signalRService.connection) {
      signalRService.connection.stop();
      signalRService.connection = null;
    }
  },

  // Add methods to send/receive messages here
};

export default signalRService;
