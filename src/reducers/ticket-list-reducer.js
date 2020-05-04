import * as c from './../actions/ActionTypes';

export default (state = {}, action) => {
  const { names, id, formattedWaitTime } = action;

  switch (action.type) {
    case c.DELTE_TICKET:
      const newState = { ...state };
      delete newState[id];
      return newState;

    case c.UPDATE_TIME:
      const newTicket = Object.assign({}, state[id], { formattedWaitTime });
      const updatedState = Object.assign({}, state, {
        [id]: newTicket
      });
      return updatedState;
    default:
      return state;
  }
};
