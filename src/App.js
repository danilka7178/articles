import React from "react";
import axios from "axios";
import { Button, Container, CardColumns } from "react-bootstrap";
import { initialState, reducer } from "./reducer";

import { AddArticleModal, Cards, EditArticle, FullPost } from "./components";

export const StateContext = React.createContext();

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const openModal = (name, state = {}) => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { name, state }
    })
    if (name === "fullPost") {
      axios.get(`https://5c3755177820ff0014d92711.mockapi.io/articles/${state.id}/comments`)
        .then(({ data }) => {
          if (data) { dispatch({ type: "GET_COMMENTS", payload: data }) }
        })
    }
    if (name === "editArticle") {
      dispatch({ type: "CLOSE_MODAL1", payload: "fullPost" })
    }
  };

  const addArticle = (data) => {
    axios.post("https://5c3755177820ff0014d92711.mockapi.io/articles", data)
      .finally(dispatch({
        type: "ADD_ARTICLE",
        payload: data
      }))
  };

  const editArticle = (data) => {
    axios.post("https://5c3755177820ff0014d92711.mockapi.io/articles", data)
      .finally(dispatch({
        type: "ADD_ARTICLE",
        payload: data
      }))
  };

  const removeArticle = (id) => {
    if (window.confirm("А вдруг кто-то старался?")) {
      axios.delete(`https://5c3755177820ff0014d92711.mockapi.io/articles/${id}`)
      dispatch({
        type: "REMOVE_ARTICLE",
        payload: id,
      });
    }
  };

  React.useEffect(() => {
    axios.get("https://5c3755177820ff0014d92711.mockapi.io/articles")
      .then(({ data }) => dispatch({ type: "GET_ARTICLES", payload: data }));
  }, []);

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
          <FullPost openModal={openModal} />
          <EditArticle editArticle={editArticle} />
        </StateContext.Provider>
      </Container>
    </div>
  );
}

export default App;
