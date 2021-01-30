import React from "react";
import { Button, Container, CardColumns } from "react-bootstrap";
import { initialState, reducer } from "./reducer";

import { AddArticleModal, Cards, FullPost } from "./components";

export const StateContext = React.createContext();

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const openModal = (name, state = {}) => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { name, state }
    })
  }

  const addArticle = (data) => {
    dispatch({
      type: "ADD_ARTICLE",
      payload: data
    })
  };

  const removeArticle = (id) => {
    dispatch({
      type: "REMOVE_ARTICLE",
      payload: id,
    })
  };

  console.log(state);

  return (
    <div className="App">
      <Container >
        <Button className="mb-4" onClick={() => openModal("addArticle")}>Добавить статью</Button>
        <CardColumns>
          {state.articles.length ?
            state.articles.map((obj) =>
              <Cards
                key={obj.id}
                obj={obj}
                dispatch={dispatch}
                openModal={openModal}
                removeArticle={() => removeArticle(obj.id)} />)
            : <h3>Постов нет..</h3>}
        </CardColumns>

        <StateContext.Provider value={[state, dispatch]}>
          <AddArticleModal addArticle={addArticle} />
          <FullPost />
        </StateContext.Provider>
      </Container>
    </div>
  );
}

export default App;
