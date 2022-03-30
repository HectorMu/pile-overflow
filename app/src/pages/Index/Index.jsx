import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Badge, Button } from "react-bootstrap";
import questionsService from "../Questions/services/questions.service";
import useRouterHooks from "@/hooks/useRouterHooks";
import { Link } from "react-router-dom";
import UserCard from "./components/UserCard";
import NoUserCard from "./components/NoUserCard";
import useSession from "@/hooks/useSession";

const Index = () => {
  const [questions, setQuestions] = useState([]);
  const { navigate } = useRouterHooks();
  const { user } = useSession();

  const getQuestionsHandler = async () => {
    const fetchedQuestions = await questionsService.getAllQuestions();
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
      <Row className="mt-5">
        <Col lg="2" className="me-auto">
          {user === null ? <NoUserCard questions={questions} /> : <UserCard />}
        </Col>
        <Col lg="8" className="me-auto">
          <h3 className="fw-bold text-start text-white">Recent questions</h3>
          {questions.map((question) => (
            <Card
              key={question.id + question.question}
              onClick={() => redirectToQuestionDetails(question)}
              style={{ cursor: "pointer" }}
              className="rounded-0 shadow-lg mb-3"
            >
              <Card.Body>
                <Card.Title>{question.question}</Card.Title>
                <p>{question.description}</p>
                {question?.tags.map((tag) => (
                  <Badge key={tag.id} className="fw-light fs-6 me-2">
                    {tag.description}
                  </Badge>
                ))}
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Index;
