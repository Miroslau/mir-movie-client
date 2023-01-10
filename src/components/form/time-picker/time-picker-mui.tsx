import React, {FC} from 'react';
import {DesktopDatePicker, LocalizationProvider, TimePicker} from '@mui/x-date-pickers';
import {TextField} from "@mui/material";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {Moment} from "moment";

interface TimeInterface {
    value: Date;
    label?: string;
    inputText: () => void;
}

const TimePickerMUI: FC<TimeInterface> = ({ value, label, inputText }) => {
    const changeTime = (time: Moment | null) => {
        const minutes = time?.minutes();
        const hours = time?.hours();

        console.log(minutes);
        console.log(hours);
    }

    return <LocalizationProvider dateAdapter={AdapterMoment}>
        <TimePicker
            onChange={changeTime}
            value={value}
            renderInput={(params) => <TextField {...params} />}
            label={label} />
    </LocalizationProvider>
};

export default TimePickerMUI;