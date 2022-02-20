// INTERFACES AND TYPES
export type KeyboardEvent = {
  keyCode: number;
  key: string;
};

export type KeyState = {
  [letter: string]: number;
};
