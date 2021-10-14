import Player from './components/player/Player';
import Search from './components/player/Search';
import Playlist from './components/player/Playlist';

function App() {
  return (
    <>
      <div className='app-container'>
        <div className='media'>
          <Search />
          <Player />
        </div>
        <div className='playlist'>
          <Playlist />
        </div>
      </div>
    </>
  );
}

export default App;
