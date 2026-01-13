import api from "./lib/axios";

function App() {
  const testApi = async () => {
    const res = await api.get("/gig/gigs");
    console.log(res.data);
  };

  return (
    <div className="p-4">
      <button
        onClick={testApi}
        className="bg-primary text-black px-4 py-2 rounded"
      >
        Test API
      </button>
    </div>
  );
}

export default App;
