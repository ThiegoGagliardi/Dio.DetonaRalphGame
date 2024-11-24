const state = {
    view: {
        squares   : document.querySelectorAll(".square"),
        enemy     : document.getElementsByClassName(".enemy"),
        timeLeft  : document.getElementById("time-left"),
        score     : document.getElementById("score"),
        lives     : document.getElementById("lives"),
    },
    values: {        
        gameVelocity : 1000,
        hitPosition  : null,
        totalScore   : 0,
        totalLives   : 3,
        currentTime  : 60,
    },
    actions:{
        timerId      : null,
        countDownTimerId : setInterval(countDown,1000)
    }
}

function countDown(){
    
    state.values.currentTime --;
    state.view.timeLeft.textContent = state.values.currentTime;
    
    if ((state.values.currentTime <= 0) || (state.values.totalLives <= 0)){
        
        playSound("Explosion18");

        alert(`Game Over! O Seu resultado foi: ${state.values.totalScore}`);
        
        state.values.totalScore = 0;
        clearInterval(state.actions.timerId);
        clearInterval(state.actions.countDownTimerId);
    }
}

function randomSquare()
{
    state.view.squares.forEach((square) => {
                                                square.classList.remove("enemy");
                                            });

    let randomNumber = Math.floor(Math.random()*9);

    let randomSquare = state.view.squares[randomNumber];

    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy(){
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function playSound(name){

    let audio = new Audio(`./src/audios/${name}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function addListenerHitBox(){
    state.view.squares.forEach(square => {
                                           square.addEventListener("click", () => {
                                                                    if (square.id === state.values.hitPosition){

                                                                        state.values.totalScore++;
                                                                        state.values.hitPosition = null;
                                                                        state.view.score.textContent = state.values.totalScore;
                                                                        playSound("hit");

                                                                        if ((state.values.totalScore%4) === 0){
                                                                            
                                                                            state.values.currentTime ++;
                                                                            state.view.timeLeft.textContent = state.values.currentTime;
                                                                            state.values.totalLives ++;
                                                                            state.view.lives.textContent = `X${state.values.totalLives}`;
                                                                        }
                                                                    } else {
                                                                        state.values.totalLives --;
                                                                        state.view.lives.textContent = `X${state.values.totalLives}`;
                                                                    };                                            
                             
                                        }
                               )})
}

function init()
{
    moveEnemy();
    addListenerHitBox();
}

init();