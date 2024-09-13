import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPastries } from '../features/pastriesSlice';
import img from '../assets/Eclairs.jpeg'


const Home = () => {
  const dispatch = useDispatch();

  
  const { pastries, loading, error } = useSelector((state) => state.pastries);
  const { isAuthenticated } = useSelector((state) => state.auth);


  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchPastries());
    }
  }, [dispatch, isAuthenticated]);

  if (loading) return <p>Chargement des pâtisseries...</p>;
  if (error) return <p>Erreur : {error}</p>;

  
  

  return (
    <div>
      <h1>Pâtisseries restantes à gagner</h1>
      <div >
        {pastries.map((pastry) => (
          <div key={pastry.id} style={{ margin: '10px', textAlign: 'center' }}>
            <img src={img} alt={pastry.name} style={{ width: '150px', height: '150px' }} />
            <h3>{pastry.name}</h3>
            <p>Quantité restante : {pastry.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;