import React from "react";
import PropTypes from "prop-types";

function Ticket(props) {
  const name = "Thato";
  const name2 = "Haley";

  return (
    <React.Fragment>
      <h3>
        {props.location} - {props.names}
      </h3>
      <p>
        <em>{props.issue}</em>
      </p>
    </React.Fragment>
  );
}

Ticket.propTypes = {
  names: PropTypes.string,
  location: PropTypes.string,
  issue: PropTypes.string
};

export default Ticket;
