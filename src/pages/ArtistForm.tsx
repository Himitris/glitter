import React, { useState, useEffect, useRef } from "react";
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
import { uploadImage } from "../services/cloudinaryService";
import { Section, Loader } from "../components/ui";
import Seo from "../components/seo/Seo";
import { ArrowLeft, Upload, X, Image as ImageIcon } from "lucide-react";

interface ArtistFormProps {
  isEdit: boolean;
  type: "artist" | "dj";
}

const ArtistForm: React.FC<ArtistFormProps> = ({ isEdit, type }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEdit);
  const [uploading, setUploading] = useState(false);

  const [instagram, setInstagram] = useState("");
  const [spotify, setSpotify] = useState("");
  const [website, setWebsite] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

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

            // Gestion des images (toutes les images)
            if (Array.isArray(fetchedArtist.image)) {
              setImageUrls(fetchedArtist.image);
            } else {
              setImageUrls([fetchedArtist.image]);
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

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith("image/")) {
      showToast("Veuillez sélectionner une image", "error");
      return;
    }

    // Vérifier la taille (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      showToast("L'image ne doit pas dépasser 10MB", "error");
      return;
    }

    setUploading(true);

    try {
      const folder = type === "artist" ? "artists" : "djs";
      const result = await uploadImage(file, folder);

      if (result.success && result.url) {
        setImageUrls((prev) => [...prev, result.url!]);
        showToast("Image uploadée avec succès!", "success");
      } else {
        showToast(result.error || "Erreur lors de l'upload", "error");
      }
    } catch (error) {
      console.error("Erreur upload:", error);
      showToast("Erreur lors de l'upload de l'image", "error");
    } finally {
      setUploading(false);
      // Reset l'input pour permettre de sélectionner le même fichier
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      // Simuler un changement de fichier
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
        handleFileSelect({
          target: { files: dataTransfer.files },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation basique - seul le nom est obligatoire
    if (!name.trim()) {
      showToast("Le nom est obligatoire", "error");
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
        description: description || "",
        image: imageUrls.length > 0 ? (imageUrls.length === 1 ? imageUrls[0] : imageUrls) : "/images/placeholder.jpg",
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
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4D8F]"
                  placeholder="Description de l'artiste ou du DJ..."
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

              {/* Section Upload d'images (multiple) */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">
                  Images ({imageUrls.length})
                </label>

                {/* Zone de drop */}
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className={`
                    relative border-2 border-dashed rounded-xl p-6 text-center transition-all
                    ${
                      uploading
                        ? "border-[#775CFF] bg-[#775CFF]/5"
                        : "border-gray-300 hover:border-[#FF4D8F]"
                    }
                  `}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="image-upload"
                  />

                  {uploading ? (
                    <div className="flex flex-col items-center">
                      <Loader size="md" />
                      <p className="mt-2 text-sm text-gray-600">
                        Upload en cours...
                      </p>
                    </div>
                  ) : (
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#775CFF] to-[#FF4D8F] flex items-center justify-center mb-3">
                        <Upload className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-gray-700 font-medium">
                        Cliquez pour ajouter une image
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        ou glissez-déposez votre fichier ici
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        PNG, JPG, WEBP jusqu'à 10MB • Vous pouvez ajouter plusieurs images
                      </p>
                    </label>
                  )}
                </div>

                {/* Galerie d'images */}
                {imageUrls.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-3 font-medium">
                      Galerie d'images :
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {imageUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <div className="h-32 w-full rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm">
                            <img
                              src={url}
                              alt={`Image ${index + 1}`}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "/images/placeholder.jpg";
                              }}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => setImageUrls((prev) => prev.filter((_, i) => i !== index))}
                            className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md opacity-0 group-hover:opacity-100"
                          >
                            <X size={16} />
                          </button>
                          {index === 0 && (
                            <div className="absolute bottom-2 left-2 bg-[#775CFF] text-white text-xs px-2 py-1 rounded-full font-medium">
                              Principal
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      💡 La première image sera utilisée comme image principale
                    </p>
                  </div>
                )}

                {imageUrls.length === 0 && (
                  <div className="mt-4 flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-lg">
                    <ImageIcon size={18} />
                    <span className="text-sm">
                      Aucune image ajoutée. Uploadez au moins une image.
                    </span>
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
                  disabled={loading || uploading}
                  className="px-4 py-2 bg-gradient-to-r from-[#8C52FF] to-[#FF4D8F] text-white rounded-lg hover:opacity-90 transition-opacity flex items-center disabled:opacity-50"
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
