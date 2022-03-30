import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const NoUserCard = ({ questions }) => {
  return (
    <Card className="rounded-0 shadow-lg">
      <Card.Body>
        <h5 className="text-center">¿Do you have a question?</h5>
        <div className="d-flex justify-content-center">
          <Link to={"/login"} className="btn btn-primary">
            Log in, to search for help
          </Link>
        </div>
        <h5 className="text-center mt-5">
          We have about{" "}
          <span className="fw-bold text-primary fs-">{questions.length}</span>{" "}
          questions with answers to help devs to mitigate bugs and errors
        </h5>
        <div className="d-flex justify-content-center flex-column align-items-center shadow p-4 mt-5">
          <h5>Join to the community</h5>
          <Link to={"/signup"} className="btn btn-primary">
            Create an account
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default NoUserCard;
