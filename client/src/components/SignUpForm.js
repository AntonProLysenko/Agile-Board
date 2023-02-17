import React, { Component }  from 'react'

import {signUp} from '../utilities/user-service'

export default class SignUpForm extends Component {
  // state is always an object with a property for each "piece" of state
state = {
      name: '',
      email: '',
      password: '',
      confirm: '',
      error: ''
    };

    handleChange = (evt) => {
  this.setState({
    [evt.target.name]: evt.target.value,
    error: ''
  });
};

handleNewUser = async (evt) =>{
    evt.preventDefault();
    try {
        const formData = {...this.state}
        delete formData.error
        delete formData.confirm

        const user = await signUp(formData)
        console.log(user);
    } catch (error) {
        this.setState({ error: "Sign Up Failed - Try Again" });
    }
}

  

  render() {
  const disable = this.state.password !== this.state.confirm
  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={this.handleNewUser}>
          <label>Name</label>
          <input type="text" name="name" onChange={this.handleChange} required />
          <label>Email</label>
          <input type="email" name="email" onChange={this.handleChange} required />
          <label>Password</label>
          <input type="password" name="password"  onChange={this.handleChange} required />
          <label>Confirm</label>
          <input type="password" name="confirm"  onChange={this.handleChange} required />
          <button type="submit" disabled={disable}>SIGN UP</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{this.state.error}</p>
    </div>
  );
}
}