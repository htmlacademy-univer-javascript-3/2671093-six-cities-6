import PlaceCard from '../PlaceCard/PlaceCard';
import { CardListProps } from '../../types/card-list';
import { CardType } from '../../const';

function NearestCardList({ cities }: CardListProps): JSX.Element {
  return (
    <div className="near-places__list places__list">
      {cities.map((city) => (
        <PlaceCard
          key={city.id}
          cardInfo={city}
          typeClassName={CardType.nearest}
        />
      ))}
    </div>
  );
}

export default NearestCardList;
