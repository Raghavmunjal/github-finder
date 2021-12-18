import React, { useContext } from "react";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/GithubContext";

const UserLists = () => {
  const { users, loading } = useContext(GithubContext);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
          {users.map((u) => (
            <UserItem key={u.id} user={u} />
          ))}
        </div>
      )}
    </>
  );
};

export default UserLists;
