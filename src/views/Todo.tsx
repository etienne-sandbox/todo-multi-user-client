import { memo } from "react";
import { styled } from "stitches.config";
import { CheckCircle, Circle } from "phosphor-react";
import { Spacer } from "components/Spacer";
import { useSetTodoDone } from "hooks/useSetTodoDone";

type Props = {
  id: string;
  name: string;
  done: boolean;
  listId: string;
};

export const Todo = memo<Props>(({ done, name, id, listId }) => {
  const [setTodoDone] = useSetTodoDone(listId);

  return (
    <Wrapper>
      <Button
        type="button"
        onClick={() => {
          setTodoDone({ todoId: id, done: !done });
        }}
      >
        {done ? <CheckCircle size={30} /> : <Circle size={30} />}
      </Button>
      <Spacer horizontal={2} />
      <Name
        css={{
          textDecoration: done ? "line-through" : "none",
        }}
      >
        {name}
      </Name>
    </Wrapper>
  );
});

const Name = styled.span({
  flex: 1,
  fontFamily: "$spaceGrotesk",
  fontHeight: "$12",
  fontWeight: "$300",
});

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  paddingLeft: "$04",
  paddingRight: "$04",
});

const Button = styled.button({
  border: "none",
  display: "flex",
  margin: 0,
  backgroundColor: "transparent",
  cursor: "pointer",
  padding: "$02",
  color: "$blue600",
});
