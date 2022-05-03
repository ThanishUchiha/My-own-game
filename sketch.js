var bg, bgImg
var player, playerImg, shooterImg, zombieImg, zombieGroup, heart1, heart2, heart3
var heart1Img, heart2Img, heart3Img, score=0, life=3, shotgun_sound, win_sound, oof_sound
var bullets=70
var gameState="fight"

function preload(){
  bgImg=loadImage("HELL.png")
  playerImg=loadImage("Idiot.png")
  zombieImg=loadImage("zombie.png")
  shooterImg=loadImage("shooter.png")
  heart1Img=loadImage("heart_1.png")
  heart2Img=loadImage("heart_2.png")
  heart3Img=loadImage("heart_3.png")
  shotgun_sound=loadSound("shotgun.mp3")
  win_sound=loadSound("win.mp3")
  oof_sound=loadSound("Lost_life.mp3")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  bg=createSprite(displayWidth/2-20, displayHeight/2-40,20,20) 
  bg.addImage(bgImg)
  bg.scale=1.5

  player=createSprite(displayWidth-1150, displayHeight-300,50,50)
  player.addImage(playerImg)
  player.scale=0.3

  player.debug=true
  player.setCollider("rectangle", 0,0, 300,300)

zombieGroup = new Group()
bulletGroup = new Group()

heart1=createSprite(displayWidth-150, 40,20,20)
heart1.visible=false
heart1.addImage(heart1Img)
heart1.scale=0.4

heart2=createSprite(displayWidth-100, 40,20,20)
heart2.visible=false
heart2.addImage(heart2Img)
heart2.scale=0.4

heart3=createSprite(displayWidth-150, 40,20,20)
heart3.addImage(heart3Img)
heart3.scale=0.4

}



function draw() {
  background(255,255,255);  

  if(gameState==="fight"){
    if (life===3){
      heart3.visible=true
      heart1.visible=false
      heart2.visible=false
    }
    if (life===2){
      heart3.visible=false
      heart1.visible=false
      heart2.visible=true
    }
    if (life===1){
      heart3.visible=false
      heart1.visible=true
      heart2.visible=false
    }
    if (life===0){
      gameState="lost"
    }
    if (score==100){
      gameState="won"
    }

  
  if (keyDown("UP_ARROW")||touches.length>0){
    player.y=player.y-10

  }

  if (keyDown("DOWN_ARROW")||touches.length>0){
    player.y=player.y+10
  }
  if (keyWentDown("space")){
   
    
    bullet=createSprite(displayWidth-1150, player.y-30, 30, 10)
    bullet.velocityX=50
    bulletGroup.add(bullet)
    player.addImage(shooterImg)
    player.depth=bullet.depth
    player.depth-player.depth+2
    bullets=bullets-1
    shotgun_sound.play()

    

  }
  else if(keyWentUp("space")){
    player.addImage(playerImg)
  }
  if(bullets==0){
    gameState="bullet"
  }


  if (zombieGroup.isTouching(bulletGroup)){
    for(var i=0; i<zombieGroup.length; i++){
      if (zombieGroup[i].isTouching(bulletGroup)){

        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
        score=score+10
      }
    }
  }
  if (zombieGroup.isTouching(player)){
    for (var i=0; i<zombieGroup.length; i++){
      if (zombieGroup[i].isTouching(player)){
      
        
        zombieGroup[i].destroy()
        life=life-1
        oof_sound.play()
      
      }
    }
  }


  spawnEnemy()
}

  drawSprites();
  textSize(20)
  fill("white")
  text("Bullets="+bullets, displayWidth-110, displayHeight/2-250)
  text("Score="+score, displayWidth-100, displayHeight/2-220)
  text("live="+life, displayWidth-80, displayHeight/2-200)

if (gameState=="lost"){
  textSize(100)
  fill ("red")
  text("YOU LOST NUB",400,400)
  zombieGroup.destroyEach()
  player.destroy()
}
else if(gameState=="won"){
  textSize(100)
  fill("green")
  text("YOU WON YOU PRO",400,400)
  zombieGroup.destroyEach()
  player.destroy()
  win_sound.play()
}

else if(gameState=="bullet"){
  textSize(100)
  fill("blue")
  text("Bullets=Gone", 470, 410)
  zombieGroup.destroyEach()
  player.destroy()
  bulletGroup.destroyEach()
  
}

}

function spawnEnemy(){
if (frameCount%60===0){
  var zombie =createSprite(random(500,1100), random(100,500), 40,40)
  zombie.addImage(zombieImg)
  zombie.velocityX = -4
  zombieGroup.add(zombie)
  zombie.scale = 0.15
  zombie.debug=true
  zombie.setCollider("rectangle", 0,0, 400, 400)
  zombie.lifetime = 400

}
}