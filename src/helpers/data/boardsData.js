import axios from 'axios';
import apiKeys from '../apiKeys/apiKeys.json';
import utils from './helpers';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getBoardsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${uid}"`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

const singleBoardByBoardId = (boardId) => axios.get(`${baseUrl}/boards/${boardId}.json`);

export default { getBoardsByUid, singleBoardByBoardId };
