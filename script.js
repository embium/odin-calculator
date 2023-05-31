const previous = document.querySelector(".result .previous")
const current = document.querySelector(".result .current")
const buttons = document.querySelectorAll("button");
const equal = document.querySelector(".equal");

for(const button of buttons){
    button.addEventListener("click", (event) => {
        switch(event.target.textContent){
            case "÷":
            case "×":
            case "-":
            case "+":
                let last_character = current.textContent.slice(-1);
                if(!isNaN(parseInt(last_character)))
                    if(current.textContent.length < 10)
                        current.textContent += event.target.textContent;
                break;
            case "AC":
                current.textContent = "";
                previous.textContent = "";
                break;
            case "=":
                let _previous = 0;
                if(previous.textContent !== "") {
                    _previous = previous.textContent;
                }
                let calculation = calculate(
                    current.textContent + ' + ' + _previous);
                previous.textContent = roundToTen(calculation);
                current.textContent = "";
                break;
            default:
                if(current.textContent.length < 10)
                    current.textContent += event.target.textContent;
                break;
        }
    });
}

function roundToTen(num) {
    return +(Math.round(num + "e+10")  + "e-10");
}

document.body.onkeydown = (e) => {
    if(e.key === "Backspace") {
        current.textContent = current.textContent.slice(0, -1)
    } else if (e.key === "Enter") {
        console.log(e.key)
        equal.click();
    }else{
        validKeys = [
            "0", "1", "2", "3", "4"
            , "5", "6", "7", "8", "9"
            , "."
        ]
        if(e.key in validKeys) {
            if(current.textContent.length < 10) current.textContent += e.key;
        }
    }
}

function calculate(input) {
    input = input.replace("×", "*")
    input = input.replace("÷", "/")
    return new Function('return ' + input)();
}