const selectCurrency = currency => {
    switch (currency.toLowerCase()) {
        case 'ethereum':
            return 'eth';
        case 'matic':
            return 'MATIC';
        default:
            return 'eth';
    }
}

const getNetworkById = id => {
    switch (id){
        case 1:
            return {
                type: 'mainet',
                blockExplorer: 'https://etherscan.io',
                label: 'Ethereum Mainnet',
                txServiceURL: 'https://safe-transaction.gnosis.io',
                chainID: 1
            };
        case 3:
            return {
                type: 'ropesen',
                blockExplorer: 'https://ropsten.etherscan.io',
                label: 'Ropesen',
                txServiceURL: 'https://safe-transaction.ropesen.gnosis.io',
                chainID: 3
            };
        case 4:
            return {
                type: 'rinkeby',
                blockExplorer: 'https://rinkeby.etherscan.io',
                label: 'Rinkeby',
                txServiceURL: 'https://safe-transaction.rinkeby.gnosis.io',
                chainID: 4
            };
        case 5:
            return {
                type: 'goerli',
                blockExplorer: 'https://goerli.etherscan.io',
                label: 'Goerli Test Network',
                txServiceURL: 'https://safe-transaction.goerli.gnosis.io',
                chainID: 5
            };
        case 42:
            return {
                type: 'kovan',
                blockExplorer: 'https://kovan.etherscan.io',
                label: 'Kovan Test Network',
                txServiceURL: 'https://safe-transaction.kovan.gnosis.io',
                chainID: 42
            };

        default:
            return {
                type: 'mainet',
                blockExplorer: 'https://etherscan.io',
                label: 'Ethereum Mainnet',
                txServiceURL: 'https://safe-transaction.gnosis.io',
                chainID: 1
            };
    }
}

export const UTILS = {selectCurrency, getNetworkById};
