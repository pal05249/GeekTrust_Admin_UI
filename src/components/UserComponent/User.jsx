import { useRef } from "react";

import "./User.css";

const User = (props) => {
    const { user, deleteSelectedUser, editSelectedUser, saveUser, checkOne } = props;

    const nameElement = useRef();
    const emailElement = useRef();
    const roleElement = useRef();

    return (
        <tr key={user.id} className={user.isChecked ? 'selected' : ""}>
            <td>
                <label for={`user-${user.id}`}>
                    <input
                        id={`user-${user.id}`}
                        type="checkbox"
                        onChange={() => checkOne(user.id)}
                        checked={user.isChecked}
                    ></input>
                </label>
            </td>
            <td>
                <input
                    className={user.edit === false ? 'readOnly' : ''}
                    readOnly={!user.edit}
                    type="text"
                    ref={nameElement}
                    name="name"
                    defaultValue={user.name}
                ></input>
            </td>
            <td>
                <input
                    className={user.edit === false ? 'readOnly' : ''}
                    readOnly={!user.edit}
                    type="email"
                    ref={emailElement}
                    name="email"
                    defaultValue={user.email}
                />
            </td>
            <td>
                <input
                    className={user.edit === false ? 'readOnly' : ''}
                    readOnly={!user.edit}
                    type="text"
                    ref={roleElement}
                    name="role"
                    defaultValue={user.role}
                />
            </td>
            <td className="icons">
                {user.edit ? (
                    <i
                        onClick={() => saveUser(user.id, nameElement, emailElement, roleElement)}
                        className="fas fa-save "
                    ></i>
                ) : (
                    <i onClick={() => editSelectedUser(user.id)} className="fas fa-edit" style={{ color: 'black' }} ></i>
                )}

                <i onClick={() => deleteSelectedUser(user.id)} className="fas fa-trash" style={{ color: 'red' }} ></i>
            </td>
        </tr>
    );
};


export default User;
