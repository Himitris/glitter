import { Edit, LogOut, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Seo from "../components/seo/Seo";
import Loader from "../components/ui/Loader";
import Section from "../components/ui/Section";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { getAllArtists, getAllDjs } from "../services/artistService";
import { Artist } from "../types";

const AdminDashboard = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [djs, setDjs] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"artists" | "djs">("artists");

  const { logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artistsData, djsData] = await Promise.all([
          getAllArtists(),
          getAllDjs(),
        ]);

        setArtists(artistsData);
        setDjs(djsData);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        showToast("Erreur lors du chargement des données", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [showToast]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/admin/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      showToast("Erreur lors de la déconnexion", "error");
    }
  };

  return (
    <>
      <Seo
        title="Dashboard Admin | Glitter Production"
        description="Panneau d'administration Glitter Production"
        canonical="/admin/dashboard"
      />
      <Section>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard Admin</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <LogOut size={18} /> Déconnexion
            </button>
          </div>

          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab("artists")}
                  className={`${
                    activeTab === "artists"
                      ? "border-[#FF4D8F] text-[#FF4D8F]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } px-4 py-2 font-medium text-sm border-b-2 transition-colors`}
                >
                  Artistes
                </button>
                <button
                  onClick={() => setActiveTab("djs")}
                  className={`${
                    activeTab === "djs"
                      ? "border-[#FF4D8F] text-[#FF4D8F]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } px-4 py-2 font-medium text-sm border-b-2 transition-colors`}
                >
                  DJs
                </button>
              </nav>
            </div>
          </div>
          <div className="mb-6 flex justify-end">
            <Link
              to={`/admin/${activeTab === "artists" ? "artist" : "dj"}/add`}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8C52FF] to-[#FF4D8F] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <Plus size={18} /> Ajouter un{" "}
              {activeTab === "artists" ? "artiste" : "DJ"}
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center p-12">
              <Loader size="lg" />
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nom
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(activeTab === "artists" ? artists : djs).length > 0 ? (
                    (activeTab === "artists" ? artists : djs).map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-12 w-12 rounded-full overflow-hidden">
                            <img
                              src={
                                Array.isArray(item.image)
                                  ? item.image[0]
                                  : item.image
                              }
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {item.name}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {item.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <Link
                              to={`/admin/${
                                activeTab === "artists" ? "artist" : "dj"
                              }/edit/${item.id}`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <Edit size={18} />
                            </Link>
                            <button
                              onClick={() =>
                                navigate(
                                  `/admin/${
                                    activeTab === "artists" ? "artist" : "dj"
                                  }/delete/${item.id}`
                                )
                              }
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        Aucun {activeTab === "artists" ? "artiste" : "DJ"}{" "}
                        trouvé
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Section>
    </>
  );
};

export default AdminDashboard;
