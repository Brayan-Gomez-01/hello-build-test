import React, { useState, useEffect } from "react";
import { get } from '../libs/AsyncHttpRequest';
import { URL_API } from '../config/constants';
import "../styles/login/login.css";
import { Link } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Row, Col,  Layout, Alert } from "antd";
// import Loading from "./Loading";
import Header from "./Header";
import Navbar from "./Navbar";
import Copyrigth from "./Copyrigth";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

	const { Content } = Layout;

	const Profile = () => {

		const [error, setError] = useState(false)
		const [userInfo, setUserInfo] = useState({})
		const login = localStorage.getItem("login");
		const username = localStorage.getItem("username");
		const onFinish = (values: any) => {
			console.log("Received values of form: ", values);
		};

		useEffect(()=>{
			if(login !== "true"){
				window.location.replace("/")
			}
		},[login])

		useEffect( ()=>{
			async function fetchData(){
				const {data}  = await get(`${URL_API}/user/${username}`);
				if(typeof data.result !== "string" ){
					setUserInfo(data.result)
				}else{
					setError(data.result)
					setTimeout(() => {
						setError(false)
					}, 3000)
				}
			}
			fetchData()
		},[login])

		return (
		<Layout className="fullscreen" id="profile">
			<Header title="Hello Build Profile" />
			<Link to="/dashboard"><button type="button" className="btn btn-primary float-right mr-5 mt-5">Dashboard</button></Link>

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
                {error != false ? <Alert message={error} type="error" className="mb-2" />:""}

					<Form.Item
					>
					Name:
						<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder="name"
						name="name"
						value={userInfo.name}
						/>
					</Form.Item>
					<Form.Item
					>
					User Name:
						<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder="Username"
						name="username"
						value={userInfo.username}
						/>
					</Form.Item>
					<Form.Item
					>
					Gitlab User:
						<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder="Gitlab User"
						name="gitlab_user"
						value={userInfo.gitlab_user}
						/>
					</Form.Item>
					<Form.Item
					>
					Password:
						<Input.Password
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						placeholder="Password"
						name="password"
						value={userInfo.password}
						iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
						/>
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

	export default Profile;
