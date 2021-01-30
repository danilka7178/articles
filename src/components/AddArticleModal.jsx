import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { StateContext } from "../App";

function AddArticleModal({ addArticle }) {
   const [state, dispatch] = React.useContext(StateContext);

   const [data, setData] = React.useState({
      image: "",
      title: "",
      text: "",
   });

   const handleInputChange = (e) => {
      setData({
         ...data,
         [e.target.name]: e.target.value
      })
   };

   const onClickAdd = () => {
      if (addArticle) {
         addArticle(data);
      };
      setData({
         image: "",
         title: "",
         text: "",
      })
   }

   return (
      <div>
         <Modal show={state.visibleModal.addArticle} onHide={() =>
            dispatch({ type: "CLOSE_MODAL", payload: "addArticle" })}>
            <Modal.Header closeButton>
               <Modal.Title>Добавление статьи</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form.Group>
                  <Form.Label>URL изображения</Form.Label>
                  <Form.Control type="text" name="image" onChange={handleInputChange} value={data.image} />
                  <Form.Label>Название статьи</Form.Label>
                  <Form.Control type="text" name="title" onChange={handleInputChange} value={data.title} />
                  <Form.Label>Текст статьи</Form.Label>
                  <Form.Control as="textarea" rows={5} name="text" onChange={handleInputChange} value={data.text} />
               </Form.Group>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={() =>
                  dispatch({ type: "CLOSE_MODAL", payload: "addArticle" })}>Закрыть</Button>
               <Button variant="success" onClick={onClickAdd}>Добавить</Button>
            </Modal.Footer>
         </Modal>
      </div>
   );
}

export default AddArticleModal;