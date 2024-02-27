import React from "react";

import UsersList from "../components/UsersList/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Jan Bańczerowski",
      image:
        "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
      places: 3,
    },
  ];
  return <UsersList items={USERS} />;
};

export default Users;
