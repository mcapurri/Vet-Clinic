const { google } = require('googleapis');
const CalendarToken = require('../models/CalendarToken');
const got = require('got');

const client_id = process.env.GOOGLE_CLIENT_ID;
const client_secret = process.env.GOOGLE_CLIENT_SECRET;

const calendarId = process.env.GOOGLE_CALENDAR_ID;

const redirect_uri = 'http://localhost:5000/api/calendar/auth-code/';

const getCalendarAuth = () => {
    const auth = new google.auth.OAuth2(client_id, client_secret, redirect_uri);
    return auth;
};

const getCalendarToken = async () => {
    return CalendarToken.findOne()
        .sort({ updated_at: -1 })
        .limit(1)
        .catch((err) => {
            return console.error('Error in connecting database!', err);
        });
};

const updateAccessToken = async () => {
    await CalendarToken.findOne()
        .sort({ updated_at: -1 })
        .limit(1)
        .then(async (data) => {
            console.log(data);
            const refresh_token = data.refreshToken;
            const newTokenDetails = await got
                .post('https://oauth2.googleapis.com/token', {
                    json: {
                        client_id,
                        client_secret,
                        refresh_token,
                        grant_type: 'refresh_token',
                    },
                    responseType: 'json',
                    timeout: 60000,
                    retry: 1,
                    resolveBodyOnly: true,
                })
                .then((result) => {
                    console.info(JSON.stringify(result, null, 2));
                    return result;
                });

            const expiry_date =
                Date.now() + (newTokenDetails.expires_in - 100) * 1000;
            const accessToken = newTokenDetails.access_token;
            return CalendarToken.findOneAndUpdate(
                { _id: data._id },
                {
                    accessToken,
                    accessTokenExpiryDate: expiry_date,
                },
                { new: true },
                (err, doc) => {
                    if (err) {
                        return console.error(
                            'Error in saving token data in database',
                            err
                        );
                    }
                    console.log(doc);
                    return doc;
                }
            );
        })
        .catch((err) => {
            return console.error('Error in updating access Token!', err);
        });
};

const listAllEvents = async () => {
    const credentials = await getCalendarToken();
    const auth = getCalendarAuth();
    auth.setCredentials({
        access_token: credentials.accessToken,
        refresh_token: credentials.refreshToken,
    });
    return google
        .calendar({ version: 'v3', auth })
        .events.list({
            calendarId: calendarId,
            showDeleted: false,
            singleEvents: true,
            // maxResults: 10,
            orderBy: 'startTime',
        })
        .then((response) => {
            // Handle the results here (response.result has the parsed body).
            // console.log('Response', response);
            const { items } = response.data;
            const events = items.map((item) =>
                // console.log('item', item),
                ({
                    title: item.summary,
                    startDate: Date.parse(item.start.dateTime),
                    endDate: Date.parse(item.end.dateTime),
                    id: item.id,
                    location: item.location,
                    notes: item.notes,
                })
            );
            // console.log('events ', events);
            return events;
        })
        .catch((err) => {
            console.error('Execute error', err);
        });
};

const updateEvent = async (event) => {
    console.log('Update object ', event);

    const credentials = await getCalendarToken();
    const auth = getCalendarAuth();
    auth.setCredentials({
        access_token: credentials.accessToken,
        refresh_token: credentials.refreshToken,
    });
    return google
        .calendar({ version: 'v3', auth })
        .events.update({
            calendarId: calendarId,
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
                notes: event.notes,
            },
        })
        .then((response) => {
            // console.log('Response', response);
            return response.data;
        })
        .catch((err) => {
            console.error('Execute error', err);
        });
};

const addNewEvent = async (event) => {
    console.log('addEvent', event);

    const credentials = await getCalendarToken();
    const auth = getCalendarAuth();
    auth.setCredentials({
        access_token: credentials.accessToken,
        refresh_token: credentials.refreshToken,
    });
    return google
        .calendar({ version: 'v3', auth })
        .events.insert({
            calendarId: calendarId,
            resource: {
                end: {
                    dateTime: new Date(event.endDate).toISOString(),
                },
                start: {
                    dateTime: new Date(event.startDate).toISOString(),
                },
                location: event.location,
                summary: event.title,
                notes: event.notes,
            },
        })
        .then((response) => {
            // Handle the results here (response.result has the parsed body).
            // console.log('Response', response);
            return response.data;
        })
        .catch((err) => console.error('Execute error', err));
};

const deleteEvent = async (eventId) => {
    const credentials = await getCalendarToken();
    const auth = getCalendarAuth();
    auth.setCredentials({
        access_token: credentials.accessToken,
        refresh_token: credentials.refreshToken,
    });
    return google
        .calendar({ version: 'v3', auth })
        .events.delete({
            calendarId: calendarId,
            eventId: eventId,
            sendNotifications: true,
            sendUpdates: 'all',
        })
        .then((response) => {
            // Handle the results here (response.result has the parsed body).
            console.log('Response', response);
            return response.data || 'Event deleted successfully!';
        })
        .catch((err) => {
            console.error('Execute error', err);
        });
};

module.exports = {
    getCalendarAuth,
    updateAccessToken,
    getCalendarToken,
    listAllEvents,
    updateEvent,
    deleteEvent,
    addNewEvent,
};
