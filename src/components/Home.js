import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Loadder from "./Loadder.js";
import "../App.css";
import { BsSearch } from "react-icons/bs";
import { InputGroup, FormControl } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";


function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterRegion] = useState("");

  // This search API is not giving correct response

  // useEffect(() => {
  //   axios
  //     .get(`http://hn.algolia.com/api/v1/search?title=${search}`)
  //     .then((res) => {
  //       console.log("search", res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [search]);


  const filteredData = data.filter((ele) => {
    const lowerCaseCountryName = ele.title.toLowerCase();
    const lowerCaseSearch = search.toLowerCase();
    // Check if the title name contains the search input.
    return (
      lowerCaseCountryName.includes(lowerCaseSearch) &&
      (filterRegion === "" || ele.region === filterRegion)
    );
  });


  useEffect(() => {
    setLoading(true);
    axios("http://hn.algolia.com/api/v1/search?query=test")
      .then((response) => {
        setData(response.data.hits);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

 

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={4}>
            <InputGroup className="mt-4">
              <InputGroup.Text className="inputBox">
                <BsSearch />
              </InputGroup.Text>
              <FormControl
                className="inputBox"
                type="text"
                placeholder="Search Here ..."
                onChange={(event) => setSearch(event.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>
      </Container>

      <Container className="mt-4">
        <Row>
          {loading && (
            <div className="d-flex justify-content-center vh-100">
              <Loadder text="Loading..." />
            </div>
          )}

          {filteredData.length <= 0 && (
            <div className="d-flex justify-content-center text-danger">
              <h5>Data Not Found</h5>
            </div>
          )}
          {filteredData.map((elem, index) => (
            <Col key={index} md={4} lg={3} className="card-style">
              <NavLink
                to={`/homeDetails/${elem.objectID}`}
                className="nav-link"
              >
                <Card style={{ width: "100%" }}>
                  <Card.Body>
                    <Card.Title>{elem.title.slice(0, 30)}</Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      <span className="title">Author : {elem.author}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="title"> Created At : </span>
                      {elem.created_at.slice(0, 10)}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </NavLink>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Home;
