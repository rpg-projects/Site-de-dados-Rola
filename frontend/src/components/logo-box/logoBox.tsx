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
import logo from "../../assets/logo.png";

import "./logoBox.css";

// import * as Yup from "yup";

function LogoBox(props: any) {
  return (
    <div className="box" style={props.style}>
      <p className="nome">ROLA</p>
      <img className="img" src={logo} alt="" />
    </div>
  );
}

export { LogoBox };
