import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge } from 'react-bootstrap';

import { BarChart2, Search, Clock, TrendingUp, Home as HomeIcon } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import ChatInput from '../components/ChatInput';
import AnalysisChart from '../components/AnalysisChart';
import DataTable from '../components/DataTable';
import { analyzeRealEstate, getSampleQueries, getLocalities, exportAnalysis } from '../services/apiService';

const HomePage = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [localities, setLocalities] = useState([]);
  const [sampleQueries, setSampleQueries] = useState([]);
  const [analysisResult, setAnalysisResult] = useState(null);
  const messagesEndRef = useRef(null);

  const navigate = useNavigate();

  // Fetch sample queries and localities on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [queries, locs] = await Promise.all([
          getSampleQueries(),
          getLocalities()
        ]);
        setSampleQueries(queries);
        setLocalities(locs);
        
        // Add welcome message
        addBotMessage(
          'Welcome to RealEstate Analyzer! You can ask me to analyze real estate data. ' +
          'Try asking something like "Show me price trends in Wakad" or "Compare demand in different areas".'
        );
      } catch (err) {
        console.error('Error fetching initial data:', err);
        setError('Failed to load application data. Please try again later.');
      }
    };

    fetchInitialData();
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (text, isUser = true) => {
    const newMessage = {
      id: Date.now(),
      text,
      isUser,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addBotMessage = (text) => {
    addMessage(text, false);
  };

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    // Add user message to chat
    addMessage(message, true);
    setIsLoading(true);
    setError(null);

    try {
      // Send query to the backend
      const response = await analyzeRealEstate(message);
      
      // Update analysis result
      setAnalysisResult(response);
      
      // Add bot's response to chat
      addBotMessage(response.summary);
      
    } catch (err) {
      console.error('Error analyzing real estate data:', err);
      setError('Sorry, there was an error processing your request. Please try again.');
      addBotMessage("I'm sorry, I couldn't process your request. Please try rephrasing your question or try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSampleQueryClick = (query) => {
    // Set the query in the input and submit it
    handleSendMessage(query);
  };

  return (
    <div className="app-container">
      <Container className="main-content">
        <Row className="justify-content-center">
          <Col lg={8}>
            <h1 className="text-center mb-4">
              <BarChart2 size={32} className="me-2 text-primary" />
              Real Estate Analysis Chatbot
            </h1>
            <p className="text-center text-muted mb-4">
              Get insights and analysis of real estate markets with natural language queries
            </p>
            
            {error && (
              <Alert variant="danger" className="mb-4">
                {error}
              </Alert>
            )}

            <Card className="mb-4 shadow-sm">
              <Card.Body className="p-0">
                <div className="chat-container">
                  <div className="chat-messages">
                    {messages.map((msg) => (
                      <Message
                        key={msg.id}
                        message={msg.text}
                        isUser={msg.isUser}
                        timestamp={msg.timestamp}
                      />
                    ))}
                    {isLoading && (
                      <div className="d-flex justify-content-start mb-3">
                        <div className="message message-bot">
                          <div className="d-flex align-items-center mb-1">
                            <span className="spinner-border spinner-border-sm me-2" role="status" />
                            <small className="text-muted">Analyzing...</small>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  
                  <div className="chat-input-container">
                    <ChatInput
                      onSendMessage={handleSendMessage}
                      isLoading={isLoading}
                    />
                  </div>
                </div>
              </Card.Body>
            </Card>

            {analysisResult && (
              <>
                <Card className="mb-4 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="mb-0">Market Analysis</h5>
                      {analysisResult?.metadata?.ai_summary && (
                        <Badge bg="info" pill>
                          AI enhanced
                        </Badge>
                      )}
                    </div>
                    <div className="chart-container">
                      <AnalysisChart chartData={analysisResult.chart_data} />
                    </div>
                  </Card.Body>
                </Card>

                <Card className="shadow-sm">
                  <Card.Body>
                    <DataTable
                      data={analysisResult.table_data}
                      title="Real Estate Data"
                      onDownload={async (format) => {
                        try {
                          await exportAnalysis({
                            ...analysisResult.filters,
                            format,
                          });
                        } catch (err) {
                          console.error('Export failed', err);
                          setError('Failed to export data. Please try again later.');
                        }
                      }}
                    />
                  </Card.Body>
                </Card>
              </>
            )}

            {!analysisResult && sampleQueries.length > 0 && (
              <Card className="mt-4 shadow-sm">
                <Card.Body>
                  <h5 className="mb-3">Try asking:</h5>
                  <div className="d-flex flex-wrap gap-2">
                    {sampleQueries.map((query, index) => (
                      <Button
                        key={index}
                        variant="outline-primary"
                        size="sm"
                        className="mb-2"
                        onClick={() => handleSampleQueryClick(query.query)}
                      >
                        {query.query}
                      </Button>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;