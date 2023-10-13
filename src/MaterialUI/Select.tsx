import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

type CityOption = {
  value: string;
  displayValue: string;
};

export type SelectPropType = {
  data: any;
  label: string;
  id: any;
  width?: number;
  value: any;
  onChange: (event: React.ChangeEvent<{}>, newValue: any) => void;
};

export const SelectState = ({
  data,
  label,
  id,
  width,
  value,
  onChange,
}: SelectPropType) => {
  return (
    <Autocomplete
      disablePortal
      id={id}
      options={data}
      sx={{ width: width }}
      value={value}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};
