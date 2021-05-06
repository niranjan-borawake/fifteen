import { render } from '@testing-library/react';
import Timer from '.';
import { PLAYERS } from '../../../constants';

describe('Timer', () => {
  it('should reder with default start time', () => {
    expect(
      render(<Timer currentPlayer={PLAYERS.ONE} dispatch={jest.fn} />).container
    ).toMatchSnapshot();
  });
});
