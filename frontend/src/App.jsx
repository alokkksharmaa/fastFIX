// src/App.jsx
import { CounterProvider } from './context/CounterContext';
import CounterDisplay from './components/CounterDisplay';
import CounterButtons from './components/CounterButtons';

function App() {
  return (
    <CounterProvider>
      <div style={{ 
        fontFamily: 'sans-serif', 
        textAlign: 'center', 
        padding: '2rem' 
      }}>
        <h1>Counter with Context</h1>
        
        <CounterDisplay />
        <CounterButtons />
        
        {/* Deeply nested component would still work */}
        <div style={{ marginTop: '2rem' }}>
          <NestedComponent />
        </div>
      </div>
    </CounterProvider>
  );
}

function NestedComponent() {
  return <CounterButtons variant="small" />;
}

export default App;