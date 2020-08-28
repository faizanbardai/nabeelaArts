const baseURL = process.env.REACT_APP_BASE_URL;
export const api_login = async (body) => {
    return await fetch(baseURL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  export const api_refresh_token = async (token) => {
    return await fetch(baseURL + "/refresh-token", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  };