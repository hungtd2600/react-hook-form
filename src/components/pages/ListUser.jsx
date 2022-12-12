import * as React from "react";
import DeleteUser from "./DeleteUser";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

import { useDispatch, useSelector } from "react-redux";
import { getUser, getUsers } from "../../app/actions";
import { usersSelector, loadingSelector } from "../../app/reducers/usersSlice";

import {
  Box,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import UpdateUser from "./UpdateUser";

export default function ListUser() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const users = useSelector(usersSelector);
  const loading = useSelector(loadingSelector);
  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  React.useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <Box flex={4} p={2} sx={{ height: "100vh" }}>
      {loading && <Loading />}
      <Typography align="center" variant="h2" color="blueviolet">
        {" "}
        List User
      </Typography>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "200px" }}>Full Name</TableCell>
                <TableCell sx={{ width: "200px" }}>Gender</TableCell>
                <TableCell sx={{ width: "200px" }}>Phone</TableCell>
                <TableCell sx={{ width: "200px" }}>School Name</TableCell>
                <TableCell sx={{ width: "50px" }}>Detail</TableCell>
                <TableCell sx={{ width: "50px" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.school}</TableCell>
                    <TableCell>
                      <Link>
                        <Tooltip
                          title="Detail"
                          sx={{
                            width: "30px",
                            height: "30px",
                            cursor: "pointer",
                          }}
                        >
                          <ArrowCircleRightIcon
                            onClick={() => {
                              dispatch(getUser(user.id));
                              navigate(`/detailuser/${user.id}`);
                            }}
                          />
                        </Tooltip>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <DeleteUser
                        idUser={user.id}
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
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
