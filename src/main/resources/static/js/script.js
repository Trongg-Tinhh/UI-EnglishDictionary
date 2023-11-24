// Tạo bản đồ trò chơi 10x10
const numRows = 10;
const numCols = 10;
const gameBoard = [];

// Thiết lập trạng thái ban đầu cho bản đồ
for (let row = 0; row < numRows; row++) {
  const rowArray = [];
  for (let col = 0; col < numCols; col++) {
    // Một ví dụ đơn giản: 1 là ô có thể đi vào, 0 là ô không thể đi vào
    rowArray.push(1);
  }
  gameBoard.push(rowArray);
}

// Thiết lập các ô không thể đi vào

// Hàm để tạo mê cung ngẫu nhiên và cập nhật gameBoard
function generateRandomMaze(gameBoard, startRow, startCol, endRow, endCol) {
  const numRows = gameBoard.length;
  const numCols = gameBoard[0].length;

  // Đặt tất cả các ô là các ô không thể đi vào ban đầu
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      gameBoard[row][col] = 0;
    }
  }

  // Hàm tạo mê cung
  function createMaze(row, col) {
    const directions = [
      { dx: -2, dy: 0 }, // Lên
      { dx: 2, dy: 0 }, // Xuống
      { dx: 0, dy: -2 }, // Trái
      { dx: 0, dy: 2 }, // Phải
    ];

    // Đánh dấu ô hiện tại có thể đi vào
    gameBoard[row][col] = 1;

    // Xác định các ô khởi đầu và kết thúc
    if (
      (row === startRow && col === startCol) ||
      (row === endRow && col === endCol)
    ) {
      gameBoard[row][col] = 1;
    }

    // Random hoán đổi thứ tự của các hướng
    directions.sort(() => Math.random() - 0.5);

    for (const direction of directions) {
      const newRow = row + direction.dx;
      const newCol = col + direction.dy;

      if (
        newRow >= 0 &&
        newRow < numRows &&
        newCol >= 0 &&
        newCol < numCols &&
        gameBoard[newRow][newCol] === 0
      ) {
        // Đánh dấu ô trung gian có thể đi vào
        gameBoard[newRow][newCol] = 1;

        // Đánh dấu ô cuối có thể đi vào
        gameBoard[row + direction.dx / 2][col + direction.dy / 2] = 1;

        createMaze(newRow, newCol);
      }
    }
  }

  // Bắt đầu tạo mê cung từ ô [0][0]
  createMaze(0, 0);
}

// Sử dụng hàm để tạo mê cung ngẫu nhiên và cập nhật gameBoard
generateRandomMaze(gameBoard, 0, 0, 9, 9);

// Đảm bảo các ô bắt đầu và kết thúc luôn có thể đi vào
gameBoard[0][1] = 1;
gameBoard[1][0] = 1;
gameBoard[9][8] = 1;
gameBoard[8][9] = 1;
gameBoard[0][0] = 1;
gameBoard[9][9] = 1;

// Đặt ô bắt đầu và kết thúc
gameBoard[0][0] = "start";
gameBoard[9][9] = "end";

// Thiết lập các ô kho báu và điểm số
// const treasureLocations = [
// {
//   row: 1,
//   col: 2,
//   question: "What is the capital of France?",
//   answer: "Paris",
// },
// {
//   row: 3,
//   col: 5,
//   question: "How many continents are there on Earth?",
//   answer: "7",
// },
// {
//   row: 2,
//   col: 0,
//   question: "What day is Vietnam's National Day?",
//   answer: "2/9",
// },
// Thêm các ô kho báu khác và câu hỏi ở đây
// ];
// Điền các ô kho báu vào gameBoard
// for (const treasure of treasureLocations) {
//   const { row, col, question } = treasure;
//   gameBoard[row][col] = "treasure";
// }

// ----------------Random đặt kho báu-----------------------

