import React from 'react';

const PlayerList = (props) => {

  return (
    <div>
    <div style={{paddingBottom: 15, fontWeight: 'bold', fontSize: 20}}>
      Jogadores Conectados:
    </div>
      {Object.keys(props.players)
        .map((key) => (
          <div key={key} className="list-item">{props.players[key].name}</div>
        ))
      }
    </div>
  );
}

export default PlayerList;