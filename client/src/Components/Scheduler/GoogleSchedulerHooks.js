/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-unused-state */
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
} from '@devexpress/dx-react-scheduler-material-ui';
import { connectProps } from '@devexpress/dx-react-core';
import {
    KeyboardDateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import LocationOn from '@material-ui/icons/LocationOn';
import Notes from '@material-ui/icons/Notes';
import Close from '@material-ui/icons/Close';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Create from '@material-ui/icons/Create';
// import axios from 'axios';

// import withGoogleApps from './withGoogleApps';
import { appointments } from '../../appointments';
import {
    apiKey,
    clientId,
    discoveryDocs,
    scope,
    calendarId,
} from './googleApiConfig.json';

const gapi = window.gapi;
console.log('gapi', gapi);

gapi.load('client:auth2', () => {
    console.log('loaded client');

    gapi.client.init({
        apiKey: apiKey,
        clientId: clientId,
        discoveryDocs: discoveryDocs,
        scope: scope,
    });

    gapi.client.load('calendar', 'v3', () => {});
    gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
            console.log('signed in');
            // get events
            gapi.client.calendar.events
                .list({
                    calendarId: calendarId,
                    // timeMin: new Date().toISOString(),
                    showDeleted: false,
                    singleEvents: true,
                    maxResults: 10,
                    orderBy: 'startTime',
                })
                .then((response) => {
                    const events = response.result.items;
                    console.log('EVENTS: ', events);
                });
        });
});

const containerStyles = (theme) => ({
    container: {
        width: theme.spacing(68),
        padding: 0,
        paddingBottom: theme.spacing(2),
    },
    content: {
        padding: theme.spacing(2),
        paddingTop: 0,
    },
    header: {
        overflow: 'hidden',
        paddingTop: theme.spacing(0.5),
    },
    closeButton: {
        float: 'right',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 2),
    },
    button: {
        marginLeft: theme.spacing(2),
    },
    picker: {
        marginRight: theme.spacing(2),
        '&:last-child': {
            marginRight: 0,
        },
        width: '50%',
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(1, 0),
    },
    icon: {
        margin: theme.spacing(2, 0),
        marginRight: theme.spacing(2),
    },
    textField: {
        width: '100%',
    },
});