// Tạo một mảng chứa tất cả các câu hỏi cho các ô kho báu
const allQuestions = [
  // ================== 00 ===================
  {
    question: "What is the capital of France?",
    answer: "Paris",
  },
  {
    question: "How many continents are there on Earth?",
    answer: "7",
  },
  {
    question: "What day is Vietnam's National Day?",
    answer: "2/9",
  },
  {
    question: "How many continents are there on Ocean?",
    answer: "4",
  },
  {
    question: "How many types of transportation are there?",
    answer: "5",
  },
  {
    question: "How can a man go eight days without sleep?",
    answer: "He sleeps at night",
  },
  {
    question:
      "Ten birds were sitting in a tree and a hunter shot one. How birds many were left in the tree?",
    answer: "0",
  },
  {
    question:
      "Before Mt. Everest was discovered, what was the highest mountain in the world?",
    answer: "Mt. Everest. It just wasn't discovered yet",
  },
  {
    question:
      "How much dirt is there in a hole that measures two feet by three feet by four feet?",
    answer: "None, there is no dirt in a hole",
  },
  {
    question:
      "If a plane crashes on the border of The United States and Mexico, where would the survivors be buried?",
    answer: "Nowhere, you don't bury survivors",
  },
  // =============== 01 ===============
  {
    question: "Does England have a 4th of July?",
    answer: "Yes they do, and a July 5th and a July 6th",
  },
  {
    question:
      "A man makes a claim that he can predict the exact score of every football game, before it begins. And he's always right. How's that possible?",
    answer: "He says the score before every football game begins is 0 0",
  },
  {
    question: "What two words, when combined hold the most letters?",
    answer: "Post Office",
  },
  {
    question: "How many books can you put in an empty backpack?",
    answer: "One! After that, it's not empty",
  },
  {
    question:
      "A monkey, a squirrel, and a bird are racing to the top of a coconut tree. Who will get the banana first, the monkey, the squirrel, or the bird?",
    answer: "None of them, because you can't get a banana from a coconut tree",
  },
  {
    question: "How far can you walk into the woods?",
    answer: "Half way. After that you are walking out of the woods",
  },
  {
    question:
      "A clerk at a butcher shop stands five feet ten inches tall and wears size 13 sneakers. What does he weigh?",
    answer: "Meat",
  },
  {
    question: "What is Rupert the Bear's middle name?",
    answer: "The",
  },
  {
    question:
      "Spell Ghost out loud. Then spell Most out loud. Then spell Roast out loud. What do you put in a toaster?",
    answer: "Bread. Most people will answer Toast",
  },
  {
    question: "If you throw a red stone into the blue sea what it will become?",
    answer: "Wet",
  },
  //================= 02 =======================
  {
    question: "What was the American President's name in 1990?",
    answer: "Exactly the same as it is today",
  },
  {
    question:
      "Can you name the two days starting with T besides Tuesday and Thursday?",
    answer: "Today and tomorrow",
  },
  {
    question: " What looks like half an apple??",
    answer: "The other half",
  },
  {
    question: "How many times can you take 5 from 25?",
    answer: "1, after that, it's 20",
  },
  {
    question: "What can you never eat for breakfast?",
    answer: "Dinner",
  },
  {
    question: "What the exact middle of America?",
    answer: "The letter r",
  },
  {
    question: "How do you walk on water?",
    answer: "Freeze it first",
  },
  {
    question: "What happened when wheel was invented ?",
    answer: "It caused a revolution",
  },
  {
    question: "In baseball, how may outs are there in an inning?",
    answer: "6. Each team has 3",
  },
  {
    question: "What goes up and never comes down?",
    answer: "Your age",
  },
  //================= 03 ========================
  {
    question: "Why are 1968 pennies worth more than 1964 pennies?",
    answer: "Because 1968 pennies are four more than 1964 pennies",
  },
  {
    question: "How many birth days does the average person have?",
    answer: "Just one, all the rest are anniversaries of their date of birth.",
  },
  {
    question: "How can you lift an elephant with one hand?",
    answer: "It is not a problem, since you will never find an elephant with one hand",
  },
  {
    question: "What word in the English language is always spelled incorrectly?",
    answer: "Incorrectly",
  },
  {
    question: "Which is heavier, 100 pounds of rocks or 100 pounds of feathers?",
    answer: "They both weigh the same ",
  },
  {
    question: "What has a head and a tail but no body?",
    answer: "A coin!",
  },
  {
    question: "When do you stop at green and go at red?",
    answer: "When you're eating a watermelon",
  },
  {
    question: "If there are 12 fish and half of them drown, how many are there?",
    answer: "12, fish don't drown!",
  },
  {
    question: "When does 10 + 3 = 1?",
    answer: "On the clock",
  },
  {
    question: "Can you spell eighty in two letters?",
    answer: "A-T",
  },
  //================== 04 ======================
  {
    question: "How many sides does a circle have?",
    answer: "Two. An inside and an outside",
  },
  {
    question: "How many sides does a circle have?",
    answer: "Two. An inside and an outside",
  },
  {
    question: "How many sides does a circle have?",
    answer: "Two. An inside and an outside",
  },
  {
    question: "How many sides does a circle have?",
    answer: "Two. An inside and an outside",
  },
  {
    question: "How many sides does a circle have?",
    answer: "Two. An inside and an outside",
  },
  {
    question: "How many sides does a circle have?",
    answer: "Two. An inside and an outside",
  },
  {
    question: "How many sides does a circle have?",
    answer: "Two. An inside and an outside",
  },
  {
    question: "How many sides does a circle have?",
    answer: "Two. An inside and an outside",
  },
  {
    question: "How many sides does a circle have?",
    answer: "Two. An inside and an outside",
  },
  {
    question: "How many sides does a circle have?",
    answer: "Two. An inside and an outside",
  },
  //================ 05 ===================
  {
    question: "How many sides does a circle have?",
    answer: "Two. An inside and an outside",
  },
  // Thêm các câu hỏi khác vào đây
];

