import Input from './Inputs/Inputs';

const Player = ({ player, playerHandler }) => {
  return (
    <div className='container container-out player'>
      {player?.currentSong && <h1>{player.currentSong.name}</h1>}
      <Input player={player} player={player} playerHandler={playerHandler} />
    </div>
  );
};

export default Player;
