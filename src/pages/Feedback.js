import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    const { name, email, score, assertions } = this.props;
    const hashEmail = md5(email).toString();
    const MINIMAL = 3;

    return (
      <>
        <header>
          <h1 data-testid="feedback-text">Feedback</h1>
          <img
            src={ `https://www.gravatar.com/avatar/${hashEmail}` }
            alt="user"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-score">{score}</p>
        </header>
        <section>
          <p
            data-testid="feedback-text"
          >
            { assertions < MINIMAL ? 'Could be better...' : 'Well Done!'}
          </p>
          <p data-testid="feedback-total-score">{score}</p>
          <p data-testid="feedback-total-question">{assertions}</p>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
