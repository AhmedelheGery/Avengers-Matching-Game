
var arr = ['1' , '1' , '2' , '2' , '3' , '3' , '4' , '4' , '5' , '5' , '6' , '6'];
var cardsContainer = document.getElementById('cards-container');
var values  = [];
var cover_id = [];
var count   = 0;
// GET THE BOX MODAL ELEMENTS FROM DOM
var modal    = document.getElementById('myModal');
var close    = document.getElementById('closeModal');
var gameWin  = document.getElementById('gameWin');
var gameLose = document.getElementById('gameLose');
// GET THE MODAL BOX CONFIRM
var yesPlay = document.getElementById('yesPlay');
var noPlay  = document.getElementById('noPlay');
// TIMER
var gameCounter = document.getElementById('gameCounter');
var counter = 36;
var timer;
// COUNT DOWN FUNCTION
function countDown(){
    counter--;
    if (counter < 10){
        gameCounter.innerHTML = "0"+counter;
    }else{
        gameCounter.innerHTML = counter;
    }
    if (counter == 0){
        counter = 36;
        modal.style.visibility = 'visible';
        gameLose.style.display = 'block';
        clearInterval(timer);
    }
    window.onclick = function (e){
        if (e.target === modal || e.target === close){
            modal.style.visibility = 'hidden';
        }
        if (e.target === yesPlay){
            modal.style.visibility = 'hidden';
            document.getElementById('cards-container').innerHTML = "";
            newGame();
            counter = 36;
            timer = setInterval(function(){countDown()}, 1000);   
        }
        else if (e.target === noPlay){
            modal.style.visibility = 'hidden';
            document.getElementById('cards-container').innerHTML = "";
        }
    }
}
// TIMER WILL START AFTER 3 SECONDS
timer = setInterval(function(){countDown()}, 1000);
// CREATE AN ARRAY FUNCTION TO SHUFFLE THE ARRAY
Array.prototype.shuffle = function(){
    for (var i = (arr.length - 1) ; i >= 0 ; i--){
        var randomInput = Math.floor(Math.random() * i + 1);
        var indexNum    = arr[randomInput];
        arr[randomInput]= arr[i] ;
        arr[i] = indexNum ;
    }
    return arr;
}
// FUNCTION THAT GENERATING NEW BOARD AFTER FINSHING THE GAME
function newGame(){
    count = 0;
    var output = '';
    arr.shuffle(); 
    for(var i = 0 ; i < arr.length ; i++){
        output = output + '<div class="card" id="cover_'+i+'" onclick="memoryFlipcover(this, \''+arr[i]+'\')"></div>' ;
    }
    cardsContainer.innerHTML = output;
}
// SHUFFLE THE ARRAY ON EVERY LOAD
window.addEventListener('load' , newGame);

// FUNCTION THAT RUN THE GAME :)
function memoryFlipcover(cover, val){
    if(cover.innerHTML === "" && values.length < 2){
        cover.style.background = '#fff';
        cover.innerHTML='<img class="img-responsive" src="imgs/'+val+'.png"/>';
        //CARD ONE
        if (values.length === 0){
            // REPRESENT THE VALUES THAT USER CLICKING AND ADD THEM TO AN ARRAY
            values.push(val);
            cover_id.push(cover.id);
        //CARD TWO
        } else if (values.length === 1){
            values.push(val);
            cover_id.push(cover.id);
            // FUNCTION THAT HIDE THE CARD IF THEY ARE MATCHING
            if (values[0] === values[1]){
                var c1 = document.getElementById(cover_id[0]);
                var c2 = document.getElementById(cover_id[1]);
                setTimeout(function(){
                    c1.style.visibility = 'hidden';
                    c2.style.visibility = 'hidden';
                } , 500);
                count += 2;
                // CLEAR BOTH ARRAYS
                values  = [];
                cover_id = [];
                // CHECK IF THE WHOLE BOARD IS CLEARED
                if ( count === arr.length){
                    clearInterval(timer);
                    setTimeout(function(){
                        // SHOW THE BOX MODAL
                        modal.style.visibility = 'visible';
                        gameWin.style.display = 'block';
                        window.onclick = function (e){
                            if (e.target === modal || e.target === close){
                                modal.style.visibility = 'hidden';
                            }
                            if (e.target === yesPlay){
                                modal.style.visibility = 'hidden';
                                document.getElementById('cards-container').innerHTML = "";
                                newGame();
                                counter = 36;
                                timer = setInterval(function(){countDown()}, 1000);
                            }
                            else if (e.target === noPlay){
                                modal.style.visibility = 'hidden';
                                document.getElementById('cards-container').innerHTML = "";
                            }
                        }
                 }, 500);
                }

              // IF THE CARDS ARE NOT MATCHING FLIP THE CARD            
            } else {
                function flipToBack(){
                    var CardOne = document.getElementById(cover_id[0]);
                    var CardTwo = document.getElementById(cover_id[1]);
                    // SET MULTIPLE STYLE BY SET ATTRIBUTE
                    CardOne.setAttribute("style", "background-color: rgba(255, 255, 255, 0.8);");
                    CardOne.innerHTML = '';
                    CardTwo.setAttribute("style", "background-color: rgba(255, 255, 255, 0.8);");
                    CardTwo.innerHTML = '';
                    // CLEAR BOTH ARRAYS
                    values  = [];
                    cover_id = [];
                }
                // TIME THAT THE CARD WILL TAKE TO FLIP
                setTimeout(flipToBack , 500);
                
            }
        }
    }
}

