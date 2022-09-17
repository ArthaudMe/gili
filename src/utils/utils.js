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

export const UTILS = {selectCurrency};
