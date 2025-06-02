import axios from 'axios';

/**
 * Sends data to the specified API endpoint using the given HTTP method.
 * @param {string} url - The API endpoint.
 * @param {object} data - The data to send.
 * @param {string} [method='post'] - HTTP method ('post', 'put', etc.).
 * @param {object} [config={}] - Optional Axios config.
 * @returns {Promise<any>} - The API response data.
 */
export async function sendDataToApi(url, data, method = 'post', config = {}) {
  try {
    const response = await axios({
      url,
      method,
      data,
      ...config,
    });
    return response.data;
  } catch (error) {
    // Optionally, handle or rethrow error
    throw error;
  }
}