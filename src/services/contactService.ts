// src/services/contactService.ts

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  subject?: string;
  phone?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvgkdzow";

// Envoyer un message de contact via Formspree
export const sendContactMessage = async (
  data: ContactFormData
): Promise<ContactResponse> => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);

    if (data.subject) {
      formData.append("subject", data.subject);
    }
    if (data.phone) {
      formData.append("phone", data.phone);
    }

    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      return {
        success: true,
        message: "Votre message a été envoyé avec succès!",
      };
    }

    const errorData = await response.json();
    return {
      success: false,
      message: errorData.error || "Une erreur s'est produite lors de l'envoi",
    };
  } catch (error) {
    console.error("Erreur lors de l'envoi du message:", error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de l'envoi",
    };
  }
};

// Valider les données du formulaire de contact
export const validateContactForm = (data: ContactFormData): string[] => {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push("Le nom doit contenir au moins 2 caractères");
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("L'adresse email n'est pas valide");
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push("Le message doit contenir au moins 10 caractères");
  }

  return errors;
};
