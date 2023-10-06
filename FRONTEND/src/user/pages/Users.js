import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "samir gautam",
      image:
        "https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_1280.jpg",
      places: 3,
    },
  ];
  return <UsersList items={USERS} />;
};

export default Users;
