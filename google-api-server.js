// Google API config
// const { google } = require('googleapis');

// const { OAuth2 } = google.auth;

// const oAuth2Client = new OAuth2(
//     process.env.GOOGLE_CLIENT_ID,
//     process.env.GOOGLE_CLIENT_SECRET
// );

// const calendarID = 'bmreulqa3uajgpp04t532q6hbs@group.calendar.google.com';

// oAuth2Client.setCredentials({
//     refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
// });

// const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

// const eventStartTime = new Date();

// const eventEndTime = new Date();
// eventEndTime.setMinutes(eventEndTime.getMinutes() + 30);

// const event = {
//     summary: 'Julian Paine',
//     location: 'Kant str 37, 10000, Berlin',
//     description: ' Appointment on site',
//     start: {
//         dateTime: eventStartTime,
//         timeZone: 'Europe/Berlin',
//     },
//     end: {
//         dateTime: eventEndTime,
//         timeZone: 'Europe/Berlin',
//     },
//     colorId: 1,
// };
// // calendar.events.list(
// //     {
// //         calendarId: calendarID,
// //         singleEvents: true,
// //         orderBy: 'startTime',
// //     },
// //     (err, res) => {
// //         if (err) return console.log('The API returned an error: ' + err);
// //         const events = res.data.items;

// //         if (events.length) {
// //             console.log('Events');
// //             events.map((event, i) => {
// //                 let titleName = event.summary;
// //                 let startTime = event.start.dateTime;
// //                 let endTime = event.end.dateTime;
// //                 this.state.events.push({
// //                     title: titleName,
// //                     start: startTime,
// //                     end: endTime,
// //                 });
// //             });
// //         } else {
// //             console.log('No upcoming events found.');
// //         }

// //         console.log(this.state.events);
// //     }
// // );

// calendar.freebusy.query(
//     {
//         resource: {
//             timeMin: eventStartTime,
//             timeMax: eventEndTime,
//             timeZone: 'Europe/Berlin',
//             items: [{ id: calendarID }],
//         },
//     },
//     (err, res) => {
//         if (err) return console.error('Free Busy Query Error: ', err);
//         console.log('response DB', res.data);
//         const eventsArr = res.data.calendars[calendarID].busy;
//         console.log('eventsArr', eventsArr);

//         if (eventsArr.length === 0)
//             return calendar.events.insert(
//                 { calendarId: calendarID, resource: event },
//                 (err) => {
//                     if (err)
//                         return console.error(
//                             'Calendar Event Creation Error: ',
//                             err
//                         );
//                     return console.log('Calendar Event Created', eventsArr);
//                 }
//             );
//         return console.log('Timeslot already taken', eventsArr);
//     }
// );

// end google API
