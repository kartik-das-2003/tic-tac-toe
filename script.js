document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('resetButton');
    const resultModal = document.getElementById('resultModal');
    const resultText = document.getElementById('resultText');
    const newGameButton = document.getElementById('newGameButton');
    const closeModal = document.querySelector('.close');
  
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
  
    function initializeBoard() {
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', () => makeMove(i));
        board.appendChild(cell);
      }
    }
  
    function makeMove(index) {
      if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        renderBoard();
        checkWinner();
        togglePlayer();
      }
    }
  
    function renderBoard() {
      const cells = document.querySelectorAll('.cell');
      cells.forEach((cell, index) => {
        cell.textContent = gameBoard[index];
      });
    }
  
    function togglePlayer() {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  
    function checkWinner() {
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
      ];
  
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          gameActive = false;
          status.textContent = `${currentPlayer} wins!`;
          openResultModal(`${currentPlayer} wins!`);
          return;
        }
      }
  
      if (!gameBoard.includes('')) {
        gameActive = false;
        status.textContent = 'It\'s a draw!';
        openResultModal('It\'s a draw!');
      }
    }
  
    function openResultModal(result) {
      resultText.textContent = result;
      resultModal.style.display = 'flex';
    }
  
    function closeResultModal() {
      resultModal.style.display = 'none';
    }
  
    function resetGame() {
      currentPlayer = 'X';
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      gameActive = true;
  
      status.textContent = '';
      renderBoard();
    }
  
    initializeBoard();
    resetButton.addEventListener('click', resetGame);
    newGameButton.addEventListener('click', () => {
      closeResultModal();
      resetGame();
    });
    closeModal.addEventListener('click', closeResultModal);
    window.addEventListener('click', (event) => {
      if (event.target === resultModal) {
        closeResultModal();
      }
    });
  });
  