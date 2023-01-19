import React, { FC } from "react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

interface DateInterface {
  value: Date;
  label?: string;
  inputText: () => void;
}

const DatePicker: FC<DateInterface> = ({ value, label, inputText }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DesktopDatePicker
        onChange={inputText}
        value={value}
        label={label}
        renderInput={(params) => <TextField {...params} />}
        inputFormat="YYYY/MM/DD"
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
