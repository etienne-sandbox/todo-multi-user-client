import { memo } from "react";
import { Link } from "react-router-dom";
import { css } from "stitches.config";

type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  type?: "submit" | "button";
  text: string;
  to?: string;
};

export const Button = memo<ButtonProps>(
  ({ text, type = "button", disabled, onClick, to }) => {
    const Elem = to ? (Link as any) : "button";

    return (
      <Elem
        onClick={onClick}
        className={
          buttonStyle() + " " + (disabled ? disabledStyle() : undefined)
        }
        type={type}
        to={to}
      >
        {text}
      </Elem>
    );
  }
);

const buttonStyle = css({
  textTransform: "none",
  textDecoration: "none",
  margin: 0,
  fontHeight: "$11",
  fontFamily: "$spaceGrotesk",
  paddingLeft: "$04",
  paddingRight: "$04",
  paddingTop: "$02",
  paddingBottom: "$02",
  border: "none",
  borderRadius: "$medium",
  backgroundColor: "$blue500",
  color: "$white",
  fontWeight: "$600",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "$blue600",
  },
});

console.log(buttonStyle().className);

const disabledStyle = css({
  backgroundColor: "$grey500",
  "&:hover": {
    backgroundColor: "$grey500",
  },
});
