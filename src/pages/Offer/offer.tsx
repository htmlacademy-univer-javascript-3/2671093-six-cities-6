import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import CommentForm from '../../components/CommentForm/CommentForm';
import ReviewsList from '../../components/ReviewsList/ReviewsList';
import CitiesMap from '../../components/CitiesMap/CitiesMap';
import NearestCardList from '../../components/NearestCardList/NearestCardList';
import { Review } from '../../types/review';

function Offer(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  const offers = useAppSelector((state) => state.offersList);

  const offer = offers.find((o) => o.id === id);

  // ⬅️ ВАЖНО: заглушка для текущего этапа
  const reviews: Review[] = [];

  if (!offer) {
    return <h1>Offer not found</h1>;
  }

  const nearbyOffers = offers
    .filter((o) => o.id !== offer.id)
    .slice(0, 3);

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

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery">
            <div className="offer__image-wrapper">
              <img
                className="offer__image"
                src={offer.previewImage}
                alt={offer.title}
              />
            </div>
          </div>

          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}

              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>

              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${offer.rating * 20}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {offer.rating}
                </span>
              </div>

              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type}
                </li>
              </ul>

              <div className="offer__price">
                <b className="offer__price-value">€{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>

              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews · <span className="reviews__amount">{reviews.length}</span>
                </h2>

                <ReviewsList reviews={reviews} />
                <CommentForm />
              </section>
            </div>
          </div>

          <section className="offer__map map">
            <CitiesMap city={offer.city} points={nearbyOffers} />
          </section>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <NearestCardList offers={nearbyOffers} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;


