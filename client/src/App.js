import './App.css';
import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Components/Home/Home';
import Signup from './Components/Auth/Signup/Signup';
import ForgotPassword from './Components/Auth/Recovery_Email/ForgotPassword';
import ResetPassword from './Components/Auth/Recovery_Email/ResetPassword';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import Footer from './Components/Footer/Footer';
import UsersList from './Components/Users/UsersList/UsersList';
import UserDetails from './Components/Users/UserDetails/UserDetails';
import AddUser from './Components/Users/AddUser/AddUser';
import AddPet from './Components/Pets/AddPet/AddPet';
import PetsList from './Components/Pets/PetsList/PetsList';
import PetDetails from './Components/Pets/PetDetails/PetDetails';
import MessagesList from './Components/Messages/MessagesList/MessagesList';
import MessageDetails from './Components/Messages/MessageDetails/MessageDetails';
import GoogleScheduler from './Components/Scheduler/GoogleScheduler';
import ProtectedRoute from './utils/ProtectedRoute';
import { getUnreadMessages } from './utils/service';

function App(props) {
    // console.log('props', props.user);
    const [user, setUser] = useState(props.user || '');
    console.log('user', user);

    const [unreadMessages, setUnreadMessages] = useState(0);

    // Fetch unread messages every 30 secs
    useEffect(() => {
        setInterval(
            () =>
                getUnreadMessages().then((data) => {
                    setUnreadMessages(data.unread ?? 0);
                }),
            30000
        );
    }, []);

    // Show text in the header if screen > 660px
    const [width, setWidth] = useState(window.innerWidth);
    // console.log('width', width);

    const handleResize = () => {
        setWidth(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    let isEmployee = user.role === 'employee';

    return (
        <div className="App">
            <Route
                render={(props) => (
                    <NavigationBar
                        {...props}
                        isEmployee={isEmployee}
                        setUser={setUser}
                        user={user}
                        unreadMessages={unreadMessages}
                    />
                )}
            />
            <Switch>
                <Route
                    exact
                    path="/"
                    render={(props) => (
                        <Home {...props} user={user} width={width} />
                    )}
                />
                <Route
                    exact
                    path="/signup"
                    render={(props) => <Signup {...props} setUser={setUser} />}
                />
                <Route
                    exact
                    path="/forgotpassword"
                    render={(props) => <ForgotPassword {...props} />}
                />
                <Route
                    exact
                    path="/resetpassword/:resettoken"
                    render={(props) => <ResetPassword {...props} />}
                />
                <ProtectedRoute
                    exact
                    path="/users"
                    component={UsersList}
                    user={user}
                />
                <ProtectedRoute
                    exact
                    path="/users/add"
                    component={AddUser}
                    user={user}
                />

                <ProtectedRoute
                    exact
                    path="/users/:id"
                    component={UserDetails}
                    user={user}
                    isEmployee={isEmployee}
                    selectedUser={user}
                />
                <ProtectedRoute
                    exact
                    path="/users/:id/pet"
                    component={AddPet}
                    user={user}
                    isEmployee={isEmployee}
                />

                <ProtectedRoute
                    exact
                    path="/pets/add"
                    component={AddPet}
                    user={user}
                    isEmployee={isEmployee}
                />

                <ProtectedRoute
                    exact
                    path="/pets"
                    component={PetsList}
                    user={user}
                />
                <ProtectedRoute
                    exact
                    path="/pets/:id"
                    component={PetDetails}
                    user={user}
                />
                <ProtectedRoute
                    exact
                    path="/messages"
                    component={MessagesList}
                    user={user}
                />
                <ProtectedRoute
                    exact
                    path="/messages/:id"
                    component={MessageDetails}
                    user={user}
                />
                <ProtectedRoute
                    exact
                    path="/scheduler"
                    component={GoogleScheduler}
                    user={user}
                />
            </Switch>
            <Footer isEmployee={isEmployee} width={width} />
        </div>
    );
}

export default App;
