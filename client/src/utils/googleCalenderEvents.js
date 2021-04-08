import {
  GOOGLE_API_KEY,
  GOOGLE_CLIENT_ID,
  DISCOVERY_DOCS,
  SCOPE,
  CALENDAR_ID,
} from "../googleApiConfig.json";

const gapi = window.gapi;
console.log("gapi", gapi);

export const authenticate = () => {
  return gapi.auth2
    ?.getAuthInstance()
    ?.signIn({
      scope: SCOPE,
    })
    .then(
      function () {
        console.log("Sign-in successful");
      },
      function (err) {
        console.error("Error signing in", err);
      }
    );
};
export const loadClient = () => {
  gapi.client.setApiKey(GOOGLE_API_KEY);
  return gapi.client
    .load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest")
    .then(
      function () {
        console.log("GAPI client loaded for API");
      },
      function (err) {
        console.error("Error loading GAPI client for API", err);
      }
    );
};
// Make sure the client is loaded and sign-in is complete before calling this method.
export const listAll = () => {
  return gapi.client.calendar.events
    .list({
      calendarId: CALENDAR_ID,
      showDeleted: false,
      singleEvents: true,
      // maxResults: 10,
      orderBy: "startTime",
    })
    .then(
      function (response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response);
        const { items } = response?.result;
        const events = items.map((item) => ({
          title: item.summary,
          startDate: Date.parse(item?.start?.dateTime),
          endDate: Date.parse(item?.end?.dateTime),
          id: item.id,
          location: item.location,
        }));
        console.log("events ", events);
        return events;
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
};

export const updateEvent = (event) => {
  console.log("Update object ", event);
  return gapi.client.calendar.events
    .update({
      calendarId: CALENDAR_ID,
      eventId: event.id,
      resource: {
        end: {
          dateTime: new Date(event.endDate).toISOString(),
        },
        start: {
          dateTime: new Date(event.startDate).toISOString(),
        },
        location: event.location,
        summary: event.title,
      },
    })
    .then(
      function (response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response);
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
};

export const addNewEvent = (event) => {
  return gapi.client.calendar.events
    .insert({
      calendarId: CALENDAR_ID,
      resource: {
        end: {
          dateTime: new Date(event.endDate).toISOString(),
        },
        start: {
          dateTime: new Date(event.startDate).toISOString(),
        },
        location: event.location,
        summary: event.title,
      },
    })
    .then((response) => {
      // Handle the results here (response.result has the parsed body).
      console.log("Response", response);
      return response;
    })
    .catch((err) => console.error("Execute error", err));
};

export const deleteEvent = (eventId) => {
  return gapi.client.calendar.events
    .delete({
      calendarId: CALENDAR_ID,
      eventId: eventId,
      sendNotifications: true,
      sendUpdates: "all",
    })
    .then(
      function (response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response);
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
};

gapi.load("client:auth2", function () {
  gapi.auth2.init({ client_id: GOOGLE_CLIENT_ID });
});
