import React from "react";
import styled from "styled-components";
import * as Styles from "./style";
import Image from "next/image";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  search?: boolean;
}

const Input: React.FC<InputProps> = ({ label, error, search, ...props }) => {
  return (
    <Styles.InputWrapper>
      {label && (
        <Styles.StyledLabel htmlFor={props.id}>{label}</Styles.StyledLabel>
      )}
      <Styles.StyledInputWrapper tabIndex={0}>
        {search && (
          <Image src={"/assets/search.svg"} width={17} height={17} alt="" />
        )}
        <Styles.StyledInput {...props}  />
      </Styles.StyledInputWrapper>
      {error && <Styles.ErrorText>{error}</Styles.ErrorText>}
    </Styles.InputWrapper>
  );
};

export default Input;
