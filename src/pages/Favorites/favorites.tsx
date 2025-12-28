import { useAppSelector } from '../../hooks';
import PlaceCard from '../../components/PlaceCard/PlaceCard';

function Favorites(): JSX.Element {
  const offers = useAppSelector((state) =>
    state.offersList.filter((offer) => offer.isFavorite)
  );

  const cities = Array.from(new Set(offers.map((o) => o.city.name)));

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="/">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>

            <ul className="favorites__list">
              {cities.map((city) => (
                <li key={city} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>

                  <div className="favorites__places">
                    {offers
                      .filter((o) => o.city.name === city)
                      .map((offer) => (
                        <PlaceCard
                          key={offer.id}
                          cardInfo={offer}
                          typeClassName="favorites__card"
                        />
                      ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <footer className="footer container">
        <a className="footer__logo-link" href="/">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </a>
      </footer>
    </div>
  );
}

export default Favorites;


