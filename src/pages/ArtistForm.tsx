import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import { Artist } from "../types";
import {
  addArtist,
  updateArtist,
  getArtistById,
  addDj,
  updateDj,
  getDjById,
} from "../services/artistService";
import Section from "../components/ui/Section";
import Loader from "../components/ui/Loader";
import Seo from "../components/seo/Seo";
import { ArrowLeft, Info } from "lucide-react";

interface ArtistFormProps {
  isEdit: boolean;
  type: "artist" | "dj";
}

const ArtistForm: React.FC<ArtistFormProps> = ({ isEdit, type }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEdit);

  const [instagram, setInstagram] = useState("");
  const [spotify, setSpotify] = useState("");
  const [website, setWebsite] = useState("");

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchArtist = async () => {
      if (isEdit && id) {
        try {
          const fetchedArtist =
            type === "artist" ? await getArtistById(id) : await getDjById(id);

          if (fetchedArtist) {
            setName(fetchedArtist.name);
            setDescription(fetchedArtist.description);

            // Gestion des liens sociaux
            setInstagram(fetchedArtist.socialLinks?.instagram || "");
            setSpotify(fetchedArtist.socialLinks?.spotify || "");
            setWebsite(fetchedArtist.socialLinks?.website || "");

            // Gestion de l'image (première image si c'est un tableau)
            if (Array.isArray(fetchedArtist.image)) {
              setImageUrl(fetchedArtist.image[0]);
            } else {
              setImageUrl(fetchedArtist.image);
            }
          }
        } catch (error) {
          console.error("Erreur lors du chargement des données:", error);
          showToast("Erreur lors du chargement des données", "error");
        } finally {
          setInitialLoading(false);
        }
      } else {
        setInitialLoading(false);
      }
    };

    fetchArtist();
  }, [id, isEdit, type, showToast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation basique
    if (!name.trim() || !description.trim() || !imageUrl.trim()) {
      showToast("Veuillez remplir tous les champs obligatoires", "error");
      return;
    }

    setLoading(true);

    try {
      // Créer l'objet artiste
      const socialLinks: { [key: string]: string } = {};

      // Ne définir les propriétés que si elles ont une valeur
      if (instagram.trim()) socialLinks.instagram = instagram.trim();
      if (spotify.trim()) socialLinks.spotify = spotify.trim();
      if (website.trim()) socialLinks.website = website.trim();

      const artistData: Omit<Artist, "id"> = {
        name,
        description,
        image: imageUrl,
        socialLinks: socialLinks,
      };

      if (isEdit && id) {
        // Mise à jour
        if (type === "artist") {
          await updateArtist(id, artistData);
        } else {
          await updateDj(id, artistData);
        }
        showToast(
          `${type === "artist" ? "Artiste" : "DJ"} mis à jour avec succès`,
          "success"
        );
      } else {
        // Ajout
        if (type === "artist") {
          await addArtist(artistData);
        } else {
          await addDj(artistData);
        }
        showToast(
          `${type === "artist" ? "Artiste" : "DJ"} ajouté avec succès`,
          "success"
        );
      }

      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      showToast("Erreur lors de la sauvegarde", "error");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <Section>
        <div className="flex justify-center p-12">
          <Loader size="lg" />
        </div>
      </Section>
    );
  }

  return (
    <>
      <Seo
        title={`${isEdit ? "Modifier" : "Ajouter"} un ${
          type === "artist" ? "artiste" : "DJ"
        } | Glitter Production`}
        description={`${isEdit ? "Modifier" : "Ajouter"} un ${
          type === "artist" ? "artiste" : "DJ"
        } dans la base de données Glitter Production`}
        canonical={`/admin/${type}/${isEdit ? "edit" : "add"}${
          isEdit ? `/${id}` : ""
        }`}
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
            <h1 className="text-3xl font-bold">
              {isEdit ? "Modifier" : "Ajouter"} un{" "}
              {type === "artist" ? "artiste" : "DJ"}
            </h1>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Nom *
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4D8F]"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="description"
                >
                  Description *
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4D8F]"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="instagram"
                  >
                    Instagram
                  </label>
                  <input
                    type="url"
                    id="instagram"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="https://instagram.com/..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4D8F]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="spotify">
                    Spotify
                  </label>
                  <input
                    type="url"
                    id="spotify"
                    value={spotify}
                    onChange={(e) => setSpotify(e.target.value)}
                    placeholder="https://open.spotify.com/..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4D8F]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="website">
                    Site Web
                  </label>
                  <input
                    type="url"
                    id="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4D8F]"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="imageUrl">
                  Chemin de l'image *
                </label>
                <input
                  type="text" // <- changé de "url" à "text"
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="/images/artists/nom-image.webp"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4D8F]"
                  required
                />
                <div className="flex items-start mt-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <Info
                    size={16}
                    className="text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                  />
                  <p className="text-sm text-blue-700">
                    Entrez le chemin relatif de l'image, par exemple :
                    <code className="bg-blue-100 px-1 py-0.5 rounded">
                      /images/artists/nom-image.webp
                    </code>
                    .
                    <br />
                    Pour les images externes, utilisez l'URL complète (ex :
                    https://exemple.com/image.jpg).
                  </p>
                </div>

                {/* Reste du code inchangé */}
                {imageUrl && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">
                      Prévisualisation :
                    </p>
                    <div className="h-32 w-32 rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={imageUrl}
                        alt="Prévisualisation"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/images/placeholder.jpg";
                          showToast(
                            "Le chemin de l'image semble incorrect",
                            "error"
                          );
                        }}
                      />
                    </div>
                  </div>
                )}
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
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-gradient-to-r from-[#8C52FF] to-[#FF4D8F] text-white rounded-lg hover:opacity-90 transition-opacity flex items-center"
                >
                  {loading ? (
                    <Loader size="sm" />
                  ) : (
                    <>{isEdit ? "Mettre à jour" : "Ajouter"}</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
};

export default ArtistForm;
