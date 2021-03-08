import './App.css';
import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Components/Home/Home';
import Signup from './Components/Auth/Signup/Signup';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import UsersList from './Components/Users/UsersList/UsersList';
import UserDetails from './Components/Users/UserDetails/UserDetails';
import AddUser from './Components/Users/AddUser/AddUser';

function App(props) {
    const [user, setUser] = useState(props.user || '');

    console.log('user', user);
    console.log('props', props);

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
                <Route exact path="/" component={Home} />
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

                {/* <Route exact path="/pets" component={PetsList} />
                <Route exact path="/pets/:id" component={PetDetails} /> */}
            </Switch>
            <Footer />
        </div>
    );
}

export default App;
