import { memo } from "react";
import { css } from "stitches.config";
import { ListBullets } from "phosphor-react";
import { LinkBox } from "./LinkBox";

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
        <ListBullets size={30} />
        <div className={css({ width: "$04" })} />
        <p
          className={css({
            fontHeight: "$12",
          })}
        >
          {name}
        </p>
      </div>
    </LinkBox>
  );
});
