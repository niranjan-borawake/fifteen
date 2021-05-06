import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Fifteen from '.';

describe('Fifteen:', () => {
  const testBoardNumbers = '123456789'.split('').map(number => ({
    value: +number,
    id: +number - 1,
    isUsed: false,
  }));
  beforeEach(() => {
    jest.useFakeTimers();
    render(<Fifteen testBoardNumbers={testBoardNumbers} />);
  });

  it('should show all the game rules', () => {
    expect(
      screen.getByText(
        'Players take it in turns to select 2 or 3 circles that total 15 in 15s.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'A player could select 2 circles, e.g. 7 and 8 or 3 circles, e.g. 4, 5 and 6.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'The last player who selects a combination of 15 is the winner.'
      )
    ).toBeInTheDocument();
  });

  it('should show the board when the game starts', () => {
    userEvent.click(screen.getByText('START'));
    expect(screen.getByTestId('board')).toBeDefined();
  });

  it('should switch turn if total of selected numbers is 15', () => {
    userEvent.click(screen.getByText('START'));
    expect(screen.queryByTestId('timer-player-1')).toBeDefined();
    expect(screen.queryByTestId('timer-player-2')).toBeNull();
    userEvent.click(screen.getByText('9'));
    userEvent.click(screen.getByText('6'));
    act(() => {
      jest.runAllTimers();
    });
    expect(screen.queryByTestId('timer-player-1')).toBeNull();
    expect(screen.queryByTestId('timer-player-2')).toBeDefined();
    userEvent.click(screen.getByText('8'));
    userEvent.click(screen.getByText('4'));
    userEvent.click(screen.getByText('3'));
    act(() => {
      jest.runAllTimers();
    });
    expect(screen.queryByTestId('timer-player-1')).toBeDefined();
    expect(screen.queryByTestId('timer-player-2')).toBeNull();
  });

  it('should not switch turn if total of selected numbers is not 15', () => {
    userEvent.click(screen.getByText('START'));
    expect(screen.queryByTestId('timer-player-1')).toBeDefined();
    expect(screen.queryByTestId('timer-player-2')).toBeNull();
    userEvent.click(screen.getByText('9'));
    userEvent.click(screen.getByText('5'));
    userEvent.click(screen.getByText('7'));
    act(() => {
      jest.runAllTimers();
    });
    expect(screen.queryByTestId('timer-player-1')).toBeDefined();
    expect(screen.queryByTestId('timer-player-2')).toBeNull();
  });

  it('should not allow to select already used numbers', () => {
    userEvent.click(screen.getByText('START'));
    expect(screen.queryByTestId('timer-player-1')).toBeDefined();
    expect(screen.queryByTestId('timer-player-2')).toBeNull();
    userEvent.click(screen.getByText('9'));
    userEvent.click(screen.getByText('1'));
    userEvent.click(screen.getByText('5'));
    act(() => {
      jest.runAllTimers();
    });
    expect(screen.queryByTestId('timer-player-2')).toBeDefined();
    expect(screen.queryByTestId('timer-player-1')).toBeNull();
    userEvent.click(screen.getByText('9'));
    userEvent.click(screen.getByText('1'));
    userEvent.click(screen.getByText('5'));
    act(() => {
      jest.runAllTimers();
    });
    expect(screen.queryByTestId('timer-player-2')).toBeDefined();
    expect(screen.queryByTestId('timer-player-1')).toBeNull();
  });

  it('should inform player game result if is not able to select numbers in 15s', async () => {
    userEvent.click(screen.getByText('START'));
    expect(screen.queryByTestId('timer-player-1')).toBeDefined();
    expect(screen.queryByTestId('timer-player-2')).toBeNull();
    act(() => {
      jest.advanceTimersByTime(1000 * 15);
    });
    expect(screen.getByText('You Lost')).toBeInTheDocument();
    expect(screen.getByText('You Won')).toBeInTheDocument();
  });
});
