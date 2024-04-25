import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";
export const handleLogin = (e, role, email, password) => {
  e.preventDefault();
  try {
    if (!role || !email || !password) {
      return alert("Please provide all fields");
    }
    // console.log("login->", e, role, email, password);
    store.dispatch(userLogin({ role, email, password }));
  } catch (error) {
    console.log(error);
  }
};

export const handleRegister = (
  e,
  name,
  role,
  email,
  password,
  phone,
  organizationName,
  address,
  hospitalName,
  website
) => {
  e.preventDefault();
  try {
    store.dispatch(
      userRegister({
        name,
        role,
        email,
        password,
        phone,
        organizationName,
        address,
        hospitalName,
        website
  })
    );
  } catch (error) {
    console.log(error);
  }
};
