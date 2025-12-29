import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import PlaceCard from '../../components/PlaceCard/PlaceCard';
import { fetchFavoritesAction } from '../../store/api-actions';

function Favorites(): JSX.Element {
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  const cities = Array.from(new Set(offers.map((offer) => offer.city.name)));

  return (
    <div className="page">
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>

            <ul className="favorites__list">
              {cities.map((city) => (
                <li key={city} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <span className="locations__item-link">
                        {city}
                      </span>
                    </div>
                  </div>

                  <div className="favorites__places">
                    {offers
                      .filter((offer) => offer.city.name === city)
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
    </div>
  );
}

export default Favorites;


