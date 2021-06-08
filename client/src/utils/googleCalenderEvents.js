import Axios from 'axios';

const axios = Axios.create({
    baseUrl: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Make sure the client is loaded and sign-in is complete before calling this method.
export const listAll = () => {
    return axios
        .get('/api/calendar/all-events')
        .then((response) => {
            // console.log(response.data);
            return response.data?.events;
        })
        .catch((err) => {
            console.error('Execute error', err);
        });
};

export const updateEvent = (event) => {
    console.log('Update object ', event);
    return axios
        .post('/api/calendar/update-event', {
            event,
        })
        .then((response) => {
            console.log('Response', response);
        })
        .catch((err) => {
            console.error('Execute error', err);
        });
};

export const addNewEvent = (event) => {
    console.log('addEvent', event);

    return axios
        .post('/api/calendar/add-event', {
            event,
        })
        .then((response) => {
            // Handle the results here (response.result has the parsed body).
            console.log('Response', response.data);
            return { result: response.data?.event };
        })
        .catch((err) => console.error('Execute error', err));
};

export const deleteEvent = (eventId) => {
    return axios
        .post('/api/calendar/delete-event', {
            eventId,
        })
        .then((response) => {
            // Handle the results here (response.result has the parsed body).
            // console.log('Response', response);
        })
        .catch((err) => {
            console.error('Execute error', err);
        });
};
