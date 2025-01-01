import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const StyledForm = styled(Form)`
  background-color:rgb(243, 236, 236);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 50px auto;
  transition: opacity 0.3s ease; 
  &:hover {
    opacity: 1; 
}
`;

const StyledButton = styled(Button)`
  background-color: #007bff;
  border: none;
  font-size: 16px;
  &:hover {
    background-color: #0056b3;
  }
`;

const StyledInput = styled(Input)`
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
`;
const initialForm = {
  email: '',
  password: '',
  terms: false,
};
const errorMessages = {
  email: "Please enter a valid email address",
  password: "Password must be at least 8 characters",
  terms: "You must accept the terms",
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [ errors, setErrors ] = useState({
    email: false,
    password: false,
    terms: false,
  });
  const [isValid, setIsValid ] = useState(false);
  

  const history = useHistory();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (password) => {
    return (
      password.length >= 8 &&
      /[a-zA-Z]/.test(password) &&
      /[0-9]/.test(password)
    );
  };


  
  const handleChange = (event) => {
    let { name, value, type, checked } = event.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setForm({ ...form, [name]: fieldValue });
  
    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: !validateEmail(fieldValue), 
      }));
    }
    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: !validatePassword(fieldValue), 
      }));
    }
    if (name === "terms") {
      setErrors((prev) => ({
        ...prev,
        terms: !fieldValue, 
      }));
    }
  };

  useEffect(() => {
    setIsValid(!Object.values(errors).some((error) => error));
  }, [errors]);

  const validateForm = () => {
    setErrors({
      email: !validateEmail(form.email),
      password: !validatePassword(form.password),
      terms: !form.terms,
    });

    return !Object.values(errors).some((error) => error);
  };


  

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      alert("Please fix the errors before submitting.");
      return;
    }

    axios
    .get("https://6540a96145bedb25bfc247b4.mockapi.io/api/login")
    .then((res) => {
      const user = res.data.find(
        (item) =>
          item.password === form.password && item.email === form.email
      );
      if (user) {
        setForm(initialForm);
        history.push("/main");
      } else {
        history.push("/error");
      }
    })
    .catch((err) => {
      console.error("API Error:", err);
      alert("An error occurred. Please try again.");
    });
};

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <StyledInput
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
        />
         {errors.email && <ErrorText className="text-danger">{errorMessages.email}</ErrorText>}
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <StyledInput
          id="examplePassword"
          name="password"
          placeholder="Enter your password "
          type="password"
          onChange={handleChange}
          value={form.password}
        />
        {errors.password && (
          <ErrorText className="text-danger">{errorMessages.password}</ErrorText>)}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="terms" check>
          <input
            name="terms"
            id="terms"
            type="checkbox"
            checked={form.terms}
            onChange={handleChange}
          />
          I agree to terms of service and privacy policy
        </Label>
        {errors.terms && <ErrorText className="text-danger">{errorMessages.terms}</ErrorText>}
      </FormGroup>
      <FormGroup className="text-center p-4">
        <StyledButton disabled={!isValid} color="primary">
          Sign In
        </StyledButton>
      </FormGroup>
    </StyledForm>
  );
}