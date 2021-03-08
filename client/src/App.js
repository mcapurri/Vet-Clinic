import './App.css';
import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Home from './Components/Home/Home';
import Signup from './Components/Auth/Signup/Signup';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import UsersList from './Components/Users/UsersList/UsersList';
import UserDetails from './Components/Users/UserDetails/UserDetails';
import AddUser from './Components/Users/AddUser/AddUser';
import EditUser from './Components/Users/EditUser/EditUser';

function App(props) {
    const [user, setUser] = useState(props.user || '');
    const [usersList, setUsersList] = useState('');
    const [searchField, setSearchField] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [isDog, setIsDog] = useState(true);
    const [isCat, setIsCat] = useState(true);
    const [isBird, setIsBird] = useState(true);
    const [isReptile, setIsReptile] = useState(true);
    const [isOther, setIsOther] = useState(true);

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

    console.log('usersList', usersList);

    const handleChange = (event) => {
        if (event.target.type === 'select-one') {
            setSelectedRole(event.target.value);
        } else if (event.target.type === 'checkbox') {
            if (event.target.name === 'dog') {
                setIsDog(() => !isDog);
            } else if (event.target.name === 'cat') {
                setIsCat(() => !isCat);
            } else if (event.target.name === 'bird') {
                setIsBird(() => !isBird);
            } else if (event.target.name === 'reptile') {
                setIsReptile(() => !isReptile);
            } else {
                setIsOther(() => !isOther);
            }
        } else {
            setSearchField(event.target.value);
        }
    };

    // const filteredSearch = usersList.filter((element) => {
    //     return (
    //         // ((isDog && element.specie === 'dog') ||
    //         //     (isCat && element.specie === 'cat')) &&
    //         (`${element.name}`
    //             .toLowerCase()
    //             .includes(`${searchField.toLowerCase()}`) ||
    //             `${element.lastName}`
    //                 .toLowerCase()
    //                 .includes(`${searchField.toLowerCase()}`)) &&
    //         (element.role === selectedRole || !selectedRole)
    //     );
    //     // );
    // });

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
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={Signup} />
                <Route
                    exact
                    path="/users"
                    render={(props) => (
                        <UsersList
                            {...props}
                            usersList={usersList}
                            handleChange={handleChange}
                        />
                    )}
                />
                <Route
                    exact
                    path="/users/add"
                    render={(props) => (
                        <AddUser
                            {...props}
                            fetchData={fetchData}
                            setUser={setUser}
                        />
                    )}
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
                    path="/users/:id/edit"
                    render={(props) => (
                        <EditUser {...props} isEmployee={isEmployee} />
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
