import axios from "axios";

async function createPlayers(number) {
  const persons = [];
  for (let index = 0; index < number; index++) {
    const word = await getAWord();
    console.log(word);
    const hiddedWord = hiddenWord(word);
    const person = { id: index, score: 0, word, hiddedWord };
    persons.push(person);
  }
  return persons;
}

function hiddenWord(word) {
  let hiddedWord = "";
  for (let i = 0; i < word.length; i++) {
    hiddedWord = hiddedWord + "*";
  }
  return hiddedWord;
}

function guessLetter(letter, person) {
  const word = person.word;
  const hiddedWord = person.hiddedWord;
  let newWord = "";
  let rights = 0;
  for (let i = 0; i < word.length; i++) {
    const currentLetter = word[i];
    const isRight = currentLetter === letter;
    if (isRight) {
      rights++;
      newWord = newWord + letter;
      person.score++;
    } else {
      newWord = newWord + hiddedWord[i];
    }
  }
  if (rights === 0) {
    person.score--;
  }
  person.hiddedWord = newWord;
  console.log(person);
  return person;
}

async function getAWord() {
  const response = await axios.get(
    "https://random-word-api.herokuapp.com/word?number=1"
  );
  return response.data[0];
}

export { createPlayers, guessLetter };
