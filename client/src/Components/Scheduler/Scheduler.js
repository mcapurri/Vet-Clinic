import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    WeekView,
    DayView,
    Appointments,
    Toolbar,
    DateNavigator,
    ViewSwitcher,
    AppointmentForm,
    AppointmentTooltip,
    TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

import { apiKey, calendarId } from '../../googleApiConfig.json';

const getData = (setData, setLoading) => {
    const dataUrl = [
        'https://www.googleapis.com/calendar/v3/calendars/',
        calendarId,
        '/events?key=',
        apiKey,
    ].join('');
    setLoading(true);

    return fetch(dataUrl)
        .then((response) => response.json())
        .then((data) => {
            setTimeout(() => {
                setData(data.items);
                setLoading(false);
            }, 600);
        });
};

const styles = {
    toolbarRoot: {
        position: 'relative',
    },
    progress: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        left: 0,
    },
};

const ToolbarWithLoading = withStyles(styles, { name: 'Toolbar' })(
    ({ children, classes, ...restProps }) => (
        <div className={classes.toolbarRoot}>
            <Toolbar.Root {...restProps}>{children}</Toolbar.Root>
            <LinearProgress className={classes.progress} />
        </div>
    )
);

const berlinTime = (date) =>
    new Date(date).toLocaleString('en-US', {
        timeZone: 'Europe/Berlin',
    });

const mapAppointmentData = (appointment) => ({
    id: appointment.id,
    startDate: berlinTime(appointment.start.dateTime),
    endDate: berlinTime(appointment.end.dateTime),
    title: appointment.summary,
});

const initialState = {
    data: [],
    loading: false,
    currentDate: new Date(),
    currentViewName: 'Day',
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'setLoading':
            return { ...state, loading: action.payload };
        case 'setData':
            return { ...state, data: action.payload.map(mapAppointmentData) };
        case 'setCurrentViewName':
            return { ...state, currentViewName: action.payload };
        case 'setCurrentDate':
            return { ...state, currentDate: action.payload };
        default:
            return state;
    }
};

const AppScheduler = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const { data, loading, currentViewName, currentDate } = state;
    const setCurrentViewName = React.useCallback(
        (nextViewName) =>
            dispatch({
                type: 'setCurrentViewName',
                payload: nextViewName,
            }),
        [dispatch]
    );
    const setData = React.useCallback(
        (nextData) =>
            dispatch({
                type: 'setData',
                payload: nextData,
            }),
        [dispatch]
    );
    const setCurrentDate = React.useCallback(
        (nextDate) =>
            dispatch({
                type: 'setCurrentDate',
                payload: nextDate,
            }),
        [dispatch]
    );
    const setLoading = React.useCallback(
        (nextLoading) =>
            dispatch({
                type: 'setLoading',
                payload: nextLoading,
            }),
        [dispatch]
    );

    React.useEffect(() => {
        getData(setData, setLoading);
    }, [setData, setLoading, currentViewName, currentDate]);

    return (
        <Paper>
            <Scheduler data={data} height={660}>
                <ViewState
                    currentDate={currentDate}
                    currentViewName={currentViewName}
                    onCurrentViewNameChange={setCurrentViewName}
                    onCurrentDateChange={setCurrentDate}
                />
                <DayView startDayHour={9} endDayHour={20} />
                <WeekView startDayHour={9} endDayHour={20} />
                <Appointments />
                <Toolbar
                    {...(loading
                        ? { rootComponent: ToolbarWithLoading }
                        : null)}
                />
                <DateNavigator />
                <TodayButton />
                <ViewSwitcher />
                <AppointmentTooltip showOpenButton showCloseButton />
                <AppointmentForm />
            </Scheduler>
        </Paper>
    );
};
export default AppScheduler;
