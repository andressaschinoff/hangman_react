import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import Players from "../components/Players";
import Word from "../components/Words";

import { createPlayers, guessLetter } from "../functions/GameFunctions";

export default function Game() {
  const [players, setPlayers] = React.useState([]);
  const [letter, setLetter] = React.useState("");
  const [currentPlayer, setCurrentPlayer] = React.useState(0);
  const [numberOfPlayers, setNumberOfPlayers] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      const newPlayer = await createPlayers(numberOfPlayers);
      setPlayers(newPlayer);
    })();
  }, [numberOfPlayers]);

  const handleLetters = (event) => {
    setLetter(event.target.value[0]);
  };

  const handleGuess = () => {
    handleLetterGuessed(letter);
    setLetter("");
  };

  const handleLetterGuessed = (letter) => {
    let nextPlayer = currentPlayer + 1;
    if (nextPlayer > players.length - 1) {
      nextPlayer = 0;
    }
    const others = players.filter(({ id }) => id !== currentPlayer);
    const person = players.filter(({ id }) => id === currentPlayer)[0];

    const newPerson = guessLetter(letter, person);
    setPlayers([...others, newPerson]);
    setCurrentPlayer(nextPlayer);
  };

  return (
    <Box className="container w-3/5 mx-auto my-12">
      <Players setNumbers={(number) => setNumberOfPlayers(number)} />
      {players.length > 1 && (
        <Box className="my-12">
          <Typography variant="h5">Player {currentPlayer + 1} Round</Typography>
        </Box>
      )}
      {players.length > 0 && (
        <Box>
          <Box className="container my-16">
            <InputLabel className="mb-4">Guess a Letter</InputLabel>
            <Box className="flex items-stretch space-x-12">
              <TextField
                id="outlined-players"
                fullWidth
                label="Letter"
                type="text"
                value={letter}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={handleLetters}
              />
              <Button
                variant="contained"
                className="ring-transparent"
                color="primary"
                onClick={handleGuess}
              >
                Guess!
              </Button>
            </Box>
          </Box>
          {players
            .sort((a, b) => a.id - b.id)
            .map(({ hiddedWord, id, score }) => {
              return (
                <Box key={id}>
                  <Word word={hiddedWord} playerId={id + 1} />
                  <Typography>
                    <b>Player {id + 1} Score: </b> {score}
                  </Typography>
                </Box>
              );
            })}
        </Box>
      )}
    </Box>
  );
}
