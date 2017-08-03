/**
 * Created by DIVYANK KAROLIA on 04-07-2017.
 */
var i = 0;
var tempVal = null;
var j = 0;
var words = 0;

$(function () {

    blink();

    var sampleText = $('#sample');
    var inputText = $('#text');
    var doneText = $('#sampleDone');
    document.getElementById("text").focus();
    $.getJSON("package.json", function (data) {
        var random = Math.round(Math.random() * 7);
        console.log(random);
        sampleText.text(data[random].text);
        text = sampleText.text().split("")
    })

    inputText.keypress(inputChar);





    function inputChar(event) {

        ////////the space condition
        if (text[1] == " ") {
            if (text[0].charCodeAt(0) === event.which) {
                sampleText.css("padding-left", "10px")
            }
            else {
                sampleText.css("padding-left", "0px");
            }
        }
        else {
            sampleText.css("padding-left", "0px");
        }


        if (text[0] == " ") {

            if (text[0].charCodeAt(0) === event.which) {
                doneText.css("padding-right", "10px");
            }
            else if (text[0].charCodeAt(0) !== event.which) {
                sampleText.css("padding-left", "10px")
            }
        }
        else {
            doneText.css("padding-right", "0px");
        }


        ////timer starts on key press
        if (i === 0) {
            startTime();
        }

        /////if wrong input
        if (tempVal !== null) {
            inputText[0].value = tempVal
            tempVal = null;
        }

        ////main code to append the sampleText and doneText
        if (text[0].charCodeAt(0) === event.which) {

            if (event.which === 32) {
                words++;
            }

            doneText.text(doneText.text() + text.splice(0, 1));
            sampleText.text(text.join(""));
            i++;
            if (i > 75) {
                doneText.text(doneText.text().slice(1));
            }

        }
        else {
            j++;
            tempVal = inputText[0].value;
        }
    }

    function blink() {
        var cursor = $('.cursor');
        setInterval(function () {
            if (cursor[0].style.backgroundColor === "darkgrey") {
                cursor[0].style.backgroundColor = "white";
            }
            else {
                cursor[0].style.backgroundColor = "darkgrey";

            }

        }, 500)
    }

    function startTime() {
        var timer = $('#timer');
        var startTime = new Date();

        var intervalKey = setInterval(function () {
            var curTime = new Date();
            timer.text(Math.round(curTime.getTime() / 1000 - startTime.getTime() / 1000));
        }, 1000)

        setTimeout(function () {
            clearInterval(intervalKey);
            $()
            $('.container').text("");

            var app = $(`
                <div class="row">
                    <div class="col-6"> <span class="header">SPEED</span></div>
                    
                    <div class="col-6"><span class="header">ACCURACY</span></div>
                    
                </div>
                
                <div class="row">
                    <div class="col-6" style="text-align: center"> <span class="result">${words}</span><span class="units">WPM</span></div>
                    
                    <div class="col-6 " style="text-align: center"> <span class="result">${ (Math.round(i / (i + j) * 1000)) / 10}</span><span class="units">%</span> </div>
                
                </div>
                <div class="row">
                <div class="col-6">
                    <div class="input-group">
                    <span class="input-group-addon" id="basic-addon1"><i class="fa fa-user" aria-hidden="true"></i></span>
                    <input type="text" id="text" class="form-control" placeholder="Start " aria-describedby="basic-addon1">
                </div>
                </div>
                <div class="col-6">
                
                   <a href="leaderboard.html"> <button type="button" class="btn btn-primary btn-block" onclick="addToStore(event)">Update LeaderBoard</button></a>

                
                </div>
                
            </div>
            
            `);
            $('.container').append(app);
            document.getElementById("text").focus();



        }, 60000)


    }

})


function addToStore(event){
   var userData = localStorage.getItem("userData");
   if(userData===null){
       userData="{}";
   }
   var name = $('#text')[0].value;
    $('#text')[0].value="";
   userData= JSON.parse(userData);
   userData[name]=words;

   localStorage.setItem("userData",JSON.stringify(userData));

}