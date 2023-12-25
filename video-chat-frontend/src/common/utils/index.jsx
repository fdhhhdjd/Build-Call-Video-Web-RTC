const generateRandomNumber = () => {
  return Math.floor(Math.random() * 1000000).toString();
};

const randomIconAvatar = async () => {
  try {
    const randomNumber = generateRandomNumber();

    const apiUrl = `https://robohash.org/${randomNumber}?gravatar=hashed`;

    const response = await fetch(apiUrl);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(response.status);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export { randomIconAvatar };
