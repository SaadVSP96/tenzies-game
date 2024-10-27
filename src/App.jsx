import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
    const [dice, setDice] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);

    React.useEffect(() => {
        const allHeld = dice.every((die) => die.isHeld === true);
        const firstValue = dice[0].value;
        const allSameValue = dice.every((die) => die.value === firstValue);
        if (allHeld && allSameValue) {
            setTenzies(true);
            console.log("You Won !");
        }
    }, [dice]);

    function generateNewDie() {
        return {
            id: nanoid(),
            value: Math.floor(Math.random() * 7),
            isHeld: false,
        };
    }

    function allNewDice() {
        const emptyArray = Array.from(Array(10).keys());
        const newDice = emptyArray.map((item) => generateNewDie());
        return newDice;
    }

    function rollDice() {
        if (!tenzies) {
            setDice((oldDice) =>
                oldDice.map((die) => {
                    return die.isHeld === true ? die : generateNewDie();
                })
            );
        } else {
            setTenzies(false);
            setDice(allNewDice());
        }
    }

    function holdDice(id) {
        setDice((oldDice) =>
            oldDice.map((die) => {
                return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
            })
        );
    }

    const diceElements = dice.map((die) => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => {
                holdDice(die.id);
            }}
        />
    ));

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
            </p>
            <div className="dice-container">{diceElements}</div>
            <button className="roll-dice" onClick={rollDice}>
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    );
}

export default App;
