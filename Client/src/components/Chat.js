import React, {useState} from 'react';

const Chat = (props) => {

const [messageToSend, setMessageToSend] = useState('')

const sendMessage = () => {
  props.sendMessage(messageToSend);
  setMessageToSend('');
}

  return (
    <div className='chat-container'>
      <div className='chat-content'>{props.messages.join('\n\n')}</div>
      <div className="chat-form">
        <input 
          type='text' 
          value={messageToSend} 
          onChange={(e) => setMessageToSend(e.target.value)}
        />
        <button 
        disabled={!messageToSend.trim()}
        className={!messageToSend.trim() && 'disabled'}
          onClick={sendMessage}>
            Enviar
        </button>
      </div>

    </div>
  );
}

export default Chat;