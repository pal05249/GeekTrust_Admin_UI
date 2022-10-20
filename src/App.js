import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Pagination from "./components/Pagination/Pagination";
import UserList from "./components/List/UserList";
import { fetchUserList } from "./services/AppService.js";
import { config } from "./config";

const App = () => {

  //userlist state
  const [users, setUserList] = useState([]);
  const [update, setChangeUpdate] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const selectAllRef = useRef(null);

  //fetch users on page load
  useEffect(() => {
    fetchUserList(setUserList);
  }, []);

  //search users by name,email and role
  const searchUsers = (event) => {
    setCurrentPage(1);
    let searchUser = event.target.value.toLowerCase();
    let filteredUsers = users.map((user) => {
      if (
        user.name.toLowerCase().includes(searchUser) ||
        user.email.toLowerCase().includes(searchUser) ||
        user.role.toLowerCase().includes(searchUser)
      ) {
        user.show = true;
        return user;
      }
      else {
        user.show = false;
        return user;
      }
    })
    setUserList(filteredUsers);
  };

  //delete user by id
  const deleteSelectedUser = (id) => {
    setUserList(users.filter((user) => user.id !== id))
  };

  //edit user by id
  const editSelectedUser = (id) => {
    let tempUserList = users;
    let idx = tempUserList.findIndex((user) => user.id === id);
    tempUserList[idx].edit = true;
    setUserList(tempUserList);
    setChangeUpdate((prevState) => !prevState);

  };

  //save user data
  const saveUser = (id, nameElement, emailElement, roleElement) => {
    let tempUserList = users;
    let idx = tempUserList.findIndex((user) => user.id === id);
    tempUserList[idx].name = nameElement.current.value;
    tempUserList[idx].email = emailElement.current.value;
    tempUserList[idx].role = roleElement.current.value;
    tempUserList[idx].edit = false;
    setUserList(tempUserList);
    setChangeUpdate((prevState) => !prevState);

  };

  const checkOne = (id) => {
    const tempUserList = users;
    let idx = tempUserList.findIndex((user) => user.id === id);
    tempUserList[idx].isChecked = !tempUserList[idx].isChecked;
    setUserList(tempUserList);
    setChangeUpdate((prevState) => !prevState);
  };


  const selectAllCheckbox = (event) => {
    let listedUserIds = users
      .filter((user) => user.show)
      .slice(idx, idx + config.paginate)
      .map((user) => user.id);

    let tempUserList = users.map((user) => {
      if (listedUserIds.includes(user.id)) {
        user.isChecked = event.target.checked;
        return user;
      }
      return user;
    });

    setUserList(tempUserList);
    setChangeUpdate(!update);

  };

  const deleteSelected = () => {

    setUserList((prevState) => prevState.filter((user) => !user.isChecked));
    selectAllRef.current.checked = false;

  };

  const idx = (currentPage - 1) * 10;
  return (
    <div className="App">
      <input
        className="search"
        type="text"
        placeholder="Search by name or email"
        onChange={searchUsers}
      />
      <UserList
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        selectAllCheckbox={selectAllCheckbox}
        selectAllRef={selectAllRef}
        checkOne={checkOne}
        saveUser={saveUser}
        editSelectedUser={editSelectedUser}
        deleteSelectedUser={deleteSelectedUser}
        users={users
          .filter((user) => user.show)
          .slice(idx, idx + config.paginate)}
      />
      <Pagination
        usersLength={users.filter((user) => user.show).length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        deleteSelected={deleteSelected}
      />
    </div>
  );
}

export default App;