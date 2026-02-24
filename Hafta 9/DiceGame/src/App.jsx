import { useState } from 'react'
import './App.css'
import d1 from './assets/images/dice1.png'
import d2 from './assets/images/dice2.png'
import d3 from './assets/images/dice3.png'
import d4 from './assets/images/dice4.png'
import d5 from './assets/images/dice5.png'
import d6 from './assets/images/dice6.png'


const dices = [d1, d2, d3, d4, d5, d6];

function App() {
  const [userName, setUserName] = useState("Player 1");
  const [diceOne, setDiceOne] = useState(0);
  const [diceTwo, setDiceTwo] = useState(0);
  const [isDiceRolling, setIsDiceRolling] = useState(false);
  const [title, setTitle] = useState("Draw!");

  const checkWinner = (result1, result2)=>{
    if (result1 > result2) {
      setTitle(`${userName} wins!`)
    } else if (result2 > result1){
      setTitle("PC wins!")
    } else {
      setTitle("Deuce (Roll again)")
    }
  }

  const rollDice = ()=>{
    if (isDiceRolling) return;

    const finalResult1 = Math.floor(Math.random()*6);
    const finalResult2 = Math.floor(Math.random()*6);

    setIsDiceRolling(true);
    setTitle("Rolling...");

    let counter = 0;
    const interval = setInterval(() => {
      setDiceOne(Math.floor(Math.random()*6));
      setDiceTwo(Math.floor(Math.random()*6));
      counter++;
      
      if (counter > 20) {
        clearInterval(interval);
        setDiceOne(finalResult1);
        setDiceTwo(finalResult2);
        checkWinner(finalResult1, finalResult2);
        setIsDiceRolling(false);
      }
    }, 100);
  }


  return(
    <>
      <div className='game-container'>
        <h1 className='game-status'>{title}</h1>
        <div className='players-container'>
          <div className='player-box' id='player-1-box'>
            
              <input 
              type="text" 
              value={userName} 
              className='player-name-input' 
              onChange={(e)=>setUserName(e.target.value)}
              placeholder='Enter your name'
              disabled={isDiceRolling} />
            
            <div className='dice-img'>
              <img src={dices[diceOne]} alt="" />
            </div>
          </div>

          <div className='player-box' id='player-2-box'>
            <h2 className='pc-name'>PC</h2>
            <div className='dice-img'>
              <img src={dices[diceTwo]} alt="" />
            </div>
          </div>
        </div>
        <button className='roll-btn' onClick={rollDice} disabled={isDiceRolling}>{isDiceRolling ? "Wait" : "Roll"}</button>
      </div>
    
    </>
  )
}

export default App
