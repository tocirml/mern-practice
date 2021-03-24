import { Fragment } from 'react';
import { logout } from '../../actions/authActions';
import { connect } from 'react-redux';
import { NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

const Logout = ({ logout }) => {
  return (
    <>
      <Fragment>
        <NavLink onClick={logout} href="#">
          Logout
        </NavLink>
      </Fragment>
    </>
  );
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Logout);
