import { memo } from "react";
import { css, styled } from "stitches.config";
import { ClipboardText } from "phosphor-react";
import { Spacer } from "./Spacer";

type Props = {
  title?: string;
  rightAction?: React.ReactNode | null;
  leftAction?: React.ReactNode | null;
};

export const Header = memo<Props>(
  ({ leftAction, rightAction, title = "Todo" }) => {
    return (
      <HeaderEl>
        <SideBox>{leftAction}</SideBox>
        <Title>
          <ClipboardText size={30} className={css({ flexShrink: 0 })} />
          <Spacer css={{ width: "$02" }} />
          <TitleText>{title}</TitleText>
        </Title>
        <SideBox css={{ flexDirection: "row-reverse" }}>{rightAction}</SideBox>
      </HeaderEl>
    );
  }
);

const SideBox = styled.div({
  width: "$40",
  display: "flex",
  flexDirection: "row",
});

const HeaderEl = styled.header({
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
  justifyContent: "space-between",
  textAlign: "center",
  height: "$22",
  margin: "$02",
  backgroundColor: "$blue500",
  color: "$white",
  borderRadius: "$medium",
});

const Title = styled.h1({
  flex: 1,
  margin: "0",
  fontHeight: "$20",
  display: "flex",
  alignSelf: "center",
  flexDirection: "row",
  alignItems: "center",
  paddingRight: "$02",
  color: "$white",
  justifyContent: "center",
});

const TitleText = styled.span({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});
