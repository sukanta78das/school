
(function () {
  const canvas = document.getElementById("ca-bg");
  const ctx = canvas.getContext("2d");

  let width, height;
  const cellSize = 8;

  let cols, rows;
  let grid = [];

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;

    cols = Math.floor(width / cellSize);
    rows = Math.floor(height / cellSize);

    grid = createGrid();
  }

  function createGrid() {
    let arr = [];
    for (let i = 0; i < cols; i++) {
      arr[i] = [];
      for (let j = 0; j < rows; j++) {
        arr[i][j] = Math.random() > 0.9 ? 1 : 0;
      }
    }
    return arr;
  }

  function nextGen(grid) {
    let next = [];

    for (let i = 0; i < cols; i++) {
      next[i] = [];
      for (let j = 0; j < rows; j++) {

        let neighbors = 0;

        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            if (x === 0 && y === 0) continue;

            let col = (i + x + cols) % cols;
            let row = (j + y + rows) % rows;

            neighbors += grid[col][row];
          }
        }

        let state = grid[i][j];

        if (state === 1 && (neighbors < 2 || neighbors > 3)) {
          next[i][j] = 0;
        } else if (state === 0 && neighbors === 3) {
          next[i][j] = 1;
        } else {
          next[i][j] = state;
        }
      }
    }

    return next;
  }

  function draw() {
    ctx.fillStyle = "rgba(238,245,251,0.3)";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgba(0,51,102,0.8)";

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (grid[i][j]) {
          ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
      }
    }

    grid = nextGen(grid);

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);

  resize();
  draw();
})();