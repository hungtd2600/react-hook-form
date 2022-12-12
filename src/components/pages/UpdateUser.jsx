import * as yup from "yup";
import * as dayjs from "dayjs";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, Tooltip, Typography, Button, TextField } from "@mui/material";

import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import UpdateIcon from "@mui/icons-material/Update";
import Notification from "../common/Notification";

import { Box } from "@mui/system";
import SelectGroup from "../common/SelectGroup";
import CheckBoxGroup from "../common/CheckBoxGroup";
import { useForm } from "react-hook-form";
import { updateUser } from "../../app/actions";

const schema = yup.object({
  firstName: yup.string().required("Vui lòng nhập tên"),
  lastName: yup.string().required("Vui lòng nhập tên"),
  gender: yup.string().required("Vui lòng nhập giới tính"),
  phone: yup
    .string()
    .required("Vui lòng nhập số điện thoại")
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "Chưa đúng định dạng"
    ),
  dateOfBirth: yup.string().required("Vui lòng chọn ngày sinh"),
  email: yup
    .string()
    .email("Chưa đúng định dạng email")
    .required("Vui lòng nhập Email"),
});

const UpdateUser = ({
  idPre,
  firstNamePre,
  lastNamePre,
  phonePre,
  addressPre,
  schoolPre,
  emailPre,
  genderPre,
  isGraduatePre,
  dateOfBirthPre,
}) => {
  const [isShow, setIsShow] = useState(false);
  const [checked, setChecked] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const formSubmit = async (data) => {
    data["favourites"] = checked;
    data["dateOfBirth"] = dayjs(data.dateOfBirth).unix();

    await updateUser(idPre, data)
      .then((res) => {
        navigate("/");
        setIsShow(true);
        setTimeout(() => {
          setIsShow(false);
        }, 3000);
      })
      .catch((err) => {
        alert(err);
      });
    setOpen(false);
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleChecked = (e) => {
    const index = checked.indexOf(e.target.value);
    if (index === -1) {
      setChecked((prev) => [...prev, e.target.value]);
    } else {
      setChecked((prev) =>
        prev.filter((favorite) => favorite !== e.target.value)
      );
    }
  };

  const formatDateOfBirth = (birth) =>
    dayjs(dayjs.unix(birth)).format("YYYY-MM-DD");

  return (
    <>
      {isShow ? (
        <Notification severity={"success"} title={"Update Success!!!"} />
      ) : null}

      <Tooltip
        onClick={() => setOpen(true)}
        title="Update"
        sx={{ width: "30px", height: "30px", cursor: "pointer" }}
      >
        <BuildCircleIcon color="primary" />
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
          width={800}
          height={400}
          p={3}
          borderRadius={5}
          margin=" 100px auto"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflowY: "scroll",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <UpdateIcon
              fontSize="large"
              color="primary"
              sx={{ paddingRight: "40px", paddingTop: "5px" }}
            />
            <Box>
              <Typography variant="h4" color="gray">
                Update User
              </Typography>
            </Box>
          </Box>
          <br />
          <Box>
            <form onSubmit={handleSubmit(formSubmit)}>
              <TextField
                sx={{ width: "600px" }}
                required
                id="firstName"
                label="First Name"
                type="text"
                defaultValue={firstNamePre}
                {...register("firstName")}
                helperText={errors.firstName?.message}
                error={!!errors.firstName?.message}
              />
              <br />
              <TextField
                sx={{ width: "600px" }}
                required
                id="lastName"
                label="Last Name"
                type="text"
                defaultValue={lastNamePre}
                {...register("lastName")}
                helperText={errors.lastName?.message}
                error={!!errors.lastName?.message}
              />
              <br />
              <TextField
                sx={{ width: "600px" }}
                required
                id="phone"
                label="Phone Number"
                type="text"
                defaultValue={phonePre}
                {...register("phone")}
                helperText={errors.phone?.message}
                error={!!errors.phone?.message}
              />
              <br />
              <TextField
                sx={{ width: "600px" }}
                id="address"
                label="Address"
                type="text"
                defaultValue={addressPre}
                {...register("address")}
                helperText={errors.address?.message}
                error={!!errors.address?.message}
              />
              <br />
              <TextField
                sx={{ width: "600px" }}
                id="school"
                label="School Name"
                type="text"
                defaultValue={schoolPre}
                {...register("school")}
                helperText={errors.school?.message}
                error={!!errors.school?.message}
              />
              <br />
              <TextField
                sx={{ width: "600px" }}
                required
                id="email"
                label="Enter Email"
                type="text"
                defaultValue={emailPre}
                {...register("email")}
                helperText={errors.email?.message}
                error={!!errors.email?.message}
              />
              <br />

              <TextField
                sx={{ width: "600px" }}
                required
                id="dateOfBirth"
                label="Date of birth"
                type="date"
                defaultValue={formatDateOfBirth(dateOfBirthPre)}
                {...register("dateOfBirth")}
                helperText={errors.dateOfBirth?.message}
                error={!!errors.dateOfBirth?.message}
              />
              <br />
              <SelectGroup
                id="gender"
                label="Gender"
                defaultValue={genderPre}
                value1="female"
                value2="male"
                select1="Female"
                select2="Male"
                register={{ ...register("gender") }}
              />
              <br />
              <SelectGroup
                id="isGraduate"
                label="Graduate"
                defaultValue={isGraduatePre}
                value1={true}
                value2={false}
                select1="Graduated"
                select2="Not Graduate"
                register={{ ...register("isGraduate") }}
              />

              <CheckBoxGroup
                id="favourites"
                label="Favorite"
                onChecked={handleChecked}
                checked={checked}
              />

              <Box
                sx={{
                  width: "780px",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Button
                  sx={{ width: "93px" }}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Update
                </Button>

                <Button onClick={() => setOpen(false)} variant="outlined">
                  Cancel
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default UpdateUser;
