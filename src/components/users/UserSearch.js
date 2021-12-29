import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";
import AlertContext from "../../context/alert/AlertContext";

const UserSearch = () => {
  const [text, setText] = useState("");

  const { searchUsers, clearUsers } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter something", "error");
      return;
    }
    searchUsers(text);
  };

  const handleClear = () => {
    setText("");
    clearUsers();
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                className="w-full pr-40 bg-gray-200 input input-md text-black"
                placeholder="Search"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button
                type="submit"
                onClick={handleSubmit}
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-md"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        {text !== "" && (
          <button className="btn btn-ghost btn-md" onClick={handleClear}>
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default UserSearch;
