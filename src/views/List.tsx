import { ResourceHandler } from "components/ResourceHandler";
import { useList } from "hooks/useList";
import { FunctionComponent } from "react";
import { styled } from "stitches.config";
import { AuthenticatedLayout } from "./AuthenticatedLayout";
import { AddTodo } from "./AddTodo";
import { Loader } from "components/Loader";
import { ListHandler } from "components/ListHandler";
import { Todo } from "./Todo";
import { ScrollFlex } from "components/ScrollFlex";

type Props = {
  listId: string;
};

export const List: FunctionComponent<Props> = ({ listId }) => {
  const listRes = useList(listId);

  return (
    <ResourceHandler
      resource={listRes}
      renderResolved={(list, updating) => (
        <AuthenticatedLayout
          title={list.name}
          loading={updating}
          back={true}
          content={
            <ScrollFlex>
              <Wrapper>
                <ListHandler
                  list={list.todos}
                  getKey={(item) => item.id}
                  renderItem={(todo) => (
                    <Todo
                      id={todo.id}
                      done={todo.done}
                      name={todo.name}
                      listId={list.id}
                    />
                  )}
                  renderEmpty={() => {
                    return <HelpText>Click the + to add an item</HelpText>;
                  }}
                />
              </Wrapper>
            </ScrollFlex>
          }
          rightAction={
            <ActionWrapper>
              <AddTodo listId={list.id} />
            </ActionWrapper>
          }
        />
      )}
      renderPending={() => (
        <AuthenticatedLayout
          back={true}
          content={
            <LoaderContainer>
              <Loader size={30} />
            </LoaderContainer>
          }
        />
      )}
    />
  );
};

const ActionWrapper = styled.div({
  padding: "$02",
  display: "flex",
  flexDirection: "row",
});

const HelpText = styled.p({
  padding: "$04",
  paddingTop: "$10",
  paddingBottom: "$10",
  textAlign: "center",
});

const LoaderContainer = styled.div({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
});

const Wrapper = styled.div({
  padding: "$04",
  paddingTop: "$10",
  paddingBottom: "$10",
});
