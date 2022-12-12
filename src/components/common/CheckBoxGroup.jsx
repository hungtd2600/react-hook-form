import React from "react";
import {
  Box,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const CheckBoxGroup = ({ id, label, onChecked, checked }) => {
  const handleFavoriteChange = (e) => {
    onChecked(e);
  };

  const favourites = [
    {
      id: 1,
      label: "Football",
      value: "football",
    },
    {
      id: 2,
      label: "Volleyball",
      value: "volleyball",
    },
    {
      id: 3,
      label: "Swimming",
      value: "swimming",
    },
    {
      id: 4,
      label: "Tennis",
      value: "tennis",
    },
    {
      id: 5,
      label: "Badminton",
      value: "badminton",
    },
    {
      id: 6,
      label: "Basketball",
      value: "basketball",
    },
  ];

  return (
    <Box sx={{ marginTop: "30px" }}>
      <FormLabel>{label}</FormLabel>
      <FormGroup
        id={id}
        sx={{
          display: "flex",
          flexDirection: "initial",
          maxWidth: "600px",
        }}
      >
        {favourites.map((favorite) => (
          <Box key={favorite.id}>
            <FormControlLabel
              label={favorite.label}
              value={favorite.value}
              control={
                <Checkbox
                  checked={checked.includes(favorite.value)}
                  onChange={handleFavoriteChange}
                />
              }
            />
          </Box>
        ))}
      </FormGroup>
    </Box>
  );
};

export default CheckBoxGroup;
