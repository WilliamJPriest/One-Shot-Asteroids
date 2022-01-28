// William J.Priest Github: https://github.com/WilliamJPriest
// This is the first game I ever created in Vanilla JavaScript, and I'm really proud of it
// but insterested in all suggestions for improvements

//player
const playerObj= document.querySelector("#player");   

///Containers and Button

const gameContainer= document.querySelector("#game-container")
const asteroidContainer= document.querySelector("#asteroid-container")
const gameOverContainer= document.querySelector("#gameover-container")
const respawnBTN= document.querySelector("#respawn-BTN")

//asteroids  
let coordinates=[40,60,80,100,120,160]// for asteroid spawning
const asteroid= document.querySelectorAll(".asteroid")
const asteroid1 = document.querySelector(".asteroid1")
const asteroid2 = document.querySelector(".asteroid2")
const asteroid3 = document.querySelector(".asteroid3")


//variables

let score=0
let lazerPosY=0; // determines lazer position
let randomPos=0
let playerMovement=0
let asteroidPos=0;//determines asteroid position
let addedPoints=200;
let asteroidSpeed=1;



//Asteroid Functions


//resets the asteroids back to normal after going off screen or being destroyed
function resetAsteroids(){
    for(let i=0; i<6;i++){
        randomPos= coordinates[Math.floor(Math.random()*coordinates.length)]
    }
    asteroid1.style.display="block"
    asteroid2.style.display="block"
    asteroid3.style.display="block"
    asteroidPos=0;
    asteroid1.style.left=`${randomPos}px`
    asteroid2.style.left=`${randomPos+40}px`
    asteroid3.style.left=`${randomPos+70}px`
    asteroidMovement()
}
resetAsteroids()



function asteroidMovement(){
    asteroidPos=asteroidPos+asteroidSpeed;
    asteroid1.style.transform=`translateY(${asteroidPos}px)`
    asteroid2.style.transform=`translateY(${asteroidPos}px)`
    asteroid3.style.transform=`translateY(${asteroidPos}px)`
    let vh= gameContainer.clientHeight;
    vh=vh+4
    if(asteroidPos>=vh){
        resetAsteroids()
    }else{
        shipDestroyed()
        requestAnimationFrame(asteroidMovement)
    }
}


window.requestAnimationFrame(asteroidMovement) 

//Collision functions, one to check if the lazer hit an asteroid
// and another to see if the player was hit, it's set up this why 
//because i found it worked best

function collisionDetector(){
    let asteroidDestroyed1= asteroid1.getBoundingClientRect()
    let asteroidDestroyed2= asteroid2.getBoundingClientRect()
    let asteroidDestroyed3= asteroid3.getBoundingClientRect()
    let lazerHit= document.querySelector(".lazer").getBoundingClientRect()

    if(
        asteroidDestroyed1.left< lazerHit.right &&
        asteroidDestroyed1.top< lazerHit.bottom &&
        asteroidDestroyed1.right> lazerHit.left &&
        asteroidDestroyed1.bottom> lazerHit.top 
    ){ 
        asteroid1.value="hit"
        asteroidCrumbly()
    }
    if(
        asteroidDestroyed2.left< lazerHit.right &&
        asteroidDestroyed2.top< lazerHit.bottom &&
        asteroidDestroyed2.right> lazerHit.left &&
        asteroidDestroyed2.bottom> lazerHit.top 
    ){ 
        asteroid2.value="hit"
        asteroidCrumbly()
    }
    if(
        asteroidDestroyed3.left< lazerHit.right &&
        asteroidDestroyed3.top< lazerHit.bottom &&
        asteroidDestroyed3.right> lazerHit.left &&
        asteroidDestroyed3.bottom> lazerHit.top 
    ){ 
        asteroid3.value="hit"
        asteroidCrumbly()
    }
}

