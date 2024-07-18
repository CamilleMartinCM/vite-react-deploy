import React, { useState } from 'react';
import YahtzeeGrid from './YahtzeeGrid';
import './App.css';

const App = () => {
    const [grids, setGrids] = useState([<YahtzeeGrid key={0} />]);

    const addGrid = () => {
        setGrids([...grids, <YahtzeeGrid key={grids.length} />]);
    };

    return (
        <div className="app">
            <h1>Yahtzee</h1>
            <button onClick={addGrid}>Ajouter une grille</button>
            <div className="grids">
                {grids}
            </div>
        </div>
    );
};

export default App;
