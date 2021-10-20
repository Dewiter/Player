export const playerController = (state, action) => {
  const init = () => {
    state.audio.volume = state.volume;
    return {
      ...state,
      currentSong: action.payload,
      queue: [...state.queue, action.payload],
    };
  };

  const updateQueue = () => {
    const queue = [...state.queue, action.payload];
    return {
      ...state,
      queue: queue,
    };
  };

  const play = () => {
    state.audio.src = state.currentSong.stream;
    state.audio.currentTime = state.currentTime;
    state.audio.play();
    return { ...state, isPlaying: true };
  };

  const pause = () => {
    state.audio.pause();
    return {
      ...state,
      currentTime: state.audio.currentTime,
      isPlaying: false,
    };
  };

  const nextSong = () => {
    state.audio.currentTime = 0;
    state.audio.pause();

    if (state.currentSong.index + 1 < state.queue.length) {
      state.audio.src = state.queue[state.currentSong.index + 1].stream;
      state.audio.play();
      return {
        ...state,
        currentSong: state.queue[state.currentSong.index + 1],
      };
    } else {
      state.audio.src = state.queue[0].stream;
      state.audio.play();
      return {
        ...state,
        currentSong: state.queue[0],
        isPlaying: false,
      };
    }
  };

  const prevSong = () => {
    state.audio.currentTime = 0;
    state.audio.pause();
    if (state.audio.currentTime <= 5 || state.currentSong === 0) {
      state.audio.src = state.queue[0].audio;
      state.audio.play();
      return {
        ...state,
        currentSong: state.queue[0],
      };
    } else {
      state.audio.src = state.queue[state.currentSong.index - 1].stream;
      state.audio.play();
      return {
        ...state,
        currentSong: state.queue[state.currentSong.index - 1],
        isPlaying: false,
      };
    }
  };

  const changeSong = () => {
    state.audio.currentTime = 0;
    state.audio.pause();
    state.audio.play();
    return {
      ...state,
      currentSong: action.payload,
      isPlaying: false,
    };
  };

  const setVolume = () => {
    state.audio.volume = parseFloat(action.payload);
    return { ...state };
  };

  const stateMachine = [
    { type: 'INIT', func: init },
    { type: 'UPDATE', func: updateQueue },
    { type: 'PLAY', func: play },
    { type: 'PAUSE', func: pause },
    { type: 'NEXT', func: nextSong },
    { type: 'PREV', func: prevSong },
    { type: 'VOLUME', func: setVolume },
    { type: 'CHANGE', func: changeSong },
  ];

  const stateMachineValue = stateMachine.map((value) => {
    if (value.type === action.type) {
      return value.func();
    }
  });

  if (stateMachineValue) {
    return stateMachineValue.filter((value) => value !== undefined)[0];
  }
  throw new Error('no matching states found');
};
