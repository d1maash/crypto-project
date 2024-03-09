import { DatePicker } from "antd";
import { Layout, Spin } from "antd";
import AppHeader from "./AppHeader";
import AppSlider from "./AppSlider";
import AppContent from "./AppContent";
import { useContext } from "react";
import CryptoContext from "../../context/crypto-context";
export default function AppLayout() {
    const { loading } = useContext(CryptoContext)


    if (loading) {
        return <Spin fullscreen />;
    }
    return <Layout>
        <AppHeader />
        <Layout>
            <AppSlider />
            <AppContent />
        </Layout>
    </Layout>
}