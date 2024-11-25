import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Home</h1>
            <p>Página pública. A restrita fica <Link to="/homeRestrita" >aqui</Link>.</p>
        </div>
    );
};

export default Home;
