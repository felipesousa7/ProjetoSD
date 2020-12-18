import React, {Component} from 'react';
import "./Forca.css";
import { randomWord } from "./Palavras";
import img0 from "./images/0.png";
import img1 from "./images/1.png";
import img2 from "./images/2.png";
import img3 from "./images/3.png";
import img4 from "./images/4.png";
import img5 from "./images/5.png";
import img6 from "./images/6.png";

class Forca extends Component {
 
  static defaultProps = {
    maxErro: 5 ,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nErro: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    this.setState({
      nErro: 0,
      guessed: new Set(),
      answer: randomWord()
    });
  }

  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nErro: st.nErro + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  
  generateButtons() {
    return "aãbcçdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        className="Forca-btn"
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  
  render() {
    const gameOver = this.state.nErro >= this.props.maxErro;
    const altText = `${this.state.nErro}/${this.props.maxErro} `;
    const isWinner = this.guessedWord().join("") === this.state.answer;
    let gameState = this.generateButtons();
    if (isWinner) gameState = "Você Venceu!";
    if (gameOver) gameState = "Você Perdeu!";
    return (
      <div className="Forca">
        <h1>Jogo da Forca</h1>
        <img src={this.props.images[this.state.nErro]} alt={altText} />
        <p className="Forca-Erro">Letras erradas: {this.state.nErro}</p>
        <p className="Forca-word">
          {!gameOver ? this.guessedWord() : this.state.answer}
        </p>
        <p className="Forca-btns">{gameState}</p>
        <button className="Forca-reset" onClick={this.reset}>
          Recomeçar
        </button>
      </div>
    );
  }
}

export default Forca;