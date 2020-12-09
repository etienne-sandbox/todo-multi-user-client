import { useMeLists } from "hooks/useMeLists";
import { Fragment, FunctionComponent } from "react";
import { styled } from "stitches.config";
import { AuthenticatedLayout } from "./AuthenticatedLayout";
import { ListLinkItem } from "components/ListLinkItem";
import { ResourceHandler } from "components/ResourceHandler";
import { CloudCheck, Plus } from "phosphor-react";
import { Spacer } from "components/Spacer";
import { ScrollFlex } from "components/ScrollFlex";
import { IconButton } from "components/IconButton";
import { Loader } from "components/Loader";

export const Home: FunctionComponent = () => {
  const listsRes = useMeLists();

  return (
    <AuthenticatedLayout
      rightAction={
        <ActionWrapper>
          <IconButton to="/create" icon={<Plus size={30} />} />
        </ActionWrapper>
      }
      content={
        <Wrapper>
          <Title>
            {listsRes.isFetching ? (
              <Loader size={20} />
            ) : (
              <CloudCheck size={20} />
            )}
            <Spacer horizontal={2} />
            <span>Your lists</span>
          </Title>
          <Spacer vertical={[1, 0]} />
          <ScrollFlex>
            <ResourceHandler
              resource={listsRes}
              renderResolved={(data) => (
                <ListWrapper>
                  {data.map((item, i) => (
                    <Fragment key={item.id}>
                      {i > 0 && <Spacer vertical={2} />}
                      <ListLinkItem id={item.id} name={item.name} />
                    </Fragment>
                  ))}
                </ListWrapper>
              )}
            />
          </ScrollFlex>
        </Wrapper>
      }
    />
  );
};

const ActionWrapper = styled.div({
  padding: "$02",
  display: "flex",
  flexDirection: "row",
});

const Wrapper = styled.div({
  textAlign: "center",
  flex: 1,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const Title = styled.h3({
  paddingTop: "$10",
  display: "flex",
  alignItems: "center",
});

const ListWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  maxWidth: "300px",
  width: "100%",
  paddingLeft: "$10",
  paddingRight: "$10",
  paddingBottom: "$10",
});
