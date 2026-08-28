import '../login/login.css';
import './register.css';

export default function RegisterPage() {
  return <main className="login-page register-page"><div className="login-panel"><div className="login-copy"><span className="login-kicker">KRISH FX SWING LAB</span><h1>Start your<br /><i>journey.</i></h1><p>Join a focused community and build the confidence to trade with a clear, repeatable process.</p></div><form className="login-card register-card"><h2>Create your account</h2><p>Enter your details to continue.</p><label>Full name *<input type="text" placeholder="Enter your full name" required /></label><label>Email address *<input type="email" placeholder="Enter your email address" required /></label><label>WhatsApp number *<input type="tel" placeholder="Enter your WhatsApp number" required /></label><label>Password *<input type="password" autoComplete="new-password" placeholder="Create a password" required /></label><label>Confirm password *<input type="password" autoComplete="new-password" placeholder="Confirm your password" required /></label><button type="submit">CONTINUE TO SECURE PAYMENT</button><div className="login-divider"><span />or<span /></div><button className="google-button" type="button">G&nbsp;&nbsp; Continue with Google</button><small>Already have an account? <a href="/login">Sign In</a></small></form></div></main>;
}


