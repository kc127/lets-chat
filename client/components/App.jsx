import React from 'react';
import Form from './Form.jsx';

class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return(
      <div className="main">
        <Form />
      </div>
    )
  }
}

export default App;