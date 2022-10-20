import axios from "axios";


const API_ENDPOINT =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const fetchUserList = (setUserList) => {
    axios
        .get(API_ENDPOINT)
        .then((res) => {
            let users = res.data
            setUserList((users).map(user => {
                user.isChecked = false;
                user.edit = false;
                user.show = true;
                return user;
            }))
        })
        .catch((err) => console.log(err));
};


export { fetchUserList };