import React from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { StateContext } from "../App";

const EditArticle = ({ editArticle }) => {
   const [state, dispatch] = React.useContext(StateContext);
   const [data, setData] = React.useState({
      image: "",
      title: "",
      text: "",
   });

   if (!state.currentPost) {
      return null;
   }

   const handleInputChange = (e) => {
      setData({
         ...data,
         [e.target.name]: e.target.value
      })
   };

   const onClickAdd = () => {
      if (editArticle) {
         editArticle(data);
      };
      setData({
         image: "",
         title: "",
         text: "",
      })
   }

   return (
      <div>
         <Modal show={state.visibleModal.editArticle}
            onHide={() => dispatch({ type: "CLOSE_MODAL", payload: "editArticle" })}>
            <Modal.Header closeButton>
               <Modal.Title>Редактировать статью</Modal.Title>
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
            <Modal.Footer style={{ justifyContent: "flex-start" }}>
               <Button variant="secondary" onClick={() =>
                  dispatch({ type: "CLOSE_MODAL", payload: "editArticle" })}>Закрыть</Button>
               <Button variant="success" onClick={onClickAdd}>Сохранить изменения</Button>
            </Modal.Footer>
         </Modal>
      </div >
   )
};

export default EditArticle;