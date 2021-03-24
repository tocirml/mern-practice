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
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

const RegisterModal = ({ register, error, clearErrors, isAuthenticated }) => {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (error.id === 'REGISTER_FAIL') {
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
    const { name, email, password } = user;

    //Create user obj
    const newUser = {
      name,
      email,
      password,
    };

    //Attemp to register
    register(newUser);
  };

  return (
    <>
      <NavLink onClick={toggle} href="#">
        Register
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {msg && <Alert color="danger">{msg}</Alert>}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="mb-3"
                onChange={onChange}
              ></Input>

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
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

RegisterModal.propType = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(
  RegisterModal
);
