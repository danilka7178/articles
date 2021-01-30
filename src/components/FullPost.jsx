import React from "react";
import { Button, Modal } from "react-bootstrap";
import { StateContext } from "../App";

function FullPost() {
   const [state, dispatch] = React.useContext(StateContext);

   if (!state.currentPost) {
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
               <img style={{ width: "100%" }} src={state.currentPost.image} alt={state.currentPost.title} />
               {state.currentPost.text}
            </Modal.Body>
            <Modal.Footer>
               <Button onClick={() => dispatch({ type: "CLOSE_MODAL", payload: "fullPost" })} variant="secondary">Close</Button>
            </Modal.Footer>
         </Modal>
      </div>
   );
}

export default FullPost;