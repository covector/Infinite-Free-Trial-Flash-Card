var cooldown = false;

importCookie = function(replace){
    let cookiesAdd = document.getElementById("importBar").value;
    if (cookiesAdd != ""){
        if (replace){
            let decision = confirm("Are you sure you want to replace all existing cards? They will be gone forever.");
            if (decision){
                let cookies = document.cookie.split("; ");
                for (let i = 0; i < cookies.length; i++){
                    let equalIndex = cookies[i].indexOf("=");
                    document.cookie = cookies[i].substring(0, equalIndex)+"=Delete; expires=11 Sep 2001 13:46:00 UTC";
                }
                let cookieOne = cookiesAdd.split(";")
                for (let i = 0; i < cookieOne.length; i++){
                    let cookieHalf = cookieOne[i];
                    let equalIndex = cookieHalf.indexOf("=");
                    document.cookie = cookieHalf.substring(0, equalIndex)+"="+cookieHalf.substring(equalIndex + 1)+"; expires=01 Jan 2120 00:00:00 UTC";
                }
            }
        }
        else{
            let cookieOne = cookiesAdd.split(";")
            for (let i = 0; i < cookieOne.length; i++){
                let cookieHalf = cookieOne[i];
                let equalIndex = cookieHalf.indexOf("=");
                document.cookie = cookieHalf.substring(0, equalIndex)+"="+cookieHalf.substring(equalIndex + 1)+"; expires=01 Jan 2120 00:00:00 UTC";
            }
        }  
        alert("Cards have been imported. You can now start a quiz.")
    }
}

exportCookie = function(){
    let copyText = document.getElementById("cookieExport");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

clearCookie = function(){
    let decision = confirm("Are you sure you want to clear? You will have to re-enter all cards if you do so.");
    if (decision){
            let cookies = document.cookie.split("; ")
        for (let i = 0; i < cookies.length; i++){
            let equalIndex = cookies[i].indexOf("=");
            document.cookie = cookies[i].substring(0, equalIndex)+"=Delete; expires=11 Sep 2001 13:46:00 UTC";
        }
    }
}

toggleExport = function(eIN){
    let popUp = document.getElementsByClassName("exportDiv")[0].style
    if (!cooldown){
        if (eIN){
            document.getElementById("cookieExport").value = document.cookie.replace(/; /g, ";");
            popUp.display = "block";
            popUp.animationName = "exportingIN";
            setTimeout(()=>{
                cooldown = false;
            }, 1100);
        }
        else{
            popUp.animationName = "exportingOUT";
            setTimeout(()=>{
                popUp.display = "none";
            }, 900);
            setTimeout(()=>{
                cooldown = false;
            }, 1100);
        }
    }
    cooldown = true;
}