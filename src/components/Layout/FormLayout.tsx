import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

interface FormLayoutProps {
  children: React.ReactNode;
  title: string;
}

const FormLayout: React.FC<FormLayoutProps> = ({ children, title }) => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Header as="h4" className="bg-primary text-white text-center">
              {title}
            </Card.Header>
            <Card.Body>
              {children}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FormLayout;