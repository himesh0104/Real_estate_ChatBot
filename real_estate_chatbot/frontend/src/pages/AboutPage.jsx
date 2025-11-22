import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { BarChart2, Code, Database, Cpu } from 'react-feather';

const AboutPage = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold mb-3">About RealEstate Analyzer</h1>
            <p className="lead text-muted">
              A powerful tool for analyzing real estate market trends using natural language processing
            </p>
          </div>

          <Card className="mb-5 shadow-sm">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">How It Works</h2>
              <Row className="g-4">
                <Col md={6} lg={3}>
                  <div className="text-center p-3">
                    <div className="icon-lg bg-soft-primary rounded-circle mb-3">
                      <BarChart2 size={24} className="text-primary" />
                    </div>
                    <h5 className="mb-2">Analyze</h5>
                    <p className="text-muted mb-0">
                      Get insights on real estate markets with simple natural language queries
                    </p>
                  </div>
                </Col>
                <Col md={6} lg={3}>
                  <div className="text-center p-3">
                    <div className="icon-lg bg-soft-primary rounded-circle mb-3">
                      <Database size={24} className="text-primary" />
                    </div>
                    <h5 className="mb-2">Data-Driven</h5>
                    <p className="text-muted mb-0">
                      Powered by comprehensive real estate data and advanced analytics
                    </p>
                  </div>
                </Col>
                <Col md={6} lg={3}>
                  <div className="text-center p-3">
                    <div className="icon-lg bg-soft-primary rounded-circle mb-3">
                      <Cpu size={24} className="text-primary" />
                    </div>
                    <h5 className="mb-2">AI-Powered</h5>
                    <p className="text-muted mb-0">
                      Utilizes machine learning to provide accurate market predictions
                    </p>
                  </div>
                </Col>
                <Col md={6} lg={3}>
                  <div className="text-center p-3">
                    <div className="icon-lg bg-soft-primary rounded-circle mb-3">
                      <Code size={24} className="text-primary" />
                    </div>
                    <h5 className="mb-2">Open Source</h5>
                    <p className="text-muted mb-0">
                      Built with modern web technologies and open-source libraries
                    </p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">Features</h2>
              <Row>
                <Col md={6} className="mb-4">
                  <h5 className="d-flex align-items-center mb-3">
                    <span className="icon-xs bg-soft-primary text-primary rounded-3 me-2">
                      <i className="bi bi-graph-up"></i>
                    </span>
                    Market Trends
                  </h5>
                  <p className="text-muted ps-4">
                    Track price movements and demand trends across different localities over time.
                  </p>
                </Col>
                <Col md={6} className="mb-4">
                  <h5 className="d-flex align-items-center mb-3">
                    <span className="icon-xs bg-soft-primary text-primary rounded-3 me-2">
                      <i className="bi bi-search"></i>
                    </span>
                    Natural Language Queries
                  </h5>
                  <p className="text-muted ps-4">
                    Ask questions in plain English and get meaningful insights instantly.
                  </p>
                </Col>
                <Col md={6} className="mb-4">
                  <h5 className="d-flex align-items-center mb-3">
                    <span className="icon-xs bg-soft-primary text-primary rounded-3 me-2">
                      <i className="bi bi-table"></i>
                    </span>
                    Detailed Reports
                  </h5>
                  <p className="text-muted ps-4">
                    Access comprehensive reports with charts, tables, and key metrics.
                  </p>
                </Col>
                <Col md={6} className="mb-4">
                  <h5 className="d-flex align-items-center mb-3">
                    <span className="icon-xs bg-soft-primary text-primary rounded-3 me-2">
                      <i className="bi bi-download"></i>
                    </span>
                    Export Data
                  </h5>
                  <p className="text-muted ps-4">
                    Download analysis results and raw data for further processing.
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;