import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css'

class Game extends Component {
  constructor() {
    super();
    this.state = {
      arrayPergunta: [],
      numeroPergunta: 0,
      respostaCerta: '',
      respostasProntas: [],
      green: '',
      red: '',
    };
  }

  async componentDidMount() {
    const { history } = this.props;
    const code = 3;
    const tokenPronto = localStorage.getItem('token');
    const URLPerguntas = `https://opentdb.com/api.php?amount=5&token=${tokenPronto}`;
    const responsePergunta = await fetch(URLPerguntas);
    const perguntaResults = await responsePergunta.json();
    if (perguntaResults.response_code === code) {
      localStorage.removeItem('token');
      return history.push('/');
    }
    const respostaCerta = perguntaResults.results[0].correct_answer;
    const respostas = [...perguntaResults.results[0].incorrect_answers, respostaCerta];
    let arraybackup = [...respostas];
    const respostasProntas = [];
    respostas.forEach((item, i) => {
      const index = Math.floor(Math.random() * arraybackup.length);
      respostasProntas[i] = arraybackup[index];
      arraybackup = arraybackup.filter((e) => arraybackup.indexOf(e) !== index);
    });
    this.setState({
      arrayPergunta: perguntaResults.results,
      respostaCerta,
      respostasProntas,
    });
  }

  handleClick = ({ target }) => {
    const { name } = target;
    let color = '';
    if (name === "correct-answer") {
      console.log(name);
      color = 'rgb(6, 240, 15)';
    } else {
      console.log(name);
      color = 'red';
    }
    this.setState({ green: 'green-border', red: 'red-border' });
  //   target.style.backgroundColor = color;
  //   target.style.border = `3px solid ${color}`;
  }

  render() {
    const { arrayPergunta, numeroPergunta, respostasProntas, respostaCerta, green, red } = this.state;
    const { name, email } = this.props;
    const hashEmail = md5(email).toString();
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${hashEmail}` }
          alt="user"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">0</p>
        {arrayPergunta.length === 0 ? <p>Loading...</p> : (
          <div>
            <p
              data-testid="question-category"
            >
              { arrayPergunta[numeroPergunta].category }
            </p>
            <p data-testid="question-text">{ arrayPergunta[numeroPergunta].question }</p>
            <div data-testid="answer-options">
              {respostasProntas.map((resposta, index) => (
                resposta === respostaCerta ? (
                  <button
                    key={ resposta }
                    type="button"
                    className={ green }
                    name="correct-answer"
                    data-testid="correct-answer"
                    onClick={ this.handleClick }
                  >
                    {resposta}
                  </button>
                ) : (
                  <button
                    key={ index }
                    type="button"
                    name="wrong-answer"
                    className={ red }
                    data-testid={ `wrong-answer-${index}` }
                    onClick={ this.handleClick }
                  >
                    {resposta}
                  </button>
                )
              ))}

            </div>
          </div>
        )}
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
});

Game.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  // dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  // responseCode: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Game);
