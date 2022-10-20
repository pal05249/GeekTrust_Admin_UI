import { useEffect } from "react";
import User from "../UserComponent/User";
import "./UserList.css";

const UserList = (props) => {
    const {
        users,
        deleteSelectedUser,
        editSelectedUser,
        saveUser,
        selectAllCheckbox,
        checkOne,
        selectAllRef,
        setCurrentPage,
        currentPage,
    } = props;

    useEffect(() => {
        if (users.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }, [currentPage, setCurrentPage, users.length]);

    if (users.length === 0 && currentPage === 1) {
        return <p>No users available</p>;
    } else
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                ref={selectAllRef}
                                onChange={(event) => {
                                    selectAllCheckbox(event);
                                }}
                                name="selectAllCheckbox"
                            />
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return user.show ? (
                            <User
                                checkOne={checkOne}
                                saveUser={saveUser}
                                editSelectedUser={editSelectedUser}
                                deleteSelectedUser={deleteSelectedUser}
                                key={user.id}
                                user={user}
                            />
                        ) : (
                            ""
                        );
                    })}

                </tbody>
            </table>
        );
};


export default UserList;