// Chia nhỏ mảng allQuestions thành các mảng con với kích thước bằng nhau, mỗi mảng con chứa 10 câu hỏi.
const chunkSize = 10;
const questionChunks = [];
for (let i = 0; i < allQuestions.length; i += chunkSize) {
  const chunk = allQuestions.slice(i, i + chunkSize);
  questionChunks.push(chunk);
}

let currentLevel = 0;

const currentQuestions = questionChunks[currentLevel];

const treasureLocations = [];

// Bước 1: Tạo danh sách các ô trống có thể đi vào sau khi tạo mê cung
const emptyCells = [];
for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    if (gameBoard[row][col] === 1) {
      emptyCells.push({ row, col });
    }
  }
}

// Bước 2: Random chọn các ô trống và đặt vào đó các ô kho báu
function placeTreasuresRandomly(gameBoard, emptyCells, numTreasures, currentQuestions) {
  for (let i = 0; i < numTreasures; i++) {
    // Random chọn một ô trống
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const { row, col } = emptyCells[randomIndex];

    // Tạo một kho báu
    const treasure = {
      row: row,
      col: col,
      question: currentQuestions[i].question,
      answer: currentQuestions[i].answer,
    };

    // Đặt câu hỏi cho kho báu
    treasureLocations.push(treasure);

    // Đặt kho báu vào gameBoard
    gameBoard[row][col] = "treasure";

    // Loại bỏ ô đã chọn khỏi danh sách emptyCells để không đặt kho báu trùng lặp
    emptyCells.splice(randomIndex, 1);
  }
}

// Sử dụng hàm để đặt kho báu ngẫu nhiên trên các ô trống có thể đi vào
placeTreasuresRandomly(gameBoard, emptyCells, 10, currentQuestions);

