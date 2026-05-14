import { useEffect, useState } from "react";
import axios from "axios";

type Campaign = {
  id: number;
  name: string;
  platform: string;
  budget: number;
  active: boolean;
  impressions: number;
  clicks: number;
};

type CampaignForm = {
  name: string;
  platform: string;
  budget: string;
  impressions: string;
  clicks: string;
  active: boolean;
};

function onlyNumbers(value: string) {
  return value.replace(/\D/g, "");
}

function formatNumber(value: string) {
  const numbers = onlyNumbers(value);

  if (!numbers) return "";

  return Number(numbers).toLocaleString("pt-BR");
}

function formatCurrency(value: string) {
  const numbers = onlyNumbers(value);

  if (!numbers) return "";

  const amount = Number(numbers) / 100;

  return amount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function App() {
const [campaigns, setCampaigns] = useState<Campaign[]>([]);
const [loading, setLoading] = useState(true);  
const [showForm, setShowForm] = useState(false);
const [editingId, setEditingId] = useState<number | null>(null);
const [searchTerm, setSearchTerm] = useState("");

  const [form, setForm] = useState<CampaignForm>({
    name: "",
    platform: "",
    budget: "",
    impressions: "",
    clicks: "",
    active: true,
  });

  function loadCampaigns() {
  setLoading(true);

  axios
    .get("http://localhost:8080/campaigns")
    .then((response) => {
      setCampaigns(response.data.content);
    })
    .catch((error) => {
      console.error("Erro ao buscar campanhas:", error);
    })
    .finally(() => {
      setLoading(false);
    });
}

  useEffect(() => {
    loadCampaigns();
  }, []);


  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const payload = {
      name: form.name,
      platform: form.platform,
      budget: Number(onlyNumbers(form.budget)) / 100,
      impressions: Number(onlyNumbers(form.impressions)),
      clicks: Number(onlyNumbers(form.clicks)),
      active: form.active,
    };

    const request = editingId
  ? axios.put(`http://localhost:8080/campaigns/${editingId}`, payload)
  : axios.post("http://localhost:8080/campaigns", payload);

      request
        .then(() => {
          setForm({
            name: "",
            platform: "",
            budget: "",
            impressions: "",
            clicks: "",
            active: true,
          });

          setEditingId(null);
          setShowForm(false);
          loadCampaigns();
        })
        .catch((error) => {
          console.error("Erro ao salvar campanha:", error);
        });
        }

        function handleDelete(id: number) {
        const confirmed = window.confirm(
          "Tem certeza que deseja excluir esta campanha?"
        );

        if (!confirmed) return;

  axios
    .delete(`http://localhost:8080/campaigns/${id}`)
    .then(() => {
      loadCampaigns();
    })
    .catch((error) => {
      console.error("Erro ao excluir campanha:", error);
    });
}

function handleEdit(campaign: Campaign) {
  setEditingId(campaign.id);

  setForm({
    name: campaign.name,
    platform: campaign.platform,
    budget: formatCurrency(String(Math.round(campaign.budget * 100))),
    impressions: formatNumber(String(campaign.impressions)),
    clicks: formatNumber(String(campaign.clicks)),
    active: campaign.active,
  });

  setShowForm(true);
}

const filteredCampaigns = campaigns.filter((campaign) =>
  campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
);

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

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition"
          >
            Nova campanha
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-4 mb-8 bg-gray-50 p-6 rounded-xl"
          >
            <input
              className="p-3 border rounded-lg"
              placeholder="Nome da campanha"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="p-3 border rounded-lg"
              placeholder="Plataforma"
              value={form.platform}
              onChange={(e) => setForm({ ...form, platform: e.target.value })}
            />

            <input
              className="p-3 border rounded-lg"
              placeholder="Budget"
              value={form.budget}
              onChange={(e) =>
                setForm({ ...form, budget: formatCurrency(e.target.value) })
              }
            />

            <input
              className="p-3 border rounded-lg"
              placeholder="Impressões"
              value={form.impressions}
              onChange={(e) =>
                setForm({ ...form, impressions: formatNumber(e.target.value) })
              }
            />

            <input
              className="p-3 border rounded-lg"
              placeholder="Cliques"
              value={form.clicks}
              onChange={(e) =>
                setForm({ ...form, clicks: formatNumber(e.target.value) })
              }
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) =>
                  setForm({ ...form, active: e.target.checked })
                }
              />
              Campanha ativa
            </label>

            <button
              type="submit"
              className="col-span-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-medium transition"
            >
              Salvar campanha
            </button>
          </form>
        )}

        <input
          className="w-full mb-6 p-3 border rounded-lg"
          placeholder="Buscar campanha por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-4">ID</th>
              <th className="p-4">Nome</th>
              <th className="p-4">Plataforma</th>
              <th className="p-4">Budget</th>
              <th className="p-4">Status</th>
              <th className="p-4">Ações</th>
            </tr>
          </thead>

          <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className="p-6 text-center text-gray-500">
                Carregando campanhas...
              </td>
            </tr>
          ) : filteredCampaigns.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-6 text-center text-gray-500">
                Nenhuma campanha encontrada.
              </td>
            </tr>
          ) : (
            filteredCampaigns.map((campaign) => (
              <tr
                key={campaign.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4">{campaign.id}</td>
                <td className="p-4 font-medium">{campaign.name}</td>
                <td className="p-4">{campaign.platform}</td>
                <td className="p-4">
                  {campaign.budget.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      campaign.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {campaign.active ? "Ativa" : "Inativa"}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleEdit(campaign)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-sm mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(campaign.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;