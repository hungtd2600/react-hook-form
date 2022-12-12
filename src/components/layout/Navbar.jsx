import { AppBar, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography
          sx={{ cursor: "pointer" }}
          variant="h6"
          onClick={() => {
            navigate("/");
          }}
        >
          HUNG DEV
        </Typography>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
