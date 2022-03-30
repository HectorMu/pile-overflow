import { useState, useEffect } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  FormControl,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import toast from "react-hot-toast";
import useRouterHooks from "@/hooks/useRouterHooks";
import questionsService from "../services/questions.service";

const FormEntries = {
  question: "",
  description: "",
};

const Add = () => {
  const [question, setQuestion] = useState(FormEntries);
  const [questionTags, setQuestionTags] = useState([]);
  const { navigate } = useRouterHooks();
  const [tags, setTags] = useState([]);
  const [searchTags, setSearchTags] = useState("");

  const setQuestionTagsHandler = (tag) => {
    setQuestionTags((old) => [...old, tag]);
  };

  const removeQuestionTag = (tag) => {
    setQuestionTags(questionTags.filter((element) => element.id !== tag.id));
  };
  const handleChange = (key, value) =>
    setQuestion({ ...question, [key]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tagsAdapted = questionTags.map(({ id }) => id);

    const questionWithTags = {
      ...question,
      tags: tagsAdapted,
    };

    const results = await questionsService.createQuestion(questionWithTags);
    if (!results.status) {
      return toast.error(results.statusText);
    }
    navigate("/");
    toast.success("Question published!, wait for help! ");
  };

  const getTagsHandler = async () => {
    const fetchedTags = await questionsService.getTags();
    setTags(fetchedTags);
  };

  useEffect(() => {
    getTagsHandler();
  }, []);

  return (
    <Container fluid>
      <Col className="mx-auto" xxl="10">
        <Card className="rounded-0 shadow mt-5">
          <Card.Body>
            <Card.Title>
              <h4>Make a question</h4>
            </Card.Title>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <FormControl
                  placeholder="Your question..."
                  onChange={(e) => handleChange("question", e.target.value)}
                  value={question.question}
                />
              </div>

              <div className="mb-3">
                <FormControl
                  as={"textarea"}
                  rows="8"
                  placeholder="Describe your problem..."
                  onChange={(e) => handleChange("description", e.target.value)}
                  value={question.description}
                />
              </div>
              <div className="mb-3">
                {questionTags.length > 0 && <h6>Added tags:</h6>}
                <div className="d-flex justify-content-start gap-2">
                  {questionTags.map((qtag) => (
                    <h5>
                      <Badge
                        onClick={() => removeQuestionTag(qtag)}
                        className="fw-light"
                        style={{ cursor: "pointer" }}
                      >
                        {qtag.description}{" "}
                        <i className="fas fa-times fa-xs"></i>
                      </Badge>
                    </h5>
                  ))}
                </div>
              </div>
              <div className="mb-3">
                <div className="position-relative">
                  <FormControl
                    placeholder="Search tags..."
                    onChange={(e) => setSearchTags(e.target.value)}
                  />

                  <ListGroup
                    className="position-absolute w-100"
                    style={{
                      overflowY: "scroll",
                    }}
                  >
                    {searchTags !== "" &&
                      tags
                        .filter((e) =>
                          e.description
                            .toLowerCase()
                            .includes(searchTags.toLowerCase())
                        )
                        .map((e) => (
                          <ListGroupItem
                            style={{ cursor: "pointer" }}
                            onClick={() => setQuestionTagsHandler(e)}
                          >
                            {e.description}
                          </ListGroupItem>
                        ))}
                  </ListGroup>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <Button
                  type="submit"
                  variant="outline-primary rounded-0 btn-lg"
                >
                  Publish
                </Button>
              </div>
            </form>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
};

export default Add;
