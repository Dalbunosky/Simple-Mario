let character = document.getElementById("character");
let cactus = document.getElementById("cactus");
let scoreGiven = false, startTime, score = 0, highScore = 0, highTime = 0;
document.getElementById("start").addEventListener("click", startGame);
document.addEventListener("keydown", 
    e=> {
        if(e.keyCode === 32) jump();
    }
);

function startGame(){
    score = 0;
    startTime = Date.now();
    cactus.style.animation = "cactus 3s infinite linear";
    document.getElementById("gameOver").style.display = "none";
    removeMushrooms();
    document.getElementById('score').innerText = '' + score;
    document.getElementById("startBtnTxt").innerText = 'Restart';
    window.requestAnimationFrame(run);
}

function run(testTime){
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    generateMushroom();
    let time = Math.floor((Date.now() - startTime)/100)/10;
    document.getElementById('time').innerText = time;

    // mushroomMove(characterTop)
    // if(cactusCheck(characterTop)){
    if(mushroomMove(characterTop) || cactusCheck(characterTop)){
        cactus.style.left = `${cactus.offsetLeft}px`;
        cactus.style.animation = "none";
        if(highScore <= score){
            highScore = score;
            highTime = ((highTime > time)? highTime : time);
            document.getElementById('highScore').innerText = highScore;
            document.getElementById('highTime').innerText = highTime;
        }
        document.getElementById("gameOver").style.display = "block";
    }
    else{
        requestAnimationFrame(run);
    }
}

function jump(){
    if(character.classList != "animate"){
        character.classList.add("animate");
    }
    setTimeout(()=>{character.classList.remove("animate");}, 500)
}

function cactusCheck(characterTop){
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
    
    if(cactusLeft < 30 && cactusLeft > 0){
        if(characterTop < 95){
            if(!scoreGiven){
                scoreGiven = true;
                score ++;
                document.getElementById('score').innerText = '' + score;
            }
        }
        else{
            cactus.style.left = `${cactusLeft}px`;
            cactus.style.animation = "none";
            return true;
        }
    }
    else{
        scoreGiven = false;
    }
    return false;
}

function generateMushroom(){
    const mushrooms = [...document.getElementById('frame').getElementsByClassName("mushroom")];
    if(mushrooms.length > 3) return;
    if(0.0001 < Math.random()){
        const newShroom = document.createElement('div');
        newShroom.className = "mushroom";
        newShroom.style.speed = Math.ceil(5 * Math.random());
        newShroom.style.given = 0;
        document.getElementById('frame').appendChild(newShroom);
    }
}


function mushroomMove(characterTop){
    const mushrooms = [...document.getElementById('frame').getElementsByClassName("mushroom")];
    const onScreenShrooms = [];
    
    while(mushrooms.length > 0){
        if(parseInt(mushrooms[mushrooms.length - 1].style.left) < -20){
            mushrooms[mushrooms.length - 1].remove();
        }
        onScreenShrooms.push(mushrooms.pop());
    }

    onScreenShrooms.map(mushroom =>{
        const currentPos = mushroom.offsetLeft;
        const speed = mushroom.style.speed;
        mushroom.style.left = `${currentPos-2*speed}px`;
    })
    return mushroomCheck(characterTop, onScreenShrooms);
}

function mushroomCheck(characterTop, onScreenShrooms){
    return onScreenShrooms.some(mushroom =>{
        let mushroomLeft = mushroom.offsetLeft;
        if(mushroomLeft < 30 && mushroomLeft > -20){
            if(characterTop < 130){
                if(mushroom.style.given === 0){
                    mushroom.style.given = 1;
                    score ++;
                    document.getElementById('score').innerText = '' + score;
                }
            }
            else{
                return true;
            }
        }
    })
}

function removeMushrooms(){
    const mushrooms = [...document.getElementById('frame').getElementsByClassName("mushroom")];
    for(let n = mushrooms.length - 1; n > 0; n--){
        mushrooms[n].remove();
    }
}