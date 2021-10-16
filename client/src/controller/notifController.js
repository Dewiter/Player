export const notifController = (state, action) => {
  switch (action.type) {
    case 'ADD_SONG':
      return {
        notifState: true,
        notifContent: 'Song was added',
        notifType: 'success',
      };
    case 'CLOSE_MODAL':
      return { ...state, notifState: false };
    case 'EMPTY_INPUT':
      return {
        notifState: true,
        notifContent: 'Please enter a link a in the input',
        notifType: 'fail',
      };
    case 'BAD_LINK':
      return {
        notifState: true,
        notifContent: 'Could not find song',
        notifType: 'fail',
      };
    default:
      throw new Error('no matching states');
  }
};
