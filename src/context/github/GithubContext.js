import React, { createContext, useReducer, useEffect } from "react";
import githubReducer from "./GithubReducer";
const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({ q: text });
    const res = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const { items } = await res.json();

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  const fetchUsers = async () => {
    setLoading();
    // `${GITHUB_URL}/search/users?q=followers%3A%3E%3D1000`
    const res = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data = await res.json();

    dispatch({
      type: "GET_USERS",
      payload: data,
    });
  };

  const fetchUser = async (login) => {
    setLoading();

    // `${GITHUB_URL}/search/users?q=followers%3A%3E%3D1000`
    const res = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    if (res.status === 404) {
      window.location = "/not-found";
    }

    const data = await res.json();

    dispatch({
      type: "GET_USER",
      payload: data,
    });
  };

  const getUserRepos = async (login) => {
    setLoading();
    const params = new URLSearchParams({ sort: "created", per_page: 10 });
    const res = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data = await res.json();

    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  };

  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };

  const clearUsers = () => {
    //dispatch({ type: "CLEAR_USERS" });
    fetchUsers();
  };

  return (
    <GithubContext.Provider
      value={{
        ...state,
        searchUsers,
        clearUsers,
        fetchUsers,
        fetchUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
