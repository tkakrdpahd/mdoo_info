function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0,10);
  }
  
  function draw() {
  
    const pointA = [windowWidth * 0.8, 0];
    const pointB = [windowWidth, 0];
    const pointC = [windowWidth, windowHeight];
    const pointD = [windowWidth * 0.8, windowHeight];
    
    quad(pointA[0], pointA[1], pointB[0], pointB[1], pointC[0], pointC[1], pointD[0], pointD[1]);
  }