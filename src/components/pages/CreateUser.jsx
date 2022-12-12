import * as yup from "yup";
import * as dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SelectGroup from "../common/SelectGroup";
import CheckBoxGroup from "../common/CheckBoxGroup";

import { useDispatch } from "react-redux";
import { addUser } from "../../app/actions";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField, Typography } from "@mui/material";

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

function CreateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checked, setChecked] = useState([]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = async (data) => {
    data["favourites"] = checked;
    data["dateOfBirth"] = dayjs(data.dateOfBirth).unix();
    dispatch(await addUser(data));
    navigate("/");
  };

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

  return (
    <div className="App">
      <Typography align="center" variant="h2" color="blueviolet">
        {" "}
        Create User
      </Typography>
      <form onSubmit={handleSubmit(formSubmit)}>
        <TextField
          sx={{ width: "600px" }}
          required
          id="firstName"
          label="First Name"
          type="text"
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
          defaultValue="2000-01-01"
          {...register("dateOfBirth")}
          helperText={errors.dateOfBirth?.message}
          error={!!errors.dateOfBirth?.message}
        />
        <br />
        <SelectGroup
          req={true}
          id="gender"
          label="Gender"
          value1="female"
          value2="male"
          defaultValue="female"
          select1="Female"
          select2="Male"
          register={{ ...register("gender") }}
        />
        <br />
        <SelectGroup
          req={true}
          id="isGraduate"
          label="Graduate"
          value1={true}
          value2={false}
          defaultValue={true}
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
        <Button
          sx={{ width: "93px", marginTop: "50px" }}
          type="submit"
          variant="outlined"
        >
          Create
        </Button>
      </form>
    </div>
  );
}

export default CreateUser;
