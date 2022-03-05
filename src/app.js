import Board from './game/board';
import animals from './game/cards/animals';

const cards = animals;
const rows = 3;
const cols = 4;

const root = document.getElementById('app');

const board = new Board({ cards, rows, cols, root });
