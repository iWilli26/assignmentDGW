"use client";
import { User } from "@/model/user";
import axios from "axios";
import { get } from "http";
import React, { use, useState } from "react";
import styled from "@emotion/styled";

const RegisterForm: React.FC = () => {
  const [registerForm, setRegisterForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({
      ...registerForm,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //check if passwords match
    if (registerForm.password !== registerForm.confirmPassword) {
      document.getElementById("submitError")!.innerHTML =
        "Passwords do not match";
      return;
    }
    //check if a field is empty
    for (const key in registerForm) {
      if (registerForm[key as keyof typeof registerForm] === "") {
        document.getElementById("submitError")!.innerHTML =
          "Please fill out all fields";
        return;
      }
    }
    axios
      .post("/api/auth/register", registerForm, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.data.error) {
          document.getElementById("errorMail")!.innerHTML = response.data.error;
        } else {
          console.log("pog");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={registerForm.firstName}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={registerForm.lastName}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={registerForm.username}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={registerForm.email}
            onChange={handleFormChange}
          />
          <p id="errorMail"></p>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={registerForm.password}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={registerForm.confirmPassword}
            onChange={handleFormChange}
          />
        </div>
        <Submit>
          <button type="submit">Register</button>
          <p id="submitError"></p>
        </Submit>
      </form>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 6rem;
  min-height: 100vh;
`;

const Submit = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export default RegisterForm;
