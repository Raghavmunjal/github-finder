import React from "react";
import UserLists from "../components/users/UserLists";
import UserSearch from "../components/users/UserSearch";

const Home = () => {
  return (
    <div>
      <UserSearch />
      <UserLists />
    </div>
  );
};

export default Home;
