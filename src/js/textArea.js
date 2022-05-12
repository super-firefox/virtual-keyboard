class TextArea {
  constructor(className, cols = 150, rows = 15) {
    this.className = className;
    this.cols = cols;
    this.rows = rows;
    this.range = 0;
    this.field = this.createField();
    this.field.addEventListener('blur', () => this.field.focus());
  }

  get getRange() {
    return this.range;
  }

  set setRange(pos) {
    this.range += pos;
  }

  createField() {
    const field = document.createElement('textarea');
    field.classList.add('field');
    field.setAttribute('rows', this.rows);
    field.setAttribute('cols', this.cols);
    field.setAttribute('value', '');
    field.setAttribute('autofocus', true);
    return field;
  }

  get getField() {
    return this.field;
  }
}

export default TextArea;
