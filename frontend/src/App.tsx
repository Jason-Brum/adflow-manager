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
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>AdFlow Manager</h1>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Plataforma</th>
            <th>Budget</th>
          </tr>
        </thead>

        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign.id}>
              <td>{campaign.id}</td>
              <td>{campaign.name}</td>
              <td>{campaign.platform}</td>
              <td>{campaign.budget}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;