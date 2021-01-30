import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";


function Cards({ obj, openModal, removeArticle }) {

   return (
      <Card>
         <Card.Img variant="top" src={obj.image} />
         <Card.Body>
            <Card.Title>{obj.title}</Card.Title>
            <Card.Text>{obj.text.length > 100 ? obj.text.substring(0, 100) + "..." : obj.text}</Card.Text>
            <Button onClick={() => openModal("fullPost", obj)} className="mr-2" variant="primary">Открыть</Button>
            <Button onClick={removeArticle} variant="danger">Удалить</Button>
         </Card.Body>
      </Card >
   );
};

export default Cards;