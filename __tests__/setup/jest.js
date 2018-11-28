import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

jest.DEFAULT_TIMEOUT_INTERVAL = 10000;

Enzyme.configure({ adapter: new Adapter() });
