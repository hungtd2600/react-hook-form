import React from "react";
import { useState } from "react";
import { Box, MenuItem, TextField } from "@mui/material";

const SelectGroup = ({
  id,
  label,
  register,
  value1,
  value2,
  select1,
  select2,
  defaultValue,
  req,
}) => {
  const [value, setValue] = useState(defaultValue);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <Box width="600px">
      <TextField
        required={req}
        id={id}
        label={label}
        select
        {...register}
        value={value}
        fullWidth
        onChange={handleChange}
      >
        <MenuItem value={value1}>{select1}</MenuItem>
        <MenuItem value={value2}>{select2}</MenuItem>
      </TextField>
    </Box>
  );
};

export default SelectGroup;
