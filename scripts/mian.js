var playbtn = document.querySelector('#play');
var pausebtn = document.querySelector('#pause');
var prevbtn = document.querySelector('#prev');
var nextbtn = document.querySelector('#next');
var i = 1;


var audio, context, analyser, src, array, logo;

logo = document.getElementById("logo").style;

audio = document.getElementById("audio");

playbtn.addEventListener('click',  function () {
    if (!context) {
        preparation();
    }
    else if (audio.paused) {
        audio.play();
        loop();
    }
})

pausebtn.addEventListener('click', function() {
    if (audio.played) {
        audio.pause();
        loop();
    }
})

nextbtn.addEventListener('click', function() {
    i++;
    if(i == 6) {
        i = 1;
    }
    audio.src = `./music/${i}.mp3`;
    audio.play();
    loop();
    
})

prevbtn.addEventListener('click', function () {
    i--;
    if (i == 0) {
        i = 5;
    }
    audio.src = `./music/${i}.mp3`;
    audio.play();
    loop();

})



function preparation() {
    context = new AudioContext();
    analyser = context.createAnalyser();
    src = context.createMediaElementSource(audio);
    src.connect(analyser);
    analyser.connect(context.destination);
    loop();
}

function loop() {
    if (!audio.paused) {
        window.requestAnimationFrame(loop);
    }
    array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);

    logo.minHeight = (array[40]) + "px";
    logo.width = (array[40]) + "px";
}