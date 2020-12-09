import { FunctionComponent, useState } from "react";
import { User } from "logic/api";
import { User as UserIcon } from "phosphor-react";
import { IconButton } from "components/IconButton";
import { Popover } from "components/Popover";
import { styled } from "stitches.config";
import { usePopper } from "react-popper";
import { Overlay } from "react-oot";
import { useStateNoUpdate } from "hooks/useStateNoUpdate";
import { Button } from "components/Button";
import { Spacer } from "components/Spacer";

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
      <IconButton
        ref={setReferenceElement}
        onClick={() => setOpen((prev) => !prev)}
        icon={<UserIcon size={30} />}
      />
      {open && (
        <Overlay
          onClose={() => setOpen(false)}
          canEscapeKeyClose={true}
          canOutsideClickClose={true}
        >
          <Popover
            ref={setPopperElement}
            style={{ ...styles.popper, width: "200px" }}
            {...attributes.popper}
          >
            <HelloPara>
              Hello <Name>{me.name}</Name>
            </HelloPara>
            <Spacer vertical={2} />
            <Button onClick={logout} text="Logout" />
          </Popover>
        </Overlay>
      )}
    </>
  );
};

const Name = styled.span({ fontWeight: "$600" });

const HelloPara = styled.p({
  paddingLeft: "$01",
  paddingRight: "$01",
  fontHeight: "$12",
  fontFamily: "$spaceGrotesk",
  fontWeight: "$400",
});
