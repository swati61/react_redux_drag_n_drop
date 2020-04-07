import { createStore } from 'redux';
import DragAndDropComponent from './DragAndDropComponent';
import React from 'react';
import reducer from './reducer';
import { Provider } from 'react-redux';

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <DragAndDropComponent/>
  </Provider>
);

export default App;