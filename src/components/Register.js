import React, { useState } from "react";
import { post } from '../libs/AsyncHttpRequest';
import { URL_API } from '../config/constants';
import "../styles/login/login.css";
import { Link } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Button, Row, Col,  Layout, Alert } from "antd";
// import Loading from "./Loading";
import Header from "./Header";
import Navbar from "./Navbar";
import Copyrigth from "./Copyrigth";
	const { Content } = Layout;

	const Register = () => {

	const [error, setError] = useState(false)
	const [userInfo, setUserInfo] = useState({
		"name":"",
		"username":"",
		"gitlab_user":"",
		"password":""
	});

	const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  	};
	const getInfo = (event) => {
	const { name, value } = event.target;
	console.log( name, value)
	setUserInfo((prevState) => ({
		...prevState,
		[name]: value,
	}));
	};

	const validateUserInfo = async (event) => {
		if(userInfo){
			const {data}  = await post(`${URL_API}/user/register`,userInfo);
			if(typeof data.result !== "string"){
				window.location.replace("/")
			}else{
				setError(data.result)
				setTimeout(() => {
					setError(false)
				}, 3000)
			}
		}
	}
	return (
	<Layout className="fullscreen" id="register">
		<Header title="Hello Build Register" />
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
					rules={[
					{
						required: true,
						message: "Please input your name!",
					},
					]}
				>
					<Input
					prefix={<UserOutlined className="site-form-item-icon" />}
					placeholder="name"
					name="name"
					onChange={getInfo}
					/>
				</Form.Item>
				<Form.Item
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
					name="username"
					onChange={getInfo}
					/>
				</Form.Item>
				<Form.Item
					rules={[
					{
						required: true,
						message: "Please input your Gitlab User!",
					},
					]}
				>
					<Input
					prefix={<UserOutlined className="site-form-item-icon" />}
					placeholder="Gitlab User"
					name="gitlab_user"
					onChange={getInfo}
					/>
				</Form.Item>
				<Form.Item
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
					name="password"
					onChange={getInfo}
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
					Register
					</Button>
					Or <Link to="/">Login now! </Link>
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

	export default Register;
