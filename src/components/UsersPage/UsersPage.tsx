import React from "react";
import "./Users.css";
import Preloader from "../../common/Preloader/Preloader";
import { Users } from "./Users"; 
import {getIsFetching} from "../../redux/users-selectors";
import { useSelector} from 'react-redux'

type UsersPageTypeProps ={}
 const UsersPage: React.FC<UsersPageTypeProps> = () => {

   const isFetching = useSelector(getIsFetching)
   
return (
  <>
    <div className="usersWrapper">
      {isFetching ? <Preloader /> : null}
      <Users />
    </div>
 </>
 )
}

export default UsersPage