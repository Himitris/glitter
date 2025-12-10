import { Edit, LogOut, Plus, Trash, MapPin, Calendar, Database } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Seo from "../components/seo/Seo";
import { Loader, Section } from "../components/ui";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { getAllArtists, getAllDjs } from "../services/artistService";
import { getAllExperiences, deleteExperience, addExperience } from "../services/experienceService";
import { Artist, Experience } from "../types";

// TEMPORAIRE: Données des expériences à importer dans Firebase
const SEED_EXPERIENCES = [
  {
    title: "Electro Alternativ",
    year: "2023",
    location: "Toulouse",
    description: "Festival de musique électronique, avec une programmation axée sur les musiques électroniques alternatives et émergentes.",
    services: ["Régie artistes", "Régie bénévoles"],
    logo: "/images/exp/ea.jpg",
  },
  {
    title: "Electrick Park",
    year: "2023",
    location: "Montpellier",
    description: "Festival en plein air réunissant les meilleurs artistes électro du moment dans un cadre naturel exceptionnel.",
    services: ["Régie artistes", "Direction de production", "Gestion des paies"],
    logo: "/images/exp/eepk.jpg",
  },
  {
    title: "Ocean Fest",
    year: "2022",
    location: "Biarritz",
    description: "Festival mêlant musique et sensibilisation à l'environnement marin, célébrant la culture surf et la préservation des océans.",
    services: ["Direction de production", "Régie cashless"],
    logo: "/images/exp/ocean-fest.webp",
  },
  {
    title: "Little Festival",
    year: "2022",
    location: "Bordeaux",
    description: "Festival à taille humaine proposant une programmation éclectique entre électro, hip-hop et musiques actuelles.",
    services: ["Régie bénévoles", "Planning", "Formation"],
    logo: "/images/exp/little-festival.jpg",
  },
  {
    title: "Regarts",
    year: "2023",
    location: "Toulouse",
    description: "Festival pluridisciplinaire mêlant arts visuels, performances et musique dans des lieux insolites de la ville.",
    services: ["Production", "Régie artistes", "Régie bénévoles"],
    logo: "/images/exp/regarts.jpg",
  },
  {
    title: "Bulle de Jazz",
    year: "2022",
    location: "Albi",
    description: "Festival de jazz contemporain valorisant les nouvelles expressions de cette musique et ses fusions avec d'autres genres.",
    services: ["Gestion des artistes", "Administration", "Coordination"],
    logo: "/images/exp/bulle-de-jazz.jpg",
  },
  {
    title: "La Cavale",
    year: "2023",
    location: "Montauban",
    description: "Événement éclectique et pluridisciplinaire créant un espace de liberté safe qui revendique une vision de la fête libre, pour tous.tes et sans concession.",
    services: ["Production", "Logistique", "Régie site", "Régie artistes"],
    logo: "/images/exp/la-cavale.jpg",
  },
  {
    title: "L'Été de Vaour",
    year: "2022",
    location: "Vaour",
    description: "Festival rural dédié aux arts de la rue, au cirque et au théâtre, créant une effervescence artistique en milieu rural.",
    services: ["Administration", "Logistique", "Régie artistes"],
    logo: "/images/exp/ete-de-vaour.png",
  },
  {
    title: "Rio Loco",
    year: "2023",
    location: "Toulouse",
    description: "Festival multiculturel explorant chaque année les musiques d'une région du monde différente, favorisant le dialogue interculturel.",
    services: ["Direction technique", "Régie cashless", "Régie artistes"],
    logo: "/images/exp/rio-loco.jpg",
  },
];

const AdminDashboard = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [djs, setDjs] = useState<Artist[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [activeTab, setActiveTab] = useState<"artists" | "djs" | "experiences">("artists");

  const { logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // TEMPORAIRE: Fonction pour importer toutes les expériences dans Firebase
  const handleSeedExperiences = async () => {
    if (!window.confirm("Importer les 9 expériences dans Firebase ?")) return;

    setSeeding(true);
    try {
      let count = 0;
      for (const exp of SEED_EXPERIENCES) {
        await addExperience(exp);
        count++;
      }
      showToast(`${count} expériences importées avec succès !`, "success");
      // Recharger les expériences
      const newExperiences = await getAllExperiences();
      setExperiences(newExperiences);
    } catch (error) {
      console.error("Erreur lors de l'import:", error);
      showToast("Erreur lors de l'import des expériences", "error");
    } finally {
      setSeeding(false);
    }
  };

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

          <div className="mb-6 flex justify-end gap-3">
            {activeTab !== "experiences" ? (
              <Link
                to={`/admin/${activeTab === "artists" ? "artist" : "dj"}/add`}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#775CFF] to-[#EBABFF] text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <Plus size={18} /> Ajouter un{" "}
                {activeTab === "artists" ? "artiste" : "DJ"}
              </Link>
            ) : (
              <>
                {/* TEMPORAIRE: Bouton pour importer les expériences */}
                <button
                  onClick={handleSeedExperiences}
                  disabled={seeding || experiences.length > 0}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title={experiences.length > 0 ? "Des expériences existent déjà" : "Importer les 9 expériences"}
                >
                  <Database size={18} />
                  {seeding ? "Import..." : "Importer les 9 expériences"}
                </button>
                <Link
                  to="/admin/experience/add"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#775CFF] to-[#EBABFF] text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Plus size={18} /> Ajouter une expérience
                </Link>
              </>
            )}
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
                      Lieu / Année
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
                            <img
                              src={exp.logo}
                              alt={exp.title}
                              className="h-full w-full object-cover"
                            />
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
                            {exp.location}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar size={14} className="mr-1" />
                            {exp.year}
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
            // Table des artistes/DJs
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
