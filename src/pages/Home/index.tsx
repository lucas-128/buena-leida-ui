import React from 'react';
import { 
  HomeContainer, 

  Feed 
} from './styled';
import NavBar from '../../components/NavBar';

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <NavBar />
      <Feed>
        <p>Feed</p>
      </Feed>
    </HomeContainer>
  );
};

export default Home;
