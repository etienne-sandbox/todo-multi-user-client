import { FunctionComponent } from "react";
import { css, styled } from "stitches.config";
import { ClipboardText } from "phosphor-react";

type Props = {
  rightAction?: React.ReactNode | null;
  leftAction?: React.ReactNode | null;
};

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

export const Header: FunctionComponent<Props> = ({
  leftAction,
  rightAction,
}) => {
  return (
    <HeaderEl>
      <div className={css({ flex: 1, width: "100%" })}>{leftAction}</div>
      <h1
        className={css({
          margin: "0",
          fontHeight: "$20",
          display: "flex",
          alignSelf: "center",
          flexDirection: "row",
          alignItems: "center",
          paddingRight: "$02",
        })}
      >
        <ClipboardText size={30} />
        <div className={css({ width: "$02" })} />
        Todo
      </h1>
      <div
        className={css({
          flex: 1,
          display: "flex",
          width: "100%",
          flexDirection: "row-reverse",
        })}
      >
        {rightAction}
      </div>
    </HeaderEl>
  );
};
