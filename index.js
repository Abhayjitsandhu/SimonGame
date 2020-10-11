var gamePattern=[];
var userPattern=[];
var level=0;
var started=false;
var btnColours=["red","blue","green","yellow"];


$(document).keypress(function(){
  if(!started)
  {
    started=true;
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});


$(".btn").on("click",function(){
  var userChosenButton = $(this).attr("id");
  userPattern.push(userChosenButton);
  playSound(userChosenButton);
  animate(userChosenButton)
  checkAnswer(userPattern.length-1);
});

function animate(user){
  $("#" + user).addClass("pressed");
  setTimeout(function(){
    $("#" + user).removeClass("pressed");
  },100);
}


function nextSequence(){
  userPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  var n= Math.random();
  n*=4;
  n=Math.floor(n);
  var randomChosenColour=btnColours[n];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


function playSound(name){
  var audio= new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function checkAnswer(currentLevel){
  if(userPattern[currentLevel]==gamePattern[currentLevel])
  {
    console.log("success");
    if(userPattern.length==gamePattern.length)
    {
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any key to restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}


function startOver(){
  started=false;
  gamePattern=[];
  level=0;
}
