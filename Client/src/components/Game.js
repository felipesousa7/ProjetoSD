import React, { useContext } from 'react';
import PlayerList from './PlayerList';
import Chat from './Chat';
import Rooms from './Rooms';
import Forca from './Forca';

import { GameContext, sendMessage} from '../contexts/GameContext'

const Game = () => { 
  const { isConnected, players, messages, match} = useContext(GameContext)

  return (
    <>
      {!isConnected && 
        <div>Desconectado, Aguarde Conexão...</div>
      }
      {match.status && <Forca />}
      {!match.status && 
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <div className='list-container'>
            <span><Rooms /></span>
            <PlayerList players={players} />
          </div>
          <Chat sendMessage={sendMessage} messages={messages} />
        </div>
      }

    </>
  );
}

export default Game;