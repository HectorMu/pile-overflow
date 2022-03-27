import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  FormControl,
  Button,
} from "react-bootstrap";
import toast from "react-hot-toast";
import useRouterHooks from "../../../hooks/useRouterHooks";

import image from "./assets/signup-image.svg";
import authService from "../services/auth";

const FormEntries = {
  username: "",
  fullname: "",
  email: "",
  password: "",
  confirm: "",
};

const Signup = () => {
  const [onCardFocus, setOnCardFocus] = useState(false);
  const [userData, setUserData] = useState(FormEntries);
  const { navigate } = useRouterHooks();

  const handleChange = (key, value) =>
    setUserData({ ...userData, [key]: value });

  const handleSignup = async (e) => {
    e.preventDefault();

    const tLoading = toast.loading("Creating account..");
    const results = await authService.SignUp(userData);

    if (!results.status) {
      return toast.error(results.statusText, { id: tLoading });
    }
    toast.success("Account created, log in to continue", { id: tLoading });
    navigate("/login");
  };

  return (
    <Container fluid className="d-flex align-items-center h-100">
      <Col className="mx-auto" xl="4">
        <h1 className="text-center">Welcome</h1>
        <h3 className="text-center">
          Create an account to start making questions
        </h3>
        <Card
          onMouseEnter={() => setOnCardFocus(true)}
          onMouseLeave={() => setOnCardFocus(false)}
          className={`rounded-0  border-0 shadow  ${
            onCardFocus ? "shadow-lg" : ""
          }`}
        >
          <Card.Body>
            <Row>
              <Col xl="12" xxl="12">
                <img src={image} className="w-100" />{" "}
              </Col>
              <Col xl="12" xxl="12 mt-5">
                <form onSubmit={handleSignup}>
                  <Row>
                    <Col>
                      <div className="mb-3">
                        <FormControl
                          placeholder="Username"
                          onChange={(e) =>
                            handleChange("username", e.target.value)
                          }
                          value={userData.username}
                        />
                      </div>
                    </Col>
                    <Col>
                      <div className="mb-3">
                        <FormControl
                          placeholder="Fullname"
                          onChange={(e) =>
                            handleChange("fullname", e.target.value)
                          }
                          value={userData.fullname}
                        />
                      </div>
                    </Col>
                  </Row>

                  <div className="mb-3">
                    <FormControl
                      placeholder="Email"
                      type="email"
                      onChange={(e) => handleChange("email", e.target.value)}
                      value={userData.email}
                    />
                  </div>
                  <Row>
                    <Col>
                      <div className="mb-3">
                        <FormControl
                          placeholder="Password"
                          type="password"
                          onChange={(e) =>
                            handleChange("password", e.target.value)
                          }
                          value={userData.password}
                        />
                      </div>
                    </Col>
                    <Col>
                      <div className="mb-3">
                        <FormControl
                          placeholder="Confirm"
                          type="password"
                          onChange={(e) =>
                            handleChange("confirm", e.target.value)
                          }
                          value={userData.confirm}
                        />
                      </div>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-center">
                    <Button
                      type="submit"
                      variant="outline-primary"
                      className="rounded-0 shadow"
                      size="lg"
                    >
                      Sign me up
                    </Button>
                  </div>
                </form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
};

export default Signup;
