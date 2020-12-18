import React, { useContext }  from 'react'
import { GameContext, createRoom, leaveRoom, joinRoom } from '../contexts/GameContext'

const Rooms = () => {
  const { player, rooms, room } = useContext(GameContext)
  return (
    <div style={{marginBottom: '20px'}}>
      {!player.room &&
      <div>
        <button onClick={createRoom}>Criar Sala</button>
        {Object.keys(rooms).map((key) => 
          <div key={`room_${key}`} className='list-item'>
            {rooms[key].name}
            <button onClick={() => joinRoom(key)} disabled={rooms[key].player1 && rooms[key].player2}>Entrar</button>
          </div>
        )}
      </div>
      }
      {
        player.room && room &&
        <div>
          {
          rooms[player.room] && rooms[player.room].player1 && rooms[player.room].player2 ?
            <button>INICIAR JOGO</button>
            :
            <div className="list-item">
            <span>{room.name}</span>
            <button onClick={leaveRoom}>Sair da sala</button>
            </div>
          }
      </div>
      }
</div>
  )
}

export default Rooms;
