import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { deleteUser } from "../../app/actions";

import { Modal, Tooltip, Typography, Button } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from "@mui/icons-material/Warning";

import { Box } from "@mui/system";

const DeleteUser = ({ firstName, lastName, idUser }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = async () => {
    dispatch(await deleteUser(idUser));
  };

  return (
    <>
      <Tooltip
        onClick={() => setOpen(true)}
        title="Delete"
        sx={{ width: "30px", height: "30px", cursor: "pointer" }}
      >
        <DeleteIcon color="error" />
      </Tooltip>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          bgcolor={"background.default"}
          color={"text.primary"}
          width={400}
          height={280}
          p={3}
          borderRadius={5}
          margin=" 100px auto"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <WarningIcon
              fontSize="large"
              color="warning"
              sx={{ paddingRight: "40px", paddingTop: "5px" }}
            />
            <Box>
              <Typography variant="h4" color="gray">
                Delete User
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography color="red" sx={{ marginBottom: "50px" }} variant="h5">
              Do you want to delete
            </Typography>
            <Typography color="yellowgreen" variant="h4">
              {" "}
              {`<${firstName} ${lastName}>`}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Button onClick={handleDelete} variant="contained" color="error">
              Delete
            </Button>
            <Button onClick={() => setOpen(false)} variant="outlined">
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteUser;
