'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SendTransactionRequest, useTonConnectUI } from '@tonconnect/ui-react';
import styles from './index.module.css';

const TransactionScreen = () => {
    const [tonConnectUI, setOptions] = useTonConnectUI();
    const router = useRouter();
    const [formData, setFormData] = useState({
        amount: '',
        address: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setError(null);
    };

    const validateInputs = () => {
        if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
            return 'Please enter a valid amount.';
        }
        if (!formData.address) {
            return 'Please enter a recipient address.';
        }
        return null;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateInputs();
        if (validationError) {
            setError(validationError);
            return;
        }

        const transaction: SendTransactionRequest = {
            validUntil: Date.now() + 5 * 60 * 1000,
            messages: [
                {
                    address: formData.address,
                    amount: formData.amount,
                },
            ],
        };

        try {
            await tonConnectUI.sendTransaction(transaction);
            setSuccess('Transaction sent successfully!');
            setFormData({ amount: '', address: '' });
        } catch (err) {
            setError(`Transaction failed: ${err.message}`);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <button onClick={() => router.back()}>Back</button>
                <h1>Balance: 100 TON</h1>
            </header>
            <main>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label>
                        Amount of TON:
                        <input
                            type="text"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Recipient Address:
                        <input
                            name="address"
                            type="text"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit" className={styles.send_btn}>Send</button>
                </form>
                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>{success}</p>}
            </main>
        </div>
    );
};

export default TransactionScreen;