const AppointmentFormContainerBasic = (props) => {
    const [appointmentChanges, setAppointmentChanges] = useState({});
    const getAppointmentData = () => {
        const { appointmentData } = props;
        return appointmentData;
    };
    const getAppointmentChanges = () => {
        return appointmentChanges;
    };
    const changeAppointment = ({ field, changes }) => {
        const nextChanges = {
            ...getAppointmentChanges(),
            [field]: changes,
        };

        setAppointmentChanges(nextChanges);
    };

    const commitAppointment = (type) => {
        const { commitChanges } = props;
        const appointment = {
            ...getAppointmentData(),
            ...getAppointmentChanges(),
        };
        if (type === 'deleted') {
            commitChanges({ [type]: appointment.id });
        } else if (type === 'changed') {
            commitChanges({ [type]: { [appointment.id]: appointment } });
        } else {
            commitChanges({ [type]: appointment });
        }
        setAppointmentChanges({});
    };
    const {
        classes,
        visible,
        visibleChange,
        appointmentData,
        cancelAppointment,
        target,
        onHide,
    } = props;
    // const { appointmentChanges } = appointmentChanges;

    const displayAppointmentData = {
        ...appointmentData,
        ...appointmentChanges,
    };

    const isNewAppointment = appointmentData.id === undefined;
    const applyChanges = isNewAppointment
        ? () => commitAppointment('added')
        : () => commitAppointment('changed');

    const textEditorProps = (field) => ({
        variant: 'outlined',
        onChange: ({ target: change }) =>
            changeAppointment({
                field: [field],
                changes: change.value,
            }),
        value: displayAppointmentData[field] || '',
        label: field[0].toUpperCase() + field.slice(1),
        className: classes.textField,
    });

    const pickerEditorProps = (field) => ({
        className: classes.picker,
        // keyboard: true,
        ampm: false,
        value: displayAppointmentData[field],
        onChange: (date) =>
            changeAppointment({
                field: [field],
                changes: date
                    ? date.toDate()
                    : new Date(displayAppointmentData[field]),
            }),
        inputVariant: 'outlined',
        format: 'DD/MM/YYYY HH:mm',
        onError: () => null,
    });

    const cancelChanges = () => {
        setAppointmentChanges({});
        visibleChange();
        cancelAppointment();
    };

    return (
        <AppointmentForm.Overlay
            visible={visible}
            target={target}
            fullSize
            onHide={onHide}
        >
            <div>
                <div className={classes.header}>
                    <IconButton
                        className={classes.closeButton}
                        onClick={cancelChanges}
                    >
                        <Close color="action" />
                    </IconButton>
                </div>
                <div className={classes.content}>
                    <div className={classes.wrapper}>
                        <Create className={classes.icon} color="action" />
                        <TextField {...textEditorProps('title')} />
                    </div>
                    <div className={classes.wrapper}>
                        <CalendarToday
                            className={classes.icon}
                            color="action"
                        />
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDateTimePicker
                                label="Start Date"
                                {...pickerEditorProps('startDate')}
                            />
                            <KeyboardDateTimePicker
                                label="End Date"
                                {...pickerEditorProps('endDate')}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                    <div className={classes.wrapper}>
                        <LocationOn className={classes.icon} color="action" />
                        <TextField {...textEditorProps('location')} />
                    </div>
                    <div className={classes.wrapper}>
                        <Notes className={classes.icon} color="action" />
                        <TextField
                            {...textEditorProps('notes')}
                            multiline
                            rows="6"
                        />
                    </div>
                </div>
                <div className={classes.buttonGroup}>
                    {!isNewAppointment && (
                        <Button
                            variant="outlined"
                            color="secondary"
                            className={classes.button}
                            onClick={() => {
                                visibleChange();
                                commitAppointment('deleted');
                            }}
                        >
                            Delete
                        </Button>
                    )}
                    <Button
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                        onClick={() => {
                            visibleChange();
                            applyChanges();
                        }}
                    >
                        {isNewAppointment ? 'Create' : 'Save'}
                    </Button>
                </div>
            </div>
        </AppointmentForm.Overlay>
    );
};

const AppointmentFormContainer = withStyles(containerStyles, {
    name: 'AppointmentFormContainer',
})(AppointmentFormContainerBasic);

const styles = (theme) => ({
    addButton: {
        position: 'absolute',
        bottom: theme.spacing(1) * 3,
        right: theme.spacing(1) * 4,
    },
});

