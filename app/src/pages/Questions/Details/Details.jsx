import React from "react";
import { Card, Col } from "react-bootstrap";
import Answers from "./components/Answers";
import Showcase from "./components/Showcase";
import UserAnswer from "./components/UserAnswer";

const Details = () => {
  return (
    <div className="mt-5">
      <Col className="mx-auto" lg="8">
        <Card className="rounded-0 shadow-lg border-0">
          <Card.Body>
            <Showcase />
            <UserAnswer />
            <Answers />
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};

export default Details;
