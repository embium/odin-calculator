const body = document.body;
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
            case "x":
                previous.textContent = current.textContent + "*";
                current.textContent = "";
                break;
            case "=":
                current.textContent = runCalculations(current.textContent);
                break;
            default:
                current.textContent += event.target.textContent;
                break;
        }
    });
}