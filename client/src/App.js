import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import axios from 'axios';
// import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import UsersList from './Components/UsersList/UsersList';
// import UserDetails from './Components/UserDetails/UserDetails';
import Carousel from './Components/Carousel/Carousel';

function App(props) {
    const [user, setUser] = useState(props.user || '');
    const [usersList, setUsersList] = useState('');

    console.log('user', user);
    console.log('props', props);

    let isEmployee = false;
    {
        user.role === 'employee' && (isEmployee = true);
    }

    const fetchData = () => {
        axios
            .get('/api/users')
            .then((users) => {
                console.log('users', users);
                setUsersList(() => users.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

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
                {/* <Route exact path="/" component={Home} /> */}
                <Route exact path="/" component={Carousel} />
                <Route
                    exact
                    path="/users"
                    render={(props) => (
                        <UsersList {...props} usersList={usersList} />
                    )}
                />
                {/* <Route exact path="/users/:id" component={UserDetails} />  */}
                {/* <Route exact path="/pets" component={PetsList} />
            <Route exact path="/pets/:id" component={PetDetails} /> */}
            </Switch>
            <Footer />
        </div>
    );
}

export default App;
