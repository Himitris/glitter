import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import {
  getArtistById,
  deleteArtist,
  getDjById,
  deleteDj,
} from "../services/artistService";
import { Artist } from "../types";
import Section from "../components/ui/Section";
import Loader from "../components/ui/Loader";
import Seo from "../components/seo/Seo";
import { ArrowLeft, AlertTriangle } from "lucide-react";

interface DeleteConfirmationProps {
  type: "artist" | "dj";
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ type }) => {
  const [item, setItem] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchItem = async () => {
      if (id) {
        try {
          const fetchedItem =
            type === "artist" ? await getArtistById(id) : await getDjById(id);

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
      } else {
        await deleteDj(id);
      }

      showToast(
        `${type === "artist" ? "Artiste" : "DJ"} supprimé avec succès`,
        "success"
      );
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

  return (
    <>
      <Seo
        title={`Supprimer ${item.name} | Glitter Production`}
        description={`Confirmation de suppression de ${item.name}`}
        canonical={`/admin/${type}/delete/${id}`}
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
                  <strong>{item.name}</strong>. Cette action ne peut pas être
                  annulée.
                </p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg mb-6">
              <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                <img
                  src={Array.isArray(item.image) ? item.image[0] : item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/images/placeholder.jpg";
                  }}
                />
              </div>
              <div>
                <p className="font-medium">{item.name}</p>
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
