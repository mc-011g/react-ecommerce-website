import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName, message
}) => (
  <div>
    <p>Hello, {firstName}!</p>
    <p>{message}</p>
  </div>
);