import React from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import PropTypes from "prop-types";
import TicketDetail from "./TicketDetail";
import EditTicketForm from "./EditTicketForm";
import { connect } from "react-redux";
import * as a from './../actions';
import { act } from "react-dom/test-utils";

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // formVisibleOnPage: false,
      selectedTicket: null,
      editing: false
    };
  }
  
  handleClick = () => {
    const {dispatch} = this.props;
    const action = a.toggleForm();
    dispatch(action);
    this.setState({selectedTicket: null})
  };
  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({ editing: true });
  };

  handleEditingTicketInList = (ticketToEdit) => {
    const { dispatch } = this.props;
    const action = a.addTicket(ticketToEdit);
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    });
  };

  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    const action = a.deleteTicket(id);
    dispatch(action);
    this.setState({selectedTicket: null});
  };

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.masterTicketList[id];
    this.setState({ selectedTicket: selectedTicket });
  };

  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    const action = a.addTicket(newTicket);
    dispatch(action);
    const action2 = a.toggleForm();
    dispatch(action2);
  };

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.state.editing) {
      currentlyVisibleState = (
        <EditTicketForm ticket={this.state.selectedTicket} onEditTicket={this.handleEditingTicketInList} />
      );
      buttonText = "Return to Ticket List";
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = (
        <TicketDetail
          ticket={this.state.selectedTicket}
          onClickingDelete={this.handleDeletingTicket}
          onClickingEdit={this.handleEditClick}
        />
      );
      buttonText = "Return to Ticket List";
    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />;
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = (
        <TicketList ticketList={this.props.masterTicketList} onTicketSelection={this.handleChangingSelectedTicket} />
      );
      // Because a user will actually be clicking on the ticket in the Ticket component, we will need to pass our new handleChangingSelectedTicket method as a prop.
      buttonText = "Add Ticket";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

// Add propTypes for ticketList.
TicketControl.propTypes = {
  masterTicketList: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    masterTicketList: state.masterTicketList,
    formVisibleOnPage: state.formVisibleOnPage
  };
};

// Note: we are now passing mapStateToProps into the connect() function.

TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;
