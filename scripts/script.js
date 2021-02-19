var collect = document.getElementById("calculateButton");
var downloadButton = document.getElementById("downloadButton");
var originAmount;
var wantedAmount;
var input;
var output;

originAmount = document.getElementById("originAmount").value;
wantedAmount = document.getElementById("wantedAmount").value;
input = document.getElementById("originText").value;
output = document.getElementById("convertedText");

function isNumeric(str) {
    if (typeof str != "string") {
        return false // we only process strings!
    }
    if (str === "/") {
        //console.log("wow");
        return true
    }
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function converFraction(str) {
    tab = str.split("/");
    res = parseFloat(tab[0]) / parseFloat(tab[1]);
    return res;
}

function convertIndegrients(origin, wanted, input) {
    var tab = input.split("");


    var converted = [];
    var fractionFlag = false;
    var seq = ""
    for (var i = 0; i < tab.length; i++) {
        if (isNumeric(tab[i])) {
            //console.log(tab[i]);
            if (seq === "") {
                seq = tab[i];
            } else {
                seq += tab[i];
            }

            var nextCharIndex = i + 1;

            if (nextCharIndex < tab.length && isNumeric(tab[nextCharIndex])) {
                if (tab[nextCharIndex] == "/") {
                    fractionFlag = true;
                }
                continue;
    
            }
            else {

                if (fractionFlag === true) {
                    fractionFlag = false;
                    var new_seq = converFraction(seq);
                    //console.log("frac "+ new_seq);
                    var res = new_seq / parseFloat(originAmount);
                    res = res * parseFloat(wanted);
                    converted.push(res);
                }
                else {
                    //console.log(seq);
                    var res = parseFloat(seq) / parseFloat(originAmount);
                    res = res * parseFloat(wanted);
                    converted.push(res);
                }
            }

        }
        else {
            if (seq != "") {
                seq = "";
            }
            converted.push(tab[i]);
        }
    }
    //console.log(converted.join(""));
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

function saveTXT() {
    if (originAmount === "" || wantedAmount === "" || input === "") {
        alert("Insert some data");
    }
    else {
        console.log("download");
        filename = "TastyDinner";
        randomNum = Math.floor((100000) * Math.random());
        filename += randomNum.toString();
        filename += ".txt";
        download(filename, ("Your indegrients:\n" + output.value));


    }
}

function viewTXT() {
    if (originAmount === "" || wantedAmount === "" || input === "") {
        alert("Insert some data");
    }
    else {
        console.log("view");

        var wnd = window.open("about:blank", "_blank");
        wnd.document.write("<head>");
        wnd.document.write("<meta name=viewport content=width=device-width, initial-scale=1></meta>");
        wnd.document.write("</head>");
        wnd.document.write("<h2>Your indegrients</h2>");
        wnd.document.write(("<p>" + "For " + wantedAmount + " portions" + "</p>"));
        wnd.document.write("<ul>")
        var word = "";
        for (var i = 0; i < output.value.length; i++) {
            //console.log(output.value[i]);

            if (output.value[i] != "\n") {
                word += output.value[i];
            } else {
                wnd.document.write(("<li>" + word + "</li>"));
                word = "";
            }

            if (i + 1 >= output.value.length) {
                //console.log("end");
                wnd.document.write(("<li>" + word + "</li>"));
            }
        }
        wnd.document.write("</ul>");
        wnd.document.write("<button type=button onclick=window.print()>Print</button>")
    }
}



function showPreview()
{
    console.log("preview")
    var originAmount = document.getElementById("originAmount")
    originAmount.value = "2";
    var wantedAmount = document.getElementById("wantedAmount")
    wantedAmount.value = "7";
    var originText = document.getElementById("originText")
    originText.value = "This is an example:\n1 egg \n2 cups of milk\n1/2 cup of flour";

    var cook = document.getElementById("calculateButton");
    cook.click();
    console.log("showed");

}