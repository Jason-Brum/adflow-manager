import { useEffect, useState } from "react";
import axios from "axios";

type Campaign = {
  id: number;
  name: string;
  platform: string;
  budget: number;
};

function App() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/campaigns")
      .then((response) => {
        setCampaigns(response.data.content);
      })
      .catch((error) => {
        console.error("Erro ao buscar campanhas:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              AdFlow Manager
            </h1>

            <p className="text-gray-500 mt-2">
              Gestão de campanhas publicitárias
            </p>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition">
            Nova campanha
          </button>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-4">ID</th>
              <th className="p-4">Nome</th>
              <th className="p-4">Plataforma</th>
              <th className="p-4">Budget</th>
            </tr>
          </thead>

          <tbody>
            {campaigns.map((campaign) => (
              <tr
                key={campaign.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4">{campaign.id}</td>
                <td className="p-4 font-medium">{campaign.name}</td>
                <td className="p-4">{campaign.platform}</td>
                <td className="p-4">
                  R$ {campaign.budget.toLocaleString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;