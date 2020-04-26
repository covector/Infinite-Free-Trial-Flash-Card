window.onload = function() {
    displayCookie();
}

removeWord = function(id){
    let decision = confirm("Are you sure you want to remove this card?");
    if (decision){
        let word = document.getElementById(id);
        removeCookie(id);
        word.remove(); 
    }
}

addWord = function(){
    let keyWord = document.getElementById("word");
    let description = document.getElementById("description");
    let customID = keyWord.value;
    let before = document.getElementsByClassName("cardAdding")[0];
    if (dataValidation()){
        let divContain = document.createElement("DIV");
        divContain.id = customID;
        divContain.classList.add("cardAdded");

        let wordContain = document.createElement("DIV");
        wordContain.textContent = keyWord.value;
        wordContain.classList.add("word");

        let descContain = document.createElement("DIV");
        descContain.textContent = description.value;
        descContain.classList.add("description");

        let buttonContain = document.createElement("DIV");
        buttonContain.textContent = "-";
        buttonContain.addEventListener("click", function(){removeWord(customID)});
        buttonContain.classList.add("minus");

        divContain.appendChild(wordContain);
        divContain.appendChild(descContain);
        divContain.appendChild(buttonContain);
        document.getElementsByClassName("list")[0].insertBefore(divContain, before)

        addCookie(keyWord.value, description.value);

        keyWord.value = "";
        description.value = "";
    }
}

dataValidation = function(){
    let keyWord = document.getElementById("word");
    let description = document.getElementById("description");
    if (keyWord.value == "" | description.value == "") { return false; }
    if (hasCookie(keyWord.value)) { return false; }
    if (keyWord.value.includes("=") | keyWord.value.includes(";") | description.value.includes("=") | description.value.includes(";")) { return false; }
    return true;
}

displayCookie = function(){
    let cookies = document.cookie.split("; ")
    if (cookies[0].length != 0){
        for (let i = 0; i < cookies.length; i++){
            let pair = cookies[i].split("=");
            let word = pair[0];
            let desc = pair[1];  
            let before = document.getElementsByClassName("cardAdding")[0];

            let divContain = document.createElement("DIV");
            divContain.id = word;
            divContain.classList.add("cardAdded");
        
            let wordContain = document.createElement("DIV");
            wordContain.textContent = word;
            wordContain.classList.add("word");
        
            let descContain = document.createElement("DIV");
            descContain.textContent = desc;
            descContain.classList.add("description");
        
            let buttonContain = document.createElement("DIV");
            buttonContain.textContent = "-";
            buttonContain.addEventListener("click", function(){removeWord(word)});
            buttonContain.classList.add("minus");

            divContain.appendChild(wordContain);
            divContain.appendChild(descContain);
            divContain.appendChild(buttonContain);
            document.getElementsByClassName("list")[0].insertBefore(divContain, before)    
        }
    }
}

addCookie = function(word, description){
    document.cookie = word+"="+description+"; expires=01 Jan 2120 00:00:00 UTC";
}

removeCookie = function(word){
    document.cookie = word+"=Delete; expires=11 Sep 2001 13:46:00 UTC";
}

hasCookie = function(word){
    let cookies = document.cookie.split("; ")
    for (let i = 0; i < cookies.length; i++){
        if (cookies[i].split("=")[0] == word){
            return true;
        }
    }
    return false;
}