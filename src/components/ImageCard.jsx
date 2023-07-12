import { Link } from 'react-router-dom';
import { Col, Image } from 'react-bootstrap';
import './styles.css';

const ImageCard = ({ image }) => {
  return (
    <Col sm={6} lg={3} className="my-4">
      <Link to={{
        pathname : `/${image.id}`,
        state: { image }
      }}>
        <Image src={image.largeImageURL} fluid className="img-preview" />
      </Link>
    </Col>
  )
}

export default ImageCard;