import React from "react";
import { Link } from "react-router-dom";
// import classes from "./Navbar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getAuthorizedUserId, getLogin } from "../../redux/auth-selectors";
import { logout } from "../../redux/authReducer";
import { Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";

export const Navbar = (props) => {
  const isAuth = useSelector(getAuthorizedUserId);
  const login = useSelector(getLogin);

  const dispatch = useDispatch();

  const logoutCallback = () => {
    dispatch(logout());
  };
  return (
    <Row>
      <Col span={18}>
        <div className="navbar-brand" style={{ color: "white" }}>
          My social network
        </div>
      </Col>
      <Col span={6}>
        {isAuth ? (
          <div>
            <Avatar
              style={{ backgroundColor: "#87d068" }}
              icon={<UserOutlined />}
            />
            {login} <Button onClick={logoutCallback}>Logout</Button>
          </div>
        ) : (
          <Button>
            <Link to={"/login"} color="primary">
              Login
            </Link>
          </Button>
        )}
      </Col>
    </Row>
  );
};
