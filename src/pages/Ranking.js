import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      players: [],
    };
  }

  componentDidMount() {
    const players = JSON.parse(localStorage.getItem('ranking')) || [];
    this.setState({ players });
  }

  handleClick = () => {
    const { history: { push } } = this.props;
    push('/');
  };

  render() {
    const { players } = this.state;
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        {players.map((player, i) => (
          <div key={ i }>
            <img
              src={ player.picture }
              alt={ player.name }
              data-testid="header-profile-picture"
            />
            <p data-testid={ `player-name-${i}` }>{ player.name }</p>
            <p data-testid={ `player-score-${i}` }>{ player.score }</p>
          </div>
        ))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          Ínicio
        </button>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Ranking;