// for (const treasure of treasureLocations) {
//   const { row, col, question } = treasure;
//   gameBoard[row][col] = "treasure";
// }
// ----------------Random đặt kho báu-----------------------

// ...Thêm các ô khác không thể đi vào ở đây

// Tạo bảng trò chơi và hiển thị nó trên trang
const gameTable = document.getElementById("game-board");
for (let row = 0; row < numRows; row++) {
  const tr = document.createElement("tr");
  for (let col = 0; col < numCols; col++) {
    const td = document.createElement("td");
    if (gameBoard[row][col] === 0) {
      let randomClass = Math.random() < 0.5 ? "blocked" : "largeRock";
      td.classList.add(randomClass);
    }
    if (gameBoard[row][col] === "start") {
      td.classList.add("start");
    }
    if (gameBoard[row][col] === "end") {
      td.classList.add("end");
    }
    if (gameBoard[row][col] === "treasure") {
      td.classList.add("treasure");
    }
    tr.appendChild(td);
  }
  gameTable.appendChild(tr);
}

let score = 0;
updateScore(0);

// Tạo biểu tượng đại diện cho nhân vật và đặt nó vào ô đầu tiên
const playerIcon = document.createElement("div");
playerIcon.classList.add("player");
gameTable.rows[0].cells[0].appendChild(playerIcon);

// Tạo sự kiện di chuyển người chơi
// Rest of the code (player movement) goes here...
// Lấy vị trí ban đầu của người chơi
let playerRow = 0;
let playerCol = 0;

// Tạo biến để kiểm tra xem trò chơi đã kết thúc hay chưa
let gameEnded = false;

// Tạo sự kiện di chuyển khi nút "Lên" được nhấn
document.getElementById("up").addEventListener("click", moveUp);

function moveUp() {
  if (!gameEnded) {
    const newRow = playerRow - 1;
    if (newRow >= 0 && gameBoard[newRow][playerCol] !== 0) {
      // Kiểm tra xem người chơi vào ô kho báu hay không
      if (gameBoard[newRow][playerCol] === "treasure") {
        // Hiển thị câu hỏi trong dialog
        const currentTreasure = treasureLocations.find(
          (t) => t.row === newRow && t.col === playerCol
        );
        if (currentTreasure) {
          const answer = prompt(currentTreasure.question);
          if (
            answer &&
            answer.toLowerCase() === currentTreasure.answer.toLowerCase()
          ) {
            // Trả lời đúng, tăng điểm
            updateScore(10);
            alert("Correct! You earned 10 points.");
          } else {
            alert("Wrong answer. You did not earn any points.");
          }
          gameBoard[newRow][playerCol] = 1;
          // Chuyển ô kho báu về màu trắng
          gameTable.rows[newRow].cells[playerCol].classList.remove("treasure");
        }
      }

      // Kiểm tra xem người chơi vào ô kết thúc hay không
      if (gameBoard[newRow][playerCol] === "end") {
        // Người chơi vào ô kết thúc
        updateScore(50);
        gameEnded = true; // Đánh dấu trò chơi đã kết thúc
        alert("Congratulations! You finished the game. Your score: " + score);
      }

      gameTable.rows[playerRow].cells[playerCol].removeChild(playerIcon);
      playerRow = newRow;
      gameTable.rows[playerRow].cells[playerCol].appendChild(playerIcon);
    }
  }
}

// Tạo sự kiện di chuyển khi nút "Xuống" được nhấn
document.getElementById("down").addEventListener("click", moveDown);

