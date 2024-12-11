import { Button } from "baseui/button";
import { Input } from "baseui/input";
import styled from "styled-components";
import {
  HeadingXXLarge,
  HeadingXLarge,
  HeadingLarge,
  HeadingMedium,
  HeadingSmall,
  HeadingXSmall,
} from "baseui/typography";
import {
  Container,
  ErrorText,
  InnerContainer,
  InputWrapper,
  StyledInput,
} from "../commons";

import "./register.css";

import { useSignIn } from "react-auth-kit";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoBox } from "../logo-box/logoBox";
// import * as Yup from "yup";

function Register(props: any) {
  const [error, setError] = useState("");
  const signIn = useSignIn();

  const navigate = useNavigate();

  const onSubmit = async (values: any) => {
    setError("");

    try {
      // const userCreated = await axios.post(
      //   "http://localhost:8080/users",
      //   values
      // );
      // const response = await axios.post(
      //   "http://localhost:8080/auth/login",
      //   values
      // );
      // //salva nos cookies e autentica
      // signIn({
      //   token: response.data.token,
      //   expiresIn: 3600,
      //   tokenType: "Bearer",
      //   authState: {
      //     id: response.data.id,
      //     email: values.email,
      //     name: response.data.name,
      //   },
      // });
      // navigate("/");
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <Container className="outer-cont">
      <div className="register-box">
        <LogoBox style={{ marginTop: "-60%" }} />
        <div className="register-image">
          <img src="../../assets/register-image.jpg" alt="" />
        </div>
        <div className="register-form">
          <form onSubmit={formik.handleSubmit}>
            <h1 style={{ color: "#4b3931", textAlign: "center" }}>
              NOVO USUÁRIO
            </h1>
            <ErrorText>{error}</ErrorText>
            <InputWrapper
              style={{
                fontFamily: "Sorts Mill Goudy",
              }}
            >
              <StyledInput
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Email"
                clearOnEscape
                size="large"
                type="email"
              />
            </InputWrapper>
            <InputWrapper
              style={{
                fontFamily: "Sorts Mill Goudy",
              }}
            >
              <StyledInput
                name="Id do Player"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Id do Player"
                clearOnEscape
                size="large"
                type="text"
              />
            </InputWrapper>
            <InputWrapper
              style={{
                fontFamily: "Sorts Mill Goudy",
              }}
            >
              <StyledInput
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Senha"
                clearOnEscape
                size="large"
                type="password"
              />
            </InputWrapper>
            <InputWrapper
              style={{
                fontFamily: "Sorts Mill Goudy",
              }}
            >
              <StyledInput
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Confirmação de senha"
                clearOnEscape
                size="large"
                type="password"
              />
            </InputWrapper>

            <InputWrapper>
              <Button
                style={{
                  backgroundColor: "#DBC9B9",
                  border: "#908378 solid 3px",
                  width: "50%",
                  marginTop: "4%",
                }}
                className="register-button"
                size="large"
                kind="primary"
                isLoading={formik.isSubmitting}
              >
                <span style={{ color: "#4B3931" }}>CADASTRAR</span>
              </Button>
            </InputWrapper>
          </form>
        </div>
      </div>
    </Container>
  );
}

export { Register };
