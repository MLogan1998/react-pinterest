import axios from 'axios';
import apiKeys from '../apiKeys/apiKeys.json';
import utils from './helpers';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getPinsByBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

const deletePin = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

const createPin = (newPin) => axios.post(`${baseUrl}/pins.json`, newPin);

const updatePin = (pinId, editedPin) => axios.put(`${baseUrl}/pins/${pinId}.json`, editedPin);

export default {
  getPinsByBoardId,
  deletePin,
  createPin,
  updatePin,
};
