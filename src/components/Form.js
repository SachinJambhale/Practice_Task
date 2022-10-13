import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const Form = () => {
  const [totalUsers, setTotalUsers] = useState([]);
  const [userData, setUserData] = useState({
    id: "",
    email: "",
    userName: "",
    dob: "",
    city: "",
    country: "",
    thumbnail: "",
    gender: "",
  });
  const baseUrl = "https://randomuser.me/api/?gender=";
  const loadMaleOrFemaleData = async (gender) => {
    const response = await axios.get(`${baseUrl}${gender}`);
    console.log(response.data.results[0]);
    const resData = response.data.results[0];
    console.log(resData.dob.date.split("T")[0]);
    const date = resData.dob.date.split("T")[0];
    const user = {
      email: resData.email,
      userName: resData.name.first,
      dob: date,
      city: resData.location.city,
      country: resData.location.country,
      thumbnail: resData.picture.thumbnail,
      gender: resData.gender,
      id: resData.id.value,
    };
    setUserData(user);
  };

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const deleteUser = (id) => {
    const updatedTotalUsers = totalUsers.filter((user) => user.id != id);
    setTotalUsers(updatedTotalUsers);
  };
  const handleSubmit = () => {
    const users = [...totalUsers];
    users.push(userData);
    setTotalUsers(users);
  };

  return (
    <>
      <form className="container-sm mt-4">
        <div className="d-flex justify-content-evenly">
          <button
            onClick={() => loadMaleOrFemaleData("male")}
            type="button"
            class="btn btn-primary"
          >
            Fetch Male Data
          </button>
          <button
            onClick={() => loadMaleOrFemaleData("female")}
            type="button"
            class="btn btn-primary"
          >
            Fetch Female Data
          </button>
        </div>

        <div class="form-group row mt-2">
          <label for="staticEmail" class="col-sm-2 col-form-label">
            Email
          </label>
          <div class="col-sm-10">
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Password"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div class="form-group row mt-2">
          <label for="inputPassword" class="col-sm-2 col-form-label">
            Username
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              name="userName"
              onChange={handleInputChange}
              value={userData.userName}
              class="form-control"
            />
          </div>
        </div>
        <div class="form-group row mt-2">
          <label for="inputPassword" class="col-sm-2 col-form-label">
            DOB
          </label>
          <div class="col-sm-10">
            <input
              type="date"
              name="dob"
              onChange={handleInputChange}
              value={userData.dob}
              class="form-control"
            />
          </div>
        </div>
        <div class="form-group row mt-2">
          <label for="inputPassword" class="col-sm-2 col-form-label">
            City
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              name="city"
              onChange={handleInputChange}
              value={userData.city}
              class="form-control"
            />
          </div>
        </div>
        <div class="form-group row mt-2">
          <label for="inputPassword" class="col-sm-2 col-form-label">
            Country
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              name="country"
              onChange={handleInputChange}
              value={userData.country}
              class="form-control"
            />
          </div>
        </div>
        <div className="d-flex">
          <button
            onClick={handleSubmit}
            type="button"
            class="ms-auto mt-2 btn btn-primary"
          >
            Click to add into card
          </button>
        </div>
      </form>
      <section className="d-flex flex-wrap container mt-4">
        {Array.isArray(totalUsers) &&
          totalUsers.map((user) => {
            return <Card {...user} deleteUser={deleteUser} />;
          })}
      </section>
    </>
  );
};

export default Form;
