import React from 'react';

const Form = () => (
  <div className="main">
    <form>
      <div className="form-control">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter username..."
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="room">Room</label>
        <select name="room" id="room">
          <option value="Issue A">Issue A</option>
          <option value="Issue B">Issue B</option>
          <option value="Issue C">Issue C</option>
          <option value="Issue D">Issue D</option>
          <option value="Issue E">Issue E</option>
          <option value="Issue F">Issue F</option>
          <option value="Issue G">Issue G</option>
          <option value="Issue H">Issue H</option>
          <option value="Issue I">Issue I</option>
        </select>
      </div>
      <button type="submit" className="btn">Join Chat</button>
    </form>
  </div>
);

export default Form;
