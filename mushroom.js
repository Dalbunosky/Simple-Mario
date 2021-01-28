
export default class Mushroom{
// generate mushroom
// assign speed, location of release
//     
    constructor(){

    }

    scoreOrGameOver(){
        // Is mushroom in character'a area
            //Yes, check if character has jumped over mushroom
                //Yes, has score been given
                    //Yes, don't care
                    //No, give score, update score, don't allow score add in future
                //No, game over
            //No, don't care
        // if(mushroomLeft)
    }
}
    ()=>{
        let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        let mushroomLeft = parseInt(window.getComputedStyle(mushroom).getPropertyValue("left"));
        if(mushroomLeft < 30 && mushroomLeft > 0){
            if(characterTop < 130){
                if(!scoreGiven){
                    scoreGiven = true;
                    score ++;
                    document.getElementById('score').innerText = '' + score;
                }
            }
            else{
                mushroom.style.animation = "none";
                alert("跳唔起啊? 減肥啦!!!")
            }
        }
        else{
            scoreGiven = false;
        }
    }