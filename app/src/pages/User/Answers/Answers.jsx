import { useState, useEffect } from "react";
import userService from "../services/user.service";
import { Container, Col, Card, Badge, Button } from "react-bootstrap";
import useRouterHooks from "@/hooks/useRouterHooks";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Answers = () => {
  const [answers, setAnswers] = useState([]);

  const handleDelete = async ({ id }) => {
    const results = await userService.deleteAnswer(id);
    if (!results.status) {
      return toast.error("Something went wrong");
    }
    toast.success("Answer removed");
    getAnswersHandler();
  };

  const getAnswersHandler = async () => {
    const fetchedAnswers = await userService.getAllUserAnswers();
    setAnswers(fetchedAnswers);
  };

  useEffect(() => {
    getAnswersHandler();
  }, []);

  console.log(answers);
  return (
    <Container fluid>
      <Col className="mx-auto mt-5" lg="8">
        <h5 className="text-center fw-bold text-white fs-1">All my answers</h5>
        {answers.length > 0 ? (
          answers.map((answer) => (
            <Card key={answer.id} className="rounded-0 shadow-lg mb-3">
              <Card.Body>
                <Card.Title>
                  <div className="d-flex justify-content-between">
                    <h5>Answer: {answer.answer}</h5>
                    <Button
                      onClick={() => handleDelete(answer)}
                      size="sm"
                      variant="outline-danger"
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Title>
                <p>
                  Responding to:{" "}
                  <Link
                    to={`/question/${answer.fk_question}/${answer.question}`}
                    className="link-primary"
                  >
                    {answer.question}
                  </Link>
                </p>
              </Card.Body>
            </Card>
          ))
        ) : (
          <h5 className="text-center text-white">You dont have answers yet</h5>
        )}
      </Col>
    </Container>
  );
};

export default Answers;
