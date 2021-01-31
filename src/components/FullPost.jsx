import React from "react";
import { Button, Modal } from "react-bootstrap";
import { StateContext } from "../App";

function FullPost({ openModal }) {
   const [state, dispatch] = React.useContext(StateContext);

   if (!state.currentPost) {
      return null;
   }

   if (!state.comments) {
      return null;
   }

   return (
      <div>
         <Modal show={state.visibleModal.fullPost}
            onHide={() => dispatch({ type: "CLOSE_MODAL", payload: "fullPost" })}>
            <Modal.Header closeButton>
               <Modal.Title>{state.currentPost.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <img className="mb-4" style={{ width: "100%" }} src={state.currentPost.image} alt={state.currentPost.title} />
               <p className="pb-4" style={{ borderBottom: "1px Solid LightGray" }}>{state.currentPost.text}</p>
               <div className="pt-2" style={{ textAlign: "center" }}>
                  <Button onClick={() => openModal("editArticle", state.currentPost)} className="mr-4" variant="warning">Редактировать</Button>
                  <Button onClick={() => dispatch({ type: "CLOSE_MODAL", payload: "fullPost" })} variant="secondary">Закрыть</Button>
               </div>
            </Modal.Body>
            <Modal.Footer style={{ justifyContent: "flex-start" }}>
               <ul style={{ listStyle: "none", marginTop: "10px", padding: "0" }}>
                  <h3 className="mb-4">Комментарии:</h3>
                  {state.comments.length ? state.comments.map((obj) => (
                     <li key={obj.id}>
                        <h5>{obj.name}</h5>
                        <div className="mb-4">{obj.text}</div>
                     </li>
                  )) : <h5>Комментариев нет...</h5>}
               </ul>
            </Modal.Footer>
         </Modal>
      </div >
   );
}

export default FullPost;