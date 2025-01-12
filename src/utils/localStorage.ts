export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('vendingMachineState');
        if (serializedState === null) {
            return undefined;
        }
        const state = JSON.parse(serializedState);
        
        // Her sayfa yüklenişinde supplier modu kapalı başlat
        if (state.machine) {
            state.machine.isSupplierMode = false;
        }

        // Reset payment processing states
        if (state.payment) {
            state.payment.isInsertingMoney = false;
            state.payment.isProcessingPayment = false;
            state.payment.lastInsertedAmount = null;

            // Check if session is already expired
            if (state.payment.sessionEndTime) {
                const now = Math.floor(Date.now() / 1000);
                if (now >= state.payment.sessionEndTime) {
                    state.payment.sessionEndTime = null;
                    state.payment.insertedMoney = 0;
                    state.payment.selectedPaymentMethod = null;
                    if (state.product) {
                        state.product.selectedProduct = null;
                    }
                }
            }
        }

        return state;
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state: any) => {
    try {
        // Create a copy of the state to modify
        const stateToPersist = JSON.parse(JSON.stringify(state));

        // Remove timer-related data
        if (stateToPersist.supplier) {
            delete stateToPersist.supplier.cooldownEndTime;
            delete stateToPersist.supplier.attemptCount;
        }

        // Remove payment processing states but keep session time
        if (stateToPersist.payment) {
            delete stateToPersist.payment.isInsertingMoney;
            delete stateToPersist.payment.isProcessingPayment;
            delete stateToPersist.payment.lastInsertedAmount;
        }

        const serializedState = JSON.stringify(stateToPersist);
        localStorage.setItem('vendingMachineState', serializedState);
    } catch (err) {
        // Ignore write errors
    }
};
