import { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';

const ItemModal = ({ addItem, isAuthenticated }) => {
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState({ name: '' });

  const toggle = () => {
    setModal(!modal);
  };

  const onChange = event => {
    setItem({
      ...item,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = event => {
    event.preventDefault();
    const newItem = {
      // id: uuidv4(),
      name: item.name,
    };

    //Add item via addItem action
    addItem(newItem);
    setItem({
      name: '',
    });
    toggle();
  };

  return (
    <>
      {isAuthenticated ? (
        <Button color="dark" style={{ marginBottom: '2rem' }} onClick={toggle}>
          Add Item
        </Button>
      ) : (
        <h4 className="mb-3 ml-4">Please login to manage items</h4>
      )}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add to Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping item"
                onChange={onChange}
              ></Input>
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

ItemModal.propType = {
  addItem: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  items: state.items,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addItem })(ItemModal);
