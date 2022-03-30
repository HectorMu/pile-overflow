import { useCallback, useEffect, useState } from "react";
import { Row, Col, FormControl, Button } from "react-bootstrap";
import answersService from "../../services/answers.service";
import useRouterHooks from "@/hooks/useRouterHooks";
import toast from "react-hot-toast";
import useSession from "@/hooks/useSession";

const Entries = {
  answer: "",
};

const UserAnswer = () => {
  const [answer, setAnswer] = useState(Entries);
  const { user } = useSession();
  const [fetchedAnswer, setFetchedAnswer] = useState(Entries);
  const handleChange = (key, value) => setAnswer({ ...answer, [key]: value });
  const [onEditing, setOnEditing] = useState(false);
  const { params, navigate } = useRouterHooks();

  const getActualAnswer = useCallback(async () => {
    const fetchedAns = await answersService.getUserCurrentAnswerFromQuestion(
      params.id
    );

    if (!fetchedAns.id) return;

    setFetchedAnswer(fetchedAns);
    setAnswer(fetchedAns);
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user === null) {
      navigate("/login");
      toast("You need to log in to publish answers!");
    }
    const results = await answersService.saveAnswer(answer, params.id);
    if (!results.status) {
      return toast.error(results.statusText);
    }

    toast.success(results.statusText);
    getActualAnswer();
    setOnEditing(false);
  };
  const handleDelete = async () => {
    const results = await answersService.deleteAnswer(answer.id);
    if (!results.status) {
      return toast.error("Somethin went´t wrong");
    }

    getActualAnswer();
    setAnswer({});
  };

  useEffect(() => {
    getActualAnswer();
  }, [getActualAnswer]);

  console.log(fetchedAnswer);
  return (
    <div className="mt-4">
      {fetchedAnswer?.answer?.length > 0 ? (
        <Row>
          <Col xl="12">
            <h5>Your answer</h5>
          </Col>
          <Col xl="12">
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <FormControl
                  as={"textarea"}
                  onChange={(e) => handleChange("answer", e.target.value)}
                  placeholder="Your answer..."
                  disabled={!onEditing}
                  value={answer.answer}
                />
              </div>

              <div className="d-flex justify-content-start gap-2">
                {onEditing && (
                  <Button type="submit" variant="outline-primary rounded-0">
                    Save
                  </Button>
                )}
                <Button
                  onClick={() => setOnEditing(!onEditing)}
                  variant="outline-primary rounded-0"
                >
                  {onEditing ? "Cancel" : "Edit"}
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="outline-danger rounded-0"
                >
                  Delete
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col xl="12">
            <h5>Do you have a solution?, answer this question!</h5>
          </Col>
          <Col xl="12">
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <FormControl
                  as={"textarea"}
                  onChange={(e) => handleChange("answer", e.target.value)}
                  placeholder="Your answer..."
                  value={answer.answer}
                />
              </div>
              <Button type="submit" variant="outline-primary rounded-0">
                Submit
              </Button>
            </form>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default UserAnswer;
