import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserCard = () => {
  return (
    <Card className="rounded-0 shadow-lg">
      <Card.Body>
        <h5 className="text-center">¿Do you have a question?</h5>
        <div className="d-flex justify-content-center">
          <Link to={"/newquestion"} className="btn btn-primary">
            New question
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
