import React from "react";
import { Link } from "react-router-dom";
// import classes from "./Sidebar.module.css";
import { Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

export const Sidebar = () => {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      style={{ height: "100%", borderRight: 0 }}
    >
      <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        <Link to="/dialogs">Messages</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        <Link to="/users">Users</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<UserOutlined />}>
        <Link to="/news">News</Link>
      </Menu.Item>
      <Menu.Item key="5" icon={<UserOutlined />}>
        <Link to="/music">Music</Link>
      </Menu.Item>
    </Menu>
  );
};
