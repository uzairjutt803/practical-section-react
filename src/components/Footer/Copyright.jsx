import { Col, Row, Typography } from "antd";

const { Paragraph } = Typography;

const Copyright = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="bg-primary py-2">
        <div className="conrainer">
          <Row>
            <Col span={24}>
              <Paragraph className="mb-0 text-center text-white">
                &copy; <strong>Muhammad Uzair</strong> {year}. All Right
                Reseverd.{" "}
              </Paragraph>
            </Col>
          </Row>
        </div>
      </footer>
    </>
  );
};

export default Copyright;
