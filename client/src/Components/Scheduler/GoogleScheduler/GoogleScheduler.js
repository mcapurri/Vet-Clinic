import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    Toolbar,
    MonthView,
    WeekView,
    ViewSwitcher,
    Appointments,
    AppointmentTooltip,
    AppointmentForm,
    DragDropProvider,
    EditRecurrenceMenu,
    AllDayPanel,
    DateNavigator,
    TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { connectProps } from '@devexpress/dx-react-core';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// import axios from 'axios';

// import withGoogleApps from './withGoogleApps';
import { appointments } from '../../../appointments';
import {
    GOOGLE_API_KEY,
    GOOGLE_CLIENT_ID,
    DISCOVERY_DOCS,
    SCOPE,
    CALENDAR_ID,
} from '../../../googleApiConfig.json';

import AppointmentFormContainer from './AppointmentFormContainer';

// const gapi = window.gapi;
// console.log('gapi', gapi);

// gapi.load('client:auth2', () => {
//     gapi.client.init({
//         apiKey: GOOGLE_API_KEY,
//         clientId: GOOGLE_CLIENT_ID,
//         discoveryDocs: DISCOVERY_DOCS,
//         scope: SCOPE,
//     });

//     gapi.client.load('calendar', 'v3', () => console.log('client loaded'));
//     gapi.auth2
//         .getAuthInstance()
//         .signIn()
//         .then(() => {
//             console.log('signed in');
//             getEvents();
//         });
// });

// const getEvents = () => {
//     gapi.client.calendar.events
//         .list({
//             calendarId: CALENDAR_ID,
//             showDeleted: false,
//             singleEvents: true,
//             // maxResults: 10,
//             orderBy: 'startTime',
//         })
//         .then((response) => {
//             const events = response.result.items;
//             console.log('events: ', events);
//         });
// };

const styles = (theme) => ({
    addButton: {
        position: 'absolute',
        bottom: theme.spacing(1) * 3,
        right: theme.spacing(1) * 4,
    },
});

