export const controller = (state, action) => {
  switch (action.type) {
    case 'ADD_SONG':
      const queue = [...state.queue, action.payload];
      return {
        ...state,
        queue: queue,
        modalState: true,
        modalContent: 'Song was added',
        modalType: 'success',
      };
    case 'CLOSE_MODAL':
      return { ...state, modalState: false };
    case 'EMPTY_INPUT':
      return {
        ...state,
        modalState: true,
        modalContent: 'Please enter a link a in the input',
        modalType: 'fail',
      };
    case 'BAD_LINK':
      return {
        ...state,
        modalState: true,
        modalContent: 'Could not find song',
        modalType: 'fail',
      };
    default:
      throw new Error('no matching states');
  }
};
