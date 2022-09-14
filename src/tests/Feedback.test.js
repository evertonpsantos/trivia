import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import render, { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import Feedback from '../pages/Feedback';

describe('Testa a tela de Feedback', () => {
  const INIT_STATE_FAIL = {
    player: {
      name: 'John Doe',
      assertions: 1,
      score: 30,
      gravatarEmail: 'johndoe@test.test'
    }
  }

  const INIT_STATE_SUCCESS = {
    player: {
      name: 'Johanna Doe',
      assertions: 4,
      score: 120,
      gravatarEmail: 'johannadoe@test.test'
    }
  }

  it('Testa se esta na página de feedback', () => {
    renderWithRouterAndRedux(<App />, INIT_STATE_FAIL, '/feedback');
    const feedbackTitle = screen.getByRole('heading', { level: 1, name: /Feedback/i });
    expect(feedbackTitle).toBeInTheDocument();
  });

  it('Testa se a tela contem as informações corretas', () => {
    renderWithRouterAndRedux(<App />, INIT_STATE_FAIL, '/feedback');
    const playerName = screen.getByText('John Doe');
    const playerScore = screen.getByTestId('feedback-total-score');
    const assertionsMessage = screen.getByText('Could be better...');
    const assertions = screen.getByText('1');
    expect(playerName).toBeInTheDocument();
    expect(playerScore).toBeInTheDocument();
    expect(assertionsMessage).toBeInTheDocument();
    expect(assertions).toBeInTheDocument();
  });

  it('Testa se é possível jogar novamente', () => {
    renderWithRouterAndRedux(<App />, INIT_STATE_FAIL, '/feedback');
    const playAgainBtn = screen.getByRole('button', { name: /Play Again/i });
    expect(playAgainBtn).toBeInTheDocument();
    userEvent.click(playAgainBtn);
    const loginTitle = screen.getByRole('heading', { level: 2, name: /Login/i })
    expect(loginTitle).toBeInTheDocument();
  });

  it('Testa se é possível acessar página de ranking', () => {
    renderWithRouterAndRedux(<App />, INIT_STATE_FAIL, '/feedback');
    const rankingBtn = screen.getByRole('button', { name: /Ranking/i });
    expect(rankingBtn).toBeInTheDocument();
    userEvent.click(rankingBtn);
    const rankingTitle = screen.getByRole('heading', { level: 1, name: /Ranking/i });
    expect(rankingTitle).toBeInTheDocument();
  });

  it('Testa se aparece a mensagem acerta com mais de 3 acertos', () => {
    renderWithRouterAndRedux(<App />, INIT_STATE_SUCCESS, '/feedback');
    const assertions = screen.getByText('4');
    const assertionsMessage = screen.getByText('Well Done!');
    expect(assertions).toBeInTheDocument();
    expect(assertionsMessage).toBeInTheDocument();
  });
  });