import KeyBoard from './keyboard';
import TextArea from './textArea';

const DEFAULT_LANG = 'eng';
const SECOND_LANG = 'rus';

class Controller {
  constructor(parrentsClass = 'body') {
    this.parrentsClass = parrentsClass;
    this.parrents = document.querySelector('body');
    this.shift = false;
    this.ctrl = false;
    this.win = false;
    // Events
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));
    // Caps Lock
    localStorage.setItem('capsLock', '0');
    localStorage.setItem('capsLockOff', '1');
    // Shift
    localStorage.setItem('shift', '0');
    this.shift = localStorage.getItem('shift');
    // Languege
    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang', DEFAULT_LANG);
    }
    this.lang = localStorage.getItem('lang');
    // Radio button for change languege-button
    localStorage.setItem('langOn', '0');
  }

  main() {
    // Title
    const title = document.createElement('h1');
    title.textContent = 'Virtual Keyboard';
    this.parrents.append(title);
    // Text Area
    const textArea = new TextArea();
    this.parrents.append(textArea.getField);
    // Keyboard
    const keyboard = new KeyBoard();
    this.parrents.append(keyboard.render());
    // Subtitle
    const subtitle = document.createElement('h2');
    subtitle.textContent = 'The keyboard was created in the operating system Windows 10.\nTo switch the language combination: "shift + alt" or "win + space"';
    this.parrents.append(subtitle);
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

    if (keyCode === 'CapsLock') {
      e.preventDefault();
      this.touchCapsLockDown();
    }

    // Change language
    if (e.altKey && e.shiftKey) {
      this.changeLangDown();
    }
    return this;
  }

  onKeyUp(e) {
    const keyCode = e.code;

    if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
      e.preventDefault();
      localStorage.setItem('shift', '1');
      this.shift = localStorage.getItem('shift');
    }

    if (keyCode === 'CapsLock') {
      e.preventDefault();
      this.touchCapsLockUp();
    }

    // Change language
    if (!e.altKey || !e.shiftKey) {
      this.changeLangUp();
    }

    return this;
  }

  changeLangDown() {
    const langOn = +localStorage.getItem('langOn');
    if (langOn === 0) {
      localStorage.setItem(
        'lang',
        localStorage.getItem('lang') === DEFAULT_LANG ? SECOND_LANG : DEFAULT_LANG,
      );
      localStorage.setItem('langOn', '1');
    }
    return this;
  }

  changeLangUp() {
    localStorage.setItem('langOn', '0');
    return this;
  }

  touchCapsLockDown() {
    const capsLock = +localStorage.getItem('capsLock');
    const capsLockOff = +localStorage.getItem('capsLockOff');
    if (capsLockOff === 1) {
      localStorage.setItem('capsLock', capsLock ? '0' : '1');
      localStorage.setItem('capsLockOff', '0');
    }
    return this;
  }

  touchCapsLockUp() {
    localStorage.setItem('capsLockOff', '1');
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
    field.value = leftStr + symbol + rightStr;
    field.setSelectionRange(startPos + 1, startPos + 1);
    return this;
  }

  changeLang() {
    return this;
  }
}

export default Controller;
