import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/Auth";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Form, Input, Row, Typography, Select } from "antd";

const { Title } = Typography;
const { TextArea } = Input;

const initialState = {
  title: "",
  priority: "",
  description: "",
};

const EditTodo = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      setState({
        title: todo.title,
        priority: todo.priority,
        description: todo.description,
      });
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handlePriorityChange = (value) => {
    setState((s) => ({ ...s, priority: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, priority, description } = state;

    if (!title.trim()) {
      return window.notify("Please enter a title", "error");
    }

    if (!priority) {
      return window.notify("Please select priority", "error");
    }

    setIsProcessing(true);

    setTimeout(() => {
      let todos = JSON.parse(localStorage.getItem("todos")) || [];

      todos = todos.map((t) =>
        t.id === id
          ? {
              ...t,
              title: title.trim(),
              priority,
              description: description.trim(),
            }
          : t
      );

      localStorage.setItem("todos", JSON.stringify(todos));

      setIsProcessing(false);
      window.notify("Todo updated successfully!", "success");
      navigate("/"); 
    }, 500);
  };

  return (
    <main className="auth p-3 p-lg-4">
      <div
        className="card p-3 p-lg-4"
      >
        <Title className="text-primary mb-4 text-center">Edit Todo</Title>
        <Form layout="vertical">
          <Row gutter={16}>
            {/* Title */}
            <Col span={24}>
              <Form.Item label="Title" required>
                <Input
                  placeholder="Enter Todo Title"
                  size="large"
                  name="title"
                  value={state.title}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>

            {/* Priority Dropdown */}
            <Col span={24}>
              <Form.Item label="Priority" required>
                <Select
                  placeholder="Select Priority"
                  size="large"
                  value={state.priority || undefined}
                  onChange={handlePriorityChange}
                  options={[
                    { label: "High", value: "High" },
                    { label: "Medium", value: "Medium" },
                    { label: "Low", value: "Low" },
                  ]}
                />
              </Form.Item>
            </Col>

            {/* Description */}
            <Col span={24}>
              <Form.Item label="Description">
                <TextArea
                  placeholder="Enter Todo Description"
                  size="large"
                  style={{ height: 150, resize: "none" }}
                  name="description"
                  value={state.description}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>

            {/* Buttons */}
            <Col span={12}>
              <Button
                type="primary"
                size="large"
                block
                htmlType="submit"
                loading={isProcessing}
                onClick={handleSubmit}
              >
                Update Todo
              </Button>
            </Col>

            <Col span={12}>
              <Button
                type="primary"
                size="large"
                block
                onClick={() => navigate("/")}
              >
                All Todos
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </main>
  );
};

export default EditTodo;
