import { Header } from "components/Header";
import { IconButton } from "components/IconButton";
import { useMeOrThrow } from "hooks/useMe";
import { Fragment, memo } from "react";
import { Layout } from "./Layout";
import { UserMenu } from "./UserMenu";
import { CaretLeft } from "phosphor-react";
import { styled } from "stitches.config";
import { Spacer } from "components/Spacer";

type Props = {
  content: React.ReactNode | null;
  back?: boolean;
  title?: string;
  rightAction?: React.ReactNode | null;
  loading?: boolean;
};

export const AuthenticatedLayout = memo<Props>(
  ({ content, back, rightAction, title, loading = false }) => {
    const me = useMeOrThrow();

    return (
      <Layout
        header={
          <Header
            loading={loading}
            title={title}
            leftAction={
              <ActionWrapper>
                {back && (
                  <Fragment>
                    <IconButton to="/" icon={<CaretLeft size={30} />} />
                    <Spacer horizontal={2} />
                  </Fragment>
                )}
                <UserMenu me={me} />
              </ActionWrapper>
            }
            rightAction={rightAction}
          />
        }
        content={content}
      />
    );
  }
);

const ActionWrapper = styled("div", {
  padding: "$02",
  display: "flex",
  flexDirection: "row",
});
