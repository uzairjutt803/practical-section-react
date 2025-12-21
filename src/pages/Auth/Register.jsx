import { Button, Col, Form, Input, Row, Typography } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/Auth";

const { Title } = Typography;

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsprocessing] = useState(false);

  const { loginUser } = useAuthContext();

  const navigate = useNavigate();

  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    let { firstName, lastName, email, password, confirmPassword } = state;

    firstName = firstName.trim();
    lastName = lastName.trim();

    let fullName = (firstName + " " + lastName).trim();

    if (firstName.length < 3) {
      return window.notify("Please enter Your first name correctly", "error");
    }
    if (!window.isEmail(email)) {
      return window.notify("Please enter a valid email address", "error");
    }
    if (password.length < 6) {
      return window.notify("Password must be at least 6 chars.", "error");
    }
    if (confirmPassword !== password) {
      return window.notify("Confirm Password doesn't match", "error");
    }

    setIsprocessing(true);

    setTimeout(() => {
      const userData = {
        uid: window.randamId(),
        firstName,
        lastName,
        fullName,
        email,
        password,
        status: "active",
        role: "user",
        createdAt: new Date().toISOString(),
      };

      let users = localStorage.getItem("users");
      users = users ? JSON.parse(users) : [];

      const isEmailExist = users.some((user) => user.email === email);
      if (isEmailExist) {
        setIsprocessing(false);
        return window.notify("Email already registered", "error");
      }

      users.push(userData);
      localStorage.setItem("users", JSON.stringify(users));

      setIsprocessing(false);
      setState(initialState);

      loginUser(userData);

      window.notify("User registered successfully!", "success");
      navigate("/dashboard");
    }, 500);
  };

  return (
    <>
      <main className="auth p-3 p-lg-4">
        <div className="card p-3 p-lg-4">
          <Title className="text-primary mb-5 text-center">Register</Title>
          <Form layout="vertical">
            <Row gutter={16}>
              {/* First Name */}
              <Col xs={24} md={12}>
                <Form.Item label="First Name" required>
                  <Input
                    type="text"
                    placeholder="Enter Your First Name"
                    size="large"
                    name="firstName"
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
              {/* Last Name */}
              <Col xs={24} md={12}>
                <Form.Item label="Last Name">
                  <Input
                    type="text"
                    placeholder="Enter Your last Name"
                    size="large"
                    name="lastName"
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
              {/* Email */}
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
              {/* password */}
              <Col span={24}>
                <Form.Item label="Password">
                  <Input.Password
                    placeholder="Enter Your password"
                    size="large"
                    name="password"
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
              {/* Confirm password */}
              <Col span={24}>
                <Form.Item label="Confirm Password">
                  <Input.Password
                    placeholder="Enter Your password again"
                    size="large"
                    name="confirmPassword"
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
              {/* Button */}
              <Col span={24}>
                <Button
                  type="primary"
                  size="large"
                  block
                  htmlType="submit"
                  loading={isProcessing}
                  onClick={handleSubmit}
                >
                  Register
                </Button>
              </Col>
              {/* Login page */}
              <Col span={24} className="text-center mt-3 mb-0">
                Already have an account?{" "}
                <Link to="/auth/login" className="text-primary fw-bold">
                  Login
                </Link>
              </Col>
            </Row>
          </Form>
        </div>
      </main>
    </>
  );
};

export default Register;
