import { KeyState } from "../components/KeyboardInterface";
import { KEYS, ORGANIZED_KEYS } from "../data/variables";

export const getDaysFrom = () => {
  let current = new Date().getTime();
  let previous = new Date("Sun, 07 Feb 2022 00:00:00 GMT-0500").getTime();
  return Math.floor((current - previous) / 86400000);
};

export const getTimeUntil = () => {
  let c = new Date();

  let seconds = c.getSeconds();
  let minutes = c.getMinutes();
  let hours = c.getHours();

  let totalSeconds = seconds + 60 * minutes + 3600 * hours;

  let remainingSeconds = 24 * 60 * 60 - totalSeconds;

  let remainingHours = Math.floor(remainingSeconds / 3600);
  remainingSeconds -= remainingHours * 3600;

  let remainingMinutes = Math.floor(remainingSeconds / 60);
  remainingSeconds -= remainingMinutes * 60;

  return [remainingHours, remainingMinutes, remainingSeconds];
};

const getFreq = (word: string): { [letter: string]: number } => {
  // Counts letter freq in a word
  let freq: { [letter: string]: number } = {};

  for (let i = 0; i < word.length; i++) {
    var c = word.charAt(i);
    if (freq[c]) {
      freq[c]++;
    } else {
      freq[c] = 1;
    }
  }

  return freq;
};

export const getHints = (guess: string, correct: string): Array<number> => {
  let result = [2, 2, 2, 2, 2];
  let freq = getFreq(correct);

  // First get correct letters
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === correct[i]) {
      result[i] = 4;
      freq[guess[i]]--;
    }
  }

  // Then get correct letters in wrong positions
  for (let i = 0; i < guess.length; i++) {
    if (freq[guess[i]] && freq[guess[i]] > 0 && result[i] != 4) {
      result[i] = 3;
      freq[guess[i]]--;
    }
  }

  return result;
};

export const getHintsKeyboard = (correctWord: string, triedWords: string[]) => {
  let newKeys: string[] = KEYS;
  let newKeysState: KeyState = {};

  for (const l of newKeys) newKeysState[l] = 1;

  for (const w of triedWords) {
    let wColors = getHints(w, correctWord);

    for (let idx = 0; idx < w.length; idx++) {
      newKeysState[w[idx]] = Math.max(wColors[idx], newKeysState[w[idx]]);
    }
  }

  let organizedKeyboard: KeyState[] = ORGANIZED_KEYS;
  for (const row in organizedKeyboard)
    for (const l of Object.keys(organizedKeyboard[row]))
      organizedKeyboard[row][l] = newKeysState[l];

  return organizedKeyboard;
};
