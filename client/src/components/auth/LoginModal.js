import { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

const LoginModal = ({ login, error, clearErrors, isAuthenticated }) => {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (error.id === 'LOGIN_FAIL') {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }

    //if authenticated, close modal
    if (modal) {
      if (isAuthenticated) {
        toggle();
      }
    }
  }, [isAuthenticated, error.id, error.msg.msg]);

  const toggle = () => {
    // Clear Errors
    clearErrors();
    setModal(!modal);
  };

  const onChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = event => {
    event.preventDefault();

    const { email, password } = user;

    const loginUser = {
      email,
      password,
    };

    //Attemp to login
    login(loginUser);
  };

  return (
    <>
      <NavLink onClick={toggle} href="#">
        Login
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {msg && <Alert color="danger">{msg}</Alert>}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                className="mb-3"
                placeholder="Email"
                onChange={onChange}
              ></Input>

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                className="mb-3"
                placeholder="Password"
                onChange={onChange}
              ></Input>

              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

LoginModal.propType = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
