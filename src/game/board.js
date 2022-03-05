import chunk from '../lib/chunk';
import shuffle from '../lib/shuffle';

export default class {
  constructor({ root, emojis, rows, cols }) {
    this.root = root;
    this.checking = false;
    this.count = Math.floor(rows * cols / 2);
    this.guesses = [];
    const cards = shuffle([...emojis]).slice(0, this.count);
    this.board = this.createBoard({ cards, rows, cols });

    this.render();
    this.attachHandlers();
  }

  createBoard({ cards, rows, cols }) {
    let allCards = shuffle([...cards, ...cards]);
    return chunk(allCards, cols);
  }

  template() {
    return `
      <div class="board">
        ${
          this.board.map((row, i) =>
            `
              <div class="row">
                ${
                  row.map((item, j) =>
                    `<div class="card" data-row="${i}" data-col="${j}">${ item }</div>`
                  ).join(``)
                }
              </div>
            `
          ).join(``)
        }
      </div>
    `;
  }

  render() {
    this.root.innerHTML = this.template();
  }

  makeGuess({ row, col }) {
    this.guesses.push({ row, col });
    this.checkGuesses();
    this.showCard({ row, col });
  }

  checkGuesses() {
    const [thisGuess] = this.guesses.slice(-1);
    this.showCard(thisGuess);
    if (this.guesses.length % 2 === 1) {
      return;
    } else {
      const [lastGuess] = this.guesses.slice(-2, -1);
      if (this.board[thisGuess.row][thisGuess.col] === this.board[lastGuess.row][lastGuess.col]) {
        return;
      } else {
        this.checking = true;
        this.shakeCard(thisGuess);
        setTimeout(() => {
          this.removeShakeCard(thisGuess);
          this.hideCard(thisGuess);
          this.hideCard(lastGuess);
          this.checking = false;
        }, 2000);
      }
    }
  }

  getCard({ row, col }) {
    return this.root.querySelectorAll('.board .row')[row].querySelectorAll('.card')[col];
  }

  showCard({ row, col }) {
    this.getCard({ row, col }).classList.add('visible');
  }

  hideCard({ row, col }) {
    this.getCard({ row, col }).classList.remove('visible');
  }

  shakeCard({ row, col }) {
    this.getCard({ row, col }).classList.add('wrong');
  }

  removeShakeCard({ row, col }) {
    this.getCard({ row, col }).classList.remove('wrong');
  }

  attachHandlers() {
    this.root.addEventListener('click', (e) => {
      if(!this.checking && !e.target.classList.contains('visible')) {
        this.makeGuess({
          row: e.target.dataset.row,
          col: e.target.dataset.col
        });
      }
    });
  }
}
