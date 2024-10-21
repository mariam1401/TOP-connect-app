'use client'
import {TonConnectButton, useTonAddress} from '@tonconnect/ui-react';
import {useEffect, useState} from "react";
import styles from './page.module.css'
import Link from "next/link";

export default function Home() {
    const [data,setData] = useState(null)
    const userFriendlyAddress = useTonAddress();
    const fetchBalance = async () => {
        if (!userFriendlyAddress) return;
        try {
            const response = await fetch(`https://api.tonapi.io/v1/address/${userFriendlyAddress}/balance`);
            const balanceData = await response.json();
            setData({ balance: balanceData.balance });
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    };
    useEffect(() => {
        fetchBalance();
    }, [userFriendlyAddress]);

    return (
        <main className={styles.main_container}>
            <header className={styles.header}>
                <TonConnectButton  className={styles.btn}/>
                <h2 className={styles.balance}>Balance: <span>{data?.balance || 'N/A' }</span></h2>
            </header>
            <div className={styles.body}>
                <h2 className={styles.address}>Address:<span>{userFriendlyAddress  || 'N/A' }</span></h2>
                {userFriendlyAddress &&
                    <Link href={'/transaction'}>Transaction</Link>
                }
            </div>
        </main>
    );
}
