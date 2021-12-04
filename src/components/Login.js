import "../styles/login/login.css";
import { Layout } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Button, Row, Col } from "antd";
// import Loading from "./Loading";
import Header from "./Header";
import Navbar from "./Navbar";
import Copyrigth from "./Copyrigth";
const { Content } = Layout;

const Login = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
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
                  />
                </Form.Item>
                <Form.Item>
                  <a className="login-form-forgot" href="">
                    Forgot password
                  </a>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button mr-1"
                  >
                    Log in
                  </Button>
                  Or <a href="">register now!</a>
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
