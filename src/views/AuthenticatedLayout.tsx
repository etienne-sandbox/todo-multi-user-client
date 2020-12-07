import { Header } from "components/Header";
import { IconButtonLink } from "components/IconButton";
import { useLogoutOrThrow } from "hooks/useLogout";
import { useMeOrThrow } from "hooks/useMe";
import { memo } from "react";
import { Layout } from "./Layout";
import { UserMenu } from "./UserMenu";
import { CaretLeft } from "phosphor-react";
import { css } from "stitches.config";

type Props = {
  content: React.ReactNode | null;
  back?: boolean;
};

export const AuthenticatedLayout = memo<Props>(({ content, back }) => {
  const me = useMeOrThrow();
  const logout = useLogoutOrThrow();

  return (
    <Layout
      header={
        <Header
          rightAction={<UserMenu me={me} logout={logout} />}
          leftAction={
            back && (
              <div className={css({ padding: "$02", display: "flex" })}>
                <IconButtonLink to="/">
                  <CaretLeft size={30} />
                </IconButtonLink>
              </div>
            )
          }
        />
      }
      content={content}
    />
  );
});