function shipDestroyed(){
    let asteroidDestroyed1= asteroid1.getBoundingClientRect()
    let asteroidDestroyed2= asteroid2.getBoundingClientRect()
    let asteroidDestroyed3= asteroid3.getBoundingClientRect()
    let playerHit= player.getBoundingClientRect()

    if(
        playerHit.left< asteroidDestroyed1.right &&
        playerHit.top< asteroidDestroyed1.bottom &&
        playerHit.right> asteroidDestroyed1.left &&
        playerHit.bottom> asteroidDestroyed1.top ||
        playerHit.left< asteroidDestroyed2.right &&
        playerHit.top< asteroidDestroyed2.bottom &&
        playerHit.right> asteroidDestroyed2.left &&
        playerHit.bottom> asteroidDestroyed2.top ||
        playerHit.left< asteroidDestroyed3.right &&
        playerHit.top< asteroidDestroyed3.bottom &&
        playerHit.right> asteroidDestroyed3.left &&
        playerHit.bottom> asteroidDestroyed3.top 
    ){
        gameOver()
        
    }
    
}

//keeps the same asteroid from being counted as destroyed infintely.

function asteroidCrumbly(){
    if(asteroid1.value==="hit"){
        asteroid1.style.display="none"
        asteroid1.value=" "
        return updateScore()
        
    }

    if(asteroid2.value==="hit"){
        asteroid2.style.display="none"
        asteroid2.value=""
        return updateScore()
    }
    if(asteroid3.value==="hit"){
        asteroid3.style.display="none"
        asteroid3.value=""
        return updateScore()
    }
}

function updateScore(){
    const scoreCard= document.querySelector("#score-card")
    score= score+addedPoints;
    scoreCard.innerText=score;
    //scalable difficulty
    if(score>=2000){
        asteroidSpeed=3;
        addedPoints=500
    }
    if(score>5000){
        asteroidSpeed=5;
        addedPoints=1000;
    }
}


function gameOver(){
    gameContainer.remove()
    respawnBTN.style.display="block"
    gameOverContainer.style.display="block"

}

//Lazer Function

function lazerAnimation(){
    //can only fire once issue
    //make a new lazer like the asteroids
    //create new ones and destroy old ones as thy leave the screen
    lazerPosY=lazerPosY-5;
    document.querySelector(".lazer").style.transform=`translateY(${lazerPosY}px)`
    let vh= gameContainer.clientHeight;
    vh=-1*vh-4-100;
    if(lazerPosY<=vh){
        document.querySelector(".lazer").remove()
        lazerPosY=0;
        playerObj.style.color="lightgreen"
    }else{
        collisionDetector()
        window.requestAnimationFrame(lazerAnimation)
}
}

//creates new lazer on button click
document.addEventListener("keydown",(e)=>{
    let isLazerFired=e.key;
    let playerObjX= playerObj.getBoundingClientRect().left
    let playerObjY= playerObj.getBoundingClientRect().top
    e.preventDefault()
    if(isLazerFired===' ' && playerObj.style.color!="red"){
        playerObj.style.color="red"
        let newLazer= document.createElement("div")
        newLazer.classList.add("lazer")
        newLazer.innerText="|"
        gameContainer.append(newLazer)
        let lazer= document.querySelector(".lazer")
        lazer.style.left=`${playerObjX}px`
        lazer.style.top=`${playerObjY}px`
        lazer.style.display="block"
        window.requestAnimationFrame(lazerAnimation)
        
    }
})    

//player movement

document.addEventListener("keydown",(e)=>{
    let playerObjX= playerObj.getBoundingClientRect().left //keep in local scope otherwise really slow
    let keyPressed = e.key.toLowerCase();
    if(keyPressed==='a'){
        playerObj.style.left=`${playerMovement= playerMovement-10}px`
        if(playerMovement<0){
            playerObj.style.left=`0px`
            playerMovement=0;
        }
    }
    if(keyPressed==='d'){
        playerObj.style.left= `${playerMovement = playerMovement+10}px`
        if(playerMovement>280){
            playerObj.style.left=`280px`
            playerMovement=280;
        }
    }
})
    
//respawn or restart button
document.addEventListener("click",()=>{
    location.reload()
})
