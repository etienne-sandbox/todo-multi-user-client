import { memo } from "react";
import { css } from "stitches.config";
import { Asterisk } from "phosphor-react";
import { LinkBox } from "./LinkBox";
import { Spacer } from "components/Spacer";

type Props = {
  id: string;
  name: string;
};

export const ListLinkItem = memo<Props>(({ id, name }) => {
  return (
    <LinkBox to={`/list/${id}`}>
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          borderRadius: "$medium",
          paddingLeft: "$04",
          paddingTop: "$02",
          paddingBottom: "$02",
          backgroundColor: "$transparentBlue",
          ":hover": {
            backgroundColor: "$blue500",
            color: "$white",
          },
        })}
      >
        <Asterisk size={20} className={css({ flexShrink: 0 })} />
        <Spacer css={{ width: "$04" }} />
        <p
          className={css({
            fontHeight: "$12",
            textAlign: "left",
          })}
        >
          {name}
        </p>
      </div>
    </LinkBox>
  );
});
