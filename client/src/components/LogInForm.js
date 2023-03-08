
export default function LoginForm({ setUser, setButtonPressed, buttonPressed, handleLogin, credentials, handleChange, error }) {


  

  return (
    <div>
      <div className="form-container" onSubmit={handleLogin}>
        <form autoComplete="off">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit">LOG IN</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
