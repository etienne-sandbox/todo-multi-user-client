import { Link } from "react-router-dom";
import { css, styled } from "stitches.config";

const iconButtonCss = css({
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

export const IconButton = styled.button(iconButtonCss);

export const IconButtonLink = styled(Link, iconButtonCss);
