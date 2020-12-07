import { AppWrapper } from "components/AppWrapper";
import { memo } from "react";
import { Header } from "components/Header";

type Props = {
  content: React.ReactNode | null;
  header?: React.ReactNode | null;
};

export const Layout = memo<Props>(({ content, header = <Header /> }) => {
  return (
    <AppWrapper>
      {header}
      {content}
    </AppWrapper>
  );
});
