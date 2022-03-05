import Board from './game/board';

const emojis = "🦖🦕🐝🐒🐙🦑🐳🐬🐊🦏🐪🦒🦘🐏🐿🦔🦦🦙🦚🦜🦥🐁🐀🦧🦍🐘🐋🦀🦞🦐🦂🦗🐞🐌🦋🐛🐥";
const rows = 3;
const cols = 4;

const root = document.getElementById('app');

const board = new Board({ emojis, rows, cols, root });
