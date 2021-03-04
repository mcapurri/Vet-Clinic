import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
// import UsersList from './Components/UsersList/UsersList';
// import UserDetails from './Components/UserDetails/UserDetails';
// import { logout } from './utils/auth';

function App(props) {
    const [user, setUser] = useState(props.user || '');
    console.log('user', user);
    console.log('props', props);
    let isEmployee = false;
    {
        user.role === 'employee' && (isEmployee = true);
    }

    // const handleLogout = (props) => {
    //     logout().then(() => {
    //         setUser(null);
    //         props.history.push('/');
    //     });
    // };
    return (
        <div className="App">
            <Route
                render={(props) => (
                    <Navbar
                        {...props}
                        isEmployee={isEmployee}
                        setUser={setUser}
                        user={user}
                        // handleLogout={handleLogout}
                    />
                )}
            />
            <Switch>
                <Route exact path="/" component={Home} />
                {/* <Route exact path="/users" component={UsersList} />
                <Route exact path="/users/:id" component={UserDetails} /> */}
                {/* <Route exact path="/pets" component={PetsList} />
            <Route exact path="/pets/:id" component={PetDetails} /> */}
            </Switch>
            <Footer />
        </div>
    );
}

export default App;
