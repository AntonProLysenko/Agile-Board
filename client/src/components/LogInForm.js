
export default function LoginForm({ setUser, setButtonPressed, buttonPressed, setNewUser, handleLogin, credentials, handleChange, error }) {


  

  return (
    <div>
      <div className="authForm-container" onSubmit={handleLogin}>
        <form autoComplete="off" className="authForm">
          <h1 className="listTitile">Login</h1>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <br />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="authBtn">
            Log in
          </button>
          <p className="error-message">&nbsp;{error}</p>
          
          <p>
            Don't have an account? &nbsp;<span className="formChange" onClick={() => {setNewUser(true);}}>Sign Up</span>
          </p>
        </form>
      </div>
       
    </div>
  );
}
