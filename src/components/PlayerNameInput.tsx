import { FormEvent, useState } from "react";

interface AddPlayers {
  addPlayers: (players: string[]) => void;
}

const AddPlayers = ({ addPlayers }: AddPlayers) => {
  const [players, setPlayers] = useState<string[]>([
    "jon",
    "julie",
    "titan",
    "jane",
  ]);
  const [addPlayer, setAddPlayer] = useState(false);

  const addNewPlayer = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setAddPlayer(false);

    if ((e.currentTarget[0] as HTMLInputElement).value !== "dealer") {
      const name = (e.currentTarget[0] as HTMLInputElement).value;

      if (name !== "") {
        setPlayers([...players, name]);
      }
      (e.currentTarget[0] as HTMLInputElement).value = "";
    }
  };

  const onSubmitPlayers = () => {
    if (players.length < 1) {
      return <div>Need at least 1 player to start the game</div>;
    } else if (players.length > 7) {
      return <div>Too many players</div>;
    } else {
      addPlayers(players);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center m-3">
      <div className="text-center mb-4">
        <h4 className="text-secondary">All players</h4>
      </div>
      <div className="d-flex flex-column align-items-center">
        {players.map((player) => {
          return (
            <h6 key={player} className="text-info">
              {player}
            </h6>
          );
        })}
      </div>
      <div className="">
        <div className="d-flex justify-content-center text-secondary">
          <button
            type="button"
            className="btn btn-outline-secondary btn-block"
            onClick={() => {
              setAddPlayer(true);
            }}
          >
            Add Player
          </button>
        </div>

        <div className={addPlayer === false ? "d-none" : ""}>
          <form
            className="d-flex flex-column align-items-center"
            onSubmit={addNewPlayer}
          >
            <div className="form-group p-2">
              <label htmlFor="playerName" className="text-secondary">
                First name
              </label>
              <input
                type="text"
                className="form-control"
                id="playerName"
                placeholder="John"
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline-secondary btn-block"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-outline-secondary btn-block mx-auto col-1 m-5"
        onClick={onSubmitPlayers}
      >
        Start Game
      </button>
    </div>
  );
};

export default AddPlayers;
