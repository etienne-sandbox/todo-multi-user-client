import { memo } from "react";
import { styled } from "stitches.config";
import { Title } from "components/Title";

type Props = {
  title: string;
  children: JSX.Element | Array<JSX.Element>;
};

export const FormLayout = memo<Props>(({ children, title }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      {children}
    </Wrapper>
  );
});

const Wrapper = styled.div({
  display: "flex",
  flex: "1",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "center",
  paddingLeft: "$02",
  paddingRight: "$02",
});
