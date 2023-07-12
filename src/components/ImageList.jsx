import { useState, useEffect } from 'react';
import axios from "axios";
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import ImageCard from './ImageCard';

function ImageList() {
  const [ hits, setHits ] = useState([]);
  const [ hasQueried, setHasQueried ] = useState(false);
  const [ query, setQuery ] = useState("");
  const [ queryResults, setQueryResults ] = useState([]);
  const [ error, setError ] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;
  const api = `https://pixabay.com/api/?key=${apiKey}`;

  // fetch all of the images
  const fetchAll = async () => {
    try {
      const response = await axios.request(api);
      setHits(response.data.hits)
    } catch (error) {
      console.lerrorog(error);
      setError(error);
    }
  }

  // fetch images based on query
  const fetchQuery = async () => {
    try {
      let apiQuery = api + "&q=" + query;
      const queryResponse = await axios.request(apiQuery);
      setQueryResults(queryResponse.data.hits);
      setHasQueried(true);
    } catch (error) {
      setError(error);
      console.error(error);
    }
  }

  // handle submit 
  const handleSubmit = () => {
    fetchQuery();
  }

  // handle change of input; replace spaces with + for API call
  const handleChange = (event) => {
    let queryReplace = event.target.value.split(" ").join("+");
    setQuery(queryReplace)
  }

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <>
    <Container className="py-4">
      <Form.Group>
        <Row className="px-2">
          <Col md={10} xs={8}>
            <Form.Control type="text" placeholder="Search for an image" onChange={handleChange} />
          </Col>
          <Col>
            <Button type="submit" onClick={handleSubmit}>Search</Button>
          </Col>
        </Row>
      </Form.Group>
      <Container className="d-flex justify-content-evenly">
        <Row className="my-3">
          { error ? (
            <Alert variant="warning">An error as occurred :(</Alert>
          ) : hasQueried ? (
            queryResults?.map((hit) => {
              return (
                <ImageCard key={hit.id} image={hit} src={hit.largeImageURL} fluid />
              )
            })
          ) : (
            hits?.map((hit) => {
              return (
                <ImageCard key={hit.id} image={hit} src={hit.largeImageURL} fluid />
              )
            })
          )}
        </Row>
      </Container>
    </Container>
    </>
  )
}

export default ImageList;