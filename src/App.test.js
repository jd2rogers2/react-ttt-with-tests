import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<App>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  if ('displays the board', () => {
    const app = shallow(<App />);
    expect(app.find('td')).to.have.lengthOf(9);
  });

  it('updates board correctly', () => {
    const app = shallow(<App />);
    app.find('td').first().simulate('click');
    expect(app.state('board')[0]).to.equal('X');
    app.find('td').last().simulate('click');
    expect(app.state('board')[8]).to.equal('O');
  });
});