/* eslint-disable-next-line react/no-multi-comp */
const GoogleScheduler = (props) => {
    const { classes } = props;

    const [state, setState] = useState({
        data: appointments,
        currentDate: new Date(),
        confirmationVisible: false,
        editingFormVisible: false,
        deletedAppointmentId: undefined,
        editingAppointment: undefined,
        previousAppointment: undefined,
        addedAppointment: {},
        startDayHour: 9,
        endDayHour: 19,
        isNewAppointment: false,
    });
    const {
        currentDate,
        data,
        confirmationVisible,
        editingFormVisible,
        startDayHour,
        endDayHour,
    } = state;

    // const handleClientLoad = () => {
    //     gapi.load('client:auth2', initClient);
    //     console.log('loaded client');
    // };

    // const initClient = () => {
    //     console.log('init client');
    //     gapi.client.init({
    //         apiKey: GOOGLE_API_KEY,
    //         clientId: GOOGLE_CLIENT_ID,
    //         discoveryDocs: DISCOVERY_DOCS,
    //         scope: SCOPE,
    //     });

    //     gapi.client.load('calendar', 'v3', () => console.log('bam!'));
    // };

    // handleClientLoad();

    const onEditingAppointmentChange = (editingAppointment) => {
        setState({ ...state, editingAppointment: editingAppointment });
    };

    const onAddedAppointmentChange = (addedAppointment) => {
        setState({ ...state, addedAppointment: addedAppointment });
        const { editingAppointment } = state;
        if (editingAppointment !== undefined) {
            setState({ ...state, previousAppointment: editingAppointment });
        }
        setState({
            ...state,
            editingAppointment: undefined,
            isNewAppointment: true,
        });
    };

    const setDeletedAppointmentId = (id) => {
        setState({ ...state, deletedAppointmentId: id });
    };

    const toggleEditingFormVisibility = () => {
        const { editingFormVisible } = state;
        setState({ ...state, editingFormVisible: !editingFormVisible });
    };

    const toggleConfirmationVisible = () => {
        const { confirmationVisible } = state;
        setState({ ...state, confirmationVisible: !confirmationVisible });
    };

    const commitDeletedAppointment = () => {
        setState((state) => {
            const { data, deletedAppointmentId } = state;
            const nextData = data.filter(
                (appointment) => appointment.id !== deletedAppointmentId
            );

            return { ...state, data: nextData, deletedAppointmentId: null };
        });
        toggleConfirmationVisible();
    };

    const commitChanges = ({ added, changed, deleted }) => {
        setState((state) => {
            let { data } = state;
            if (added) {
                const startingAddedId =
                    data.length > 0 ? data[data.length - 1].id + 1 : 0;
                data = [...data, { id: startingAddedId, ...added }];
            }
            if (changed) {
                data = data.map((appointment) =>
                    changed[appointment.id]
                        ? { ...appointment, ...changed[appointment.id] }
                        : appointment
                );
            }
            if (deleted !== undefined) {
                setDeletedAppointmentId(deleted);
                toggleConfirmationVisible();
            }
            return { ...state, data, addedAppointment: {} };
        });
    };
    const appointmentForm = connectProps(AppointmentFormContainer, () => {
        const {
            editingFormVisible,
            editingAppointment,
            data,
            addedAppointment,
            isNewAppointment,
            previousAppointment,
        } = state;

        const currentAppointment =
            data.filter(
                (appointment) =>
                    editingAppointment &&
                    appointment.id === editingAppointment.id
            )[0] || addedAppointment;

        const cancelAppointment = () => {
            if (isNewAppointment) {
                setState({
                    ...state,
                    editingAppointment: previousAppointment,
                    isNewAppointment: false,
                });
            }
        };

        return {
            visible: editingFormVisible,
            appointmentData: currentAppointment,
            commitChanges,
            visibleChange: toggleEditingFormVisibility,
            onEditingAppointmentChange,
            cancelAppointment,
        };
    });
    // const getEvents = () => {
    //     gapi.client.calendar.events
    //         .list({
    //             calendarId: CALENDAR_ID,
    //             timeMin: new Date().toISOString(),
    //             showDeleted: false,
    //             singleEvents: true,
    //             maxResults: 10,
    //             orderBy: 'startTime',
    //         })
    //         .then((response) => {
    //             const events = response.result.items;
    //             console.log('EVENTS: ', events);
    //         });
    // };
    useEffect(() => {
        appointmentForm.update();
        // getEvents();
        console.log('useEffect running');
    }, [appointmentForm]);

    return (
        <Paper>
            <Scheduler data={data} height={660}>
                <ViewState currentDate={currentDate} />
                <EditingState
                    onCommitChanges={commitChanges}
                    onEditingAppointmentChange={onEditingAppointmentChange}
                    onAddedAppointmentChange={onAddedAppointmentChange}
                />
                <WeekView startDayHour={startDayHour} endDayHour={endDayHour} />
                <MonthView />
                <AllDayPanel />
                <EditRecurrenceMenu />
                <Appointments />
                <AppointmentTooltip
                    showOpenButton
                    showCloseButton
                    showDeleteButton
                />
                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <ViewSwitcher />
                <AppointmentForm
                    overlayComponent={appointmentForm}
                    visible={editingFormVisible}
                    onVisibilityChange={toggleEditingFormVisibility}
                />
                <DragDropProvider />
            </Scheduler>

            <Dialog open={confirmationVisible} onClose={props.cancelDelete}>
                <DialogTitle>Delete Appointment</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this appointment?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={toggleConfirmationVisible}
                        color="primary"
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={commitDeletedAppointment}
                        color="secondary"
                        variant="outlined"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Fab
                color="secondary"
                className={classes.addButton}
                onClick={() => {
                    setState({ ...state, editingFormVisible: true });

                    onEditingAppointmentChange(undefined);
                    onAddedAppointmentChange({
                        startDate: new Date(currentDate).setHours(startDayHour),
                        endDate: new Date(currentDate).setMinutes(
                            startDayHour + 30
                        ),
                    });
                }}
            >
                <AddIcon />
            </Fab>
        </Paper>
    );
};

export default React.memo(
    withStyles(styles, { name: 'EditingGoogleScheduler' })(GoogleScheduler)
);
