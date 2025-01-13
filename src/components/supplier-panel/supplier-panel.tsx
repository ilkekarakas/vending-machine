import { resetMachine, toggleComponent, toggleSupplierMode } from '../../redux/slices/machine-slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { collectMoney, resetPayment } from '../../redux/slices/payment-slice';
import { toast } from 'react-toastify';
import { refillStock, resetProducts } from '../../redux/slices/product-slice';
import { useState, useEffect } from 'react';
import '../../assets/styles/common.scss';
import './supplier-panel.scss';
import { WRONG_PASSWORD_LIMIT } from '../../utils/environment-constants';

const SupplierPanel: React.FC = () => {
    const dispatch = useDispatch();
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showRefillModal, setShowRefillModal] = useState(false);
    const [password, setPassword] = useState('');
    const [refillAmount, setRefillAmount] = useState<number>(5);
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [attemptCount, setAttemptCount] = useState(() => {
        const saved = localStorage.getItem('passwordAttempts');
        return saved ? parseInt(saved) : 0;
    });
    const [cooldownEndTime, setCooldownEndTime] = useState<number | undefined>(() => {
        const saved = localStorage.getItem('cooldownEndTime');
        const time = saved ? parseInt(saved) : undefined;
        return time && time > Date.now() ? time : undefined;
    });

    const {
        components,
        isSupplierMode,
    } = useSelector((state: RootState) => state.machine);
    const {
        totalSales,
        products,
    } = useSelector((state: RootState) => state.product);

    const {
        collectedMoney,
    } = useSelector((state: RootState) => state.payment);

    const handleToggleSupplierMode = () => {
        const now = Date.now();
        if (cooldownEndTime && now < cooldownEndTime) {
            const remainingSeconds = Math.ceil((cooldownEndTime - now) / 1000);
            toast.error(`Please wait ${remainingSeconds} seconds before trying again`);
            return;
        }

        if (!isSupplierMode) {
            setShowPasswordModal(true);
        } else {
            dispatch(toggleSupplierMode());
        }
    };

    const handleCollectMoney = () => {
        if (collectedMoney > 0) {
            toast.success(`Collected ${collectedMoney} units from machine`);
            dispatch(collectMoney());
        } else {
            toast.info('No money to collect');
        }
    };

    const handleRefillStock = () => {
        setShowRefillModal(true);
    };

    const handleRefillSubmit = () => {
        if (refillAmount <= 0) {
            toast.error('Please enter a valid amount');
            return;
        }
        if (refillAmount > 50) {
            toast.error('Maximum refill amount is 50');
            return;
        }
        dispatch(refillStock({ productId: selectedProductId, amount: refillAmount }));
        toast.success(
            selectedProductId === null
                ? `Added ${refillAmount} items to each product`
                : `Added ${refillAmount} items to ${products.find(p => p.id === selectedProductId)?.name}`
        );
        setShowRefillModal(false);
        setRefillAmount(5);
        setSelectedProductId(null);
    };

    const handleRefillAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '') {
            setRefillAmount(0);
        } else {
            const numValue = parseInt(value);
            if (!isNaN(numValue)) {
                setRefillAmount(numValue);
            }
        }
    };

    const handleReset = () => {
        dispatch(resetProducts());
        dispatch(resetPayment());
        dispatch(resetMachine());
        toast.success('Machine has been reset');
    };

    const handlePasswordSubmit = () => {
        if (password === 'aselsan') {
            dispatch(toggleSupplierMode());
            setShowPasswordModal(false);
            setPassword('');
            setAttemptCount(0);
            setCooldownEndTime(undefined);
            localStorage.removeItem('passwordAttempts');
            localStorage.removeItem('cooldownEndTime');
            toast.success('Supplier mode activated');
        } else {
            const newAttemptCount = attemptCount + 1;
            setAttemptCount(newAttemptCount);
            localStorage.setItem('passwordAttempts', newAttemptCount.toString());
            
            if (newAttemptCount >= WRONG_PASSWORD_LIMIT) {
                const newCooldownTime = Date.now() + 20000;
                setCooldownEndTime(newCooldownTime);
                localStorage.setItem('cooldownEndTime', newCooldownTime.toString());
                setAttemptCount(0);
                localStorage.setItem('passwordAttempts', '0');
                setShowPasswordModal(false);
                setPassword('');
                toast.error('Too many failed attempts. Notification sent to supplier. Please wait 20 seconds.');
            } else {
                toast.error(`Incorrect password. ${WRONG_PASSWORD_LIMIT - newAttemptCount} attempts remaining`);
            }
        }
    };

    useEffect(() => {
        if (cooldownEndTime) {
            const timeoutId = setTimeout(() => {
                setCooldownEndTime(undefined);
                localStorage.removeItem('cooldownEndTime');
            }, cooldownEndTime - Date.now());

            return () => clearTimeout(timeoutId);
        }
    }, [cooldownEndTime]);

    const handlePasswordKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handlePasswordSubmit();
        }
    };

    const handleRefillKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleRefillSubmit();
        }
    };

    return (
        <div className='supplier-panel'>
            <div>
                <button
                    className={`supplier-button ${isSupplierMode ? 'is-active' : ''}`}
                    onClick={handleToggleSupplierMode}
                    disabled={!!(cooldownEndTime && Date.now() < cooldownEndTime)}
                    style={{ 
                        opacity: cooldownEndTime && Date.now() < cooldownEndTime ? 0.5 : 1.0,
                        cursor: cooldownEndTime && Date.now() < cooldownEndTime ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isSupplierMode ? '🔓 Exit Supplier Mode' : '🔐 Enter Supplier Mode'}
                </button>

                {isSupplierMode && (
                    <div className="supplier-button-group">
                        <button
                            className="supplier-button"
                            onClick={handleCollectMoney}
                            disabled={collectedMoney === 0}
                        >
                            💰 Collect Money
                        </button>

                        <button className="supplier-button" onClick={handleRefillStock}>
                            📦 Refill Stock
                        </button>

                        <button
                            className="supplier-button is-warning"
                            onClick={() => setShowResetConfirm(true)}
                        >
                            🔄 Reset Machine
                        </button>

                        <button
                            className={`supplier-button ${components.lights ? 'is-active' : ''}`}
                            onClick={() => dispatch(toggleComponent('lights'))}
                        >
                            {components.lights ? '💡 Turn Off Lights' : '🔦 Turn On Lights'}
                        </button>
                    </div>
                )}
            </div>

            {isSupplierMode && (
                <div className="money-display">
                    <div className="money-box">
                        <h4>Current Machine Balance</h4>
                        <div className="amount">💵 {collectedMoney} units</div>
                    </div>
                    <div className="money-box">
                        <h4>Total Sales History</h4>
                        <div className="amount">📊 {totalSales} units</div>
                        <div className="product-sales">
                            {products.map(product => (
                                <div key={product.id} className="product-sale-item">
                                    {product.name}: {product.salesCount} total sales
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {showPasswordModal && (
                <div className="password-modal">
                    <div className="modal-content">
                        <h3 className="modal-title">🔒 Enter Supplier Password</h3>
                        <input
                            className="password-input"
                            type="password"
                            placeholder="Enter password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={handlePasswordKeyPress}
                            autoFocus
                        />
                        <div className="button-group">
                            <div
                                className="button"
                                onClick={() => {
                                    setShowPasswordModal(false);
                                    setPassword('');
                                }}
                                style={{ background: '#E74C3C' }}
                            >
                                Cancel
                            </div>
                            <div
                                className="button"
                                onClick={handlePasswordSubmit}
                                style={{ background: '#27AE60' }}
                            >
                                Submit
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showRefillModal && (
                <div className="confirm-dialog">
                    <div className="confirm-dialog__box">
                        <h3>📦 Refill Stock</h3>
                        <p>Select product and enter amount to refill:</p>
                        <select 
                            className="refill-input"
                            value={selectedProductId === null ? '' : selectedProductId}
                            onChange={(e) => setSelectedProductId(e.target.value ? Number(e.target.value) : null)}
                            style={{ marginBottom: '10px' }}
                        >
                            <option value="">All Products</option>
                            {products.map(product => (
                                <option key={product.id} value={product.id}>
                                    {product.name} (Current Stock: {product.stock})
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            className="refill-input"
                            value={refillAmount || ''}
                            onChange={handleRefillAmountChange}
                            onKeyPress={handleRefillKeyPress}
                            min="1"
                            max="50"
                            placeholder="Enter amount..."
                            autoFocus
                        />
                        <div className="confirm-dialog__buttons">
                            <button
                                className="confirm-button cancel"
                                onClick={() => {
                                    setShowRefillModal(false);
                                    setRefillAmount(5);
                                    setSelectedProductId(null);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="confirm-button confirm"
                                onClick={handleRefillSubmit}
                            >
                                Refill Stock
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showResetConfirm && (
                <div className="confirm-dialog">
                    <div className="confirm-dialog__box">
                        <h3>⚠️ Reset Machine</h3>
                        <p>
                            Are you sure you want to reset the machine to factory settings?
                            This will clear all data including:
                            <br />• Current balance
                            <br />• Transaction history
                            <br />• Payment settings
                            <br />• Temperature settings
                        </p>
                        <div className="confirm-dialog__buttons">
                            <button
                                className="confirm-button cancel"
                                onClick={() => setShowResetConfirm(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="confirm-button confirm"
                                onClick={() => {
                                    handleReset();
                                    setShowResetConfirm(false);
                                }}
                            >
                                Reset Machine
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SupplierPanel;
