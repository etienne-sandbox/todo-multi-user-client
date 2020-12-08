import { forwardRef, memo } from "react";
import { Link } from "react-router-dom";
import { css, styled } from "stitches.config";

const iconButtonStyle = css({
  margin: 0,
  paddingLeft: "$01",
  paddingRight: "$01",
  paddingTop: "$01",
  paddingBottom: "$01",
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "$medium",
  backgroundColor: "$transparentDark",
  color: "$white",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "$blue600",
  },
});

const disabledStyle = css({
  backgroundColor: "$grey500",
  ":hover": {
    backgroundColor: "$grey500",
  },
});

const IconButtonEl = styled.button(iconButtonStyle);

const IconButtonLinkEl = styled(Link, iconButtonStyle);

type IconButtonProps = {
  ref?: React.Ref<HTMLElement>;
  onClick?: () => void;
  disabled?: boolean;
  type?: "submit" | "button";
  icon: React.ReactNode;
  to?: string;
};

export const IconButton = memo<IconButtonProps>(
  forwardRef(({ icon, type = "button", disabled, onClick, to }, ref) => {
    const Elem = to ? (IconButtonLinkEl as any) : IconButtonEl;

    return (
      <Elem
        ref={ref}
        onClick={onClick}
        css={disabled ? disabledStyle : undefined}
        type={type}
        to={to}
      >
        {icon}
      </Elem>
    );
  })
);
