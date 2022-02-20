import React, { FocusEvent, ReactElement, useEffect, useState } from "react";
import Word from "./Word";

import { WORD_LIST, AVAILABLE_WORDS } from "../data/words";
import { getDaysFrom, getHints } from "../functions";
import { MESSAGES, STATES, STATE_TYPE } from "../data/variables";
import Banner from "./Banner";
import Keyboard from "./Keyboard";
import { KeyboardEvent } from "./KeyboardInterface";

// TOAST NOTIFICATIONS
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// COMPONENT
export default function Board() {
  const [words, setWords] = useState<ReactElement[]>([]);

  // Current game state: won, lost, pending...
  const [gameState, setGameState] = useState<STATE_TYPE>(STATES.pending);

  // Color hints
  const [colorList, setColorsList] = useState<number[][]>([]);

  // Current word being typed
  const [currentWordIdx, setCurrentWordIdx] = useState<number>(0);
  const [currentWord, setCurrentWord] = useState<string>("");

  // Correct word to guess
  const [correctWord, setCorrectWord] = useState<string>("");

  // Words already guessed
  const [wordList, setWordList] = useState<string[]>([]);

  const loadFromPrevious = (correctWord: string) => {
    const lS: string | null = localStorage.getItem("gameState");

    if (lS !== null) {
      const [lastCorrectWord, prevGuesses]: [string, string[]] = JSON.parse(lS);

      if (lastCorrectWord === correctWord) {
        if (prevGuesses[prevGuesses.length - 1] === correctWord) {
          setGameState(STATES.won);
        } else if (prevGuesses.length === 6) {
          setGameState(STATES.lost);
        }

        let prevColors: number[][] = prevGuesses.map((guess) =>
          getHints(guess, correctWord)
        );

        setWordList(prevGuesses);
        setCurrentWordIdx(prevGuesses.length);
        setColorsList(prevColors);
        generateBoard(prevGuesses, prevColors);
        return;
      }
    }

    setWordList([]);
    setCurrentWordIdx(0);
    setColorsList([]);
    generateBoard([], []);
  };

  const storePrevious = (wordList: string[]) => {
    let toStore = JSON.stringify([correctWord, wordList]);
    localStorage.setItem("gameState", toStore);
  };

  const getCorrectWord = () => {
    let daysFrom: number = getDaysFrom();
    setCorrectWord(WORD_LIST[daysFrom + 3]);
    loadFromPrevious(WORD_LIST[daysFrom + 3]);
  };

  const generateBoard = (words: string[], colors: number[][]) => {
    let newWords: ReactElement[] = [];

    for (let i = 0; i < 6; i++) {
      let word: string = words[i] || "";
      let color: number[] = colors[i] || [];

      newWords.push(<Word word={word} colors={color} key={i} />);
    }

    setWords(newWords);
  };

  const _checkKeyDown = (e: React.KeyboardEvent | KeyboardEvent) => {
    const isPlaying = gameState === STATES.pending;
    const isLetter =
      e.keyCode >= 65 && e.keyCode <= 90 && currentWord.length < 5;
    const isEnter = e.keyCode == 13;
    const isBackspace = e.keyCode == 8 && currentWord.length > 0;

    if (isLetter && isPlaying) {
      let newWord = currentWord + e.key;
      setCurrentWord(newWord);
      generateBoard([...wordList, newWord], colorList);
    } else if (isEnter && isPlaying) {
      checkCorrectWord(currentWord);
    } else if (isBackspace && isPlaying) {
      let newWord = currentWord.substring(0, currentWord.length - 1);
      setCurrentWord(newWord);
      generateBoard([...wordList, newWord], colorList);
    }
  };

  const checkCorrectWord = (triedWord: string) => {
    if (triedWord.length != 5) {
      toast.error(MESSAGES.length);
    } else if (
      wordList.length < 6 &&
      (AVAILABLE_WORDS.includes(triedWord) || WORD_LIST.includes(triedWord)) &&
      !wordList.includes(triedWord)
    ) {
      let newColors = getHints(triedWord, correctWord);

      // If finished, terminate
      if (triedWord === correctWord) setGameState(STATES.won);
      else if (wordList.length === 5) setGameState(STATES.lost);

      const newWordList = [...wordList, triedWord];
      const newColorsList = [...colorList, newColors];

      setColorsList(newColorsList);
      setCurrentWordIdx(currentWordIdx + 1);
      storePrevious(newWordList);
      setCurrentWord("");
      setWordList(newWordList);
      generateBoard(newWordList, newColorsList);
    } else if (
      wordList.length < 6 &&
      !(AVAILABLE_WORDS.includes(triedWord) || WORD_LIST.includes(triedWord))
    ) {
      toast.error(MESSAGES.notInList);
    } else if (wordList.length < 6 && wordList.includes(triedWord)) {
      toast.error(MESSAGES.alreadyUsed);
    }
  };

  const handleKeepFocused = (e: FocusEvent<HTMLInputElement>) => {
    if (gameState === STATES.pending) e.target.focus();
  };

  useEffect(() => {
    getCorrectWord();
  }, []);

  return (
    <div id="board">
      <Banner state={gameState} colors={colorList} triedWords={wordList} />
      {window.innerWidth > 640 && (
        <input
          type="text"
          onKeyDown={_checkKeyDown}
          autoFocus
          style={{ width: 0, height: 0, opacity: 0 }}
          onBlur={handleKeepFocused}
        />
      )}
      <div className="wrapper">
        <div></div>
        <div className="words">{words}</div>
        <Keyboard
          checkKeyDown={_checkKeyDown}
          correctWord={correctWord}
          triedWords={wordList}
        />
      </div>
      <ToastContainer theme="dark" autoClose={1000} />
    </div>
  );
}
