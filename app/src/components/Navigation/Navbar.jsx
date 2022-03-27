import {
  Navbar,
  Container,
  Nav,
  Button,
  NavDropdown,
  NavLink,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import useSession from "../../hooks/useSession";
import { Link, useNavigate } from "react-router-dom";

const NavbarLayout = ({ setIsActive, isActive }) => {
  const { user, closeSession } = useSession();

  const navigate = useNavigate();

  const handleLogOut = () => {
    closeSession();
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="light" variant="light" className="shadow">
        <Container fluid>
          <Navbar.Brand as={Link} className="fw-bold shadow px-4" to={"/"}>
            PileOverflow
          </Navbar.Brand>

          <Nav className="mx-auto w-50">
            <InputGroup className="mb-3">
              <InputGroup.Text className="bg-dark border-0">
                <i className="fas fa-search text-white"></i>
              </InputGroup.Text>
              <FormControl
                placeholder="Search for answers..."
                aria-label="Username"
                className="rounded-0 border-0 shadow"
              />
            </InputGroup>
          </Nav>
          {user !== null ? (
            <>
              <Nav className="ms-auto ">
                <NavDropdown
                  className="shadow px-4 me-2"
                  title={
                    <span className="text-dark">
                      {user.username} <i className="fas fa-user"></i>
                    </span>
                  }
                  id="navbarScrollingDropdown"
                  align={"end"}
                >
                  <NavDropdown.Item href="#action4">
                    My profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogOut}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                <div className="d-flex align-items-center">
                  <Button
                    size="sm"
                    variant="outline-dark"
                    onClick={() => setIsActive(!isActive)}
                  >
                    <i className="fas fa-bars fa-xs"></i>
                  </Button>
                </div>
              </Nav>
            </>
          ) : (
            <Nav className="ms-auto">
              <NavLink as={Link} className={"shadow px-4"} to={"/login"}>
                Login
              </NavLink>
              <NavLink as={Link} className={"shadow px-4"} to={"/signup"}>
                Signup
              </NavLink>
            </Nav>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarLayout;
