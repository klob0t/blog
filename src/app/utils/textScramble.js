import '../utils/effects.css'

import React from 'react';

class TextScramble extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: [],
      counter: 0,
      phrases: [
        "Airlangga",
        "klob0t"
      ]
    };
    this.chars = "!<>-_\\/[]{}—=+*^?";
    this.queue = [];
    this.resolve = null;
  }

  componentDidMount() {
    this.updateText();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.counter !== this.state.counter) {
      this.updateText();
    }
  }

  updateText = () => {
    const newText = this.state.phrases[this.state.counter];
    const oldText = this.state.text.map(t => t.char);
    const length = Math.max(oldText.length, newText.length);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    this.frame = 0;
    this.update();
  }

  update = () => {
    let output = [];
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output.push({ char: to, dud: false });
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output.push({ char, dud: true });
      } else {
        output.push({ char: from, dud: false });
      }
    }
    this.setState({ text: output });
  if (complete === this.queue.length) {
    setTimeout(() => {
      this.setState({ counter: (this.state.counter + 1) % this.state.phrases.length });
    }, 1000); // Add a delay of 2000 milliseconds (2 seconds) here
  } else {
    requestAnimationFrame(this.update);
    this.frame++;
  }
  }

  randomChar = () => {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }

  render() {
    return (
      <span className="text">
        {this.state.text.map((t, i) => t.dud
          ? <span key={i} className="dud">{t.char}</span>
          : t.char
        )}
      </span>
    );
  }
}

export default TextScramble;
