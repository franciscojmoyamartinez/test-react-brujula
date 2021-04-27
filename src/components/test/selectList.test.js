import Renderer from 'react-test-renderer';
import SelectList from "./../selectList";
import {render} from '@testing-library/react';

describe("SelectList", () => {
  test('FormControl exist', () => {
    const {getByTestId} = render(<SelectList />)
    expect(getByTestId('FormControl')).toBeInTheDocument()
  });
  test('Select exist', () => {
    const {getByTestId} = render(<SelectList />)
    expect(getByTestId('Select')).toBeInTheDocument()
  });
  test('Button exist for click', () => {
    const {getByTestId} = render(<SelectList />)
    const button = getByTestId('AddItemButton');
    button.click();
  });
  it('should render', () => {
    const tree = Renderer
    .create(<SelectList />)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
