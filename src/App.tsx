
import { useSorting } from './hooks/useSorting';
import { VisualizerBoard } from './components/VisualizerBoard';

function App() {
  const { array, comparison, resetArray } = useSorting();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8 gap-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Algo Visualiser
        </h1>
        <p className="text-gray-400">Visualize sorting algorithms in real-time</p>
      </div>

      <VisualizerBoard array={array} comparison={comparison} />

      <button
        onClick={resetArray}
        className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors border border-gray-700"
      >
        Generate New Array
      </button>
    </div>
  );
}

export default App
