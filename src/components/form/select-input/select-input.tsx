import React, { FC, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
  useTheme,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface selectInputProps<Inputs> {
  inputs: Inputs[];
  id: string;
  labelId: string;
  multiple: boolean;
  selectInput: (args?: any) => void;
}

const getStyles = (name: string, personName: string[], theme: Theme) => {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

const SelectInput: FC<selectInputProps<any>> = ({
  inputs,
  id,
  labelId,
  multiple,
  selectInput,
}) => {
  const theme = useTheme();
  const [inputName, setInputName] = useState<string[]>([]);

  const choseItem = (event: SelectChangeEvent<typeof inputName>) => {
    const {
      target: { value },
    } = event;
    setInputName(typeof value === "string" ? value.split(",") : value);

    selectInput(value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id={labelId}>Name</InputLabel>
        <Select
          labelId={labelId}
          id={id}
          multiple={multiple}
          value={inputName}
          onChange={choseItem}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {inputs.map((input) => (
            <MenuItem
              key={input?.id}
              value={input}
              style={getStyles(input?.genreName, inputName, theme)}
            >
              {input?.genreName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectInput;
