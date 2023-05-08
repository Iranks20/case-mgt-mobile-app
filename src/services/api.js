const BASE_URL = '100.0.1.1:5000/api/v1';

export const appLogin = (username, password) => {
  return fetch(`${BASE_URL}/reporters/applogin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  }).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }).catch(error => {
    console.error('There was a problem with the API:', error);
    throw error;
  });
};
