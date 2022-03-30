import { useEffect, useState, useCallback } from "react";
import answersService from "../../services/answers.service";
import useRouterHooks from "@/hooks/useRouterHooks";
import { Button, Card, Col, FormControl, Row } from "react-bootstrap";

const Answers = () => {
  const [answers, setAnswers] = useState([]);
  const { params } = useRouterHooks();

  const getAnswersHandler = useCallback(async () => {
    const fetchedAnswers = await answersService.getQuestionAnswers(params.id);

    setAnswers(fetchedAnswers);
  }, [params.id]);
  const checkIfAlreadyVoted = async () => {
    //To do, check if user as already voted the answer
    return false;
  };

  const checkifItsCurrentUserQuestion = useCallback(() => {
    //to do, check if current question is from the same user logged
  }, [params.id]);

  useEffect(() => {
    getAnswersHandler();
  }, [getAnswersHandler]);

  console.log(answers);
  if (!answers.length > 0) {
    return (
      <div className="mt-5">
        <Row>
          <Col xl="12">
            <h3 className="text-center">No answers yet</h3>
          </Col>
        </Row>
      </div>
    );
  }
  return (
    <div className="mt-5">
      <h3>
        {answers.length} {answers.length > 1 ? "Answers" : "Answer"}
      </h3>
      {answers.map((answer) => (
        <Card key={answer.id} className="shadow border-0">
          <Card.Body>
            <Row>
              <Col xl="2">
                <div className="d-flex flex-column align-items-center justify-content-between gap-3">
                  <button className="btn border-1 border-light shadow">
                    <i
                      className={`fas fa-thumbs-up fa-3x text-${
                        checkIfAlreadyVoted() ? "primary" : "muted"
                      }`}
                    ></i>
                  </button>

                  <p>
                    <span className="text-primary fw-bold">{answer.votes}</span>{" "}
                    Votes
                  </p>
                </div>
              </Col>
              <Col xl="10" xxl="10">
                <div className="d-flex align-items-center h-100">
                  {answer.answer}
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Answers;
