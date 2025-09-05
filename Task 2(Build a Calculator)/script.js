const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";

// Button clicks
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;

    if (btn.classList.contains("clear")) {
      currentInput = "";
    } 
    else if (btn.classList.contains("delete")) {
      currentInput = currentInput.slice(0, -1);
    } 
    else if (btn.classList.contains("equal")) {
      try {
        currentInput = eval(currentInput.replace("×", "*").replace("÷", "/")).toString();
      } catch {
        currentInput = "Error";
      }
    } 
    else {
      currentInput += value;
    }

    display.value = currentInput;
  });
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if ((e.key >= "0" && e.key <= "9") || "+-*/.".includes(e.key)) {
    currentInput += e.key;
  } 
  else if (e.key === "Enter") {
    try {
      currentInput = eval(currentInput).toString();
    } catch {
      currentInput = "Error";
    }
  } 
  else if (e.key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
  } 
  else if (e.key.toLowerCase() === "c") {
    currentInput = "";
  }
  display.value = currentInput;
});
