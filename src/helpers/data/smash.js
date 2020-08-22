import boardData from './boardsData';
import pinData from './pinData';

const totallyDeleteBoard = (boardId) => new Promise((resolve, reject) => {
  boardData.deleteBoard(boardId)
    .then(() => {
      pinData.getPinsByBoardId(boardId).then((boardPins) => {
        boardPins.forEach((pin) => {
          pinData.deletePin(pin.id);
        });
        resolve();
      });
    })
    .catch((err) => reject(err));
});

export default { totallyDeleteBoard };
