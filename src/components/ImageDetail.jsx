import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image, Badge, Button } from 'react-bootstrap';
import './styles.css';

const ImageDetail = () => {
  const { id } = useParams();
  const [ data, setData ] = useState([]);
  const [ tags, setTags ] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;
  const api = `https://pixabay.com/api/?key=${apiKey}&id=${id}`;

  // fetch single image based on ID from API
  const fetchImage = async () => {
    try {
      const response = await axios.request(api);
      setData(response.data.hits[0]);
      let tagString = response.data.hits[0].tags;
      setTags(tagString.split(', '));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <Container className="py-4">
      <Row>
        <Link to={'/'}>
          <Button variant="secondary" className="mb-3">← Back</Button>
        </Link>
        <Image src={data?.largeImageURL} fluid className="pb-2" />
        <span className="mt-2"><strong>Tags:</strong>
          {tags?.map((tag) => {
            return (
              <Badge style={{ width: "auto" }} className="ms-2">{tag}</Badge>
            )
          })}
        </span>
      </Row>
      <hr />
      <Row>
        <Col xs={3} md={3} lg={1}>
          <Image src={data?.userImageURL} fluid roundedCircle />
        </Col>
        <Col className="m-auto">
          <span>Posted by <strong>{data?.user}</strong></span>
        </Col>
      </Row>
    </Container>
  )
}

export default ImageDetail;