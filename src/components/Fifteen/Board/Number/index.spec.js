import { render } from '@testing-library/react';
import Number from '.';

describe('Number', () => {
  it('should render a given number', () => {
    expect(
      render(
        <Number
          dispatch={jest.fn}
          number={{ value: 5, id: 1, isUsed: false }}
          isGameOver={false}
          currentSelections={[0]}
          isBotTurn={false}
        />
      ).container
    ).toMatchSnapshot();
  });
});
