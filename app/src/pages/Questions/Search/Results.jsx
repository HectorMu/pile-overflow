import { useState, useEffect, useCallback } from "react";
import { Card, Col, Container, Badge, Button } from "react-bootstrap";
import useRouterHooks from "../../../hooks/useRouterHooks";
import questionsService from "../services/questions.service";
import { Link } from "react-router-dom";

const Results = () => {
  const { params, navigate } = useRouterHooks();
  const [results, setResults] = useState([]);

  const handleSelection = (question) => {
    navigate(`/question/${question.id}/${question.question}`);
  };

  const getResultsHandler = useCallback(async () => {
    const fetchedResults = await questionsService.searchQuestion(params.term);
    setResults(fetchedResults);
  }, [params.term]);

  useEffect(() => {
    getResultsHandler();
  }, [getResultsHandler]);

  return (
    <Container fluid className="mt-5">
      <div className="d-flex justify-content-evenly h-100 align-items-center">
        <h3 className="text-center fw-bold text-white">
          Results for: "{params.term}"
        </h3>
        <Button
          as={Link}
          to="/newanswer"
          className="rounded-0 shadow"
          variant="primary"
        >
          New answer
        </Button>
      </div>

      <Col xl="8" className="mx-auto mt-3">
        {results.map((result, i) => (
          <Card
            key={i + result.question}
            className="rounded-0 shadow mb-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleSelection(result)}
          >
            <Card.Body>
              [{result.status}] <h5>{result.question}</h5>
              <p>-{result.description}</p>
            </Card.Body>
            <div className="d-flex justify-content-end align-items-center pe-2 gap-2">
              {result.tags.map((tag) => (
                <h5 key={i + tag.description}>
                  <Badge className="rounded fw-light">{tag.description}</Badge>
                </h5>
              ))}
            </div>
          </Card>
        ))}
      </Col>
    </Container>
  );
};

export default Results;
