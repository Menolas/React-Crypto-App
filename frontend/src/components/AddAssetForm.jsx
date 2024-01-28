import {useRef, useState} from "react";
import {
    Divider,
    Select,
    Space,
    Form,
    Button,
    InputNumber,
    DatePicker,
    Result,
} from "antd";
import React from "react";
import {useCrypto} from "../context/crypto-context.jsx";
import {CoinInfo} from "./CoinInfo.jsx";

const validateMessages = {
    required: '${label} is required!',
    types: {
        number: '${label} in not valid number',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
}

export const AddAssetForm = ({onClose}) => {
    const [form] = Form.useForm()
    const { crypto, addAsset } = useCrypto()
    const [coin, setCoin] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const assetRef = useRef()

    const onFinish = (values) => {
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date(),
        }
        assetRef.current = newAsset
        setSubmitted(true)
        addAsset(newAsset)
    };

    const handleAmountChange = (value) => {
        const price = form.getFieldValue('price')
        form.setFieldsValue({
            total: +(value * price).toFixed(2)
        })
    }

    const handlePriceChange = (value) => {
        const amount = form.getFieldValue('amount')
        form.setFieldsValue({
            total: +(amount * value).toFixed(2)
        })
    }

    if (submitted) {
        return (
            <Result
                status="success"
                title="New Asset Added"
                subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
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
                style={{width: '100%'}}
                onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
                placeholder="Select coin"
                options={crypto.map((coin) => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img src={option.data.icon} alt={''}/> {option.data.label}
                    </Space>
                )}
            />
        )
    }

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{span: 4,}}
            wrapperCol={{span: 10,}}
            style={{maxWidth: 600,}}
            initialValues={{
                price: +coin.price.toFixed(2),
            }}
            onFinish={onFinish}
            validateMessages={validateMessages}
        >
            <CoinInfo coin={coin} withSymbol={false}/>
            <Divider />

            <Form.Item
                label="Amount"
                name="amount"
                placeholder={"Enter coin amount"}
                rules={[
                    {
                        required: true,
                        type: "number",
                        min: 0,
                    },
                ]}
            >
                <InputNumber onChange={handleAmountChange} style={{width: '100%'}} />
            </Form.Item>

            <Form.Item label="Price" name="price">
                <InputNumber onChange={handlePriceChange} style={{width: '100%'}} />
            </Form.Item>

            <Form.Item label="Date & time" name="date">
                <DatePicker style={{width: '100%'}} showTime />
            </Form.Item>

            <Form.Item label="Total" name="total">
                <InputNumber disabled style={{width: '100%'}} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Asset
                </Button>
            </Form.Item>
        </Form>

    )
}
