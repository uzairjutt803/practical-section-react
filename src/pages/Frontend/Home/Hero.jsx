import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Row,
  Col,
  Typography,
  Popconfirm,
  message,
  Space,
  Dropdown,
} from "antd";
import { useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Hero = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(data.reverse());
  }, []);

  const handleDelete = (id) => {
    setTimeout(() => {
      const deleted = todos.filter((t) => t.id !== id);
      setTodos(deleted);
      localStorage.setItem("todos", JSON.stringify(deleted.reverse()));
      message.success("Todo deleted successfully!");
    }, 500);
  };

  const columns = [
    {
      title: "#",
      key: "index",
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
      width: 150,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      width: 120,
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text) => {
        const words = text?.split(" ").slice(0, 3).join(" ");
        return text?.split(" ").length > 3 ? `${words}...` : words;
      },
      width: 200,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
      width: 150,
    },
    {
      title: "Action",
      width: 180,
      render: (_, record) => (
        <Dropdown
          trigger={["click"]}
          menu={{
            items: [
              {
                key: "actions",
                label: (
                  <Space>
                    <Button
                      type="primary"
                      icon={<EditOutlined />}
                      size="small"
                      onClick={() => navigate(`/dashboard/edit/${record.id}`)}
                    >
                      Edit
                    </Button>

                    <Popconfirm
                      title="Are you sure you want to delete this item?"
                      onConfirm={() => handleDelete(record.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button danger icon={<DeleteOutlined />} size="small">
                        Delete
                      </Button>
                    </Popconfirm>
                  </Space>
                ),
              },
            ],
          }}
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4 mt-5">
      {/* Header */}
      <Row align="middle" justify="space-between" className="mb-4">
        <Col>
          <Title level={3} type="primary">
            Todos
          </Title>
        </Col>

        <Col>
          <Button type="primary" onClick={() => navigate("/dashboard/add")}>
            New Todo
          </Button>
        </Col>
      </Row>

      {/* Table */}
      <Row>
        <Col span={24}>
          <div>
            <Table
              columns={columns}
              dataSource={todos}
              rowKey="id"
              pagination={false}
              scroll={{ x: "max-content" }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Hero;
