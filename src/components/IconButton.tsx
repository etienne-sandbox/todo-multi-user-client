import { forwardRef, memo } from "react";
import { Link } from "react-router-dom";
import { css } from "stitches.config";

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
    const Elem = to ? (Link as any) : "button";

    return (
      <Elem
        ref={ref}
        onClick={onClick}
        className={
          iconButtonStyle() + " " + (disabled ? disabledStyle() : undefined)
        }
        type={type}
        to={to}
      >
        {icon}
      </Elem>
    );
  })
);

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
  "&:hover": {
    backgroundColor: "$blue600",
  },
});

const disabledStyle = css({
  backgroundColor: "$grey500",
  "&:hover": {
    backgroundColor: "$grey500",
  },
});
