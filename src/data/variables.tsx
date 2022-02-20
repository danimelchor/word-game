import { KeyState } from "../components/KeyboardInterface";

export type STATE_TYPE = "pending" | "lost" | "won";

export const STATES: { [key: string]: STATE_TYPE } = {
  pending: "pending",
  lost: "lost",
  won: "won",
};

export const MESSAGES: { [key: string]: string } = {
  notInList: "That word is not in our list of available words!",
  alreadyUsed: "You already used that word!",
  length: "The word needs to be 5 letters long!",
};

export const COLORS = [
  "transparent",
  "transparent",
  "#787c7e",
  "#c9b458",
  "#6aaa64",
];
export const BORDER_COLORS = [
  "#d3d6da",
  "#878a8c",
  "#787c7e",
  "#c9b458",
  "#6aaa64",
];
export const TEXT_COLORS = ["#fff", "#fff", "#fff", "#fff", "#fff"];
export const KEYS = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "enter",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  "backspace",
];

export const ORGANIZED_KEYS: KeyState[] = [
  {
    q: 0,
    w: 0,
    e: 0,
    r: 0,
    t: 0,
    y: 0,
    u: 0,
    i: 0,
    o: 0,
    p: 0,
  },
  {
    a: 0,
    s: 0,
    d: 0,
    f: 0,
    g: 0,
    h: 0,
    j: 0,
    k: 0,
    l: 0,
  },
  {
    enter: 0,
    z: 0,
    x: 0,
    c: 0,
    v: 0,
    b: 0,
    n: 0,
    m: 0,
    backspace: 0,
  },
];

export const ICONS = ["⬛", "⬛", "⬛", "🟨", "🟩"];
