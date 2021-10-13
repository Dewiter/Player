import React from 'react';

export const inputController = (state, action) => {
  switch (action.type) {
    case 'PLAY':
      return {
        ...state,
        isPlaying: true,
        currentTime: action.payload,
      };
    case 'PAUSE':
      return {
        ...state,
        isPlaying: false,
        currentTime: action.payload,
      };
    default:
      throw new Error('no matching states');
  }
};
