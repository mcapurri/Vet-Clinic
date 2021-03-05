import { useEffect } from 'react';
import { logout } from '../../utils/auth';

const Logout = (props) => {
    console.log('props Logout', props);
    useEffect(() => {
        const logOutUser = async () => {
            await logout().then(() => {
                props.setUser(() => null);
            });
        };
        logOutUser();
    }, [props]);
    return () => props.history.push('/');
};

export default Logout;
