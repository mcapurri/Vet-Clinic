import axios from 'axios';

const token = localStorage.getItem('token');
const service = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: { Authorization: `Bearer ${token}` },
    // withCredentials: true // => you might need this when having the users in the app
});

const errorHandler = (err) => {
    // console.error(err);
    throw err;
};

export default {
    service,

    handleUpload(theFile) {
        console.log('file in service: ', theFile);
        return service
            .post('/upload', theFile)
            .then((res) => res.data)
            .catch(errorHandler);
    },

    saveNewThing(newThing) {
        console.log('new thing is: ', newThing);
        return service
            .post('/messages/new', newThing)
            .then((res) => res.data)
            .catch(errorHandler);
    },

    getUnreadMessages() {
        return service
            .get('/messages/unread')
            .then((response) => {
                return response?.data;
            })
            .catch((err) => {
                return err.response.data;
            });
    },
};
