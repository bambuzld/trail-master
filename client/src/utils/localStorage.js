export function get(key, defaultValue) {
  try {
    const value = window.localStorage.getItem(key);

    if (value === null) {
      return defaultValue;
    }

    return JSON.parse(value);
  } catch (err) {
    return defaultValue;
  }
}

export function set(key, json) {
  try {
    window.localStorage.setItem(key, JSON.stringify(json));

    return true;
  } catch (err) {
    return false;
  }
}

export function deleteItem(key, json) {
  try {
    window.localStorage.removeItem(key);

    return true;
  } catch (err) {
    return false;
  }
}
