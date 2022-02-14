import { Fragment, useState } from 'react';
// styling credit: https://github.com/thefaiz/react-dialog/blob/master/src/components/Dialog.js
let dialogStyles = {
  width: '500px',
  maxWidth: '100%',
  margin: '0 auto',
  position: 'fixed',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%,-50%)',
  zIndex: '999',
  backgroundColor: '#eee',
  padding: '10px 20px 40px',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
};

let dialogCloseButtonStyles = {
  marginBottom: '15px',
  padding: '3px 8px',
  cursor: 'pointer',
  borderRadius: '50%',
  border: 'none',
  width: '30px',
  height: '30px',
  fontWeight: 'bold',
  alignSelf: 'flex-end',
};

const GameOverDialog = () => {
  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => {
    setIsOpen(false);
  };

  const dialog = (
    <div style={dialogStyles}>
      <button style={dialogCloseButtonStyles} onClick={onClose}>
        x
      </button>
      <div>You won!!!!</div>
    </div>
  );

  return <Fragment>{isOpen && dialog}</Fragment>;
};

export default GameOverDialog;
