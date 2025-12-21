import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Typography, Card, message } from "antd";

const { Title } = Typography;
const { TextArea } = Input;

const ContactCompany = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const { name, email, message: msg } = values;

    if (name.length < 3) {
      return window.notify("Please enter Your FullName correctly", "error");
    }

    if (!name.trim() || !email.trim() || !msg.trim()) {
      return window.notify("All fields are required!", "error");
    }

    if (!window.isEmail(email)) {
      return window.notify("Please enter a valid email address", "error");
    }

    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Contact Message:", values);
      window.notify("Message sent successfully!", "success");
      form.resetFields();
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section
      style={{ minHeight: "100vh" }}
      className="d-flex align-items-center justify-content-center bg-light"
    >
      <Row justify="center" style={{ width: "100%" }}>
        <Col xs={22} sm={18} md={12} lg={10}>
          <Card
            style={{
              borderRadius: "10px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            }}
            bodyStyle={{ padding: "30px" }}
          >
            <Title level={2} className="text-center text-primary mb-4">
              Contact Us
            </Title>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              autoComplete="off"
            >
              <Form.Item
                label="FullName"
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Enter your name" size="large" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Enter your email" size="large" />
              </Form.Item>

              <Form.Item
                label="Message"
                name="message"
                rules={[
                  { required: true, message: "Please enter your message" },
                ]}
              >
                <TextArea
                  placeholder="Type your message"
                  style={{ height: 120, resize: "none" }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  loading={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </Form.Item>
            </Form>

            {/* Optional Company Info */}
            <div className="text-center text-secondary mt-4">
              <p>Phone: +1 234 567 890</p>
              <p>Email: todos@todosapp.com</p>
              <p>Address: 123 Todo St, Faisalabad City</p>
            </div>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default ContactCompany;
