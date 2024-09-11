import {useDispatch, useSelector} from "react-redux";
import {selectPatisserie, winning} from "../../features/game/game-slice.jsx";
import { useState} from "react";
import "./game.scss";
import {useGetWinnersItemsMutation} from "../../features/game/game-api.jsx";

export const Game = () => {
    const dispatch = useDispatch()
    const patisserie = useSelector(selectPatisserie)
    const [dices, setDices] = useState([0, 0, 0, 0, 0])
    const [isWinner, setIsWinner] = useState(null)
    const [getWinnersItems] = useGetWinnersItemsMutation()
    const [rollCount, setRollCount] = useState(3)

    const isButtonDisabled = rollCount === 0 || isWinner;
    const buttonStyle = isButtonDisabled ? { background: 'gray' } : {};
    const roll = async () => {
        setRollCount(rollCount - 1)

        const newDices = dices.map(() => Math.floor(Math.random() * 6) + 1)
        setDices(newDices)

        const frequencyCounter = {}
        newDices.forEach(dice => {
            frequencyCounter[dice] = (frequencyCounter[dice] || 0) + 1
        })

        const maxCount = Math.max(...Object.values(frequencyCounter))

        setIsWinner(maxCount > 1)

        if (maxCount > 1) {
            try {
                const data = await getWinnersItems(maxCount);
                dispatch(winning({ count: maxCount, patisserie: data.data }));
            } catch (error) {
                console.error('Error fetching winners items:', error);
            }
        }
    }
    return (
        <main className={"main-container"}>
            <div className={"text"}>
                <h1>Jue du yams</h1>
                <p>Vous avez 3 lancés.</p>
                <p>
                    Si vous obtenez une paire (deux dés indantique), vous gangez 1
                    pâtisserie
                </p>
                <p>Avec un berlan (trois dés indantique), c'est 2 pâtisserie</p>
                <p>
                    Et en cas de carré (quatre dés indantique), vous remportez 3
                    pâtisserie
                </p>
                <p>Accumulez les délices pour remporter la partie!</p>
            </div>
            <div className={"game"}>
                {dices.map((dice, index) => (
                    <div key={index}>
                        <img
                            src={`../../../public/${dice !== 0 ? `dice${dice}.png` : "faq.png"}`}
                            alt={""}
                        />
                    </div>
                ))}
            </div>
            {isWinner === true ? (
                <div className={"winner"}>
                    <div>
                        <h2>Bravo, vous avez gagné!</h2>
                        <ul>
                            {patisserie && patisserie.map((item, index) => (
                                <li key={index}>{item.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : isWinner === false ? (
                <div className={"lose"}>
                    <h2>Perdu</h2>
                </div>
            ) : null}{" "}
            <button disabled={isButtonDisabled} style={buttonStyle} onClick={roll} className={"button"}>
                {isButtonDisabled ? "Vous n'avez plus d'essais" :`Il vous reste ${rollCount} essais`}
            </button>
        </main>
    )
}
