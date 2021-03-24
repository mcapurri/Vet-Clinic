import * as React from 'react';
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

import { appointments } from '../../appointments';

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
    const [appointmentChanges, setAppointmentChanges] = React.useState({});

    const getAppointmentData = () => {
        const { appointmentData } = props;
        return appointmentData;
    };

    const changeAppointment = ({ field, changes }) => {
        const nextChanges = {
            ...appointmentChanges,
            [field]: changes,
        };

        setAppointmentChanges(nextChanges);
    };

    const commitAppointment = (type) => {
        const { commitChanges } = props;
        const appointment = {
            ...getAppointmentData(),
            ...appointmentChanges,
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

const AppointmentFormContainer = React.memo(
    withStyles(containerStyles, {
        name: 'AppointmentFormContainer',
    })(AppointmentFormContainerBasic)
);

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

    const [state, setState] = React.useState({
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

    // Google Calendar Api
    const gapi = window.gapi;

    const CALENDAR_ID = 'bmreulqa3uajgpp04t532q6hbs@group.calendar.google.com';
    const CLIENT_ID =
        '831613379131-7crlosojs4m5qqrf21q6c35daf0lfme2.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyDWyADXuAY7wYIaOOMOAki6gtOhTr8evvI';
    const DISCOVERY_DOCS = [
        'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
    ];
    const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

    function handleClientLoad() {
        gapi.load('client:auth2', initClient);
        console.log('loaded client');
    }

    const initClient = () => {
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
        });

        gapi.client.load('calendar', 'v3', () => console.log('bam!'));
    };

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
    const getEvents = () => {
        gapi.client.calendar.events
            .list({
                calendarId: this.CALENDAR_ID,
                timeMin: new Date().toISOString(),
                showDeleted: false,
                singleEvents: true,
                maxResults: 10,
                orderBy: 'startTime',
            })
            .then((response) => {
                const events = response.result.items;
                console.log('EVENTS: ', events);
            });
    };
    React.useEffect(() => {
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
