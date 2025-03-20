import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const fetchCharacters = async (page = 1, name = '') => {
  try {
    let url = `${BASE_URL}/character/?page=${page}`;
    if (name) {
      url += `&name=${name}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};
