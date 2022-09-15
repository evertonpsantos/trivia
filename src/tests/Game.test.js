import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { invalidTokenResponse } from '../../cypress/mocks/token';

jest.useRealTimers();
jest.setTimeout(40000);

describe('Testa a página de jogo', () => {
  it('Testa se é possível escolher alguma resposta', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /E-mail/i });
    const nameInput = screen.getByRole('textbox', { name: /Nome/i });
    const validacaoEmail = 'joanna@test.com';
    const validacaoName = 'Joanna';
    userEvent.type(emailInput, validacaoEmail);
    userEvent.type(nameInput, validacaoName);
    const botao = screen.getByRole('button', { name: /Play/i });
    userEvent.click(botao);

    const answerOption = await screen.findByTestId('correct-answer');
    expect(answerOption).toBeInTheDocument();
    userEvent.click(answerOption);
    const nextBtn = screen.getByRole('button', { name: /Next/i });
    expect(nextBtn).toBeInTheDocument();
    userEvent.click(nextBtn);
  });

  it('Testa o timer', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /E-mail/i });
    const nameInput = screen.getByRole('textbox', { name: /Nome/i });
    const validacaoEmail = 'joanna@test.com';
    const validacaoName = 'Joanna';
    userEvent.type(emailInput, validacaoEmail);
    userEvent.type(nameInput, validacaoName);
    const botao = screen.getByRole('button', { name: /Play/i });
    userEvent.click(botao);
    const answerOption = await screen.findByTestId('correct-answer');
    expect(answerOption).toBeInTheDocument();
    await new Promise((element) => setTimeout(element, 33000));
    expect(answerOption).toBeDisabled();
  });

  it('Testa se é direcionado para / quando fetch falha', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(invalidTokenResponse),
    });

    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /E-mail/i });
    const nameInput = screen.getByRole('textbox', { name: /Nome/i });
    const validacaoEmail = 'joanna@test.com';
    const validacaoName = 'Joanna';
    userEvent.type(emailInput, validacaoEmail);
    userEvent.type(nameInput, validacaoName);
    const botao = screen.getByRole('button', { name: /Play/i });
    userEvent.click(botao);
    expect(emailInput).toBeInTheDocument();
  });
});