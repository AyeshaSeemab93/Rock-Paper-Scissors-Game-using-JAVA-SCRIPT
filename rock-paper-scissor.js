//REPLACING ONCLICK="" WITH .addEventListener();   onclick="playGame('Rock');"
document.querySelector('.js-rock-button')
  .addEventListener('click', ()=>{
    playGame('Rock');
    })
document.querySelector('.js-paper-button')
  .addEventListener('click', ()=>{
    playGame('Paper');
                    })                

document.querySelector('.js-scissor-button')
   .addEventListener('click', ()=>{
    playGame('Scissor');
                    })
document.querySelector('.js-reset-button')
    .addEventListener('click', ()=>{
        scores.wins = 0; scores.losses = 0; scores.ties = 0; 
        localStorage.removeItem('score');
        updateScoreElement();
               })
//playing game using keyboard keys
document.body.addEventListener('keydown', (event)=>{
  if(event.key === 'r'){
    playGame('Rock');
  }
  else if(event.key === 'p'){
    playGame('Paper');
  }
  else if(event.key === 's'){
    playGame('Scissor');
  }
 
})

//helper function
function pickComputerMove(){
  const randomNumber = Math.random();
  let computerMove = '';
  if(randomNumber >= 0 && randomNumber < 1/3)
      {
      computerMove = 'Rock';
      }
  else if(randomNumber >= 1/3 && randomNumber < 2/3)
      {
      computerMove = 'Paper';
      }
  else if(randomNumber >= 2/3 && randomNumber < 1)
      {
      computerMove = 'Scissor';
      }

  return computerMove;
}


function playGame(playerMove){
//calling other function inside function:
const computerMove = pickComputerMove();
let result = '';

if(playerMove === 'Rock')
{
    if(computerMove === 'Rock')
    {
    result = 'Tie!';
    }
    else if(computerMove === 'Scissor')
    {
      result = 'You win!';
    }
    else if(computerMove === 'Paper')
    {
    result = 'You lose!';
    }
}
else if(playerMove === 'Paper')
{
    if(computerMove === 'Rock')
    {
      result = 'You win!';
    }
    else if(computerMove === 'Paper')
    {
    result = 'Tie!';
    }
    else if(computerMove === 'Scissor')
    {
    result = 'You lose!';
    }
}
else if(playerMove === 'Scissor')
{
    if(computerMove === 'Rock')
    {
    result = 'You lose!';
    }
    else if(computerMove === 'Scissor')
    {
    result = 'Tie!';
    }
    else if(computerMove === 'Paper')
    {
    result = 'You win!';
    } 
    // calling helper function to keep record of score
    // let totalscore = score(result);
}
// alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result} ${score(result)}`);

//DOM
document.querySelector('.js-result').innerHTML = result;
document.querySelector('.js-moves').innerHTML = `You 
<img src="./Images/${playerMove}-emoji.png" alt="">
<img src="./Images/${computerMove}-emoji.png" alt="">
Computer`;

document.querySelector('.js-score').innerHTML = score(result);

}
  //helper funtion
//variables outside the functions(grouped together in object) so the values dont get zero everytime the function is called
//accessing score data from local storage and converting JSON string to JS object
let scores =  JSON.parse(localStorage.getItem('score'));
// in case of reset button, local data was removed so inside scores in just null
if(!scores)           // = (scores === null) means no score
{ 
scores ={
wins: 0,
losses: 0,
ties: 0
}

};
updateScoreElement()
//restoring the previous scores(stored in local storage)
//not inside function
// console.log(localStorage.getItem('score')); 
//but thi is a string so convert it to JS object.JSON.parse()
//sotre that into scores object now instead of its old object(above) 

function score(result)
{
if(result === 'You lose!')
{
scores.losses ++;
}
else if (result ==='Tie!')
{
scores.ties++;
}
else  if(result ==='You win!')
{
scores.wins ++ ;
}

//storing the scores object(with latest score) in local storage.Bec its object and not string so strinfigy it first
localStorage.setItem('score', JSON.stringify(scores));

return (`Wins: ${scores.wins}, Losses: ${scores.losses}, Ties: ${scores.ties}`);
}


function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${scores.wins}, Losses: ${scores.losses}, Ties: ${scores.ties}`;
}