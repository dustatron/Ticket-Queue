import * as actions from './../../actions';
describe('help queue actions', () => {
  it('deleteTicket should create DELETE_TICKET action', () => {
    expect(actions.deleteTicket(1)).toEqual({
      type: 'DELETE_TICKET',
      id: 1
    });
  });

  it('updateTime should create UPDATE_TIME action', () => {
    expect(actions.updateTime(1, 'A few seconds')).toEqual({
      type: 'UPDATE_TIME',
      id: 1,
      formattedWaitTime: 'A few seconds'
    });
  });
});
