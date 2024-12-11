import axios, { AxiosError } from "axios";
import { Button } from "baseui/button";
import { HeadingXXLarge, HeadingMedium } from "baseui/typography";
import { useNavigate } from "react-router-dom";
import { useSignOut, useAuthUser } from "react-auth-kit";
import {
  Container,
  ErrorText,
  InnerContainer,
  InputWrapper,
  StyledInput,
} from "../commons";
import { useFormik } from "formik";
import { useState } from "react";

function Home() {
  const auth = useAuthUser();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const id = auth()!.id;
  const playerId = auth()!.playerId;

  const logout = () => {
    signOut();
    navigate("/login");
  };

  const onSubmit = async (values: { email: string; name: string }) => {
    console.log("Values: ", values);
    setError("");

    try {
      const user = await axios.get(`http://localhost:9000/users/${id}`, {
        withCredentials: true,
      });
    } catch (error) {
      if (error && error instanceof AxiosError)
        setError(error.response?.data.message);
      else if (error && error instanceof Error) setError(error.message);
    }
  };

  return (
    <Container>
      <HeadingXXLarge color="secondary500">
        Welcome {playerId[0] + playerId.slice(1).toLowerCase()}
      </HeadingXXLarge>

      <Button kind="secondary" onClick={logout}>
        Logout
      </Button>
    </Container>
  );
}

export { Home };
