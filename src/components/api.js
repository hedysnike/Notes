export const login = async (username, password) => {
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  return await response.json();
};

export const register = async (username, password) => {
  const response = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  return await response.json();
};

export const createNote = async (note, token) => {
  const response = await fetch("http://localhost:3000/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(note),
  });

  return await response.json();
};

export const getMe = async (token) => {
  const response = await fetch("http://localhost:3000/me", {
    headers: {
      Authorization: token,
    },
  });

  return await response.json();
};

export const getNotes = async (token) => {
  const response = await fetch("http://localhost:3000/notes", {
    headers: {
      Authorization: token,
    },
  });

  return await response.json();
};
