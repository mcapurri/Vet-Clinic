import './App.css';
import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Components/Home/Home';
import Signup from './Components/Auth/Signup/Signup';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import UsersList from './Components/Users/UsersList/UsersList';
import UserDetails from './Components/Users/UserDetails/UserDetails';
import AddUser from './Components/Users/AddUser/AddUser';
import AddPet from './Components/Pets/AddPet/AddPet';
import PetsList from './Components/Pets/PetsList/PetsList';
import PetDetails from './Components/Pets/PetDetails/PetDetails';
import ContactsList from './Components/Contacts/ContactsList';
// import AppScheduler from './Components/Scheduler/Scheduler';
import GoogleScheduler from './Components/Scheduler/GoogleScheduler/GoogleScheduler';
import GoogleSchedulerClasses from './Components/Scheduler/GoogleScheduler/GoogleSchedulerClasses';

function App(props) {
    const [user, setUser] = useState(props.user || '');

    console.log('user', user);

    let isEmployee = false;
    {
        user.role === 'employee' && (isEmployee = true);
    }

    return (
        <div className="App">
            <Route
                render={(props) => (
                    <Navbar
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
                <Route exact path="/contacts" component={ContactsList} />

                <Route
                    exact
                    path="/contacts/scheduler"
                    component={GoogleScheduler}
                />
            </Switch>
            <Footer />
        </div>
    );
}

export default App;
