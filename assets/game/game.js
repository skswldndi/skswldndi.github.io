// Game settings
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

// Game state
let gameState = {
  score: 0,
  totalChips: 0,
  timeLeft: 60,
  gameRunning: true,
  gameWon: false,
};

// Player settings
const player = {
  x: 100,
  y: 100,
  width: 64,
  height: 64,
  speed: 3,
  color: "#FF69B4",
  direction: "down",
  holdingChip: null, // Index of chip being held, or null if not holding
};

// Potato chips array
let chips = [];
const chipCount = 15;

// Hiding spots array
let hidingSpots = [];

// Husband settings
const husband = {
  x: 700,
  y: 500,
  width: 64,
  height: 64,
  speed: 3.0,
  color: "#4169E1",
  direction: "left",
  active: false,
  activationTime: 45, // Activates after 45 seconds
};

// Furniture/obstacles
let furniture = [];

// Key input state
const keys = {};
let spacePressed = false;

// Image assets
const playerImage = new Image();
const husbandImage = new Image();
let imagesLoaded = 0;

playerImage.onload = () => {
  imagesLoaded++;
};
husbandImage.onload = () => {
  imagesLoaded++;
};

playerImage.src = "pink_pixel.png";
husbandImage.src = "husband_pixel.png";

// Initialize
function init() {
  // Place chips (avoid furniture)
  chips = [];
  for (let i = 0; i < chipCount; i++) {
    let chipX, chipY;
    let attempts = 0;
    let validPosition = false;

    // Try to find a position that doesn't overlap with furniture
    while (!validPosition && attempts < 100) {
      chipX = Math.random() * (canvas.width - 50) + 25;
      chipY = Math.random() * (canvas.height - 50) + 25;

      // Check if position overlaps with furniture
      validPosition = !checkFurnitureCollision(chipX, chipY, 24, 24);
      attempts++;
    }

    chips.push({
      x: chipX,
      y: chipY,
      width: 24,
      height: 24,
      hidden: false,
      color: "#FFD700",
    });
  }
  gameState.totalChips = chipCount;

  // Place hiding spots
  hidingSpots = [
    { x: 50, y: 50, width: 60, height: 60, type: "drawer" },
    { x: 700, y: 50, width: 60, height: 60, type: "cabinet" },
    { x: 50, y: 500, width: 60, height: 60, type: "box" },
    { x: 700, y: 500, width: 60, height: 60, type: "shelf" },
    { x: 375, y: 50, width: 60, height: 60, type: "drawer" },
    { x: 375, y: 500, width: 60, height: 60, type: "cabinet" },
    { x: 150, y: 50, width: 60, height: 60, type: "drawer" },
    { x: 600, y: 50, width: 60, height: 60, type: "cabinet" },
    { x: 150, y: 500, width: 60, height: 60, type: "box" },
    { x: 600, y: 500, width: 60, height: 60, type: "shelf" },
  ];

  // Place furniture (smaller to allow passage)
  furniture = [
    { x: 200, y: 150, width: 60, height: 70, type: "table" },
    { x: 500, y: 150, width: 60, height: 70, type: "table" },
    { x: 200, y: 350, width: 70, height: 60, type: "sofa" },
    { x: 500, y: 350, width: 70, height: 60, type: "sofa" },
    { x: 350, y: 250, width: 70, height: 70, type: "tv" },
  ];

  // Player initial position
  player.x = 100;
  player.y = 100;
  player.holdingChip = null;

  // Husband initial settings
  husband.x = 700;
  husband.y = 500;
  husband.active = false;

  // Reset game state
  gameState.score = 0;
  gameState.timeLeft = 60;
  gameState.gameRunning = true;
  gameState.gameWon = false;

  updateUI();
}

// Update UI
function updateUI() {
  document.getElementById("score").textContent = gameState.score;
  document.getElementById("total").textContent = gameState.totalChips;
  document.getElementById("timer").textContent = Math.max(0, Math.ceil(gameState.timeLeft));
}

// Collision detection
function checkCollision(rect1, rect2) {
  return rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
}

// Check collision with furniture
function checkFurnitureCollision(x, y, width, height) {
  for (let item of furniture) {
    if (checkCollision({ x, y, width, height }, item)) {
      return true;
    }
  }
  return false;
}

