import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';

const FAQ = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      Не понятно
    </div>
  )
}

export default FAQ;
