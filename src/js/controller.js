import KeyBoard from './keyboard';
import TextArea from './textArea';

class Controller {
  constructor(parrentsClass = 'body') {
    this.parrentsClass = parrentsClass;
    this.parrents = document.querySelector('body');
    this.shift = false;
    this.ctrl = false;
    this.win = false;
    // Text Area
    this.textArea = new TextArea();
    this.parrents.append(this.textArea.getField);
    // Keyboard
    this.keyboard = new KeyBoard();
    this.parrents.append(this.keyboard.render());
    // Events
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));
    // Caps Lock
    localStorage.setItem('capsLock', '0');
    this.capsLock = localStorage.getItem('capsLock');

    localStorage.setItem('shift', '0');
    this.shift = localStorage.getItem('shift');
  }

  main() {
    return this;
  }

  onKeyDown(e) {
    const field = document.querySelector('.field');
    field.focus();
    const keyCode = e.code;
    if (keyCode === 'Backspace') {
      e.preventDefault();
      this.touchBackspace(e);
    }
    if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
      e.preventDefault();
      localStorage.setItem('shift', '0');
      this.shift = localStorage.getItem('shift');
    }

    if (keyCode === 'Tab') {
      e.preventDefault();
      this.touchTab();
    }

    if (keyCode === 'Delete') {
      e.preventDefault();
      this.touchDelete();
    }

    if (keyCode.match(/Enter/)) {
      e.preventDefault();
      this.touchEnter(e);
    }

    if (keyCode.match(/Digit\d/i)
      || keyCode.match(/Key\w/i)
      || keyCode.match(/Minus/)
      || keyCode.match(/Equal/)
      || keyCode.match(/Backslash/)
      || keyCode.match(/Backquote/)
      || keyCode.match(/Semicolon/)
      || keyCode.match(/Quote/)
      || keyCode.match(/Comma/)
      || keyCode.match(/Period/)
      || keyCode.match(/Slash/)
      || keyCode.match(/BracketLeft/)
      || keyCode.match(/BracketRight/)
    ) {
      e.preventDefault();
      this.touchSymbol(keyCode);
    }
    // if (e.code === 'AltRight') {
    //   e.preventDefault();
    // }
    return this;
  }

  onKeyUp(e) {
    const keyCode = e.code;

    if (keyCode === 'CapsLock') {
      e.preventDefault();
      this.touchCapsLock();
    }

    if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
      e.preventDefault();
      localStorage.setItem('shift', '1');
      this.shift = localStorage.getItem('shift');
    }

    return this;
  }

  touchCapsLock() {
    localStorage.setItem('capsLock', +this.capsLock ? '0' : '1');
    this.capsLock = localStorage.getItem('capsLock');
    return this;
  }

  touchTab() {
    const field = document.querySelector('.field');
    const startPos = field.selectionStart;
    const endPos = field.selectionEnd;
    const leftStr = `${field.value.slice(0, startPos)}`;
    const rightStr = `${field.value.slice(endPos)}`;
    const symbol = '\t';
    field.value = leftStr + symbol + rightStr;
    field.setSelectionRange(startPos + 1, startPos + 1);
    return this;
  }

  touchDelete() {
    const field = document.querySelector('.field');
    const startPos = field.selectionStart;
    const endPos = field.selectionEnd;
    const leftStr = `${field.value.slice(0, startPos)}`;
    const rightStr = endPos + 1 < field.value.length ? `${field.value.slice(endPos + 1)}` : '';
    field.value = leftStr + rightStr;
    field.setSelectionRange(startPos, startPos);
    return this;
  }

  touchBackspace() {
    const field = document.querySelector('.field');
    const startPos = field.selectionStart;
    const endPos = field.selectionEnd;
    let leftStr;
    let rightStr;
    console.log(startPos, endPos);
    if (startPos - endPos === 0) {
      leftStr = startPos - 1 >= 0 ? `${field.value.slice(0, startPos - 1)}` : '';
      rightStr = `${field.value.slice(endPos)}`;
      field.value = leftStr + rightStr;
      const newStartPos = startPos - 1 >= 0 ? startPos - 1 : 0;
      field.setSelectionRange(newStartPos, newStartPos);
    } else {
      leftStr = `${field.value.slice(0, startPos)}`;
      rightStr = `${field.value.slice(endPos)}`;
      field.value = leftStr + rightStr;
      const newStartPos = startPos;
      field.setSelectionRange(newStartPos, newStartPos);
    }
    return this;
  }

  touchEnter() {
    const field = document.querySelector('.field');
    field.value += '\n';
    return this;
  }

  touchSymbol(code) {
    const field = document.querySelector('.field');
    const startPos = field.selectionStart;
    const endPos = field.selectionEnd;
    const leftStr = `${field.value.slice(0, startPos)}`;
    const rightStr = `${field.value.slice(endPos)}`;
    const symbol = `${document.querySelector(`.${code}`).dataset.symbol}`;
    console.log(symbol);
    field.value = leftStr + symbol + rightStr;
    field.setSelectionRange(startPos + 1, startPos + 1);
    return this;
  }

  changeLang() {
    return this;
  }
}

export default Controller;
