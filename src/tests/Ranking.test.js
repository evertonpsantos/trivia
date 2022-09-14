import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa a página de Ranking', () => {
  const INIT_STATE = {
    player: {
      name: 'Jane Doe',
      assertions: 4,
      score: 120,
      gravatarEmail: 'jane@test.test'
    }
  }

  it('Testa se a página de Ranking contém um botão para o ínicio', () => {
    renderWithRouterAndRedux(<App />, INIT_STATE, '/ranking');
    const homeButton = screen.getByRole('button', { name: /Ínicio/i });
    expect(homeButton).toBeInTheDocument();
    userEvent.click(homeButton);
    const loginTitle = screen.getByRole('heading', { level: 2, name: /Login/i });
    expect(loginTitle).toBeInTheDocument();
  });
})