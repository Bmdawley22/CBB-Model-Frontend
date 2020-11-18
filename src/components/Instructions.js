import React from 'react'

import '../css/Instructions.css';

const Instructions = () => {
    return (
        <div id='instructions'>
            <h2>Instructions</h2>
            <ul>
                <li>
                    <h3>Building Model</h3>
                    <ul>
                        <li>i. Choose stats to build model by clicking the "Add Stat to Model" button</li>
                        <li>ii. Give each stat a "point weight" guess</li>
                        <li>iii. Click "Confirm Model" to save model to your database</li>
                    </ul>
                </li>
                <li>
                    <h3>Your Model</h3>
                    <ul>
                        <li>i. If you have added models, you can select which model to show</li>
                        <li>ii. The selected model will be used throughout the app</li>
                        <li>iii. The values are the "point weights" entered</li>
                    </ul>
                </li>
                <li>
                    <h3>All Team Stats</h3>
                    <ul>
                        <li>i. Choose between displaying "Offensive" and "Defensive" stats</li>
                        <li>ii. Search team names to find specific team's stats</li>
                    </ul>
                </li>
                <li>
                    <h3>Stat Differntials</h3>
                    <ul>
                        <li>i. Same functionality as the "All Team Stats" page</li>
                        <li>ii. Stat Differntials are each teams percent above/below average for each stat</li>
                    </ul>
                </li>
                <li>
                    <h3>Game Predictor</h3>
                    <ul>
                        <li>i. Enter in away and home teams to see matchup prediction</li>
                        <li>ii. When both are entered, the prediction will render</li>
                        <li>iii. In the future the score for the actual game can be entered and the game can be added to a "Game History" table</li>
                        <li>iv. The selected model stats are displayed with the points added/subtracted to the total score prediction</li>
                    </ul>
                </li>

            </ul>
        </div>
    )
}

export default Instructions
