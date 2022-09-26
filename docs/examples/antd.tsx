import React from 'react'
import { withSeparator } from 'react-separator-input'
import { Form, Input } from 'antd'
import 'antd/dist/antd.css'

const AntdInput = withSeparator(Input)

const InputDemo: React.FC = () => {
  const [form] = Form.useForm()

  return (
    <Form form={form} layout="vertical" autoComplete="off">
      <Form.Item
        label="Original Price"
        name="originalPrice"
        rules={[{ required: true, message: 'Field required' }]}
        validateTrigger="onBlur"
      >
        <AntdInput
          thousandSeparator=","
          precision={2}
          prefix="$"
          onValueChange={({ numberValue }) => {
            const value = isNaN(numberValue) ? undefined : numberValue
            form.setFieldValue('originalPrice', value)
          }}
        />
      </Form.Item>
      <Form.Item
        label="Discount Amount"
        name="discountAmount"
        rules={[
          {
            validator: (_, value) => {
              if (value > form.getFieldValue('originalPrice')) {
                return Promise.reject(new Error('Cannot exceed original price'))
              }
            }
          }
        ]}
        validateTrigger="onBlur"
      >
        <AntdInput
          thousandSeparator=","
          precision={2}
          prefix="$"
          onValueChange={({ numberValue }) => {
            const value = isNaN(numberValue) ? undefined : numberValue
            form.setFieldValue('discountAmount', value)
          }}
        />
      </Form.Item>
    </Form>
  )
}

export default InputDemo
