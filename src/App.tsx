import { FlexCard } from './modules/sdk-flex-ui/widgets';
import { http } from './customisations/http/http';

function App() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <div style={{ width: '90%', height: '100%', margin: '0 auto' }}>
        <FlexCard
          tools={{
            http,
          }}
          init={{
            routing: '/configs/routing.json',
          }}
        />
      </div>
    </div>
  );
}

export default App;
