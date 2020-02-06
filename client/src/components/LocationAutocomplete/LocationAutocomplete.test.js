import React from 'react';
import {
  render,
  fireEvent,
  queryAllByPlaceholderText,
  cleanup
} from 'utils/testUtils';
import LocationAutocomplete from 'components/LocationAutocomplete';

import { MainContext } from 'containers/mainContext';


afterEach(cleanup);

test('renders correctly', () => {
  const { queryByTestId } = render(<LocationAutocomplete />);

  expect(queryByTestId('location-autocomplete')).toBeTruthy();
});

describe('input value', () => {
  test('updates', () => {
    const { queryByPlaceholderText } = render(<LocationAutocomplete />);
    const searchInput = queryByPlaceholderText('start typing');

    fireEvent.change(searchInput, {
      target: { value: 'test' }
    });

    expect(searchInput.value).toBe('test');
  });
  test('focused on mount', () => {
    const { queryByPlaceholderText } = render(<LocationAutocomplete />);
    const searchInput = queryByPlaceholderText('start typing');

    expect(searchInput).toBe(document.activeElement);
  });
  test("after input is populated, delete all by clicking 'x' icon", () => {
    let result;
    function TestComponent() {
      const {
        map: { chosenPosition }
      } = React.useContext(MainContext) && React.useContext(MainContext);
      result = chosenPosition;
      return null;
    }
    render(<TestComponent />);
    const { queryByTestId, queryByPlaceholderText } = render(
      <LocationAutocomplete />
    );
    const searchInput = queryByPlaceholderText('start typing');
    fireEvent.change(searchInput, {
      target: { value: 'test' }
    });
    fireEvent.click(queryByTestId('clear-all'));

    expect(result).toBeFalsy();
  });
});

