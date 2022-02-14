import React from 'react';

const ChatMessage = ({ round, player, whichPlayer }) => {
  return (
    <div className='bubbleWrapper'>
      <div className={`inlineContainer ${whichPlayer}`}>
        <img className="inlineIcon" src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png" />
        <div className={`${whichPlayer}Bubble ${whichPlayer}`}>{round[player]}</div>
      </div>{' '}
      <span className={whichPlayer}>11:28 AM</span>
    </div>
  );
};

export default ChatMessage;
