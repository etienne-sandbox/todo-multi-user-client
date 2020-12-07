import { styled } from "stitches.config";

export const AppWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  alignSelf: "center",
  backgroundColor: "$white",
  borderRadius: "$big",
  maxHeight: 800,
  height: `calc(100% - 24px)`,
  maxWidth: 500,
  width: `calc(100% - 24px)`,
  boxShadow: "$soft",
});
