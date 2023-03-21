function Options({ handleChange, word }) {
  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  const handleChangeLocal = (ev) => {
    handleChange(ev.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="title" htmlFor="word">
        Escribe aquí la palabra que hay que adivinar:
      </label>
      <input
        autoFocus
        autoComplete="off"
        className="form__input"
        maxLength="15"
        type="text"
        id="word"
        name="word"
        onChange={handleChangeLocal}
        value= {word}
      />
    </form>
  );
}

export default Options;
