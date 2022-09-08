import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Testa a tela de Login', () => {
  it('Testa se ao entrar na página o input de email e nome são renderizados', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /E-mail/i });
    const nameInput = screen.getByRole('textbox', { name: /Nome/i });
    expect(emailInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
  })

  it('Testa se é possivel digitar nos inputs', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /E-mail/i });
    const nameInput = screen.getByRole('textbox', { name: /Nome/i });
    const emailTest = 'johndoe@test.com';
    const nameTest = 'John Doe'
    userEvent.type(emailInput, emailTest);
    userEvent.type(nameInput, nameTest);
    expect(emailInput.value).toBe(emailTest);
    expect(nameInput.value).toBe(nameTest);
  });

  it('Testa se o botão vem desabilitado e é possivel habilita-lo', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /Play/i });
    expect(button).toBeDisabled();
    const emailInput = screen.getByRole('textbox', { name: /E-mail/i });
    const nameInput = screen.getByRole('textbox', { name: /Nome/i });
    const emailTest = 'johndoe@test.com';
    const nameTest = 'John Doe'
    userEvent.type(emailInput, emailTest);
    userEvent.type(nameInput, nameTest);
    expect(button).toBeEnabled();
    userEvent.click(button);
  });

  it('Testa se ao clicar no botão é redirecionado para /game', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /E-mail/i });
    const nameInput = screen.getByRole('textbox', { name: /Nome/i });
    const emailTest = 'johndoe@test.com';
    const nameTest = 'John Doe'
    userEvent.type(emailInput, emailTest);
    userEvent.type(nameInput, nameTest);
    const button = screen.getByRole('button', { name: /Play/i });
    expect(button).toBeEnabled();
    userEvent.click(button);
  });

  it('Testa se ao clicar no botão de configurações é redirecionado', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const settingsButton = screen.getByRole('button', { name: /Configurações/i });
    userEvent.click(settingsButton);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/settings');
  });

  it('Testa se o fetch é chamado ao clicar no botão', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue('Deu bom'),
    });

    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /Play/i });
    const emailInput = screen.getByRole('textbox', { name: /E-mail/i });
    const nameInput = screen.getByRole('textbox', { name: /Nome/i });
    const emailTest = 'johndoe@test.com';
    const nameTest = 'John Doe'
    userEvent.type(emailInput, emailTest);
    userEvent.type(nameInput, nameTest);
    expect(button).toBeEnabled();
    userEvent.click(button);
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://opentdb.com/api_token.php?command=request');
  });
})