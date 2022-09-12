import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css'
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
      score: 0,
      time: 30,
      difficulty: '',
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
    let TIME = 30;
    const timer = setInterval(() => {
      if (TIME === 1) {
        clearInterval(timer);
        this.setState({ isDisabled: true });
      }
      TIME -= 1;
      this.setState({ time: TIME });
    }, 1000);
  }
  
  handleQuestions = (perguntaResults) => {
    const respostaCerta = perguntaResults.results[0].correct_answer;
    const respostas = [...perguntaResults.results[0].incorrect_answers, respostaCerta];
    const difficulty = perguntaResults.results.difficulty;
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
  }

  handleClick = ({ target }) => {
    const { name } = target;
    const { time, difficulty } = this.state;
    const { dispatch } = this.props;
    const DIFFICULTY = difficulty === 'hard' ? 3 : difficulty === 'medium' ? 2 : 1;
    let score = 0;
    if (name === 'correct-answer') {
      score = 10 + (DIFFICULTY * time);
    }
    this.setState({ green: 'green-border', red: 'red-border', score }, () => {
      dispatch(submitScore({ score }));
    });
  }

  render() {
    const { arrayPergunta, numeroPergunta, respostasProntas,
    respostaCerta, green, red, isDisabled } = this.state;
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
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  // responseCode: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Game);
