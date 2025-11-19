import { useState, useEffect, useCallback } from 'react';

export type AlgorithmType = 'bubble' | 'merge' | 'quick';

export const useSorting = () => {
    const [array, setArray] = useState<number[]>([]);
    const [algorithm, setAlgorithm] = useState<AlgorithmType>('bubble');
    const [isSorting, setIsSorting] = useState(false);
    const [comparison, setComparison] = useState<number[]>([]); // Indices being compared

    const resetArray = useCallback(() => {
        const newArray = Array.from({ length: 50 }, () =>
            Math.floor(Math.random() * 500) + 10
        );
        setArray(newArray);
        setComparison([]);
        setIsSorting(false);
    }, []);

    useEffect(() => {
        resetArray();
    }, [resetArray]);

    return {
        array,
        setArray,
        algorithm,
        setAlgorithm,
        isSorting,
        setIsSorting,
        comparison,
        setComparison,
        resetArray,
    };
};
