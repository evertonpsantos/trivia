// import React from 'react';
// import userEvent from '@testing-library/user-event';
// import { screen, waitFor } from '@testing-library/react';
// import render from './helpers/renderWithRouterAndRedux';
// import App from '../App';

// describe('Testa a tela de Login', () => {
//   const emailTest = 'johndoe@test.com';
//   const nameTest = 'John Doe';

//   it('Testa se ao entrar na página o input de email e nome são renderizados', () => {
//     render(<App />);
//     const emailInput = screen.getByRole('textbox', { name: /E-mail/i });
//     const nameInput = screen.getByRole('textbox', { name: /Nome/i });
//     expect(emailInput).toBeInTheDocument();
//     expect(nameInput).toBeInTheDocument();
//   });

//   it('Testa se é possivel digitar nos inputs', () => {
//     renderWithRouterAndRedux(<App />);
//     const emailInput = screen.getByRole('textbox', { name: /E-mail/i });
//     const nameInput = screen.getByRole('textbox', { name: /Nome/i });
//     userEvent.type(emailInput, emailTest);
//     userEvent.type(nameInput, nameTest);
//     expect(emailInput.value).toBe(emailTest);
//     expect(nameInput.value).toBe(nameTest);
//   });

//   it('Testa se o botão vem desabilitado e é possivel habilita-lo', () => {
//     renderWithRouterAndRedux(<App />);
//     const button = screen.getByRole('button', { name: /Play/i });
//     expect(button).toBeDisabled();
//     const emailInput = screen.getByRole('textbox', { name: /E-mail/i });
//     const nameInput = screen.getByRole('textbox', { name: /Nome/i });

//     userEvent.type(emailInput, emailTest);
//     userEvent.type(nameInput, nameTest);
//     expect(button).toBeEnabled();
//     userEvent.click(button);
//   });

//   it('Testa se ao clicar no botão é redirecionado para /game', async () => {
//     renderWithRouterAndRedux(<App />);
//     const emailInput = screen.getByRole('textbox', { name: /E-mail/i });
//     const nameInput = screen.getByRole('textbox', { name: /Nome/i });

//     userEvent.type(emailInput, emailTest);
//     userEvent.type(nameInput, nameTest);
//     const button = screen.getByRole('button', { name: /Play/i });
//     expect(button).toBeEnabled();
//     userEvent.click(button);
//   });

//   it('Testa se ao clicar no botão de configurações é redirecionado', () => {
//     const { history } = renderWithRouterAndRedux(<App />);
//     const settingsButton = screen.getByRole('button', { name: /Configurações/i });
//     userEvent.click(settingsButton);
//     const { location: { pathname } } = history;
//     expect(pathname).toBe('/settings');
//   });

//   it('Testa se o fetch é chamado ao clicar no botão', async () => {
//     const { history } = renderWithRouterAndRedux(<App />);
//     const button = screen.getByRole('button', { name: /Play/i });
//     const emailInput = screen.getByRole('textbox', { name: /E-mail/i });
//     const nameInput = screen.getByRole('textbox', { name: /Nome/i });

//     // const token = 'abc7d499917ad429920d46da2dacfeb0baa92f3987ffd1484e6cd9f9669493ba'
//     userEvent.type(emailInput, emailTest);
//     userEvent.type(nameInput, nameTest);
//     expect(button).toBeEnabled();
//     userEvent.click(button);
//     expect(history.location.pathname).toBe('/');
//   });

//   test('Verifica se o botão vai para "/game"', async () => {
//     const paginaHome = '/';
//     const { history } = renderWithRouterAndRedux(
//       <App />,
//       { initialEntries: [paginaHome] },
//     );
//     const emailInput = screen.getByRole('textbox', { name: /E-mail/i });
//     const nameInput = screen.getByRole('textbox', { name: /Nome/i });
//     const validacaoEmail = 'usimarc@otmail.com';
//     const validacaoName = 'Marcelo';
//     userEvent.type(emailInput, validacaoEmail);
//     userEvent.type(nameInput, validacaoName);

//     const botao = screen.getByRole('button', { name: /Play/i });
//     userEvent.click(botao);
//     await (waitFor(() => expect(botao).not.toBeInTheDocument(), {timeout:4000}));
//     expect(history.location.pathname).toBe('/game');
//   });
// });
