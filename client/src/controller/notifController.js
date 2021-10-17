export const notifController = (state, action) => {
  const addSong = () => {
    return {
      notifState: true,
      notifContent: 'Song was added',
      notifType: 'success',
    };
  };

  const closeNotif = () => {
    return { ...state, notifState: false };
  };

  const emptyInput = () => {
    return {
      notifState: true,
      notifContent: 'Please enter a link a in the input',
      notifType: 'fail',
    };
  };

  const badLink = () => {
    return {
      notifState: true,
      notifContent: 'Could not find song',
      notifType: 'fail',
    };
  };

  const stateMachine = [
    { type: 'ADD_SONG', func: addSong },
    { type: 'CLOSE_NOTIF', func: closeNotif },
    { type: 'EMPTTY_INPUT', func: emptyInput },
    { type: 'BAD_LINK', func: badLink },
  ];

  const stateMachineValue = stateMachine.map((value) => {
    if (value.type === action.type) {
      return value.func();
    }
  });

  if (stateMachineValue) {
    return stateMachineValue.filter((value) => value !== undefined)[0];
  }
  throw new Error('no matching states');
};
