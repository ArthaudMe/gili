import AuthLayout from "../../components/layout/auth-layout";
import React, {useEffect} from "react";
import {SafeAppConnector, useSafeAppConnection} from "@gnosis.pm/safe-apps-web3-react";
const safeMultisigConnector = new SafeAppConnector();

const DashboardPage = () => {

    const connectToSafe = useSafeAppConnection(safeMultisigConnector);

    useEffect(() => {
        if(connectToSafe){
            console.log('running')
        }
    }, [connectToSafe]);

    return (
        <AuthLayout>

        </AuthLayout>
    )
}

export default DashboardPage;
