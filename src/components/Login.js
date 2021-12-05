import React, { useState } from "react";
import { post } from '../libs/AsyncHttpRequest';
import { URL_API } from '../config/constants';
import "../styles/login/login.css";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Button, Row, Col, Alert } from "antd";
// import Loading from "./Loading";
import Header from "./Header";
import Navbar from "./Navbar";
import Copyrigth from "./Copyrigth";
const { Content } = Layout;

const Login = () => {
  const [username, setUsername] = useState(false);
  const [password, setPassword] = useState(false);
  const [error, setError] = useState(false)

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  const getPassword = (event)=>{
  setPassword(event.target.value);
  }
  const getUsername = (event)=>{
  setUsername(event.target.value);
  }
  const validateUserInfo = async (event) => {
  if(username && password){
    const {data}  = await post(`${URL_API}/user/login`,{
      "username":username,
      "password":password
    });
    if(typeof data.result != "string"){
      window.location.replace("/dashboard")
      localStorage.setItem("login",true)
      localStorage.setItem("gitlab_user",data.result.gitlab_user)
      localStorage.setItem("username",data.result.username)
	}else{
    setError(data.result)
    setTimeout(() => {
     setError(false)
  }, 3000)
	}
    }
  }
  return (
    <Layout className="fullscreen" id="login">
      <Header title="Hello Build Login" />
      <Content className="center">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="w-75 m-auto">
          <Col
            className="gutter-row p-3"
            xs={24}
            sm={24}
            md={12}
            lg={12}
            offset={6}
          >
            <Content className="p-5 bg-light rounded-1">
              <Navbar />
              <Form
                name="normal_login"
                className="login-form w-100"
                onFinish={onFinish}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Username!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                    onChange={getUsername}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    onChange={getPassword}
                  />
                </Form.Item>
                {error != false ? <Alert message={error} type="error" className="mb-2" />:""}
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button mr-1"
                    onClick={validateUserInfo}
                  >
                    Log in
                  </Button>
                  Or <Link to="/register">register now! </Link>
                </Form.Item>
              </Form>{" "}
            </Content>
          </Col>
        </Row>
        <Copyrigth />
      </Content>
    </Layout>
  );
};

export default Login;
