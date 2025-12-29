import { useAppSelector } from '../../hooks';

function Header(): JSX.Element {
  const email = useAppSelector((state) => state.userEmail);
  const favoritesCount = useAppSelector((state) => state.favorites.length);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link" href="/">
              <img src="img/logo.svg" alt="6 cities logo" />
            </a>
          </div>

          {email && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <span className="header__user-name">{email}</span>
                  <span className="header__favorite-count">
                    {favoritesCount}
                  </span>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
