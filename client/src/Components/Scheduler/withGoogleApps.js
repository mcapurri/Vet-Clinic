import React from 'react';
// import { API_KEY } from './googleKeys';
import Spinner from '../UI/Spinner/Spinner';

const API_KEY = 'AIzaSyDWyADXuAY7wYIaOOMOAki6gtOhTr8evvI';

export default function withGoogleApps(WrappedComponent) {
    console.log('Googleloading');
    class ComponentWithGoogleAPI extends React.Component {
        state = { gapiReady: false };

        componentDidMount() {
            this.loadGoogleAPI();
        }

        loadGoogleAPI() {
            const script = document.createElement('script');
            script.src = 'https://apis.google.com/js/client.js';

            script.onload = () => {
                window.gapi.load('client', () => {
                    console.log('load running');
                    window.gapi.client.setApiKey(API_KEY);
                    window.gapi.client.load('calendar', 'v3', () => {
                        this.setState({ gapiReady: true });
                    });
                });
            };

            document.body.appendChild(script);
        }

        render() {
            const { gapiReady } = this.state;
            if (gapiReady) return <WrappedComponent />;
            return <Spinner />;
        }
    }
    return ComponentWithGoogleAPI;
}
