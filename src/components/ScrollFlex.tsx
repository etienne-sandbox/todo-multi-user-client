import { memo, useRef } from "react";
import { styled } from "stitches.config";
import useComponentSize from "@rehooks/component-size";
import Scrollbar from "react-scrollbars-custom";

type Props = {
  children: JSX.Element | null;
  horizontal?: boolean;
};

export const ScrollFlex = memo<Props>(({ children, horizontal = false }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const size = useComponentSize(contentRef);

  return (
    <Content
      ref={contentRef}
      css={
        horizontal ? { width: 1, height: "100%" } : { height: 1, width: "100%" }
      }
    >
      <Scrollbar style={{ ...size, position: "relative" }}>
        <ContentInner style={{ minHeight: size.height }}>
          {children}
        </ContentInner>
      </Scrollbar>
    </Content>
  );
});

const Content = styled.div({
  flex: 1,
  position: "relative",
});

const ContentInner = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
});
