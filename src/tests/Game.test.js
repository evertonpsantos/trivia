import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { questionsResponse } from '../../cypress/mocks/questions';

const INIT_STATE = {
  player: {
    name: 'Jane Doe',
    assertions: 4,
    score: 120,
    gravatarEmail: 'jane@test.test'
  }
}

jest.useRealTimers();
jest.setTimeout(40000);

describe('Testa a página de jogo', () => {
  it('Testa se é possível escolher alguma resposta', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });

    renderWithRouterAndRedux(<App />, INIT_STATE, '/game');
    const answerOption = await screen.findByTestId('correct-answer');
    userEvent.click(answerOption);
    expect(answerOption).toBeInTheDocument();
    const nextBtn = screen.getByRole('button', { name: /Next/i });
    expect(nextBtn).toBeInTheDocument();
    userEvent.click(nextBtn);
  });

  it('Testa o timer', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });

    renderWithRouterAndRedux(<App />, INIT_STATE, '/game');
    const answerOption = await screen.findByTestId('correct-answer');
    expect(answerOption).toBeInTheDocument();
    await waitFor(() => expect(answerOption).toBeDisabled(), { timeout: 33000 });
  });

  it('Testa se é redirecionado para / quando token é inválido', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ response_code: 3 }),
    });

    renderWithRouterAndRedux(<App />, INIT_STATE, '/game');

    await waitFor(() => {
      const loginTitle = screen.getByRole('heading', { level: 2, name: /Login/i });
      expect(loginTitle).toBeInTheDocument();
    });
  });

  it('Testa se após cinco perguntas é redirecionado para feedback', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });

    const { history } = renderWithRouterAndRedux(<App />, INIT_STATE, '/game');
    const answerOption1 = await screen.findByTestId('correct-answer');
    userEvent.click(answerOption1);
    const nextBtn1 = screen.getByRole('button', { name: /Next/i });
    userEvent.click(nextBtn1);
    const answerOption2 = await screen.findByTestId('correct-answer');
    userEvent.click(answerOption2);
    const nextBtn2 = screen.getByRole('button', { name: /Next/i });
    userEvent.click(nextBtn2);
    const answerOption3 = await screen.findByTestId('correct-answer');
    userEvent.click(answerOption3);
    const nextBtn3 = screen.getByRole('button', { name: /Next/i });
    userEvent.click(nextBtn3);
    const answerOption4 = await screen.findByTestId('correct-answer');
    userEvent.click(answerOption4);
    const nextBtn4 = screen.getByRole('button', { name: /Next/i });
    userEvent.click(nextBtn4);
    const answerOption5 = await screen.findByTestId('correct-answer');
    userEvent.click(answerOption5);
    const nextBtn5 = screen.getByRole('button', { name: /Next/i });
    userEvent.click(nextBtn5);
    expect(history.location.pathname).toBe('/feedback');
  });
});