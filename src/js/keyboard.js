import ARRAY_KEYS from './data';
import Key from './key';
import TextArea from './textArea';

const ROWS = 15;
const COLS = 150;
const DEFAULT_LANG = 'eng';

class KeyBoard {
  constructor(data = ARRAY_KEYS) {
    this.data = data;
    this.textArea = new TextArea('field', COLS, ROWS);

    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang', DEFAULT_LANG);
    }
    this.lang = localStorage.getItem('lang');
  }

  createKeys() {
    const keys = document.createElement('div');
    keys.classList.add('keyboard');
    for (let i = 0; i < this.data.length; i += 1) {
      const keyboardLine = document.createElement('div');
      keyboardLine.classList.add('keyboard__line');
      for (let k = 0; k < this.data[i].length; k += 1) {
        const keyData = this.data[i][k];
        const key = new Key(keyData);
        keyboardLine.append(key.render());
      }
      keys.append(keyboardLine);
    }
    return keys;
  }

  render() {
    return this.createKeys();
  }
}

export default KeyBoard;
