import React from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import { Box, Stack } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material";
import { setTheme, themeSelector } from "../app/reducers/usersSlice";
import { useDispatch, useSelector } from "react-redux";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const theme = useSelector(themeSelector);
  const handleTheme = () => {
    theme === "dark" ? dispatch(setTheme("light")) : dispatch(setTheme("dark"));
  };
  const appTheme = createTheme({
    palette: {
      mode: theme,
    },
  });
  return (
    <ThemeProvider theme={appTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar />
        <Stack direction={"row"} spacing={2}>
          <Sidebar theme={handleTheme} />
          <div>{children}</div>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
