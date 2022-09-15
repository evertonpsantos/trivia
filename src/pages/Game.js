import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';
import { submitScore } from '../redux/actions';

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
      isDisabled: false,
      time: 30,
      difficulty: '',
      next: false,
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
    this.handleQuestions(perguntaResults);
    this.questionTimer();
  }

  questionTimer = () => {
    const { time } = this.state;
    let TIME = time;
    const MIL = 1000;
    const timer = setInterval(() => {
      if (TIME === 1) {
        clearInterval(timer);
        return this.setState({ isDisabled: true });
      }
      TIME -= 1;
      this.setState({ time: TIME });
    }, MIL);
  };

  handleQuestions = (perguntaResults, nPer = 0) => {
    const { difficulty } = perguntaResults.results;
    const respostaCerta = perguntaResults.results[nPer].correct_answer;
    const respostas = [...perguntaResults.results[nPer].incorrect_answers, respostaCerta];
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
      difficulty,
    });
  };

  handleClick = ({ target }) => {
    const { name } = target;
    const { time, difficulty } = this.state;
    const { dispatch, score, assertions } = this.props;
    const DEZ = 10;
    const TRES = 3;
    let DIFFICULTY = 0;
    if (difficulty === 'hard') DIFFICULTY = TRES;
    if (difficulty === 'medium') DIFFICULTY = 2;
    else DIFFICULTY = 1;
    let scoreSoma = 0;
    if (name === 'correct-answer') {
      scoreSoma = DEZ + (DIFFICULTY * time) + score;
      const ASSERTIONS = 1 + assertions;
      dispatch(submitScore({ score: scoreSoma, assertions: ASSERTIONS }));
    }
    this.setState({ green: 'green-border', red: 'red-border', next: true }, () => {
    });
  };

  handleNext = () => {
    const { history } = this.props;
    const { numeroPergunta, arrayPergunta } = this.state;
    const nextQuest = numeroPergunta + 1;
    const cinco = 5;
    if (nextQuest === cinco) { return history.push('/feedback'); }
    const { difficulty } = arrayPergunta[nextQuest];
    const respostaCerta = arrayPergunta[nextQuest].correct_answer;
    const respostas = [...arrayPergunta[nextQuest].incorrect_answers, respostaCerta];
    let arraybackup = [...respostas];
    const respostasProntas = [];
    respostas.forEach((item, ind) => {
      const index = Math.floor(Math.random() * arraybackup.length);
      respostasProntas[ind] = arraybackup[index];
      arraybackup = arraybackup.filter((e) => arraybackup.indexOf(e) !== index);
    });
    this.setState({
      respostaCerta,
      respostasProntas,
      difficulty,
      numeroPergunta: nextQuest,
      green: '',
      red: '',
      time: 30,
    });
  };

  render() {
    const { arrayPergunta, numeroPergunta, respostasProntas,
      respostaCerta, green, red, isDisabled, next, time } = this.state;
    const { name, email, score } = this.props;
    const hashEmail = md5(email).toString();
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${hashEmail}` }
          alt="user"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
        <p>{`Timer: ${time}`}</p>
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
                    disabled={ isDisabled }
                    onClick={ this.handleClick }
                  >
                    {resposta}
                  </button>
                ) : (
                  <button
                    key={ index }
                    type="button"
                    name="wrong-answer"
                    disabled={ isDisabled }
                    className={ red }
                    data-testid={ `wrong-answer-${index}` }
                    onClick={ this.handleClick }
                  >
                    {resposta}
                  </button>
                )
              ))}

            </div>
            { next && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.handleNext }
              >
                Next
              </button>
            )}
          </div>
        )}
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
});

Game.propTypes = {
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Game);