/* eslint-disable-next-line react/no-multi-comp */
export const GoogleSchedulerHooks = (props) => {
    const [data, setData] = useState(appointments);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [confirmationVisible, setConfirmationVisible] = useState(false);
    const [editingFormVisible, setEditingFormVisible] = useState(false);
    const [deletedAppointmentId, setDeletedAppointmentId] = useState(undefined);
    const [editingAppointment, setEditingAppointment] = useState(undefined);
    const [previousAppointment, setPreviousAppointment] = useState(undefined);
    const [addedAppointment, setAddedAppointment] = useState({});
    const [startDayHour, setStartDayHour] = useState(9);
    const [endDayHour, setendDayHour] = useState(19);
    const [isNewAppointment, setIsNewAppointment] = useState(false);
    const appointmentForm = connectProps(AppointmentFormContainer, () => {
        const currentAppointment =
            data.filter(
                (appointment) =>
                    editingAppointment &&
                    appointment.id === editingAppointment.id
            )[0] || addedAppointment;

        const cancelAppointment = () => {
            if (isNewAppointment) {
                setEditingAppointment(previousAppointment);
                setIsNewAppointment(false);
            }
        };

        return {
            visible: editingFormVisible,
            appointmentData: currentAppointment,
            commitChanges: commitChanges,
            visibleChange: toggleEditingFormVisibility,
            onEditingAppointmentChange: onEditingAppointmentChange,
            cancelAppointment,
        };
    });
    // };
    // getEvents() {
    //     const calendar = google.calendar({ version: 'v3', oAuth2Client });

    //     calendar.events.list(
    //         {
    //             calendarId: calendarId,
    //             singleEvents: true,
    //             orderBy: 'startTime',
    //         },
    //         (err, res) => {
    //             if (err)
    //                 return console.log('The API returned an error: ' + err);
    //             const events = res.data.items;

    //             if (events.length) {
    //                 console.log('Events');
    //                 events.map((event, i) => {
    //                     let titleName = event.summary;
    //                     let startTime = event.start.dateTime;
    //                     let endTime = event.end.dateTime;
    //                     this.state.data.push({
    //                         title: titleName,
    //                         start: startTime,
    //                         end: endTime,
    //                     });
    //                 });
    //             } else {
    //                 console.log('No upcoming events found.');
    //             }

    //             console.log(this.state.events);
    //         }
    //     );
    // }
    // comonpentDidMount = () => {
    //     this.getEvents();
    // };

    // Recheck for appointform.updata
    useEffect(() => {
        appointmentForm.update();
    }, []);

    const addEvent = (eventToAdd) => {
        let event = {
            summary: eventToAdd.title,
            location: eventToAdd.location,
            description: eventToAdd.description,
            start: {
                dateTime: eventToAdd.startDate,
                timeZone: 'Europe/Berlin',
            },
            end: {
                dateTime: eventToAdd.endDate,
                timeZone: 'Europe/Berlin',
            },
        };

        const request = gapi.client.calendar.events.insert({
            calendarId: calendarId,
            resource: event,
        });

        request.execute((event) => {
            console.log(event);
            window.open(event.htmlLink);
        });
    };

    const onEditingAppointmentChange = (editingAppointment) => {
        setEditingAppointment(editingAppointment);
    };

    const onAddedAppointmentChange = (addedAppointment) => {
        setAddedAppointment(addedAppointment);
        if (editingAppointment !== undefined) {
            setPreviousAppointment(editingAppointment);
        }
        setEditingAppointment(editingAppointment(undefined));
        setIsNewAppointment(true);
    };
    // const setDeletedAppointmentId = (id) => {
    //     setDeletedAppointmentId({ id });
    // };

    const toggleEditingFormVisibility = () => {
        setEditingFormVisible(!editingFormVisible);
    };

    const toggleConfirmationVisible = () => {
        setConfirmationVisible(!confirmationVisible);
    };

    const commitDeletedAppointment = () => {
        const nextData = data.filter(
            (appointment) => appointment.id !== deletedAppointmentId
        );
        setData(nextData);
        setDeletedAppointmentId(null);

        toggleConfirmationVisible();
    };

    const commitChanges = ({ added, changed, deleted }) => {
        if (added) {
            console.log('added from CommChanges', added);
            const startingAddedId =
                data.length > 0 ? data[data.length - 1].id + 1 : 0;
            data = [...data, { id: startingAddedId, ...added }];
            addEvent(added);
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
        setData(data);
        setAddedAppointment({});
    };
    console.log('dataCommitted', data);
    //change
    const { classes } = props;
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
                <ViewSwitcher />
                <AppointmentForm
                    overlayComponent={appointmentForm}
                    visible={editingFormVisible}
                    onVisibilityChange={toggleEditingFormVisibility}
                />
                <DragDropProvider />
            </Scheduler>

            <Dialog
                open={confirmationVisible}
                //  onClose={cancelDelete}
            >
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
                    setEditingFormVisible(true);
                    onEditingAppointmentChange(undefined);
                    onAddedAppointmentChange({
                        startDate: new Date(currentDate).setHours(startDayHour),
                        endDate: new Date(currentDate).setHours(
                            startDayHour + 1
                        ),
                    });
                }}
            >
                <AddIcon />
            </Fab>
        </Paper>
    );
};

export default withStyles(styles, { name: 'EditingGoogleSchedulerClasses' })(
    // withGoogleApps(
    GoogleSchedulerHooks
    // )
);
