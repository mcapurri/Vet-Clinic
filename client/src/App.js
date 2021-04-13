import './App.css';
import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Components/Home/Home';
import Signup from './Components/Auth/Signup/Signup';
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
import axios from 'axios';
function App(props) {
    const [user, setUser] = useState(props.user || '');

    console.log('user', user);

    let isEmployee = false;
    user.role === 'employee' && (isEmployee = true);

    return (
        <div className="App">
            <Route
                render={(props) => (
                    <NavigationBar
                        {...props}
                        isEmployee={isEmployee}
                        setUser={setUser}
                        user={user}
                    />
                )}
            />
            <Switch>
                <Route
                    exact
                    path="/"
                    render={(props) => <Home {...props} user={user} />}
                />
                <Route
                    exact
                    path="/signup"
                    render={(props) => <Signup {...props} setUser={setUser} />}
                />
                <Route exact path="/users" component={UsersList} />
                <Route
                    exact
                    path="/users/add"
                    render={(props) => <AddUser {...props} />}
                />
                <Route
                    exact
                    path="/users/:id"
                    render={(props) => (
                        <UserDetails
                            {...props}
                            isEmployee={isEmployee}
                            selectedUser={user}
                        />
                    )}
                />

                <Route
                    exact
                    path="/pets/add"
                    render={(props) => (
                        <AddPet
                            {...props}
                            isEmployee={isEmployee}
                            user={user}
                        />
                    )}
                />
                <Route
                    exact
                    path="/users/:id/pet"
                    render={(props) => <AddPet {...props} />}
                />
                <Route exact path="/pets" component={PetsList} />
                <Route exact path="/pets/:id" component={PetDetails} />
                <Route exact path="/messages" component={MessagesList} />
                <Route
                    exact
                    path="/messages/:id"
                    render={(props) => <MessageDetails {...props} />}
                />
                <Route exact path="/scheduler" component={GoogleScheduler} />
            </Switch>
            <Footer isEmployee={isEmployee} />
        </div>
    );
}

export default App;
