let character = document.getElementById("character");
// let mushroom = document.getElementById("mushroom");
let cactus = document.getElementById("cactus");
let scoreGiven = false, startTime = "0s", score = 0, highScore = 0, highTime = 0, run;
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
    document.getElementById("gameOver").style.zIndex = -5;
    run = setInterval(cactusCheck, 10);
    document.getElementById('score').innerText = '' + score;
}

function jump(){
    if(character.classList != "animate"){
        character.classList.add("animate");
    }
    setTimeout(()=>{character.classList.remove("animate");}, 500)
}

function turn(){
    generateMushroom();
    mushroomCheck();

    // if(!hitCactus() && !hitMushroom())
    // else(updateTime())
}

function cactusCheck(){
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
    let time = Math.floor((Date.now() - startTime)/100)/10;

    if(cactusLeft < 30 && cactusLeft > 0){
        if(characterTop < 130){
            if(!scoreGiven){
                scoreGiven = true;
                score ++;
                document.getElementById('score').innerText = '' + score;
            }
            document.getElementById('time').innerText = time;
        }
        else{
            highScore = ((highScore > score)? highScore : score);
            if(highScore <= score){
                highScore = score;
                highTime = ((highTime > time)? highTime : time);
                document.getElementById('highScore').innerText = highScore;
                document.getElementById('highTime').innerText = highTime;
            }
            cactus.style.left = `${cactusLeft}px`;
            cactus.style.animation = "none";
            clearInterval(run);
            document.getElementById("gameOver").style.zIndex = 5;
            // Remove existing mushrooms
        }
    }
    else{
        scoreGiven = false;
        document.getElementById('time').innerText = time;
    }

}

function generateMushroom(){
    const mushrooms = [...document.getElementById('frame').getElementsByClassName("mushroom")];
    if(mushrooms.length > 3) return;
    if(0.0001 < Math.random()){
        const newShroom = document.createElement('div');
        newShroom.className = "mushroom";
        newShroom.style.speed = Math.ceil(5 * Math.random());
        // console.log(newShroom);
        // mushrooms.push(newShroom);
        document.getElementById('frame').appendChild(newShroom);
    }
}


function mushroomCheck(){
    const mushrooms = [...document.getElementById('frame').getElementsByClassName("mushroom")];
    const onScreenSchrooms = [];
    
    while(mushrooms.length > 0){
        if(mushrooms[mushrooms.length - 1].offsetLeft < -20){
            // document.getElementById('frame').removeChild(mushrooms[mushrooms.length - 1]);
            console.log(mushrooms[mushrooms.length - 1]);
            mushrooms[mushrooms.length - 1].remove();
        }
        console.log(mushrooms[mushrooms.length - 1].style.speed);
        onScreenSchrooms.push(mushrooms.shift());
    }

    onScreenSchrooms.map(mushroom =>{
        // put in mario check here
        const currentPos = mushroom.offsetLeft;
        const speed = mushroom.style.speed;
        mushroom.style.left = `${currentPos-speed}px`;
    })
}



// document.getElementById("test").addEventListener("click", generateTest);
// function generateTest(){
//     const newElement = document.createElement('button');
//     newElement.id = "killMe"
//     newElement.innerHTML = 'kill me';
//     newElement.onclick = () => removeTest();
//     document.getElementById('test').parentNode.appendChild(newElement);
// }


// function removeTest(){

//     document.getElementById('killMe').parentNode.removeChild(document.getElementById('killMe'));
// }