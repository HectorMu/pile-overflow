import { useState, useEffect, useCallback } from "react";
import questionsService from "../../services/questions.service";
import useRouterHooks from "@/hooks/useRouterHooks";
import toast from "react-hot-toast";
import { Badge, Button } from "react-bootstrap";

const Showcase = () => {
  const [question, setQuestion] = useState({});
  const { navigate, params } = useRouterHooks();

  const getQuestionHandler = useCallback(async () => {
    const fetchedQuestion = await questionsService.getQuestionByID(params.id);
    if (!fetchedQuestion.id) {
      navigate(-1);
      toast.error("This question doesnt exists anymore");
      return;
    }
    setQuestion(fetchedQuestion);
  }, [params.id]);

  useEffect(() => {
    getQuestionHandler();
  }, [getQuestionHandler]);

  console.log(question);
  return (
    <div className="border-bottom border-3 border-dark py-3">
      <div className="d-flex justify-content-between align-items-center">
        <h3>{question?.question}</h3>
        <div className="d-flex gap-1">
          <Button size="sm" variant="outline-danger">
            Delete
          </Button>
          <Button size="sm" variant="outline-dark">
            Edit
          </Button>
        </div>
      </div>

      <p>Problem description:</p>
      <h5>{question?.description}</h5>

      <div className="d-flex justify-content-end gap-2 align-items-end">
        {question.tags &&
          question.tags.map((tag) => (
            <p key={tag.id + tag.description}>
              <Badge className="fw-light">{tag.description}</Badge>
            </p>
          ))}
      </div>
    </div>
  );
};

export default Showcase;
