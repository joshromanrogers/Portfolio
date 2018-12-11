  // click variables
  var functionIsRunning = false;
  const gaps = document.querySelectorAll('.gap');
  const scoreBoard = document.querySelector('.score');
  const squares = document.querySelectorAll('.square');
  const new1 = document.getElementById('yes');
  let lastHole;
  const easy = document.getElementById("1");
  const medium = document.getElementById("2");
  const hard = document.getElementById("3");
    medium.checked = true;
  

  let colors = ['#ff0000', '#00ff00'];

  // background variables

  let container = document.getElementsByClassName('container')[0];
  const walk = 50;

  

  // function that produxes a random amount of time 
  function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  
  // function that chooses a random hole
  function randomSquare(squares) {
    const idx = Math.floor(Math.random() * squares.length);
    const square = squares[idx];
    if (square === lastHole) {
      return randomSquare(squares);
    }
    lastHole = square;
    return square;
  }


    function randomColor(square) {
        let random_color = colors[Math.floor(Math.random() * colors.length)];
        square.style.backgroundColor = random_color;
    }

    function removeRandomColor(square) {
        square.style.backgroundColor = "white";
    }
  // add's squareUp to square and then removes after times up
    function up() {
    let speed = checkSpeed();
    const time = speed;
    const square = randomSquare(squares);
    randomColor(square);
    square.classList.add('squareUp');
    
    setTimeout(() => {
        square.classList.remove('squareUp');
        removeRandomColor(square);
      if (!timeUp) up();
    }, time);
  }

    // reset score, timeup, run up + timeout functions
    function startGame() {
      if (!functionIsRunning) {
        functionIsRunning = true;
        scoreBoard.textContent = 0;
        timeUp = false;
        score = 0;
        up();
        setTimeout(() => {
          timeUp = true;
          functionIsRunning = false;
        }, 25000);
      }
        else return;
  }

    // if the square is large, add 1 to the score, remove 'squareUp', update scoreboard.
    function hit() {
    if(!(this.classList.contains("squareUp"))) return; // cheater!
    score++;
    this.parentNode.classList.remove('squareUp');
    scoreBoard.textContent = score;
    scoreColour();
  }

  // add 'hit' event listener to all squares onClick
  squares.forEach(square => square.addEventListener('click', hit));

  // function for changing colour of scoreBoard (for 0.25s) to purple when the score increases
  function scoreColour() {
    scoreBoard.style.color = "purple";
    setTimeout(() => {
        scoreBoard.style.color = "white";
    }, 250);
  }

  function checkSpeed(){
    if (easy.checked == true) {
        return randomTime(1500, 2100);
    }
    else if (medium.checked == true) {
        return randomTime(1000, 1500);
    }
    else {
        return randomTime(700, 1500);
    }
  }

  // background

  buildAtom();

  function buildAtom() {
    for (var n = 0; n < 50; n++) {
      var newAtom = document.createElement("div");
      newAtom.classList.add('atom');
      newAtom.style.left = Math.random() * 100 + '%';
      newAtom.style.animationDelay = Math.random() * 20 + 's';
      newAtom.style.animationDuration = 5 + (Math.random() * 10) + 's';
      container.appendChild(newAtom);
    }
  }
    
  function atomMove(e){
    
    // width & height of background
    const { offsetWidth: width, offsetHeight: height} = document.getElementsByClassName('container')[0];
    // where cursor was
    let { offsetX: x, offsetY: y} = e;
    // if what you're hovering over isn't the background, add the difference
   if (this !== e.target){
      x = x + e.target.offsetLeft;
      y = y + e.target.offsetTop;
    }
    
    const xWalk = Math.round((x / width * walk * 0.05) + (walk / 2));
    const yWalk = Math.round((y / height * walk * 0.05) + (walk / 2));


     var atoms = document.querySelectorAll('.atom');


    for (var z = 0; z < atoms.length; z++){
       atoms[z].style.marginLeft = `${-xWalk}px`;
     }
  }


   container.addEventListener('mousemove', atomMove);