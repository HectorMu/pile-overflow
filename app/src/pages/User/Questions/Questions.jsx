import { useState, useEffect } from "react";
import questionsService from "../services/user.service";
import { Container, Col, Card, Badge, Button } from "react-bootstrap";
import useRouterHooks from "@/hooks/useRouterHooks";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const { navigate } = useRouterHooks();

  const handleDelete = async (question) => {
    const results = await questionsService.deleteQuestion(question.id);
    if (!results.status) {
      return toast.error("Something went wrong");
    }
    toast.success(results.statusText);
    getQuestionsHandler();
  };

  const getQuestionsHandler = async () => {
    const fetchedQuestions = await questionsService.getAllUserQuestions();
    setQuestions(fetchedQuestions);
  };

  const redirectToQuestionDetails = ({ id, question }) => {
    navigate(`/question/${id}/${question}`);
  };

  useEffect(() => {
    getQuestionsHandler();
  }, []);
  return (
    <Container fluid>
      <Col className="mx-auto mt-5" lg="8">
        <h5 className="text-center fw-bold text-white fs-1">
          All my questions
        </h5>
        {questions.length > 0 ? (
          questions.map((question) => (
            <Card
              key={question.id + question.question}
              className="rounded-0 shadow-lg mb-3"
            >
              <Card.Body>
                <Card.Title>
                  <div className="d-flex justify-content-between">
                    <h5>
                      <Link
                        className="link-primary"
                        to={`/question/${question.id}/${question.question}`}
                      >
                        {question.question}
                      </Link>
                    </h5>
                    <Button
                      onClick={() => handleDelete(question)}
                      size="sm"
                      variant="outline-danger"
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Title>
                <p>{question.description}</p>
                {question?.tags.map((tag) => (
                  <Badge key={tag.id} className="fw-light fs-6 me-2">
                    {tag.description}
                  </Badge>
                ))}
              </Card.Body>
            </Card>
          ))
        ) : (
          <h5 className="text-center text-white">
            You dont have questions yet
          </h5>
        )}
      </Col>
    </Container>
  );
};

export default Questions;
