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
        
      </div>
    </form>
  </div>
);

export default Form;
