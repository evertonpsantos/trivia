import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  handleClick = () => {
    const { history: { push } } = this.props;
    push('/');
  };

  render() {
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
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
