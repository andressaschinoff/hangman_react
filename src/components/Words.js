import React from "react";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";

export default function Word({ playerId, word }) {
  return (
    <Box className="container my-16">
      <Box className="container my-16">
        <InputLabel className="mb-4">Player {playerId} Word</InputLabel>
        {word.split("").map((letter, index) => {
          return (
            <TextField
              key={`${index}-${letter}`}
              style={{
                marginRight: "1.25rem",
                marginBottom: "1.25rem",
              }}
              className="w-16"
              id={`${index}-${letter}`}
              variant="outlined"
              value={letter}
              InputProps={{
                readOnly: true,
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}
