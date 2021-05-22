import axios from 'axios';

const token = localStorage.getItem('token');
console.log('origin', process.env.ORIGIN);

const instance = axios.create({
    baseURL: `${process.env.ORIGIN}/api`,
    headers: { Authorization: `Bearer ${token}` },
    // withCredentials: true // => you might need this when having the users in the app
});

const errorHandler = (err) => {
    // console.error(err);
    throw err;
};
const handleUpload = async (file, id) => {
    try {
        const resp = await instance.post(`/upload`, file);
        return resp.data;
    } catch (err) {
        errorHandler(err);
    }
};

const saveNewThing = async (newThing) => {
    console.log('new thing is: ', newThing);
    try {
        const resp = await instance.post('/messages/new', newThing);
        return resp.data;
    } catch (err) {
        errorHandler(err);
    }
};

const getUnreadMessages = () => {
    return instance
        .get('/messages/unread')
        .then((response) => {
            return response?.data;
        })
        .catch((err) => {
            return err.response?.data;
        });
};

export { handleUpload, saveNewThing, getUnreadMessages };
