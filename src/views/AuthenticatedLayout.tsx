import { Header } from "components/Header";
import { IconButton } from "components/IconButton";
import { useLogoutOrThrow } from "hooks/useLogout";
import { useMeOrThrow } from "hooks/useMe";
import { Fragment, memo } from "react";
import { Layout } from "./Layout";
import { UserMenu } from "./UserMenu";
import { CaretLeft } from "phosphor-react";
import { css } from "stitches.config";
import { Spacer } from "components/Spacer";

type Props = {
  content: React.ReactNode | null;
  back?: boolean;
  title?: string;
  rightAction?: React.ReactNode | null;
};

export const AuthenticatedLayout = memo<Props>(
  ({ content, back, rightAction, title }) => {
    const me = useMeOrThrow();
    const logout = useLogoutOrThrow();

    return (
      <Layout
        header={
          <Header
            title={title}
            leftAction={
              <div
                className={css({
                  padding: "$02",
                  display: "flex",
                  flexDirection: "row",
                })}
              >
                {back && (
                  <Fragment>
                    <IconButton to="/" icon={<CaretLeft size={30} />} />
                    <Spacer css={{ width: "$02" }} />
                  </Fragment>
                )}
                <UserMenu me={me} logout={logout} />
              </div>
            }
            rightAction={rightAction}
          />
        }
        content={content}
      />
    );
  }
);
