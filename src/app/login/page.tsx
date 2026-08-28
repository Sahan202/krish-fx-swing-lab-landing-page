import './login.css';

export default function LoginPage() {
  return <main className="login-page"><div className="login-panel"><div className="login-copy"><span className="login-kicker">KRISH FX SWING LAB</span><h1>Trade with<br /><i>clarity.</i></h1><p>Build confidence, follow a proven process, and move forward with every trade.</p></div><form className="login-card"><h2>Welcome back</h2><p>Sign in to continue your journey.</p><label>Email<input type="email" autoComplete="email" placeholder="Enter your email" required /></label><label>Password<input type="password" autoComplete="current-password" placeholder="Enter your password" required /></label><a href="#forgot">Forgot password?</a><button type="submit">SIGN IN</button><div className="login-divider"><span />or<span /></div><button className="google-button" type="button">G&nbsp;&nbsp; Sign in with Google</button><small>Are you new? <a href="/register">Create an Account</a></small></form></div></main>;
}
