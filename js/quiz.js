var opening = [];
var closing = [];
var closedCard = [];
var dir = [];
var allCards = [];
var activeS = "";
var activeL = "";
var lockScreen = false;
var lockedCard = [];
var left = 0;

window.onload = function(){
    initCard();
}

initCard = function(){
    let cardAmount = loadCookie();
    left = cardAmount;
    let picked = [];
    let before = document.getElementById("endOfTable");
    let pickedAmount = 0;
    while(pickedAmount < cardAmount * 2){
        let rnd = Math.floor(Math.random() * cardAmount);
        let long = Math.floor(Math.random() * 2);
        let compRnd = long + rnd * 2;
        if (!picked[compRnd]) {
            picked[compRnd] = true;
            pickedAmount++;
 
            let divContain = document.createElement("DIV");
            if (long == 0){
                divContain.classList.add("wordCard");  
            }
            else{
                divContain.classList.add("descriptionCard");  
            }
            divContain.classList.add("word"+rnd.toString());
            divContain.classList.add("card"+compRnd.toString());
            divContain.addEventListener("click", function() {
                toggleCard('word'+rnd.toString(), 'card'+compRnd.toString()); 
            });

            let wordDIV = document.createElement("DIV");
            wordDIV.classList.add("word"+rnd.toString());

            divContain.appendChild(wordDIV);
            document.getElementsByClassName("table")[0].insertBefore(divContain, before)  
        }       
    }
}

toggleCard = function(pair, card){
    if (document.getElementsByClassName(card)[0].style.transform == ""){
        document.getElementsByClassName(card)[0].style.transform = "scaleX(1)";
    }
    if (!lockScreen & !lockedCard[pair]) {
        if (!closedCard[card]) { //opening
            if (closing[card]){
                clearInterval(closing[card]);
                dir[card] *= -1;
            }
            closedCard[card] = true;
            opening[card] = setInterval(() => {
                let currCard = document.getElementsByClassName(card)[0];
                let currScale = parseFloat(currCard.style.transform.substring(7, currCard.style.transform.length - 1));
                currCard.style.transform = "scaleX("+(currScale - 0.05 * dir[card]).toString()+")";
                if (currScale < 0.05) {
                    dir[card] = -1;
                    currCard.children[0].textContent = allCards[card];
                }
                if (currScale > 0.95 & dir[card] == -1){
                    clearInterval(opening[card]);
                    currCard.style.transform = "scaleX(1)";
                }
            }, 20)
            if (activeS == ""){
                activeS = pair;
                activeL = card;
            }
            else{
                let wrongCard1 = document.getElementsByClassName(activeL)[0];
                let wrongCard2 = document.getElementsByClassName(card)[0];
                if (activeS == pair) {
                    //success
                    wrongCard1.style.animationName = "greenBlink";
                    wrongCard2.style.animationName = "greenBlink";
                    wrongCard1.style.animationDuration = "1s";
                    wrongCard2.style.animationDuration = "1s";
                    wrongCard1.style.backgroundColor = "rgb(180,255,180)";
                    wrongCard2.style.backgroundColor = "rgb(180,255,180)";
                    wrongCard1.style.animationPlayState = "running";
                    wrongCard2.style.animationPlayState = "running";

                    lockedCard[activeS] = true;
                    lockedCard[pair] = true;
                    activeS = "";
                    activeL = "";

                    left--;
                    if (left == 0){
                        alert("congrats");
                    }
                }
                else{
                    //fail
                    wrongCard1.style.animationName = "";
                    wrongCard2.style.animationName = "";
                    setTimeout(function() {
                        wrongCard1.style.animationName = "redBlink";
                        wrongCard2.style.animationName = "redBlink";
                        wrongCard1.style.animationDuration = "2s";
                        wrongCard2.style.animationDuration = "2s";
                        wrongCard1.style.animationPlayState = "running";
                        wrongCard2.style.animationPlayState = "running";
                    }, 10);

                    lockScreen = true;
                    setTimeout(function() {
                        lockScreen = false;
                        toggleCard(activeS, activeL);
                        toggleCard(pair, card);
                        activeS = "";
                        activeL = "";
                    }, 2500);
                }
            }
        }
        else { //closing
            activeS = "";
            activeL = "";

            if (opening[card]) { 
                clearInterval(opening[card]);
                dir[card] *= -1;
            }
            closedCard[card] = false;
            closing[card] = setInterval(() => {
                let currCard = document.getElementsByClassName(card)[0];
                let currScale = parseFloat(currCard.style.transform.substring(7, currCard.style.transform.length - 1));
                currCard.style.transform = "scaleX("+(currScale - 0.05 * dir[card]).toString()+")";
                if (currScale < 0.05) {
                    dir[card] = -1;
                    currCard.children[0].textContent = "";
                }
                if (currScale > 0.95 & dir[card] == -1){
                    clearInterval(closing[card]);
                    currCard.style.transform = "scaleX(1)";
                }
            }, 20)
        }
    }
}

loadCookie = function(){
    let cookies = document.cookie.split("; ")
    for (let i = 0; i < cookies.length; i++){
        let pair = cookies[i].split("=");
        allCards["card"+(2 * i).toString()] = pair[0];
        allCards["card"+(2 * i + 1).toString()] = pair[1];
        dir["card"+(2 * i)] = 1;
        dir["card"+(2 * i + 1)] = 1;
    }
    return cookies.length;
}