function moveDown() {
  if (!gameEnded) {
    const newRow = playerRow + 1;
    if (newRow < numRows && gameBoard[newRow][playerCol] !== 0) {
      if (gameBoard[newRow][playerCol] === "treasure") {
        const currentTreasure = treasureLocations.find(
          (t) => t.row === newRow && t.col === playerCol
        );
        if (currentTreasure) {
          const answer = prompt(currentTreasure.question);
          if (
            answer &&
            answer.toLowerCase() === currentTreasure.answer.toLowerCase()
          ) {
            updateScore(10);
            alert("Correct! You earned 10 points.");
          } else {
            alert("Wrong answer. You did not earn any points.");
          }
          gameBoard[newRow][playerCol] = 1;
          // Chuyển ô kho báu về màu trắng
          gameTable.rows[newRow].cells[playerCol].classList.remove("treasure");
        }
      }

      if (gameBoard[newRow][playerCol] === "end") {
        updateScore(50);
        gameEnded = true;
        alert("Congratulations! You finished the game. Your score: " + score);
      }

      gameTable.rows[playerRow].cells[playerCol].removeChild(playerIcon);
      playerRow = newRow;
      gameTable.rows[playerRow].cells[playerCol].appendChild(playerIcon);
    }
  }
}

// Tạo sự kiện di chuyển khi nút "Trái" được nhấn
document.getElementById("left").addEventListener("click", moveLeft);

function moveLeft() {
  if (!gameEnded) {
    const newCol = playerCol - 1;
    if (newCol >= 0 && gameBoard[playerRow][newCol] !== 0) {
      if (gameBoard[playerRow][newCol] === "treasure") {
        const currentTreasure = treasureLocations.find(
          (t) => t.row === playerRow && t.col === newCol
        );
        if (currentTreasure) {
          const answer = prompt(currentTreasure.question);
          if (
            answer &&
            answer.toLowerCase() === currentTreasure.answer.toLowerCase()
          ) {
            updateScore(10);
            alert("Correct! You earned 10 points.");
          } else {
            alert("Wrong answer. You did not earn any points.");
          }
          gameBoard[playerRow][newCol] = 1;
          // Chuyển ô kho báu về màu trắng
          gameTable.rows[playerRow].cells[newCol].classList.remove("treasure");
        }
      }

      if (gameBoard[playerRow][newCol] === "end") {
        updateScore(50);
        gameEnded = true;
        alert("Congratulations! You finished the game. Your score: " + score);
      }

      gameTable.rows[playerRow].cells[playerCol].removeChild(playerIcon);
      playerCol = newCol;
      gameTable.rows[playerRow].cells[playerCol].appendChild(playerIcon);
    }
  }
}

// Tạo sự kiện di chuyển khi nút "Phải" được nhấn
document.getElementById("right").addEventListener("click", moveRight);

function moveRight() {
  if (!gameEnded) {
    const newCol = playerCol + 1;
    if (newCol < numCols && gameBoard[playerRow][newCol] !== 0) {
      if (gameBoard[playerRow][newCol] === "treasure") {
        const currentTreasure = treasureLocations.find(
          (t) => t.row === playerRow && t.col === newCol
        );
        if (currentTreasure) {
          const answer = prompt(currentTreasure.question);
          if (
            answer &&
            answer.toLowerCase() === currentTreasure.answer.toLowerCase()
          ) {
            updateScore(10);
            alert("Correct! You earned 10 points.");
          } else {
            alert("Wrong answer. You did not earn any points.");
          }
          gameBoard[playerRow][newCol] = 1;
          // Chuyển ô kho báu về màu trắng
          gameTable.rows[playerRow].cells[newCol].classList.remove("treasure");
        }
      }

      if (gameBoard[playerRow][newCol] === "end") {
        updateScore(50);
        gameEnded = true;
        alert("Congratulations! You finished the game. Your score: " + score);
      }

      gameTable.rows[playerRow].cells[playerCol].removeChild(playerIcon);
      playerCol = newCol;
      gameTable.rows[playerRow].cells[playerCol].appendChild(playerIcon);
    }
  }
}

// Tạo sự kiện khi nút "Bắt đầu" được nhấn
document.getElementById("start").addEventListener("click", startGame);
function updateScore(value) {
  // Cập nhật biến điểm số
  score += value;

  // Hiển thị điểm số mới trên trang web
  document.getElementById("score").textContent = "Điểm: " + score;
}
function startGame() {
  location.reload();
}

