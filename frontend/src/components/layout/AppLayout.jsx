import {Layout, Spin} from 'antd';
import AppHeader from "./AppHeader.jsx";
import AppSider from "./AppSider.jsx";
import AppContent from "./AppContent.jsx";
import React from "react";
import {useContext} from "react";
import {CryptoContext} from "../../context/crypto-context.jsx";

export const AppLayout = () => {

    const { loading } = useContext(CryptoContext)
    return (
        <>
            { loading
                ? <Spin fullscreen/>
                : (
                    <Layout>
                        <AppHeader/>
                        <Layout>
                            <AppSider/>
                            <AppContent/>
                        </Layout>
                    </Layout>
                )
            }
        </>
    )
}
