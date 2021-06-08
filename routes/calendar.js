const router = require('express').Router();
const CalendarToken = require('../models/CalendarToken');
const {
    getCalendarAuth,
    listAllEvents,
    addNewEvent,
    updateEvent,
    deleteEvent,
} = require('../utils/calendar');

const scopes = ['https://www.googleapis.com/auth/calendar'];

// @desc      to authenticate calendar
// @route     GET /calendar/auth
// @access    Public
router.get('/calendar/auth', (req, res) => {
    const auth = getCalendarAuth();
    const authUrl = auth.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
    });

    console.log('auth URL: ', authUrl);

    res.redirect(authUrl);
});

// @desc      create accessToken and refreshToken
// @route     GET /calendar/auth-code
// @access    Public
router.get('/calendar/auth-code', (req, res) => {
    const code = req.query.code;
    console.log(code);
    if (!code) {
        console.log(req.query);
        console.log(req.params);
        console.log(req.body);
        return res.send('Code Error!');
    }

    const auth = getCalendarAuth();
    auth.getToken(code, async (err, token) => {
        if (err) {
            console.error('Error retrieving access token', err);
            return res.send('Error in retrieving access token!');
        }
        console.log(token);

        return CalendarToken.findOneAndUpdate(
            { scope: scopes[0] },
            {
                accessToken: token.access_token,
                refreshToken: token.refresh_token,
                accessTokenExpiryDate: token.expiry_date,
                scope: scopes[0],
            },
            { upsert: true, new: true },
            (err, doc) => {
                if (err) {
                    console.error(
                        'Error in saving token data in database',
                        err
                    );
                    return res.send('Error in saving token data in database!');
                }
                console.log(doc);
                return res.send(
                    'auth code verified and saved in database successfully!!'
                );
            }
        );
    });
});

// @desc      GET calendar accessToken
// @route     GET /calendar/access_token
// @access    Public
router.get('/calendar/access_token', (req, res) => {
    return CalendarToken.findOne()
        .select('-refreshToken')
        .sort({ updated_at: -1 })
        .limit(1)
        .exec((err, data) => {
            if (err) {
                console.error('Error in connecting to database', err);
                return res.send('Error in connecting to database!');
            }
            console.log(data);
            res.json({
                data,
            });
        });
});

// @desc      GET all events
// @route     GET /calendar/all-events
// @access    Public
router.get('/calendar/all-events', async (req, res) => {
    const events = await listAllEvents();
    return res.json({
        events,
    });
});

// @desc      create new event
// @route     POST /calendar/add-event
// @access    Public
router.post('/calendar/add-event', async (req, res) => {
    console.log(req.body);
    const event = req.body.event;
    if (!event) return res.send('No event found!');
    const eventResponse = await addNewEvent(event);
    return res.json({
        event: eventResponse,
    });
});

// @desc      update event
// @route     POST /calendar/update-event
// @access    Public
router.post('/calendar/update-event', async (req, res) => {
    const event = req.body.event;
    if (!event) return res.send('No event found!');
    const eventResponse = await updateEvent(event);
    return res.json({
        event: eventResponse,
    });
});

// @desc      delete event
// @route     POST /calendar/delete-event
// @access    Public
router.post('/calendar/delete-event', async (req, res) => {
    const eventId = req.body.eventId;
    if (!eventId) return res.send('No eventId found!');
    const eventResponse = await deleteEvent(eventId);
    console.log(eventResponse);
    return res.send('Event deleted successfully!');
});

module.exports = router;
