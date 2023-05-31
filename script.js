const previous = document.querySelector(".result .previous")
const current = document.querySelector(".result .current")
const buttons = document.querySelectorAll("button");

for(const button of buttons){
    button.addEventListener("click", (event) => {
        switch(event.target.textContent){
            case "AC":
                current.textContent = "";
                previous.textContent = "";
                break;
            case "=":
                let calculation = calculate(
                    current.textContent + previous.textContent);
                previous.textContent = calculation;
                current.textContent = "";
                break;
            default:
                current.textContent += event.target.textContent;
                break;
        }
    });
}

function calculate(input) {
    input = input.replace("×", "*")
    input = input.replace("÷", "/")
    return new Function('return ' + input)();
}