import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="text-center mt-12">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome To Webcontainers Offline
        </h1>
        <button
          className="mt-5 px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => navigate({ to: "/editor" })}
        >
          Try Now
        </button>
      </div>
    </div>
  );
}
