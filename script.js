const buttons = document.querySelectorAll('button');
const working = document.querySelector('.working');
const answer = document.querySelector('.answer');
const body = document.querySelector('body');
const topdivs = document.querySelectorAll('.top div');
const color = document.querySelector('.color');
const calc = document.querySelector('.calculator');
const image = document.querySelector('img');

image.addEventListener('click', function() {
  const newColor = randomColor();
  buttons.forEach(button => {
      button.style.backgroundColor = newColor;
  });

  topdivs.forEach(div => {
      div.style.color = newColor;
  });

  color.textContent = newColor;
  calc.style.backgroundColor = newColor;
  body.style.color = newColor;
});

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const choice = button.textContent;
    console.log(button.textContent);

    


    if (/[+\-*\/]/.test(working.textContent) && /[+\-*\/]/.test(choice) && choice !== '<-') {
        working.textContent = evaluate(working.textContent);
    }

    working.textContent += choice;
    
    if (working.textContent.length > 18) { working.textContent = working.textContent.slice(0, 18) }

    if (choice === 'AC') {
        working.textContent = "";
        answer.textContent = "";
    }

    if (choice === '<-') {
        if (working.textContent.endsWith('<-')) {
          working.textContent = working.textContent.slice(0, -3);
        } else if (working.textContent.endsWith('<')) {
          working.textContent = working.textContent.slice(0, -2);
        } else {
          working.textContent = working.textContent.slice(0, -1);
        };
        if (working.textContent === "") {answer.textContent = ""};
        };




    if (choice === '=') {
        working.textContent = working.textContent.slice(0, -1);
        answer.textContent = evaluate(working.textContent);
    
    }
    
    });
  });

document.addEventListener("keydown", function(event) {
  const key = event.key;
  const button = document.querySelector(`button[data-key="${key}"]`);
  if (button) {
    button.click();
  }
}
);



function evaluate(preAnswer) {
  try {
    let result = new Function(`return ${preAnswer}`)();
    result = Math.round(result* 10000000)/10000000;

    if (result > 999999999 || result < -999999999) {
      return "TOO BIG";
    }
    if (result < 0.0000001 && result > -0.000001) {
      return "TOO SMA";
    }
    return result;
  } catch (error) {
    return "ERROR";
  }
}

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`
}