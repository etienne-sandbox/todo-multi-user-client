import { FunctionComponent, useState } from "react";
import { User } from "logic/api";
import { User as UserIcon } from "phosphor-react";
import { IconButton } from "components/IconButton";
import { Popover } from "components/Popover";
import { css } from "stitches.config";
import { usePopper } from "react-popper";
import { Overlay } from "react-oot";
import { useStateNoUpdate } from "hooks/useStateNoUpdate";
import { Button } from "components/Button";

type Props = {
  me: User;
  logout: () => void;
};

export const UserMenu: FunctionComponent<Props> = ({ me, logout }) => {
  const [
    referenceElement,
    setReferenceElement,
  ] = useStateNoUpdate<HTMLButtonElement | null>(null);
  const [
    popperElement,
    setPopperElement,
  ] = useStateNoUpdate<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-end",
    modifiers: [{ name: "offset", options: { offset: [0, 12] } }],
  });

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={css({ padding: "$02" })}>
        <IconButton
          ref={setReferenceElement}
          onClick={() => setOpen((prev) => !prev)}
        >
          <UserIcon size={30} />
        </IconButton>
      </div>
      {open && (
        <Overlay
          onClose={() => setOpen(false)}
          canEscapeKeyClose={true}
          canOutsideClickClose={true}
        >
          <Popover
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            css={{ padding: "$04", width: "200px" }}
          >
            <p
              className={css({
                paddingLeft: "$01",
                paddingRight: "$01",
                fontHeight: "$12",
                fontFamily: "$spaceGrotesk",
                fontWeight: "$400",
              })}
            >
              Hello{" "}
              <span className={css({ fontWeight: "$600" })}>{me.name}</span>
            </p>
            <div
              className={css({
                height: "$02",
              })}
            />
            <Button onClick={logout} text="Logout" />
          </Popover>
        </Overlay>
      )}
    </>
  );
};
