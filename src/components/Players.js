import React from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";

function Players({ setNumbers }) {
  const handleNumberOfPlayers = (event) => setNumbers(+event.target.value);

  return (
    <Box>
      <InputLabel className="mb-4">How many players?</InputLabel>
      <TextField
        id="outlined-players"
        fullWidth
        label="players"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{ inputProps: { min: 1, max: 4 } }}
        variant="outlined"
        onChange={handleNumberOfPlayers}
      />
    </Box>
  );
}

export default Players;
