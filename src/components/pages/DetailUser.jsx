import * as dayjs from "dayjs";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../app/reducers/usersSlice";
import { Box, Tooltip, Typography } from "@mui/material";
import KeyboardReturnSharpIcon from "@mui/icons-material/KeyboardReturnSharp";

import { getUser } from "../../app/actions";
import DeleteUser from "./DeleteUser";
import UpdateUser from "./UpdateUser";

const DetailUser = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const formatGraduate = (e) => {
    if (e === true) {
      e = "Graduated";
    } else {
      e = "Not Graduated";
    }
    return e;
  };
  const formatDateOfBirth = (e) => {
    return dayjs(dayjs.unix(e)).format("DD/MM/YYYY");
  };

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  return (
    <Box
      sx={{
        paddingLeft: "100px",
        paddingBottom: "100px",
        height: "100vh",
      }}
    >
      <Box>
        <Typography variant="h2">Detail</Typography>
        <Typography variant="h5">id: {user.id}</Typography>
        <Typography variant="h5">FirstName: {user.firstName}</Typography>
        <Typography variant="h5">LastName: {user.lastName}</Typography>
        <Typography variant="h5">Gender: {user.gender}</Typography>
        <Typography variant="h5">Phone Number: {user.phone}</Typography>
        <Typography variant="h5">Dddress: {user.address}</Typography>
        <Typography variant="h5">
          Date Of Birth: {formatDateOfBirth(user.dateOfBirth)}
        </Typography>

        <Typography variant="h5">School Name: {user.school}</Typography>
        <Typography variant="h5">
          Learning status: {formatGraduate(user.isGraduate)}
        </Typography>
        <Typography variant="h5">Email: {user.email}</Typography>
      </Box>
      <Box
        sx={{
          width: "300px",
          height: "140px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "100px",
        }}
      >
        <DeleteUser
          idUser={id}
          firstName={user.firstName}
          lastName={user.lastName}
        />
        <UpdateUser
          idPre={user.id}
          firstNamePre={user.firstName}
          lastNamePre={user.lastName}
          genderPre={user.gender}
          phonePre={user.phone}
          addressPre={user.address}
          dateOfBirthPre={user.dateOfBirth}
          schoolPre={user.school}
          isGraduatePre={user.isGraduate}
          emailPre={user.email}
          favouritesPre={user.favourites}
        />
        <Tooltip
          sx={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
          title="Return"
        >
          <KeyboardReturnSharpIcon />
        </Tooltip>
      </Box>
    </Box>
  );
};

export default DetailUser;