// Move player
function movePlayer() {
  let newX = player.x;
  let newY = player.y;

  if (keys["ArrowUp"] || keys["w"] || keys["W"]) {
    newY -= player.speed;
    player.direction = "up";
  }
  if (keys["ArrowDown"] || keys["s"] || keys["S"]) {
    newY += player.speed;
    player.direction = "down";
  }
  if (keys["ArrowLeft"] || keys["a"] || keys["A"]) {
    newX -= player.speed;
    player.direction = "left";
  }
  if (keys["ArrowRight"] || keys["d"] || keys["D"]) {
    newX += player.speed;
    player.direction = "right";
  }

  // Boundary check
  if (newX >= 0 && newX + player.width <= canvas.width) {
    if (!checkFurnitureCollision(newX, player.y, player.width, player.height)) {
      player.x = newX;
    }
  }
  if (newY >= 0 && newY + player.height <= canvas.height) {
    if (!checkFurnitureCollision(player.x, newY, player.width, player.height)) {
      player.y = newY;
    }
  }
}

// Pick up or hide chips
function handleChipInteraction() {
  if (keys[" "] && !spacePressed) {
    spacePressed = true;
    // If player is holding a chip, try to hide it
    if (player.holdingChip !== null) {
      // Check if near a hiding spot
      for (let spot of hidingSpots) {
        const distance = Math.sqrt(
          Math.pow(player.x + player.width / 2 - (spot.x + spot.width / 2), 2) +
            Math.pow(player.y + player.height / 2 - (spot.y + spot.height / 2), 2)
        );

        if (distance < 50) {
          // Hide the chip
          chips[player.holdingChip].hidden = true;
          player.holdingChip = null;
          gameState.score++;
          updateUI();

          // Check if all chips are hidden
          if (gameState.score >= gameState.totalChips) {
            gameState.gameWon = true;
            gameState.gameRunning = false;
            showGameOver(true);
          }
          return;
        }
      }
    } else {
      // If not holding a chip, try to pick one up
      for (let i = 0; i < chips.length; i++) {
        const chip = chips[i];
        if (!chip.hidden) {
          const chipDistance = Math.sqrt(
            Math.pow(player.x + player.width / 2 - (chip.x + chip.width / 2), 2) +
              Math.pow(player.y + player.height / 2 - (chip.y + chip.height / 2), 2)
          );

          if (chipDistance < 40) {
            // Pick up the chip
            player.holdingChip = i;
            return;
          }
        }
      }
    }
  }
}

// Husband AI
function updateHusband() {
  if (!husband.active) {
    if (gameState.timeLeft <= husband.activationTime) {
      husband.active = true;
    } else {
      return;
    }
  }

  // Move towards player
  const dx = player.x - husband.x;
  const dy = player.y - husband.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > 0) {
    let newX = husband.x + (dx / distance) * husband.speed;
    let newY = husband.y + (dy / distance) * husband.speed;

    // Check boundaries
    if (newX >= 0 && newX + husband.width <= canvas.width) {
      if (!checkFurnitureCollision(newX, husband.y, husband.width, husband.height)) {
        husband.x = newX;
      }
    }
    if (newY >= 0 && newY + husband.height <= canvas.height) {
      if (!checkFurnitureCollision(husband.x, newY, husband.width, husband.height)) {
        husband.y = newY;
      }
    }
  }

  // Check collision with player
  if (checkCollision(player, husband)) {
    gameState.gameRunning = false;
    showGameOver(false);
  }
}

// Drawing functions
function drawPlayer() {
  if (imagesLoaded >= 2 && playerImage.complete) {
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
  } else {
    // Fallback if image not loaded
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw eyes
    ctx.fillStyle = "white";
    if (player.direction === "right") {
      ctx.fillRect(player.x + 40, player.y + 16, 8, 8);
      ctx.fillRect(player.x + 40, player.y + 40, 8, 8);
    } else if (player.direction === "left") {
      ctx.fillRect(player.x + 16, player.y + 16, 8, 8);
      ctx.fillRect(player.x + 16, player.y + 40, 8, 8);
    } else {
      ctx.fillRect(player.x + 20, player.y + 16, 8, 8);
      ctx.fillRect(player.x + 36, player.y + 16, 8, 8);
    }
  }
}

