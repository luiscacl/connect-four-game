
import classes from './App.module.css';
import { useState } from 'react';

const showClasses = [];
for (let i = 0; i < 7; i++) {
  const showClasses2 = [];
  for (let j = 0; j < 6; j++) {
    showClasses2.push(null);
  }
  showClasses.push(showClasses2);
}
console.log(showClasses)

function App() {
  const [showColor, setShowColor] = useState(JSON.parse(JSON.stringify(showClasses)));
  const [changePlayer, setChangePlayer] = useState(true);
  const [winner, setWinner] = useState('');

  function checkIfWin(column, row, color){
    let pointerOneRow = column + 1;
    let pointerTwoRow = column - 1;
    let pointsRow = 1;
  
    // ROWS
    while(pointerOneRow < showColor.length){
      if(color === showColor[pointerOneRow][row]) pointsRow++;        
      else break;
      pointerOneRow++;
    }

    while(pointerTwoRow >= 0){
      if(color === showColor[pointerTwoRow][row]) pointsRow++;
      else break;
      pointerTwoRow--;
    }

    // COLUMNS
    let pointerOneColumn = row + 1;
    let pointsColumn = 1;

    while(pointerOneColumn < showColor[0].length){
      if(color === showColor[column][pointerOneColumn]) pointsColumn++;
      else break;
      pointerOneColumn++;
    }

    // DIAGONAL 1
    let pointerOneColumnDiagonalRightDown = column + 1;
    let pointerTwoRowDiagonalRightDown = row + 1;
    let pointsDiagonalOne = 1;

    while(pointerOneColumnDiagonalRightDown < showColor.length && pointerTwoRowDiagonalRightDown < showColor[0].length){
      if(color === showColor[pointerOneColumnDiagonalRightDown][pointerTwoRowDiagonalRightDown]) pointsDiagonalOne++;
      else break;
      pointerOneColumnDiagonalRightDown++;
      pointerTwoRowDiagonalRightDown++;
    }

    let pointerOneColumnDiagonalLeftUp = column - 1;
    let pointerTwoRowDiagonalLeftUp = row - 1;

    while(pointerOneColumnDiagonalLeftUp >= 0 && pointerTwoRowDiagonalLeftUp >= 0){
      if(color === showColor[pointerOneColumnDiagonalLeftUp][pointerTwoRowDiagonalLeftUp]) pointsDiagonalOne++;
      else break;
      pointerOneColumnDiagonalLeftUp--;
      pointerTwoRowDiagonalLeftUp--;
    }

    // DIAGONAL 2
    let pointerOneColumnDiagonalLeftDown = column - 1;
    let pointerTwoRowDiagonalLeftDown = row + 1;
    let pointsDiagonalTwo = 1;

    while(pointerOneColumnDiagonalLeftDown >= 0  && pointerTwoRowDiagonalLeftDown < showColor[0].length){
      if(color === showColor[pointerOneColumnDiagonalLeftDown][pointerTwoRowDiagonalLeftDown]) pointsDiagonalTwo++;
      else break;
      pointerOneColumnDiagonalLeftDown--;
      pointerTwoRowDiagonalLeftDown++;
    }

    let pointerOneColumnDiagonalRightUp = column + 1;
    let pointerTwoRowDiagonalRightUp = row - 1;
    while(pointerOneColumnDiagonalRightUp < showColor.length && pointerTwoRowDiagonalRightUp >= 0){
      if(color === showColor[pointerOneColumnDiagonalRightUp][pointerTwoRowDiagonalRightUp]) pointsDiagonalTwo++;
      else break;
      pointerOneColumnDiagonalRightUp++;
      pointerTwoRowDiagonalRightUp--;
    }

    if(pointsRow >= 4 || pointsColumn >= 4 || pointsDiagonalOne >= 4 || pointsDiagonalTwo >= 4){
      if(changePlayer) setWinner('Player 1 Wins');
      else setWinner('Player 2 Wins');
    }
  }

  function handleBall(event){
    if(winner !== '') return;
    const column = parseInt(event.target.id[0]);
    if(showColor[column][0] !== null) return;

    setChangePlayer(!changePlayer);
    for (let i = 6; i > -1; i--) {
      if(showColor[column][i] === null){
        setShowColor((lastVal) => {
          lastVal[column][i] = changePlayer ? 0 : 1;
          return [...lastVal];
        });
        checkIfWin(column, i, changePlayer ? 0 : 1);
        return;
      }
    }
  }

  function resetGame(){
    setWinner('');
    setShowColor(JSON.parse(JSON.stringify(showClasses)));
  }
 
  const renderElements = [];
  for (let i = 0; i < 7; i++) {

    const renderRows = [];
    for (let j = 0; j < 6; j++) {
      renderRows.push(
        <div onClick={handleBall} id={[i, j]} key={[i, j]} className={`${classes.tile}`}>
          {showColor[i][j] !== null ?
            <div id={[i, j]} className={`
              ${classes.player}
              ${showColor[i][j] === 0 ? classes['player-1'] : ''}
              ${showColor[i][j] === 1 ? classes['player-2'] : ''}
            `}></div>
            : ''
          }
        </div>
      );
    }
    renderElements.push(
      <div key={i} id={i} className={`${classes.column}`}>
        {renderRows}
      </div>
    );
  }

  return (
    <>
    <h1>{winner}</h1>
    <div className={classes.board}>
      {renderElements}
    </div>
    {winner !== '' ? <button onClick={resetGame}>Restart</button> : ''}
    </>
  );
}

export default App;
