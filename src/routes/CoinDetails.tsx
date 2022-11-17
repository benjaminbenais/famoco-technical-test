import { useParams } from 'react-router-dom';

const CoinDetails = () => {
  const { id } = useParams();
  return <p>Coin Detail {id}</p>;
};

export default CoinDetails;
