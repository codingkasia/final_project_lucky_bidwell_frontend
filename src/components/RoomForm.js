import React from 'react';
import { API_ROOT, HEADERS } from '../constants';

class RoomForm extends React.Component {
  state = {
    name: ""
  };

  handleChange = e => {
    this.setState({ name: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();
    fetch(`${API_ROOT}/rooms`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
    this.setState({ name: " "});
  };
  

  render = () => {
    return <div className="newRoomForm">
        <form onSubmit={this.handleSubmit}>
          <label>
            <h2>Create A New Room:</h2>
          </label>
          <br />

          <label>
            Name:
            
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </label>
          <input type="submit" value="CREATE" />
        </form>
      </div>;
  };
}

export default RoomForm;
