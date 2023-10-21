import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

import { BsArrowLeft } from "react-icons/bs";
import "../styles/Header.css";
import Spinner from "./Loadder";
import axios from "axios";

function HomeDetails() {
  let navigate = useNavigate();
  const params = useParams();
  const { objectID } = params;

  const [homeDetails, setHomeDetails] = useState([]);
  const [childrens, setChildrens] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://hn.algolia.com/api/v1/items/${objectID}`)
      .then((response) => {
        setHomeDetails(response.data);
        setChildrens(response.data.children);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }, [objectID]);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      <NavLink to="/" className="nav-link">
        <Button
          onClick={handleBack}
          style={{
            marginTop: "65px",
            marginLeft: "15px",
            display: "flex",
            alignItems: "center",
          }}
          variant="danger"
        >
          <BsArrowLeft className="mt-1" style={{ marginRight: "5px" }} />
          Back
        </Button>
      </NavLink>

      <Container className="mt-5">
        {isLoading && (
          <div className="d-flex justify-content-center vh-100">
            <Spinner text="Loading..." />
          </div>
        )}
        {
          <>
            
              <div className="w-75 rounded  mt-4">
                <p>Title : {homeDetails.title}</p>
                <p>Points :{homeDetails.points}</p>
                <p style={{ textAlign: "center" }}>
                  List of Some comments (<b>Children field</b>){" "}
                </p>
                <Table table table-stipend className="bg-dark">
                  <caption>Hello</caption>
                  <thead className="bg-dark" variant="dark">
                    <tr>
                      <th>ID</th>
                      <th>Author</th>
                      <th>Created_At</th>
                      <th>Created_At_id</th>
                    </tr>
                  </thead>

                  <tbody>
                    {childrens.map((item, i) => (
                      <tr key={i}>
                        <td>{item.id}</td>
                        <td>{item.author}</td>
                        <td>{item.created_at.slice(0, 10)}</td>
                        <td>{item.created_at_i}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            
          </>
        }
      </Container>
    </>
  );
}

export default HomeDetails;
