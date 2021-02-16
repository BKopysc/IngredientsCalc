var collect = document.getElementById("calculateButton");
var downloadButton = document.getElementById("downloadButton");
var originAmount;
var wantedAmount;
var input;
var output;

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function convertIndegrients(origin, wanted, input) {
    var tab = input.split("");


    var converted = [];
    var seq = ""
    for (var i = 0; i < tab.length; i++) {
        if (isNumeric(tab[i])) {
            if (seq === "") {
                seq = tab[i];
            } else {
                seq += tab[i];
            }

            var nextCharIndex = i+1;

            if (nextCharIndex < tab.length && isNumeric(tab[nextCharIndex])) {
                continue;
            }
            else {
                var res = parseFloat(seq) / parseFloat(originAmount);
                res = res * parseFloat(wanted);
               // console.log(res);
                converted.push(res);
                /*
                var res = parseFloat(tab[i]) / parseFloat(originAmount);
                res = res * parseFloat(wanted);
                console.log(res);
                converted.push(res);
                */
            }

        }
        else {
            if (seq != "") {
                seq = "";
            }
            converted.push(tab[i]);
        }
    }
    console.log(converted.join(""));


    //console.log(tab);
    output.value = converted.join("");
}

collect.onclick = function () {
    originAmount = document.getElementById("originAmount").value;
    wantedAmount = document.getElementById("wantedAmount").value;
    input = document.getElementById("originText").value;
    output = document.getElementById("convertedText");

    if (originAmount === "" || wantedAmount === "" || input === "") {
        alert("Insert some data");
    }
    else {
        convertIndegrients(originAmount, wantedAmount, input);
    }
};

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

downloadButton.onclick = function () {
    console.log("download");
    filename = "TastyDinner";
    randomNum = Math.floor((100000) * Math.random());
    filename += randomNum.toString();
    filename += ".txt";
    console.log(filename);
    download(filename, ("Your indegrients:\n" + output.value));
}