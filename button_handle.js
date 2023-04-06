var reset;
var test;
var about_toggle = 0;
var buttons = document.getElementsByTagName("button");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", onButtonClick, false);
};

function onButtonClick(event) {
    if(event.target.id === "algo"){
        window.location.href = "https://www.youtube.com/watch?v=w-mOFqMcvdE&t=22099s";
    }
    if(event.target.id === "blog"){
        window.location.href = "https://alienflipsf.medium.com";
    }
    if(event.target.id === "github"){
        window.location.href = "https://github.com/alienflip";
    }
    if(event.target.id === "support"){
        window.location.href = "https://www.buymeacoffee.com/alienflip";
    }
    if(event.target.id === "lens"){
        window.location.href = "https://www.lensfrens.xyz/kingzeus.lens";
    }
    if(event.target.id === "calendly"){
        window.location.href = "https://zcal.co/i/rz3ldPRg";
    }
    if(event.target.id === "about"){
        if(about_toggle == 1){
            document.querySelector(".popup").style.display = "none";
            about_toggle = 0;
        }
        else{
            document.querySelector(".popup").style.display = "block";
            about_toggle = 1;
        }
    }
    if(event.target.id === "exit"){
        document.querySelector(".popup").style.display = "none";
        about_toggle = 0;
    }
}