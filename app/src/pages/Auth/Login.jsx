import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  FormControl,
  Button,
} from "react-bootstrap";
import authService from "../../services/auth";

import image from "../../Assets/login-image.svg";
import toast from "react-hot-toast";

const FormEntries = {
  email: "",
  password: "",
};

const Login = () => {
  const [credentials, setCredentials] = useState(FormEntries);
  const [onCardFocus, setOnCardFocus] = useState(false);

  const handleChange = (key, value) =>
    setCredentials({ ...credentials, [key]: value });

  const handleLogin = async (e) => {
    e.preventDefault();

    const tLoading = toast.loading("Validating...");
    const results = await authService.LogIn(credentials);

    if (!results.status) {
      return toast.error(results.statusText, { id: tLoading });
    }

    toast.success("Welcome!", { id: tLoading });
    navigate("/");
  };

  return (
    <Container fluid className="d-flex align-items-center h-100">
      <Col className="mx-auto" xl="4">
        <h1 className="text-center">Welcome back</h1>
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
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <FormControl
                      placeholder="Email"
                      type="email"
                      onChange={(e) => handleChange("email", e.target.value)}
                      value={credentials.email}
                    />
                  </div>
                  <div className="mb-3">
                    <FormControl
                      placeholder="Password"
                      type="password"
                      onChange={(e) => handleChange("password", e.target.value)}
                      value={credentials.password}
                    />
                  </div>

                  <div className="d-flex justify-content-center">
                    <Button
                      type="submit"
                      variant="outline-primary"
                      className="rounded-0 shadow"
                      size="lg"
                    >
                      Log in
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

export default Login;
