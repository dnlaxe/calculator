const buttons = document.querySelectorAll('button');
const working = document.querySelector('.working');
const answer = document.querySelector('.answer');
const body = document.querySelector('body');
const topdivs = document.querySelectorAll('.top div');
const color = document.querySelector('.color');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const choice = button.textContent;
    console.log(button.textContent);

    if (/[+\-*\/]/.test(working.textContent) && /[+\-*\/]/.test(choice)) {
        working.textContent = evaluate(working.textContent);
    }
    
    working.textContent += choice;

    if (choice === 'AC') {
        working.textContent = "";
        answer.textContent = "";
    }

    if (choice === '<-') {
        working.textContent = working.textContent.slice(0, -3);
    }

    if (choice === 'C') {
        working.textContent = working.textContent.slice(0, -1);
        const newColor = randomColor();
        buttons.forEach(button => {
            button.style.backgroundColor = newColor;
        });

        topdivs.forEach(div => {
            div.style.color = newColor;
        });

        body.style.backgroundColor = newColor;

        color.textContent = newColor;
    }

    if (choice === '=') {
        working.textContent = working.textContent.slice(0, -1);
        answer.textContent = evaluate(working.textContent);
    }
    
    
    
    });
  });

function evaluate(preAnswer) {
  try {
    return new Function(`return ${preAnswer}`)();
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