import { Button, Col, Form, Input, Row, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const { Title } = Typography;

const ForgotPassword = () => {
  return (
    <main className="auth p-3 p-lg-4">
      <div className="card p-3 p-lg-4">
        <Title className="text-primary mb-5 text-center">Forgot Password</Title>
        <Form layout="vertical">
          <Row gutter={16}>
            {/* Email */}
            <Col span={24}>
              <Form.Item label="Email" required>
                <Input
                  type="email"
                  placeholder="Enter Your Email"
                  size="large"
                  name="email"
                />
              </Form.Item>
            </Col>

            {/* Button */}
            <Col span={24}>
              <Button type="primary" size="large" block htmlType="submit">
                Send Email
              </Button>
            </Col>
            {/* Login link */}
            <Col span={24} className="text-center mt-3 mb-0">
                Back to Login: {" "}
              <Link to="/auth/login" className="text-primary fw-bold">
              Login
              </Link>
            </Col>
          </Row>
        </Form>
      </div>
    </main>
  );
};

export default ForgotPassword;
