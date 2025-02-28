

// export const getJWToken = () => {
//     const user = localStorage.getItem("token");
//     const parsedUser = user ? JSON.parse(user) : null;
//     return  { token: parsedUser?.token, userName: parsedUser?.userName};
//     }

const user = localStorage.getItem("token");
const parsedUser = user ? JSON.parse(user) : null;
export const token =parsedUser?.token;
export const userName=parsedUser?.userName;