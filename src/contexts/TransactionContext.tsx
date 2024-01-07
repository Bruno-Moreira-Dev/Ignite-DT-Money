import { ReactNode, createContext, useEffect, useState } from "react";

interface ITransaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
}

interface TransactionContextType {
    transactions: ITransaction[];
}

export const TransactionsContext = createContext<TransactionContextType>({} as TransactionContextType);

interface ITransactionProviderProps {
    children: ReactNode;
}

export function TransactionsProvider({ children }: ITransactionProviderProps) {
    const [transactions, setTransactions] = useState<ITransaction[]>([]);

    async function loadTransactions() {
        const response = await fetch("http://localhost:3000/transactions");
        const data = await response.json();
        setTransactions(data);
    }

    useEffect(() => {
        loadTransactions();
    }, []);

    return (
        <TransactionsContext.Provider value={{ transactions }}>
            {children}
        </TransactionsContext.Provider>
    )
}