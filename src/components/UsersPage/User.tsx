import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import userPhoto from "../../assets/images/userPhoto.png";
import { UsersType } from "../../types/types";
import { Card } from 'antd';
import   './Users.css'

type PropsType = {
  user: UsersType
  unfollowUser: (userId: number) => void
  followUser: (userId: number) => void
  followingStart: Array<number>
}

export const User: FC<PropsType> = ({ user, unfollowUser, followUser, followingStart }) => {
  return (
    <div >
        <Card className="cardItem" >
          <NavLink to={"/profile/" + user.id}>
                   <img className='userPhoto'  
                        alt="" 
                        src={user.photos.small || userPhoto} />
          </NavLink>
          <div><strong>FullName:</strong> {user.name}</div>
          <div><strong>Status:</strong> {user.status} </div> 
         
          <div className="buttons-card">
            {user.followed ? (
            <button className='card-button'
              disabled={followingStart.some((id) => id === user.id)}
              onClick={() => {
                unfollowUser(user.id);
              }}
              >
              unFollow
            </button>
            ) : (
            <button className='card-button'
              disabled={followingStart.some((id) => id === user.id)}
              onClick={() => {
                followUser(user.id);
              }}
            >
              Follow
            </button>
           )}
          </div>
      </Card>
     
    </div>
  );
};
