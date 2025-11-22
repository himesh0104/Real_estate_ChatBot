import React from 'react';
import PropTypes from 'prop-types';
import { User, Cpu } from 'react-feather';

const Message = ({ message, isUser, timestamp }) => {
  return (
    <div className={`d-flex mb-3 ${isUser ? 'justify-content-end' : 'justify-content-start'}`}>
      <div className={`message ${isUser ? 'message-user' : 'message-bot'}`}>
        <div className="d-flex align-items-center mb-1">
          {isUser ? (
            <User size={16} className="me-1" />
          ) : (
            <Cpu size={16} className="me-1" />
          )}
          <small className="text-muted">
            {isUser ? 'You' : 'Analyst'} • {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </small>
        </div>
        <div className="message-content">
          {typeof message === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: message.replace(/\n/g, '<br />') }} />
          ) : (
            message
          )}
        </div>
      </div>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  isUser: PropTypes.bool,
  timestamp: PropTypes.number.isRequired,
};

Message.defaultProps = {
  isUser: false,
};

export default Message;