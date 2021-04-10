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

import {
    authenticate,
    loadClient,
    listAll,
    updateEvent,
    addNewEvent,
    deleteEvent,
} from '../../utils/googleCalenderEvents';

import AppointmentFormContainer from './AppointmentFormContainer';

const styles = (theme) => ({
    addButton: {
        position: 'absolute',
        bottom: theme.spacing(1) * 3,
        right: theme.spacing(1) * 4,
    },
});

const GoogleScheduler = (props) => {
    const { classes } = props;

    const [state, setState] = useState({
        currentDate: new Date(),
        confirmationVisible: false,
        editingFormVisible: false,
        previousAppointment: undefined,
        startDayHour: 9,
        endDayHour: 19,
        isNewAppointment: false,
    });
    const [data, setData] = useState([]);
    const [addedAppointment, setAddedAppointment] = useState({});
    const [editingAppointment, setEditingAppointment] = useState(undefined);
    const [deletedAppointmentId, setDeletedAppointmentId] = useState(undefined);
    const {
        currentDate,
        confirmationVisible,
        editingFormVisible,
        startDayHour,
        endDayHour,
    } = state;

    const onEditingAppointmentChange = (editingAppointment) => {
        setEditingAppointment(editingAppointment);
    };

    const onAddedAppointmentChange = (addedAppointment) => {
        if (editingAppointment !== undefined) {
            setState({ ...state, previousAppointment: editingAppointment });
        }
        setAddedAppointment(addedAppointment);
        setEditingAppointment(undefined);
        setState({
            ...state,
            isNewAppointment: true,
        });
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
        if (deletedAppointmentId) {
            const nextData = data.filter(
                (appointment) => appointment.id !== deletedAppointmentId
            );
            setDeletedAppointmentId(null);
            setData(nextData);
            toggleConfirmationVisible();
            deleteEvent(deletedAppointmentId);
        }
    };

    const commitChanges = async ({ added, changed, deleted }) => {
        if (added) {
            const { result: newEvent } = await addNewEvent(added);
            setData([...data, { id: newEvent.id, ...added }]);
        }

        if (changed) {
            setData(
                data.map((appointment) => {
                    if (changed[appointment.id]) {
                        const newData = {
                            ...appointment,
                            ...changed[appointment.id],
                        };
                        updateEvent(newData);
                        return newData;
                    }
                    return appointment;
                })
            );
        }

        if (deleted !== undefined) {
            setDeletedAppointmentId(deleted);
            toggleConfirmationVisible();
        }

        setAddedAppointment({});
    };
    const appointmentForm = connectProps(AppointmentFormContainer, () => {
        const {
            editingFormVisible,
            isNewAppointment,
            previousAppointment,
        } = state;

        const currentAppointment =
            data?.filter(
                (appointment) =>
                    editingAppointment &&
                    appointment.id === editingAppointment.id
            )[0] || addedAppointment;

        const cancelAppointment = () => {
            if (isNewAppointment) {
                setState({
                    ...state,
                    isNewAppointment: false,
                });
                setEditingAppointment(previousAppointment);
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

    useEffect(() => {
        appointmentForm.update();
        authenticate()
            ?.then(loadClient)
            .then(() => listAll())
            .then((data) => setData(data));
    }, []);

    return (
        <Paper>
            <Scheduler data={data} height={660}>
                <ViewState defaultCurrentDate={currentDate} />
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
