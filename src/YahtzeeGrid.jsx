import React, { useState, useEffect } from 'react';
import './YahtzeeGrid.css';

// Définition du composant YahtzeeGrid
const YahtzeeGrid = () => {
    // Initialisation des scores pour chaque catégorie de jeu et chaque joueur
    const initialScores = {
        as: ['', '', '', '', ''],
        deux: ['', '', '', '', ''],
        trois: ['', '', '', '', ''],
        quatre: ['', '', '', '', ''],
        cinq: ['', '', '', '', ''],
        six: ['', '', '', '', ''],
        brelan: ['', '', '', '', ''],
        carre: ['', '', '', '', ''],
        full: ['', '', '', '', ''],
        petiteSuite: ['', '', '', '', ''],
        grandeSuite: ['', '', '', '', ''],
        yahtzee: ['', '', '', '', ''],
        chance: ['', '', '', '', ''],
        yahtzeeBonus: ['', '', '', '', '']
    };

    // Définition de l'état des scores et des totaux
    const [scores, setScores] = useState(initialScores);
    const [totals, setTotals] = useState({
        totalSup: [0, 0, 0, 0, 0],
        bonusSup: [0, 0, 0, 0, 0],
        totalSecSup: [0, 0, 0, 0, 0],
        totalInf: [0, 0, 0, 0, 0],
        totalGen: [0, 0, 0, 0, 0]
    });

    // Fonction pour gérer la mise à jour des scores lorsqu'un score change
    const handleScoreChange = (section, index, value) => {
        const newScores = { ...scores };
        newScores[section][index] = value ? parseInt(value) : '';
        setScores(newScores);
        calculateTotals(newScores);
    };

    // Fonction pour calculer les totaux en fonction des scores mis à jour
    const calculateTotals = (newScores) => {
        const totalSup = [0, 0, 0, 0, 0];
        const bonusSup = [0, 0, 0, 0, 0];
        const totalSecSup = [0, 0, 0, 0, 0];
        const totalInf = [0, 0, 0, 0, 0];
        const totalGen = [0, 0, 0, 0, 0];

        for (let i = 0; i < 5; i++) {
            // Calcul des totaux de la section supérieure
            totalSup[i] = ['as', 'deux', 'trois', 'quatre', 'cinq', 'six'].reduce((acc, category) => {
                return acc + (newScores[category][i] || 0);
            }, 0);

            // Calcul du bonus si le total supérieur est supérieur ou égal à 63
            bonusSup[i] = totalSup[i] >= 63 ? 35 : 0;
            totalSecSup[i] = totalSup[i] + bonusSup[i];

            // Calcul des totaux de la section inférieure
            totalInf[i] = ['brelan', 'carre', 'full', 'petiteSuite', 'grandeSuite', 'yahtzee', 'chance', 'yahtzeeBonus'].reduce((acc, category) => {
                return acc + (newScores[category][i] || 0);
            }, 0);

            // Calcul du total général
            totalGen[i] = totalSecSup[i] + totalInf[i];
        }

        // Mise à jour des totaux dans l'état
        setTotals({
            totalSup,
            bonusSup,
            totalSecSup,
            totalInf,
            totalGen
        });
    };

    // Calcul initial des totaux lorsque le composant est monté
    useEffect(() => {
        calculateTotals(scores);
    }, []);

    // Définition d'un mappage entre les catégories et leurs labels
    const categoriesMap = {
        as: 'Total des AS',
        deux: 'Total des DEUX',
        trois: 'Total des TROIS',
        quatre: 'Total des QUATRE',
        cinq: 'Total des CINQ',
        six: 'Total des SIX',
        brelan: 'Brelan',
        carre: 'Carré',
        full: 'Full',
        petiteSuite: 'Petite Suite',
        grandeSuite: 'Grande Suite',
        yahtzee: 'Yahtzee',
        chance: 'Chance',
        yahtzeeBonus: 'Prime Yahtzee'
    };

    // Rendu du composant
    return (
        <div className="yahtzee-grid">
            <div className="section">
                <h2>Section Supérieure</h2>
                {['as', 'deux', 'trois', 'quatre', 'cinq', 'six'].map((category) => (
                    <div key={category} className="row">
                        <div className="category">{categoriesMap[category]}</div>
                        {scores[category].map((score, index) => (
                            <input
                                key={index}
                                type="text"
                                value={score}
                                onChange={(e) => handleScoreChange(category, index, e.target.value)}
                            />
                        ))}
                    </div>
                ))}
                <div className="row">
                    <div className="category">Total Supérieur</div>
                    {totals.totalSup.map((total, index) => (
                        <div key={`totalSup${index}`} className="score">{total}</div>
                    ))}
                </div>
                <div className="row">
                    <div className="category">Prime des 35 points</div>
                    {totals.bonusSup.map((bonus, index) => (
                        <div key={`bonusSup${index}`} className="score">{bonus}</div>
                    ))}
                </div>
                <div className="row">
                    <div className="category">Total Section Supérieure</div>
                    {totals.totalSecSup.map((total, index) => (
                        <div key={`totalSecSup${index}`} className="score">{total}</div>
                    ))}
                </div>
            </div>

            <div className="section">
                <h2>Section Inférieure</h2>
                {['brelan', 'carre', 'full', 'petiteSuite', 'grandeSuite', 'yahtzee', 'chance', 'yahtzeeBonus'].map((category) => (
                    <div key={category} className="row">
                        <div className="category">{categoriesMap[category]}</div>
                        {scores[category].map((score, index) => (
                            <input
                                key={index}
                                type="text"
                                value={score}
                                onChange={(e) => handleScoreChange(category, index, e.target.value)}
                            />
                        ))}
                    </div>
                ))}
                <div className="row">
                    <div className="category">Total de la section inférieure</div>
                    {totals.totalInf.map((total, index) => (
                        <div key={`totalInf${index}`} className="score">{total}</div>
                    ))}
                </div>
                <div className="row">
                    <div className="category">Total Général</div>
                    {totals.totalGen.map((total, index) => (
                        <div key={`totalGen${index}`} className="score">{total}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default YahtzeeGrid;
