const previous = document.querySelector(".result .previous");
const current = document.querySelector(".result .current");
const buttons = document.querySelectorAll("button");
const equal = document.querySelector(".equal");

for (const button of buttons) {
    button.addEventListener("click", (event) => {
        switch (event.target.textContent) {
            case "÷":
            case "×":
            case "-":
            case "+":
                let lastCharacter = current.textContent.slice(-1);
                if (!isNaN(parseInt(lastCharacter)) || lastCharacter === ".") {
                    if (current.textContent.length < 10) {
                        current.textContent += event.target.textContent;
                    }
                }
                break;
            case "AC":
                current.textContent = "";
                previous.textContent = "";
                break;
            case "=":
                let _previous = 0;
                if (previous.textContent !== "") {
                    _previous = parseFloat(previous.textContent);
                }
                let calculation = calculate(_previous, current.textContent);
                previous.textContent = roundToTen(calculation);
                current.textContent = "";
                break;
            default:
                if (current.textContent.length < 10) {
                    current.textContent += event.target.textContent;
                }
                break;
        }
    });
}

function roundToTen(num) {
    return +(Math.round(num + "e+10") + "e-10");
}

document.body.onkeydown = (e) => {
    if (e.key === "Backspace") {
        current.textContent = current.textContent.slice(0, -1);
    } else if (e.key === "Enter") {
        equal.click();
    } else {
        const validKeys = [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            ".",
        ];
        if (validKeys.includes(e.key)) {
            if (current.textContent.length < 10) {
                current.textContent += e.key;
            }
        }
    }
};

function calculate(previousValue, currentExpression) {
    currentExpression = currentExpression.replaceAll("×", "*");
    currentExpression = currentExpression.replaceAll("÷", "/");
    try {
        const result = new Function(
            `return ${previousValue + currentExpression}`
        )();
        if (!isNaN(result)) {
            return result;
        } else {
            throw new Error("Invalid expression");
        }
    } catch (error) {
        console.error(error);
        return 0;
    }
}
