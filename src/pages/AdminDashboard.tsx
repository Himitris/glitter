import { Edit, LogOut, Plus, Trash, MapPin, GripVertical, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Reorder } from "framer-motion";
import Seo from "../components/seo/Seo";
import { Loader, Section } from "../components/ui";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { getAllArtists, getAllDjs, updateArtistsOrder, updateDjsOrder } from "../services/artistService";
import { getAllExperiences, deleteExperience } from "../services/experienceService";
import { Artist, Experience } from "../types";

const AdminDashboard = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [djs, setDjs] = useState<Artist[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"artists" | "djs" | "experiences">("artists");
  const [hasOrderChanged, setHasOrderChanged] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artistsData, djsData, experiencesData] = await Promise.all([
          getAllArtists(),
          getAllDjs(),
          getAllExperiences(),
        ]);

        setArtists(artistsData);
        setDjs(djsData);
        setExperiences(experiencesData);
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

  const handleDeleteExperience = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette expérience ?")) {
      try {
        await deleteExperience(id);
        setExperiences(experiences.filter(exp => exp.id !== id));
        showToast("Expérience supprimée avec succès", "success");
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        showToast("Erreur lors de la suppression", "error");
      }
    }
  };

  const handleReorderArtists = (newOrder: Artist[]) => {
    setArtists(newOrder);
    setHasOrderChanged(true);
  };

  const handleReorderDjs = (newOrder: Artist[]) => {
    setDjs(newOrder);
    setHasOrderChanged(true);
  };

  const handleSaveOrder = async () => {
    setIsSaving(true);
    try {
      const currentList = activeTab === "artists" ? artists : djs;
      const orderData = currentList.map((item, index) => ({
        id: item.id,
        displayOrder: index,
      }));

      if (activeTab === "artists") {
        await updateArtistsOrder(orderData);
      } else {
        await updateDjsOrder(orderData);
      }

      showToast("Ordre sauvegardé avec succès", "success");
      setHasOrderChanged(false);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de l'ordre:", error);
      showToast("Erreur lors de la sauvegarde de l'ordre", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelOrder = async () => {
    setHasOrderChanged(false);
    // Recharger les données originales
    try {
      const [artistsData, djsData] = await Promise.all([
        getAllArtists(),
        getAllDjs(),
      ]);
      setArtists(artistsData);
      setDjs(djsData);
    } catch (error) {
      console.error("Erreur lors du rechargement:", error);
      showToast("Erreur lors du rechargement", "error");
    }
  };

  return (
    <>
      <Seo
        title="Dashboard Admin | Glitter Productions"
        description="Panneau d'administration Glitter Productions"
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
                      ? "border-[#775CFF] text-[#775CFF]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } px-4 py-2 font-medium text-sm border-b-2 transition-colors`}
                >
                  Artistes
                </button>
                <button
                  onClick={() => setActiveTab("djs")}
                  className={`${
                    activeTab === "djs"
                      ? "border-[#775CFF] text-[#775CFF]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } px-4 py-2 font-medium text-sm border-b-2 transition-colors`}
                >
                  DJs
                </button>
                <button
                  onClick={() => setActiveTab("experiences")}
                  className={`${
                    activeTab === "experiences"
                      ? "border-[#775CFF] text-[#775CFF]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } px-4 py-2 font-medium text-sm border-b-2 transition-colors`}
                >
                  Expériences
                </button>
              </nav>
            </div>
          </div>

          <div className="mb-6 flex justify-between items-center">
            <div className="flex gap-2">
              {hasOrderChanged && activeTab !== "experiences" && (
                <>
                  <button
                    onClick={handleSaveOrder}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save size={18} />
                    {isSaving ? "Sauvegarde..." : "Enregistrer l'ordre"}
                  </button>
                  <button
                    onClick={handleCancelOrder}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Annuler
                  </button>
                </>
              )}
            </div>
            <div>
              {activeTab !== "experiences" ? (
                <Link
                  to={`/admin/${activeTab === "artists" ? "artist" : "dj"}/add`}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#775CFF] to-[#EBABFF] text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Plus size={18} /> Ajouter un{" "}
                  {activeTab === "artists" ? "artiste" : "DJ"}
                </Link>
              ) : (
                <Link
                  to="/admin/experience/add"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#775CFF] to-[#EBABFF] text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Plus size={18} /> Ajouter une expérience
                </Link>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center p-12">
              <Loader size="lg" />
            </div>
          ) : activeTab === "experiences" ? (
            // Table des expériences
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Logo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Événement
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lieu
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Services
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {experiences.length > 0 ? (
                    experiences.map((exp) => (
                      <tr key={exp.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-100">
                            {exp.logo ? (
                              <img
                                src={exp.logo}
                                alt={exp.title}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
                                }}
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-gray-400">
                                <span className="text-xs">Pas d'image</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {exp.title}
                          </div>
                          <div className="text-xs text-gray-500 max-w-xs truncate">
                            {exp.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin size={14} className="mr-1" />
                            {exp.location || "-"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {exp.services.slice(0, 3).map((service, idx) => (
                              <span
                                key={idx}
                                className="inline-block bg-[#775CFF]/10 text-[#775CFF] text-xs px-2 py-0.5 rounded-full"
                              >
                                {service}
                              </span>
                            ))}
                            {exp.services.length > 3 && (
                              <span className="text-xs text-gray-400">
                                +{exp.services.length - 3}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <Link
                              to={`/admin/experience/edit/${exp.id}`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <Edit size={18} />
                            </Link>
                            <button
                              onClick={() => handleDeleteExperience(exp.id)}
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
                        colSpan={5}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        Aucune expérience trouvée
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            // Liste des artistes/DJs avec drag and drop
            <div className="bg-white rounded-xl shadow-sm p-6">
              {(activeTab === "artists" ? artists : djs).length > 0 ? (
                <>
                  <div className="mb-4 text-sm text-gray-500">
                    <GripVertical size={16} className="inline mr-1" />
                    Glissez-déposez les éléments pour réorganiser l'ordre d'affichage
                  </div>
                  <Reorder.Group
                    axis="y"
                    values={activeTab === "artists" ? artists : djs}
                    onReorder={activeTab === "artists" ? handleReorderArtists : handleReorderDjs}
                    className="space-y-2"
                  >
                    {(activeTab === "artists" ? artists : djs).map((item) => (
                      <Reorder.Item
                        key={item.id}
                        value={item}
                        className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-grab active:cursor-grabbing"
                      >
                        <div className="flex items-center gap-4">
                          <GripVertical size={20} className="text-gray-400 flex-shrink-0" />
                          <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
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
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900">
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-500 truncate">
                              {item.description}
                            </div>
                          </div>
                          <div className="flex space-x-2 flex-shrink-0">
                            <Link
                              to={`/admin/${
                                activeTab === "artists" ? "artist" : "dj"
                              }/edit/${item.id}`}
                              className="text-indigo-600 hover:text-indigo-900 p-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Edit size={18} />
                            </Link>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(
                                  `/admin/${
                                    activeTab === "artists" ? "artist" : "dj"
                                  }/delete/${item.id}`
                                );
                              }}
                              className="text-red-600 hover:text-red-900 p-2"
                            >
                              <Trash size={18} />
                            </button>
                          </div>
                        </div>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                </>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  Aucun {activeTab === "artists" ? "artiste" : "DJ"} trouvé
                </div>
              )}
            </div>
          )}
        </div>
      </Section>
    </>
  );
};

export default AdminDashboard;
