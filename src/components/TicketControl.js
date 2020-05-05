import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import PropTypes from 'prop-types';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import { connect } from 'react-redux';

import * as a from './../actions';
import { withFirestore, isLoaded } from 'react-redux-firebase';

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
    const { dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action);
    this.setState({ selectedTicket: null });
  };
  handleEditClick = () => {
    console.log('handleEditClick reached!');
    this.setState({ editing: true });
  };

  handleEditingTicketInList = () => {
    this.setState({
      editing: false,
      selectedTicket: null
    });
  };

  handleDeletingTicket = (id) => {
    this.props.firestore.delete({ collection: 'tickets', doc: id });
    this.setState({ selectedTicket: null });
  };

  handleChangingSelectedTicket = (id) => {
    this.props.firestore.get({ collection: 'tickets', doc: id }).then((ticket) => {
      const firestoreTicket = {
        names: ticket.get('names'),
        location: ticket.get('location'),
        issue: ticket.get('issue'),
        id: ticket.id
      };
      this.setState({ selectedTicket: firestoreTicket });
    });
  };
  handleAddingNewTicketToList = () => {
    const { dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action);
  };

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() => this.updateTicketElapsedWaitTime(), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime = () => {
    console.log('update time');
    // const { dispatch } = this.props;

    // Object.values(this.props.masterTicketList).forEach((ticket) => {
    //   const newFormattedWaitTime = ticket.timeOpen.fromNow(true);
    //   const action = a.updateTime(ticket.id, newFormattedWaitTime);
    //   dispatch(action);
    // });
  };
  render() {
    const auth = this.props.firebase.auth();
    if (!isLoaded(auth)) {
      return (
        <React.Fragment>
          <h1>Loading...</h1>
        </React.Fragment>
      );
    }
    if (isLoaded(auth) && auth.currentUser === null) {
      return (
        <React.Fragment>
          <h1>You must be signed in to access the queue.</h1>
        </React.Fragment>
      );
    }
    if (isLoaded(auth) && auth.currentUser != null) {
      let currentlyVisibleState = null;
      let buttonText = null;

      if (this.state.editing) {
        currentlyVisibleState = (
          <EditTicketForm ticket={this.state.selectedTicket} onEditTicket={this.handleEditingTicketInList} />
        );
        buttonText = 'Return to Ticket List';
      } else if (this.state.selectedTicket != null) {
        currentlyVisibleState = (
          <TicketDetail
            ticket={this.state.selectedTicket}
            onClickingDelete={this.handleDeletingTicket}
            onClickingEdit={this.handleEditClick}
          />
        );
        buttonText = 'Return to Ticket List';
      } else if (this.props.formVisibleOnPage) {
        currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />;
        buttonText = 'Return to Ticket List';
      } else {
        currentlyVisibleState = (
          <TicketList ticketList={this.props.masterTicketList} onTicketSelection={this.handleChangingSelectedTicket} />
        );
        // Because a user will actually be clicking on the ticket in the Ticket component, we will need to pass our new handleChangingSelectedTicket method as a prop.
        buttonText = 'Add Ticket';
      }
      return (
        <React.Fragment>
          {currentlyVisibleState}
          <button onClick={this.handleClick}>{buttonText}</button>
        </React.Fragment>
      );
    }
  }
}

// render() {
//

// Add propTypes for ticketList.
TicketControl.propTypes = {
  masterTicketList: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    formVisibleOnPage: state.formVisibleOnPage
  };
};

// Note: we are now passing mapStateToProps into the connect() function.
TicketControl = connect(mapStateToProps)(TicketControl);

export default withFirestore(TicketControl);
