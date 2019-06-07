import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

// Jest checks for this file whenever it starts up
// So this is a good place to set anything up pre-testing
// Such as using the Enzyme npm package which helps us test React components more easily
