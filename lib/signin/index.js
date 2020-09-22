//import useSWR from 'swr';
import React, { useContext } from "react";
import PropTypes from "prop-types";
//export {signout,SignInScreen,signin} from './firebase'

export function signout() {}
export function SignInScreen(props) {
  return null;
}
export function signin() {}

const UserContext = React.createContext();

export function useCurrentUser() {
  return null;
  const { user } = useContext(UserContext);
  return user;
}

export function useLoginRequired() {
  return [false, () => {}];
}

export function SigninAssistant(props) {
  //  const {data:user,mutate}=useSWR('/api/rest/user/current',{initialdata:props.user})
  const user = null,
    mutate = () => {};

  return (
    <UserContext.Provider value={{ user, refresh: mutate }}>
      {props.children}
    </UserContext.Provider>
  );
}
SigninAssistant.propTypes = {
  user: PropTypes.any,
  children: PropTypes.any,
};