function drawChips() {
  chips.forEach((chip, index) => {
    if (!chip.hidden) {
      // Don't draw chip if player is holding it
      if (player.holdingChip === index) {
        // Draw chip above player's head
        ctx.fillStyle = chip.color;
        ctx.fillRect(player.x + player.width / 2 - 12, player.y - 20, chip.width, chip.height);

        // Chip pattern
        ctx.fillStyle = "#FFA500";
        ctx.fillRect(player.x + player.width / 2 - 12 + 4, player.y - 20 + 4, 16, 16);
      } else {
        ctx.fillStyle = chip.color;
        ctx.fillRect(chip.x, chip.y, chip.width, chip.height);

        // Chip pattern
        ctx.fillStyle = "#FFA500";
        ctx.fillRect(chip.x + 4, chip.y + 4, 16, 16);
      }
    }
  });
}

function drawHidingSpots() {
  hidingSpots.forEach((spot) => {
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(spot.x, spot.y, spot.width, spot.height);
    ctx.strokeStyle = "#654321";
    ctx.lineWidth = 2;
    ctx.strokeRect(spot.x, spot.y, spot.width, spot.height);

    // Draw icon
    ctx.fillStyle = "#D2691E";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText("📦", spot.x + spot.width / 2, spot.y + spot.height / 2 + 7);
  });
}

function drawFurniture() {
  furniture.forEach((item) => {
    ctx.fillStyle = "#A0522D";
    ctx.fillRect(item.x, item.y, item.width, item.height);
    ctx.strokeStyle = "#654321";
    ctx.lineWidth = 2;
    ctx.strokeRect(item.x, item.y, item.width, item.height);
  });
}

function drawHusband() {
  if (husband.active) {
    if (imagesLoaded >= 2 && husbandImage.complete) {
      ctx.drawImage(husbandImage, husband.x, husband.y, husband.width, husband.height);
    } else {
      // Fallback if image not loaded
      ctx.fillStyle = husband.color;
      ctx.fillRect(husband.x, husband.y, husband.width, husband.height);

      // Draw eyes
      ctx.fillStyle = "white";
      ctx.fillRect(husband.x + 20, husband.y + 16, 8, 8);
      ctx.fillRect(husband.x + 36, husband.y + 16, 8, 8);
    }

    // Warning indicator
    ctx.fillStyle = "red";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText("⚠️", husband.x + husband.width / 2, husband.y - 10);
  }
}

// Game over screen
function showGameOver(won) {
  const gameOverDiv = document.getElementById("gameOver");
  const title = document.getElementById("gameOverTitle");
  const message = document.getElementById("gameOverMessage");

  gameOverDiv.classList.remove("hidden");

  if (won) {
    title.textContent = "🎉 Success! 🎉";
    message.textContent = `You hid all the chips! Time remaining: ${Math.ceil(gameState.timeLeft)} sec`;
  } else {
    title.textContent = "😱 Game Over! 😱";
    message.textContent = "JiWoo's husband caught you!";
  }
}

function restartGame() {
  document.getElementById("gameOver").classList.add("hidden");
  init();
}

// Game loop
function gameLoop() {
  if (!gameState.gameRunning) {
    return;
  }

  // Clear screen
  ctx.fillStyle = "#8B7355";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Floor pattern
  ctx.fillStyle = "#9B7D5F";
  for (let x = 0; x < canvas.width; x += 40) {
    for (let y = 0; y < canvas.height; y += 40) {
      if ((x + y) % 80 === 0) {
        ctx.fillRect(x, y, 40, 40);
      }
    }
  }

  // Draw game elements
  drawFurniture();
  drawHidingSpots();
  drawChips();
  drawPlayer();
  drawHusband();

  // Game logic
  movePlayer();
  handleChipInteraction();
  updateHusband();

  // Update time
  gameState.timeLeft -= 1 / 60;
  if (gameState.timeLeft <= 0 && gameState.gameRunning) {
    gameState.gameRunning = false;
    if (gameState.score >= gameState.totalChips) {
      gameState.gameWon = true;
      showGameOver(true);
    } else {
      showGameOver(false);
    }
  }

  updateUI();
}

// Event listeners
document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
  if (e.key === " ") {
    spacePressed = false; // Reset on keydown to allow new press
  }
  e.preventDefault();
});

document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
  if (e.key === " ") {
    spacePressed = false;
  }
  e.preventDefault();
});

// Start game
init();
setInterval(gameLoop, 1000 / 60);
