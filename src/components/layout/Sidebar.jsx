import React from "react";
import { useNavigate } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ModeNight from "@mui/icons-material/ModeNight";

import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const Sidebar = ({ theme }) => {
  const navigate = useNavigate();
  return (
    <Box
      flex={1}
      sx={{ maxWidth: "250px", display: { xs: "none", sm: "block" } }}
      p={2}
    >
      <Box sx={{ position: "fixed" }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              onClick={() => {
                navigate("/");
              }}
            >
              <ListItemIcon>
                {" "}
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="List User" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component="a"
              onClick={() => {
                navigate("/createuser");
              }}
            >
              <ListItemIcon>
                {" "}
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Create User" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {" "}
                <ModeNight />{" "}
              </ListItemIcon>
              <Button onClick={theme} variant="outlined">
                Switch
              </Button>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};
export default Sidebar;
