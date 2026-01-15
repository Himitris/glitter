import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import Seo from "../components/seo/Seo";
import { Section, Loader } from "../components/ui";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await login(email, password);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Erreur de connexion:", error);
      showToast("Identifiants incorrects", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo
        title="Admin Login | Glitter Productions"
        description="Page de connexion à l'interface d'administration"
        canonical="/admin/login"
        noindex
      />
      <Section>
        <div className="max-w-md mx-auto mt-10">
          <h2 className="text-2xl font-bold text-center mb-6">
            Administration Glitter Production
          </h2>
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4D8F]"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="password">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4D8F]"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#8C52FF] to-[#FF4D8F] text-white py-2 rounded-lg hover:opacity-90 transition-opacity flex justify-center"
              >
                {loading ? <Loader size="sm" /> : "Se connecter"}
              </button>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
};

export default AdminLogin;
