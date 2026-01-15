import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import {
  getArtistById,
  deleteArtist,
  getDjById,
  deleteDj,
} from "../services/artistService";
import {
  getExperienceById,
  deleteExperience,
} from "../services/experienceService";
import { Artist, Experience } from "../types";
import { Section, Loader } from "../components/ui";
import Seo from "../components/seo/Seo";
import { ArrowLeft, AlertTriangle } from "lucide-react";

interface DeleteConfirmationProps {
  type: "artist" | "dj" | "experience";
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ type }) => {
  const [item, setItem] = useState<Artist | Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchItem = async () => {
      if (id) {
        try {
          let fetchedItem;
          if (type === "artist") {
            fetchedItem = await getArtistById(id);
          } else if (type === "dj") {
            fetchedItem = await getDjById(id);
          } else {
            fetchedItem = await getExperienceById(id);
          }

          setItem(fetchedItem);
        } catch (error) {
          console.error("Erreur lors du chargement des données:", error);
          showToast("Erreur lors du chargement des données", "error");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchItem();
  }, [id, type, showToast]);

  const handleDelete = async () => {
    if (!id) return;

    try {
      setDeleting(true);

      if (type === "artist") {
        await deleteArtist(id);
      } else if (type === "dj") {
        await deleteDj(id);
      } else {
        await deleteExperience(id);
      }

      const typeLabel =
        type === "artist" ? "Artiste" : type === "dj" ? "DJ" : "Expérience";
      showToast(`${typeLabel} supprimé avec succès`, "success");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      showToast("Erreur lors de la suppression", "error");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <Section>
        <div className="flex justify-center p-12">
          <Loader size="lg" />
        </div>
      </Section>
    );
  }

  if (!item) {
    return (
      <Section>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-3xl font-bold">Élément non trouvé</h1>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-gray-600">
              L'élément que vous essayez de supprimer n'a pas été trouvé.
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Retour au dashboard
              </button>
            </div>
          </div>
        </div>
      </Section>
    );
  }

  // Helper to get display name and image for both Artist/DJ and Experience
  const isExperience = type === "experience";
  const displayName = isExperience
    ? (item as Experience).title
    : (item as Artist).name;
  const displayImage = isExperience
    ? (item as Experience).logo
    : Array.isArray((item as Artist).image)
    ? (item as Artist).image[0]
    : (item as Artist).image;

  return (
    <>
      <Seo
        title={`Supprimer ${displayName} | Glitter Productions`}
        description={`Confirmation de suppression de ${displayName}`}
        canonical={`/admin/${type}/delete/${id}`}
        noindex
      />
      <Section>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-3xl font-bold">Confirmer la suppression</h1>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start mb-6">
              <AlertTriangle
                size={24}
                className="text-red-500 mr-3 flex-shrink-0"
              />
              <div>
                <h2 className="text-xl font-semibold text-red-500 mb-2">
                  Attention : cette action est irréversible
                </h2>
                <p className="text-gray-600">
                  Vous êtes sur le point de supprimer{" "}
                  <strong>{displayName}</strong>. Cette action ne peut pas être
                  annulée.
                </p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg mb-6">
              <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                <img
                  src={displayImage}
                  alt={displayName}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/images/placeholder.jpg";
                  }}
                />
              </div>
              <div>
                <p className="font-medium">{displayName}</p>
                <p className="text-sm text-gray-500 truncate max-w-md">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => navigate("/admin/dashboard")}
                className="px-4 py-2 mr-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center"
              >
                {deleting ? <Loader size="sm" /> : "Supprimer définitivement"}
              </button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default DeleteConfirmation;
