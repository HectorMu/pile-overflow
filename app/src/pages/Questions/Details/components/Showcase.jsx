import { useState, useEffect, useCallback } from "react";
import questionsService from "../../services/questions.service";
import useRouterHooks from "@/hooks/useRouterHooks";
import useSession from "@/hooks/useSession";
import toast from "react-hot-toast";
import {
  Badge,
  Button,
  FormControl,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

const Entries = {
  question: "",
  description: "",
};

const Showcase = () => {
  const [question, setQuestion] = useState(Entries);
  const [searchTags, setSearchTags] = useState("");
  const [tags, setTags] = useState([]);
  const [questionTags, setQuestionTags] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const { navigate, params } = useRouterHooks();
  const [onEditing, setOnEditing] = useState(false);
  const { user } = useSession();

  const handleChange = (key, value) =>
    setQuestion({ ...question, [key]: value });

  const getQuestionHandler = useCallback(async () => {
    const fetchedQuestion = await questionsService.getQuestionByID(params.id);
    if (!fetchedQuestion.id) {
      navigate(-1);
      toast.error("This question doesnt exists anymore");
      return;
    }
    setQuestion(fetchedQuestion);
  }, [params.id]);

  const handleResolved = async () => {
    const result = await questionsService.markAsResolved(params.id);
    if (!result.status) {
      return toast.error("Something went wrong");
    }
    toast.success(result.statusText);
    getQuestionHandler();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tagsAdapted = questionTags.map(({ id }) => id);

    const questionWithTags = {
      ...question,
      tags: tagsAdapted,
    };
    const results = await questionsService.updateQuestion(
      questionWithTags,
      params.id
    );
    if (!results.status) {
      return toast.error(results.statusText);
    }
    toast.success("Answer edited");
    getQuestionHandler();
    setOnEditing(false);
  };
  const isOwnerHandler = useCallback(async () => {
    if (user === null) return;
    const result = await questionsService.checkOwnership(params.id);
    if (result.isOwner) {
      setIsOwner(true);
    }
  }, [params.id]);

  const getTagsHandler = async () => {
    if (user === null) return;
    const fetchedTags = await questionsService.getTags();
    setTags(fetchedTags);
  };

  const setQuestionTagsHandler = (tag) => {
    setQuestionTags((old) => [...old, tag]);
  };

  const removeQuestionTag = (tag) => {
    setQuestionTags(questionTags.filter((element) => element.id !== tag.id));
  };

  const setQuestionTagsOnLoad = useCallback(() => {
    setQuestionTags([]);
    const currentQuestionTags = question.tags;

    currentQuestionTags?.map((tag) =>
      setQuestionTags((old) => [
        ...old,
        { id: tag.fk_tag, description: tag.description },
      ])
    );
  }, [question.tags]);

  const cancelEditHandler = () => {
    if (onEditing) {
      getQuestionHandler();
      setQuestionTags([]);
    }
    setOnEditing(!onEditing);
  };

  useEffect(() => {
    setQuestionTagsOnLoad();
  }, [setQuestionTagsOnLoad]);
  useEffect(() => {
    getQuestionHandler();
    getTagsHandler();
    isOwnerHandler();
    setQuestionTagsOnLoad();
  }, [getQuestionHandler, isOwnerHandler]);

  return (
    <div className="border-bottom border-3 border-dark py-3">
      [{question.status}]
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between align-items-center gap-5">
          {onEditing ? (
            <div className="d-flex w-100 align-items-center justify-content-center">
              <FormControl
                size="lg"
                placeholder="Changes..."
                onChange={(e) => handleChange("question", e.target.value)}
                value={question?.question}
              />
            </div>
          ) : (
            <h3>{question?.question}</h3>
          )}

          {isOwner ? (
            <div className="d-flex gap-1">
              {onEditing && (
                <Button
                  size="sm"
                  type="submit"
                  variant="outline-primary rounded-0"
                >
                  Save changes
                </Button>
              )}
              <Button
                onClick={cancelEditHandler}
                size="sm"
                variant="outline-dark rounded-0"
              >
                {onEditing ? "Cancel edit" : "Edit"}
              </Button>
              {!onEditing && (
                <>
                  <Button
                    onClick={handleResolved}
                    size="sm"
                    variant="outline-success rounded-0"
                  >
                    {question.status === "Resolved"
                      ? "Mark as unsolved"
                      : "Mark as resolved"}
                  </Button>
                </>
              )}
            </div>
          ) : null}
        </div>
      </form>
      <p>Problem description:</p>
      <div className="d-flex justify-content-end gap-2 align-items-end">
        {questionTags.map((tag) => (
          <p key={tag.fk_tag + tag.description}>
            <Badge
              onClick={onEditing ? () => removeQuestionTag(tag) : null}
              className="fw-light"
              style={onEditing ? { cursor: "pointer" } : null}
            >
              {tag.description}{" "}
              {onEditing && <i className="fas fa-times fa-xs"></i>}
            </Badge>
          </p>
        ))}
      </div>
      {onEditing ? (
        <>
          <div className="mb-3">
            <FormControl
              size="lg"
              as="textarea"
              placeholder="Changes..."
              value={question?.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows="5"
            />
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
        </>
      ) : (
        <h5>{question?.description}</h5>
      )}
    </div>
  );
};

export default Showcase;
