import { Button, Col, Form, Input, Row, Typography } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/Auth";

const { Title } = Typography;

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsprocessing] = useState(false);

  const { loginUser } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    let { email, password } = state;

    if (!window.isEmail(email)) {
      return window.notify("Please enter a valid email address", "error");
    }

    if (!password) {
      return window.notify("Please enter your password", "error");
    }

    setIsprocessing(true);

    setTimeout(() => {
      let users = localStorage.getItem("users");
      users = users ? JSON.parse(users) : [];

      if (users.length === 0) {
        setIsprocessing(false);
        return window.notify("No user found. Please register first.", "error");
      }

      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!foundUser) {
        setIsprocessing(false);
        return window.notify("Invalid email or password", "error");
      }

      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      loginUser(foundUser);

      setIsprocessing(false);
      setState(initialState);

      window.notify("Login successful!", "success");
      navigate("/dashboard");
    }, 500);
  };

  return (
    <main className="auth p-3 p-lg-4">
      <div className="card p-3 p-lg-4">
        <Title className="text-primary mb-5 text-center">Login</Title>
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Email" required>
                <Input
                  type="email"
                  placeholder="Enter Your Email"
                  size="large"
                  name="email"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Password" className="mb-0" required>
                <Input.Password
                  placeholder="Enter Your password"
                  size="large"
                  className="mb-0"
                  name="password"
                  onChange={handleChange}
                />
              </Form.Item>

              <div className="text-end mb-3 mt-0">
                <Link
                  to="/auth/forgot-password"
                  className="fw-bold auth-custam-color"
                >
                  Reset Password
                </Link>
              </div>
            </Col>

            <Col span={24}>
              <Button
                type="primary"
                size="large"
                block
                htmlType="submit"
                loading={isProcessing}
                onClick={handleSubmit}
              >
                Login
              </Button>
            </Col>

            {/* Register link below */}
            <Col span={24} className="text-center mt-3">
              I don't have an account?{" "}
              <Link to="/auth/register" className="fw-bold auth-custam-color">
                Register
              </Link>
            </Col>
          </Row>
        </Form>
      </div>
    </main>
  );
};

export default Login;
