import { memo } from "react";
import { FieldError } from "react-hook-form";
import { styled } from "stitches.config";

type Props = {
  type?: "text" | "password";
  name: string;
  inputRef: React.Ref<any>;
  placeholder?: string;
  error?: FieldError | undefined;
  disabled?: boolean;
};

export const TextInput = memo<Props>(
  ({ name, inputRef, placeholder, type = "text", error, disabled = false }) => {
    const hasError = error && error.message;

    return (
      <Wrapper>
        <Input
          type={type}
          name={name}
          placeholder={placeholder}
          ref={inputRef}
          mode={hasError ? "error" : undefined}
          disabled={disabled}
        />
        {hasError && <ErrorMessage>{error?.message}</ErrorMessage>}
      </Wrapper>
    );
  }
);

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
});

const Input = styled.input({
  margin: 0,
  fontHeight: "$10",
  fontFamily: "$spaceGrotesk",
  paddingLeft: "$02",
  paddingTop: "$02",
  paddingBottom: "$02",
  paddingRight: "$02",
  borderWidth: "$small",
  borderColor: "$blue300",
  borderStyle: "solid",
  backgroundColor: "$transparentBlue",
  borderRadius: "$medium",
  variants: {
    mode: {
      error: {
        borderColor: "$red500",
      },
    },
  },
});

const ErrorMessage = styled.p({
  fontHeight: "$10",
  color: "$red500",
  paddingLeft: "$02",
  paddingRight: "$02",
});
