import { ArrowLeft, Plus, X, Upload, Link } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Seo from "../components/seo/Seo";
import { Loader, Section } from "../components/ui";
import { useToast } from "../contexts/ToastContext";
import {
  addExperience,
  getExperienceById,
  updateExperience,
} from "../services/experienceService";
import { Experience } from "../types";

const ExperienceForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const isEditing = !!id;

  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const [formData, setFormData] = useState<Omit<Experience, "id">>({
    title: "",
    year: "",
    location: "",
    description: "",
    services: [],
    logo: "",
    website: "",
  });

  const [newService, setNewService] = useState("");

  useEffect(() => {
    if (isEditing && id) {
      const fetchExperience = async () => {
        try {
          const experience = await getExperienceById(id);
          if (experience) {
            setFormData({
              title: experience.title,
              year: experience.year || "",
              location: experience.location || "",
              description: experience.description || "",
              services: experience.services || [],
              logo: experience.logo || "",
              website: experience.website || "",
            });
          } else {
            showToast("Expérience non trouvée", "error");
            navigate("/admin/dashboard");
          }
        } catch (error) {
          console.error("Erreur lors du chargement:", error);
          showToast("Erreur lors du chargement de l'expérience", "error");
        } finally {
          setLoading(false);
        }
      };

      fetchExperience();
    }
  }, [id, isEditing, navigate, showToast]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddService = () => {
    if (newService.trim() && !formData.services.includes(newService.trim())) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, newService.trim()],
      }));
      setNewService("");
    }
  };

  const handleRemoveService = (serviceToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s !== serviceToRemove),
    }));
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith("image/")) {
      showToast("Veuillez sélectionner une image", "error");
      return;
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast("L'image ne doit pas dépasser 5MB", "error");
      return;
    }

    setUploadingLogo(true);

    try {
      // Upload vers Cloudinary
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      formDataUpload.append("upload_preset", "glitter_unsigned");
      formDataUpload.append("folder", "experiences");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/da8ia2pmv/image/upload",
        {
          method: "POST",
          body: formDataUpload,
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l'upload");
      }

      const data = await response.json();
      setFormData((prev) => ({ ...prev, logo: data.secure_url }));
      showToast("Logo uploadé avec succès", "success");
    } catch (error) {
      console.error("Erreur upload:", error);
      showToast("Erreur lors de l'upload du logo", "error");
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation - seul le titre est obligatoire
    if (!formData.title.trim()) {
      showToast("Le titre est requis", "error");
      return;
    }

    setSubmitting(true);

    try {
      if (isEditing && id) {
        await updateExperience(id, formData);
        showToast("Expérience mise à jour avec succès", "success");
      } else {
        await addExperience(formData);
        showToast("Expérience ajoutée avec succès", "success");
      }
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      showToast("Erreur lors de la sauvegarde", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Services suggérés
  const suggestedServices = [
    "Régie artistes",
    "Régie bénévoles",
    "Régie cashless",
    "Régie site",
    "Direction de production",
    "Gestion des paies",
    "Production",
    "Logistique",
    "Administration",
    "Coordination",
  ];

  if (loading) {
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
        title={`${isEditing ? "Modifier" : "Ajouter"} une expérience | Admin`}
        description="Gestion des expériences Glitter Production"
        canonical={`/admin/experience/${isEditing ? "edit" : "add"}`}
      />
      <Section>
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
          >
            <ArrowLeft size={20} />
            Retour au dashboard
          </button>

          <h1 className="text-3xl font-bold mb-8">
            {isEditing ? "Modifier l'expérience" : "Ajouter une expérience"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Titre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom de l'événement *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#775CFF] focus:border-transparent"
                placeholder="Ex: Festival XYZ"
              />
            </div>

            {/* Lieu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lieu
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#775CFF] focus:border-transparent"
                placeholder="Ex: Toulouse"
              />
            </div>

            {/* Site web */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center gap-2">
                  <Link size={16} />
                  Site internet
                </span>
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#775CFF] focus:border-transparent"
                placeholder="https://www.exemple.com"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#775CFF] focus:border-transparent"
                placeholder="Décrivez la structure ou l'événement..."
              />
            </div>

            {/* Services */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Services fournis
              </label>

              {/* Services ajoutés */}
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.services.map((service) => (
                  <span
                    key={service}
                    className="inline-flex items-center gap-1 bg-[#775CFF]/10 text-[#775CFF] px-3 py-1 rounded-full text-sm"
                  >
                    {service}
                    <button
                      type="button"
                      onClick={() => handleRemoveService(service)}
                      className="hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>

              {/* Ajouter un service */}
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddService())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#775CFF] focus:border-transparent"
                  placeholder="Ajouter un service..."
                />
                <button
                  type="button"
                  onClick={handleAddService}
                  className="px-4 py-2 bg-[#775CFF] text-white rounded-lg hover:bg-[#5a45cc] transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>

              {/* Suggestions */}
              <div className="flex flex-wrap gap-2">
                {suggestedServices
                  .filter((s) => !formData.services.includes(s))
                  .slice(0, 6)
                  .map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          services: [...prev.services, service],
                        }))
                      }
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      + {service}
                    </button>
                  ))}
              </div>
            </div>

            {/* Logo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo / Image
              </label>

              {formData.logo ? (
                <div className="relative inline-block">
                  <img
                    src={formData.logo}
                    alt="Logo preview"
                    className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, logo: "" }))}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#775CFF] transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    disabled={uploadingLogo}
                  />
                  {uploadingLogo ? (
                    <Loader size="sm" />
                  ) : (
                    <>
                      <Upload size={24} className="text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">
                        Cliquez pour uploader un logo
                      </span>
                    </>
                  )}
                </label>
              )}
            </div>

            {/* Boutons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/admin/dashboard")}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-[#775CFF] to-[#EBABFF] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {submitting ? (
                  <Loader size="sm" />
                ) : isEditing ? (
                  "Mettre à jour"
                ) : (
                  "Ajouter"
                )}
              </button>
            </div>
          </form>
        </div>
      </Section>
    </>
  );
};

export default ExperienceForm;