// Lắng nghe sự kiện keydown trên tài liệu
document.addEventListener("keydown", function (event) {
  // Xử lý sự kiện di chuyển dựa trên phím được nhấn
  switch (event.key) {
    case "ArrowUp":
      moveUp();
      break;
    case "ArrowDown":
      moveDown();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
  }
});

//==================================================================

// Thêm sự kiện click cho nút "Tiếp tục"
document.getElementById("end").addEventListener("click", continueGame);

// Hàm xử lý khi click vào nút "Tiếp tục"
function continueGame() {
  // Hiển thị hộp thoại confirm
  const confirmResult = confirm("Bạn muốn chuyển sang màn chơi mới?");

  // Nếu người chơi chọn "OK"
  if (confirmResult) {
    // Kiểm tra xem đã đạt đến 10 màn chơi hay chưa
    if (currentLevel >= 4) {
      alert("Chúc mừng, bạn đã vượt qua hết 10 màn!");
    } else {
      // Tăng giá trị của biến đếm
      currentLevel++;

      // Sử dụng biến currentLevel để xác định mảng con nào sẽ được sử dụng cho màn chơi hiện tại
      const currentQuestions = questionChunks[currentLevel];

      // Reset điểm số về 0
      score = 0;
      updateScore(0);

      // Tạo mê cung mới và cập nhật gameBoard
      generateRandomMaze(gameBoard, 0, 0, 9, 9);

      // Đảm bảo các ô bắt đầu và kết thúc luôn có thể đi vào
      gameBoard[0][1] = 1;
      gameBoard[1][0] = 1;
      gameBoard[9][8] = 1;
      gameBoard[8][9] = 1;
      gameBoard[0][0] = 1;
      gameBoard[9][9] = 1;

      // Đặt ô bắt đầu và kết thúc
      gameBoard[0][0] = "start";
      gameBoard[9][9] = "end";

      // Bước 1: Tạo danh sách các ô trống có thể đi vào sau khi tạo mê cung
      const emptyCells = [];
      for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
          if (gameBoard[row][col] === 1) {
            emptyCells.push({ row, col });
          }
        }
      }

      // Đặt các ô kho báu mới
      placeTreasuresRandomly(gameBoard, emptyCells, 10, currentQuestions);

      // Cập nhật lại bảng trò chơi trên trang web
      updateGameTable();

      // Đặt vị trí ban đầu của người chơi
      playerRow = 0;
      playerCol = 0;

      // Đặt biến gameEnded về false
      gameEnded = false;
    }
  }
}

// Hàm để cập nhật lại bảng trò chơi trên trang web
function updateGameTable() {
  const gameTable = document.getElementById("game-board");

  // Xóa hết các hàng và ô trên bảng trò chơi
  while (gameTable.firstChild) {
    gameTable.removeChild(gameTable.firstChild);
  }

  // Tạo lại bảng trò chơi với mê cung mới
  for (let row = 0; row < numRows; row++) {
    const tr = document.createElement("tr");
    for (let col = 0; col < numCols; col++) {
      const td = document.createElement("td");
      if (gameBoard[row][col] === 0) {
        let randomClass = Math.random() < 0.5 ? "blocked" : "largeRock";
        td.classList.add(randomClass);
      }
      if (gameBoard[row][col] === "start") {
        td.classList.add("start");
      }
      if (gameBoard[row][col] === "end") {
        td.classList.add("end");
      }
      if (gameBoard[row][col] === "treasure") {
        td.classList.add("treasure");
      }
      tr.appendChild(td);
    }
    gameTable.appendChild(tr);
  }

  // Đặt lại biểu tượng của người chơi vào ô đầu tiên
  gameTable.rows[0].cells[0].appendChild(playerIcon);
}
