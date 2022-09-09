const fetchToken = async () => {
  try {
    const URL_API = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(URL_API);
    const token = await response.json();
    return token;
  } catch (error) {
    return error;
  }
};

export default fetchToken;
