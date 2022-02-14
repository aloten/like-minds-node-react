const PlayerForm = ({onSubmitPlayer}) => {
  return (
    <div className='playerFormContainer'>
      <form onSubmit={onSubmitPlayer}>
        <input type='text' placeholder='username' name='player' />
        <button className='btn submit-player-btn' type='submit'>Join lobby</button>
      </form>
    </div>
  );
};

export default PlayerForm;
