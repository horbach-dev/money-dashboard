import {Button, Checkbox, Form, Input, Layout} from 'antd';
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import api from '../../../utils/api'
import classnames from 'classnames';
import Logo from '../../logo-sheets.png';
import Logo2 from '../../binange-logo.png';

const Login = ({ userData, setUserData }) => {
  const navigator = useNavigate()

  useEffect(() => {
    if (!userData.isGuest) {
      navigator('/')
    }
  }, [userData])

  const onFinish = (values) => {
    setUserData({ ...values, isGuest: false })
    console.log('Success:', values);


    api.loginUser(values).then(res => {

    }).catch(e => {

    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout className='login-page full-layout'>
      <div className={classnames('logo', false && 'logo_min')}>
        <div className='logo-wrap'>
          <img src={Logo} alt='' />
          <span>+</span>
          <img src={Logo2} alt='' />
        </div>
      </div>
      <div className='login-page__form-wrap'>
        <h3>Войти в аккаунт</h3>
        <Form
          className='login-page__form'
          name="basic"
          layout='vertical'
          labelCol={{
            span: 25,
          }}
          wrapperCol={{
            span: 25,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Пожалуйста введите email',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              {
                required: true,
                message: 'Пожалуйста введите пароль',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 0,
              span: 25,
            }}
          >
            <Checkbox>Запомнить меня</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 25,
            }}
          >
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  )
}

export default Login;
