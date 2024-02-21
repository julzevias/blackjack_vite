import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

interface AddPlayers {
  startGame: (players: string[]) => void;
}

const AddPlayers = ({ startGame }: AddPlayers) => {
  const [players, setPlayers] = useState<string[]>([]);
  const [addPlayer, setAddPlayer] = useState<boolean>(false);

  const addNewPlayer = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputElement = e.currentTarget[0] as HTMLInputElement;
    const name = inputElement.value;

    if (name.toLowerCase() === "dealer") {
      toast.error("Invalid name. Please choose another name");
      return;
    } else if (players.includes(name)) {
      toast.error("Player already exists");
      return;
    } else if (players.length === 7) {
      toast.error("Max 7 players allowed");
      return;
    }

    if (name !== "") {
      setPlayers([...players, name]);
      inputElement.value = "";
      setAddPlayer(false);
    }
  };

  const onSubmitPlayers = () => {
    if (players.length < 1) {
      toast.error("Need at least 1 player to start the game");
      return;
    }
    startGame(players);
  };

  const onChangePlayerName = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newPlayers = [...players];
    const newName = e.target.value;
    if (newName.toLowerCase() === "dealer") {
      toast.error("Invalid name. Please choose another name");
      e.target.value = "";
      return;
    } else if (players.includes(newName)) {
      toast.error("Player already exists");
      e.target.value = "";
      return;
    }

    newPlayers[index] = e.target.value;
    setPlayers(newPlayers);
  };

  const onRemovePlayer = (player: string) => {
    const newPlayers = players.filter((p) => p !== player);
    setPlayers(newPlayers);
    setPlayers(newPlayers);
  };

  return (
    <>
      <h2 className="text-center text-secondary p-5">
        BlackJack - Local Multiplayer
      </h2>
      <div className="d-flex align-items-start mt-lg-5">
        <div className="d-flex flex-column w-100">
          <div className="border shadow-lg rounded p-4 p-lg-5">
            <div className="text-center mb-2 mb-lg-4">
              <h3 className="text-secondary">Players</h3>
            </div>
            <div className="d-flex flex-column">
              <h5 className="text-light">Enter players below </h5>
              <p className="text-light">
                Min number of players: <span className="text-info">1</span>. Max
                number of players: <span className="text-info">7</span>
              </p>
              {Array.from({ length: Math.max(3, players.length) }).map(
                (_, index) => {
                  return (
                    <div key={index} className="d-flex align-items-center">
                      <div className="flex-grow-1">
                        <label htmlFor="playerName" className="text-secondary">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control  shadow mb-3"
                          placeholder="Player Name ..."
                          value={players[index] || ""}
                          onChange={(e) => onChangePlayerName(e, index)}
                        />
                      </div>
                      {players[index] && (
                        <button
                          onClick={() => onRemovePlayer(players[index])}
                          className="btn text-danger m-2"
                        >
                          <strong className="m-0" aria-label="Remove Name">
                            X
                          </strong>
                        </button>
                      )}
                    </div>
                  );
                }
              )}
            </div>

            {players.length < 7 ? (
              <div className="text-secondary mb-2">
                <button
                  type="button"
                  className="square-btn btn btn-info btn-block shadow border border-dark mx-auto p-0"
                  onClick={() => {
                    setAddPlayer(!addPlayer);
                  }}
                >
                  <img
                    src={`${addPlayer === true ? "/minus.png" : "/plus.png"}`}
                    className="img-fluid"
                  />
                </button>
              </div>
            ) : null}

            <form
              className={`${
                addPlayer === false ? "d-none" : ""
              } mt-lg-4 mt-md-2 mx-auto`}
              onSubmit={addNewPlayer}
            >
              <div className="form-group">
                <label htmlFor="playerName" className="text-light">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control shadow"
                  id="playerName"
                  placeholder="Player Name ..."
                />
              </div>
              <button
                type="submit"
                className="btn btn-secondary btn-block shadow border border-dark mt-3 mx-auto"
                aria-label="Submit Player Name"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-danger shadow border border-dark align-items-start flex-1 m-4 p-2 m-lg-4 p-lg-3"
              onClick={onSubmitPlayers}
            >
              <h4 className="m-0">Start Game</h4>
            </button>
          </div>
        </div>

        <div className="d-none d-sm-block p-2 p-lg-5">
          <div className="d-flex justify-content-center align-items-end">
            <img
              src="/chips-and-blackjack.png"
              className="img-fluid opacity-50"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPlayers;
