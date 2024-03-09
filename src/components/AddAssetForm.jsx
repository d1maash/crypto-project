import { Select, Space, Typography, Flex, Divider, Form, Input, InputNumber, Button, DatePicker, Result } from 'antd'
import { useRef, useState } from "react"
import { useCrypto } from "../context/crypto-context"
import CoinInfo from './CoinInfo'

const validateMessage = {
    required: "${label} is required!",
    types: {
        number: '${labe} is not valid number'
    },
    number: {
        range: "${label} must be between ${min} and ${max}"
    }
}

export default function AddAssetForm({ onClose }) {
    const [form] = Form.useForm()
    const { crypto, addAsset } = useCrypto()
    const [coin, setCoin] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const assetRef = useRef()
    if (submitted) {
        return (
            <Result
                status="success"
                title="New Status Added"
                subTitle={`Added ${assetRef.current.amount} if ${coin.name} by price ${assetRef.current.price}`}
                extra={[
                    <Button type="primary" key="console" onClick={onClose}>
                        Close
                    </Button>,
                ]}
            />
        )
    }

    if (!coin) {
        return (
            <Select
                style={{ width: '100%' }}
                onSelect={(v) => setCoin(crypto.find((c) => c.id === v))
                }
                value='Select Coin'
                options={
                    crypto.map(coin => ({
                        label: coin.name,
                        value: coin.id,
                        icon: coin.icon
                    }))
                }
                optionRender={(option) => (
                    <Space>
                        <img style={{ width: 20 }} src={option.data.icon} alt={option.data.label} />{' '} {option.data.label}
                    </Space>
                )}
            />
        )
    }

    function onStart(v) {
        console.log(v)

        const firstAsset = {
            id: coin.id,
            name: coin.name,
            price: v.price,
        }
    }

    function onFinish(values) {
        console.log(values)
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date(),
        }
        assetRef.current = newAsset
        setSubmitted(true)
        addAsset(newAsset)
    }

    function handleAmountChange(value) {

        const price = form.getFieldValue('price')
        form.setFieldsValue({
            total: +(value * coin.price).toFixed(2),
        })
    }

    function handlePriceChange(value) {
        const amount = form.getFieldValue('amount')
        form.setFieldsValue({
            total: +(amount * value).toFixed(2),
        })
    }
    return <Form
        form={form}
        name="basic"
        labelCol={{
            span: 4,
        }}
        wrapperCol={{
            span: 10,
        }}
        style={{
            maxWidth: 600,
        }}
        initialValues={{
            price: +coin.price.toFixed(2),
        }}
        onFinish={onFinish}
        validateMessages={validateMessage}

    >
        <CoinInfo coin={coin} />
        <Divider />

        <Form.Item
            label="Amount"
            name="amount"
            rules={[
                {
                    required: true,
                    type: 'number',
                    min: 0
                },
            ]}
        >
            <InputNumber placeholder='Enter coin amount' onChange={handleAmountChange} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
            label="Price"
            name="price"
        >
            <InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
            label="Date & Time"
            name="date"
        >
            <DatePicker showTime />
        </Form.Item>
        <Form.Item
            label="Total"
            name="total"
        >
            <InputNumber disabled style={{ width: '100%' }} />
        </Form.Item>



        <Form.Item

        >
            <Button type="primary" htmlType="submit">
                Add Asset
            </Button>
        </Form.Item>
    </Form>

}