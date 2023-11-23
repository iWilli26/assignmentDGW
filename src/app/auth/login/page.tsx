"use client";
import React, { useState } from "react";
import styled from "@emotion/styled";

const LoginForm: React.FC = () => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`Username: ${loginForm.username} Password: ${loginForm.password}`);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={loginForm.username}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={loginForm.password}
            onChange={handleFormChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div>dont have an account yet</div>
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
export default LoginForm;
