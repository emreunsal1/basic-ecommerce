const boolinize = (value) => {
  if (value === "false") {
    return false;
  }
  if (value === "true") {
    return true;
  }
  return value;
};

export const getLocal = (key) => {
  const value = localStorage.getItem(key);
  if (value) {
    return boolinize(value);
  }
  return null;
};

export const setLocal = (key, value) => {
  localStorage.setItem(key, value);
};


export const STORAGE = {
  getLocal,
  setLocal,
};
