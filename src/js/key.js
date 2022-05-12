class Key {
  constructor(keyData) {
    this.keyData = keyData;
    this.btn = document.createElement('div');
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('mousedown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));
    window.addEventListener('mouseup', this.onKeyUp.bind(this));
  }

  static getCode(e) {
    if (e.code) {
      return e.code;
    }

    if (e.target.closest('div[data-name]')) {
      return e.target.closest('div[data-name]').dataset.name;
    }
    return null;
  }

  onKeyDown(e) {
    const keyCode = this.constructor.getCode(e);
    if (!keyCode) {
      return this;
    }

    if (keyCode !== 'ArrowUp' && keyCode !== 'ArrowDown') {
      e.preventDefault();
    }

    if (keyCode === this.keyData.className) {
      this.btn.classList.add('key_active');
    }

    if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
      this.updataKeyShift();
    }

    if (keyCode === 'CapsLock') {
      this.updataKeyCaps();
    }
    return this;
  }

  onKeyUp(e) {
    const keyCode = this.constructor.getCode(e);
    if (!keyCode) {
      return this;
    }

    if (keyCode !== 'ArrowUp' && keyCode !== 'ArrowDown') {
      e.preventDefault();
    }

    if (keyCode === this.keyData.className && keyCode !== 'CapsLock') {
      this.btn.classList.remove('key_active');
    }

    if (keyCode === 'CapsLock' && !(+localStorage.getItem('capsLock'))) {
      this.btn.classList.remove('key_active');
    }

    if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
      this.updataKeyShiftUp();
    }
    return this;
  }

  updataKeyShiftUp() {
    const isCaps = localStorage.getItem('capsLock') === '1';
    this.btn.setAttribute(
      'data-symbol',
      isCaps ? this.getLetter().caseUp : this.getLetter().caseDown,
    );
    if (this.getStatusKey()) {
      this.btn.querySelector('.caseUp').textContent = isCaps ? this.getLetter().caseDown : this.getLetter().caseUp;
      this.btn.querySelector('.caseDown').textContent = isCaps ? this.getLetter().caseUp : this.getLetter().caseDown;
    } else {
      this.btn.querySelector('.caseDown').textContent = isCaps ? this.getLetter().caseUp : this.getLetter().caseDown;
    }
    return this;
  }

  updataKeyShift() {
    const isCaps = localStorage.getItem('capsLock') === '1';
    this.btn.setAttribute(
      'data-symbol',
      !isCaps ? this.getLetter().caseUp : this.getLetter().caseDown,
    );
    if (this.getStatusKey()) {
      this.btn.querySelector('.caseUp').textContent = !isCaps ? this.getLetter().caseDown : this.getLetter().caseUp;
      this.btn.querySelector('.caseDown').textContent = !isCaps ? this.getLetter().caseUp : this.getLetter().caseDown;
    } else {
      this.btn.querySelector('.caseDown').textContent = !isCaps ? this.getLetter().caseUp : this.getLetter().caseDown;
    }
    return this;
  }

  updataKeyCaps() {
    const isCaps = localStorage.getItem('capsLock') === '1';
    this.btn.setAttribute(
      'data-symbol',
      isCaps ? this.getLetter().caseUp : this.getLetter().caseDown,
    );
    if (this.getStatusKey()) {
      this.btn.querySelector('.caseUp').textContent = !isCaps ? this.getLetter().caseUp : this.getLetter().caseDown;
      this.btn.querySelector('.caseDown').textContent = !isCaps ? this.getLetter().caseDown : this.getLetter().caseUp;
    } else {
      this.btn.querySelector('.caseDown').textContent = !isCaps ? this.getLetter().caseDown : this.getLetter().caseUp;
    }
    return this;
  }

  getLetter() {
    if (localStorage.getItem('lang') === 'eng') {
      return this.keyData.eng;
    }
    return this.keyData.rus;
  }

  // return html element(key)
  render() {
    this.btn.classList.add('key', this.keyData.className);
    this.btn.setAttribute('data-name', this.keyData.className);
    this.btn.setAttribute('data-symbol', this.getLetter().caseDown);
    if (this.getStatusKey()) {
      this.btn.innerHTML = `
      <span class="caseUp">${this.getLetter().caseUp}</span>
      <span class="caseDown">${this.getLetter().caseDown}</span>`;
    } else {
      this.btn.innerHTML = `
      <span class="caseUp"></span>
      <span class="caseDown">${this.getLetter().caseDown}</span>`;
    }
    return this.btn;
  }

  // return true if key is number or special symbol or letter
  getStatusKeyPlus() {
    const letterReg = /Key\w/i;
    const name = this.keyData.className;
    if (name.match(letterReg)
      || this.getStatusKey()
    ) {
      return true;
    }
    return false;
  }

  // return true if key is number or special symbol
  getStatusKey() {
    const digitReg = /Digit\d/i;
    const name = this.keyData.className;
    if (
      name.match(digitReg)
      || name.match(/Minus/)
      || name.match(/Equal/)
      || name.match(/Backslash/)
      || name.match(/Backquote/)
      || name.match(/Slash/)
    ) {
      return true;
    }
    return false;
  }
}

export default Key;
