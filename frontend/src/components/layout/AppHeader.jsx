import React, {useEffect, useState} from 'react';
import {Layout, Select, Space, Button, Modal, Drawer } from "antd";
import {useCrypto} from "../../context/crypto-context.jsx";
import {CoinInfoModal} from "../CoinInfoModal.jsx";
import {AddAssetForm} from "../AddAssetForm.jsx";

const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    width: '100%',
    height: '60px',
};

const AppHeader = () => {

    const [select, setSelect] = useState(false)
    const [modal, setModal] = useState(false)
    const [drawer, setDrawer] = useState(false)
    const [coin, setCoin] = useState(null)
    const  { crypto } = useCrypto()

    useEffect(() => {
        const keyPress = (event) => {
            if (event.key === '/') {
                setSelect((prev) => !prev)
            }
        }
        document.addEventListener('keypress', keyPress)
        return () => document.removeEventListener('keypress', keyPress)
    }, [])

    const handleSelect = (value) => {
        setCoin(crypto.find((c) => c.id === value))
        setModal(true)
    };

    return (
        <Layout.Header style={headerStyle}>
            <Select
                style={{width:250}}
                open={select}
                onSelect={handleSelect}
                onClick={() => setSelect((prev) => !prev)}
                value='press / to open'
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
            <Button type={'primary'} onClick={() => setDrawer(true)}>Add Asset</Button>
            <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
                <CoinInfoModal coin={coin} />
            </Modal>
            <Drawer
                width={600}
                title="Add Asset"
                onClose={() => setDrawer(false)}
                open={drawer}
                destroyOnClose
            >
                <AddAssetForm onClose={() => setDrawer(false)}/>
            </Drawer>
        </Layout.Header>
    )
}

export default AppHeader
