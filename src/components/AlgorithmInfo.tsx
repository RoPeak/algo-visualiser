import type { AlgorithmType } from '../hooks/useSorting';
import { InfoIcon } from 'lucide-react';

interface AlgorithmInfoProps {
    algorithm: AlgorithmType;
    description: string;
    isSorting: boolean;
}

const algorithmData: Record<AlgorithmType, { name: string; timeComplexity: string; spaceComplexity: string; about: string }> = {
    bubble: {
        name: 'Bubble Sort',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        about: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    },
    merge: {
        name: 'Merge Sort',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        about: 'Divides the array into halves, recursively sorts them, and then merges the sorted halves.',
    },
    quick: {
        name: 'Quick Sort',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(log n)',
        about: 'Selects a pivot element and partitions the array around the pivot, then recursively sorts the partitions.',
    },
    insertion: {
        name: 'Insertion Sort',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        about: 'Builds the sorted array one item at a time by repeatedly inserting elements into their correct position.',
    },
    selection: {
        name: 'Selection Sort',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        about: 'Finds the minimum element from the unsorted part and puts it at the beginning.',
    },
    heap: {
        name: 'Heap Sort',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(1)',
        about: 'Builds a max heap from the array, then repeatedly extracts the maximum element to build the sorted array.',
    },
    cocktail: {
        name: 'Cocktail Shaker Sort',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        about: 'A variation of Bubble Sort that sorts in both directions on each pass through the list.',
    },
};

export const AlgorithmInfo = ({ algorithm, description, isSorting }: AlgorithmInfoProps) => {
    const info = algorithmData[algorithm];

    return (
        <div className="w-full max-w-5xl p-6 bg-gray-800/80 rounded-xl border border-gray-700 backdrop-blur-sm space-y-4">
            <div className="flex items-center gap-2 text-blue-400">
                <InfoIcon size={20} />
                <h2 className="text-xl font-bold">{info.name}</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <span className="text-gray-400">Time Complexity:</span>
                    <span className="ml-2 text-white font-mono">{info.timeComplexity}</span>
                </div>
                <div>
                    <span className="text-gray-400">Space Complexity:</span>
                    <span className="ml-2 text-white font-mono">{info.spaceComplexity}</span>
                </div>
            </div>

            <p className="text-gray-300 text-sm">{info.about}</p>

            <div className="pt-4 border-t border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${isSorting ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
                    <span className="text-xs text-gray-400 uppercase tracking-wide">
                        {isSorting ? 'Current Step' : 'Status'}
                    </span>
                </div>
                <p className="text-white font-medium">{description}</p>
            </div>
        </div>
    );
};
