import React from 'react';
import {
    apiKey,
    calendarId,
    clientId,
    discoveryDocs,
    scope,
} from '../../googleApiConfig.json';

const gapi = window.gapi;

class Scheduler2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAuthButton: false,
            showSignOutButton: false,
        };
        this.initClient = this.initClient.bind(this);
        this.updateSigninStatus = this.updateSigninStatus.bind(this);
    }
    handleAuthClick() {
        gapi.auth2.getAuthInstance().signIn();
    }
    handleSignoutClick() {
        gapi.auth2.getAuthInstance().signOut();
    }
    handleClientLoad() {
        gapi.load('client:auth2', this.initClient);
    }
    initClient(/****here you've had parameters that made config vars unaccessible*****/) {
        gapi.client
            .init({
                discoveryDocs: discoveryDocs,
                clientId: clientId,
                scope: scope,
            })
            .then(function () {
                console.log(window.gapi);
                // Listen for sign-in state changes.

                // ************* to access instance method you have to use `this.updateSigninStatus`
                window.gapi.auth2
                    .getAuthInstance()
                    .isSignedIn.listen(this.updateSigninStatus);

                // Handle the initial sign-in state.
                this.updateSigninStatus(
                    gapi.auth2.getAuthInstance().isSignedIn.get()
                );

                // **************this code is unnecessary and causes errors*****
                // authorizeButton.onclick = handleAuthClick;
                // signoutButton.onclick = handleSignoutClick;
            });
    }
    updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
            this.setState({
                showAuthButton: false,
                showSignOutButton: true,
            });
            //listUpcomingEvents();
            //insertNewEvent();
        } else {
            this.setState({
                showAuthButton: true,
                showSignOutButton: false,
            });
        }
    }
    componentDidMount() {
        this.handleClientLoad();
    }
    render() {
        let authButton = (
            <button
                id="authorize-button"
                onClick={this.handleAuthClick.bind(this)}
            >
                Authorize
            </button>
        );
        let signOutButton = (
            <button
                id="signout-button"
                onClick={this.handleSignoutClick.bind(this)}
            >
                Sign Out
            </button>
        );
        return (
            <div className="container">
                {this.state.showAuthButton ? authButton : null}
                {this.state.showSignOutButton ? signOutButton : null}
            </div>
        );
    }
}
export default Scheduler2;
