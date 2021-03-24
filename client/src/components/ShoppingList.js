import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

const ShoppingList = ({ items, getItems, deleteItem, isAuthenticated }) => {
  useEffect(() => {
    getItems();
  }, []);

  const onDeleteClick = id => {
    deleteItem(id);
  };

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ _id, name }) => {
            return (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {isAuthenticated && (
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={() => onDeleteClick(_id)}
                    >
                      &times;
                    </Button>
                  )}
                  {name}
                </ListGroupItem>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

ShoppingList.propTypes = {
  items: PropTypes.array.isRequired,
  getItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  items: state.items,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
