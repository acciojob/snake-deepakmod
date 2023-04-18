let gameContainer=document.getElementById("gameContainer");
let snake=document.getElementById("pixel1");
let scoreElement = document.getElementById("score");
let column=1,row=1;
let foodItemsList=[];


for (let i = 2; i <= 2; i++) {
    const foodItem=document.createElement("div");
    let id="pixel"+i;
    foodItem.id=id;
    foodItem.className="food";
    let left=generateRandomOffset();
    let top=generateRandomOffset();
    let foodItemObject={
        left:left,
        top:top,
        id:id
    }
    foodItemsList.push(foodItemObject);
    foodItem.style.left=left+"px";
    foodItem.style.top=top+"px"
    gameContainer.appendChild(foodItem);
}

function eatFood(){
    let snakeTop = (row-1)*10;
    let snakeLeft = (column - 1)*10 ;
    let foodId; 
    for(let i = 0 ; i < foodItemsList.length; i++){
        if(foodItemsList[i].left == snakeLeft && foodItemsList[i].top == snakeTop){
            scoreElement.innerText = parseInt(scoreElement.innerText) + 10 ;
            foodId = foodItemsList[i].id;
        }
    }

    if(!foodId) return ;

    foodItemsList = foodItemsList.filter((food) => {
        return food.id != foodId;
    })

    let capturedFoodItem = document.getElementById(foodId);
    gameContainer.removeChild(capturedFoodItem);

}

function moveSnakeToRight(){
    eatFood();
    let currentOffset=(column-1)*10;
    snake.style.left=(currentOffset+10)+"px";
    column++;
    if(column==41){
        column=1;
        snake.style.left=0;
    }
}

function moveSnakeToLeft(){
    eatFood();
    let currentOffset=(column-1)*10;
    snake.style.left=(currentOffset-10)+"px";
    column--;
    if(column==0){
        column=40;
        snake.style.left="390px";
    }
}

function moveSnakeToTop(){
    eatFood();
    let currentOffset=(row-1)*10;
    snake.style.top=(currentOffset-10)+"px";
    row--;
    if(row==0){
        row=40;
        snake.style.top="390px";
    }
}

function moveSnakeToBottom(){
    eatFood();
    let currentOffset=(row-1)*10;
    snake.style.top=(currentOffset+10)+"px";
    row++;
    if(row==41){
        row=1;
        snake.style.top=0;
    }
}

let intervalId=setInterval(moveSnakeToRight,100);

document.body.addEventListener("keyup", (e) => {
    if(["ArrowRight", "ArrowDown", "ArrowUp", "ArrowLeft"].includes(e.key)){
        clearInterval(intervalId);
    }
    if(e.key === "ArrowRight"){
        intervalId = setInterval(moveSnakeToRight, 100)
    }
    else if(e.key === "ArrowDown"){
        intervalId = setInterval(moveSnakeToBottom, 100);
    }
    else if(e.key === "ArrowUp"){
        intervalId = setInterval(moveSnakeToTop, 100);
    }
    else if(e.key === "ArrowLeft"){
        intervalId = setInterval(moveSnakeToLeft, 100);
    }
});

function generateRandomOffset(){
    let number = parseInt(Math.random()*100) ;
    if(number >= 40){
        return parseInt(number/ 10)*10;
    }
    return number*10;
}