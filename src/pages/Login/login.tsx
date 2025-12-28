import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';

function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (evt: FormEvent): void => {
    evt.preventDefault();

    dispatch(loginAction({ email, password }))
      .unwrap()
      .then(() => {
        navigate('/');
      });
  };

  return (
    <div className="page page--gray page--login">
      <main className="page__main page__main--login">
        <form className="login__form form" onSubmit={handleSubmit}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Sign in</button>
        </form>
      </main>
    </div>
  );
}

export default Login;

