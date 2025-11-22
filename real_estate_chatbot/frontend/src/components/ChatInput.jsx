import React, { useState, useRef, useEffect } from 'react';
import { Form, InputGroup, Button, Spinner } from 'react-bootstrap';
import { Send, Paperclip, Mic } from 'react-feather';

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  // Auto-focus the input when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit} className="w-100">
      <InputGroup>
        <Form.Control
          ref={inputRef}
          type="text"
          placeholder="Type your query here (e.g., Analyze Wakad real estate)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
          className="border-0 py-3"
        />
        <Button
          variant="outline-secondary"
          type="button"
          className="border-0 bg-transparent"
          disabled={isLoading}
        >
          <Paperclip size={20} />
        </Button>
        <Button
          variant="outline-secondary"
          type="button"
          className="border-0 bg-transparent"
          disabled={isLoading}
        >
          <Mic size={20} />
        </Button>
        <Button
          variant="primary"
          type="submit"
          disabled={!message.trim() || isLoading}
          className="px-4"
        >
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Analyzing...
            </>
          ) : (
            <>
              <Send size={18} className="me-1" /> Send
            </>
          )}
        </Button>
      </InputGroup>
    </Form>
  );
};

export default ChatInput;