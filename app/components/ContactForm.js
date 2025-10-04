// components/ContactForm.jsx - VERSÃO COMPLETA EVOLUÍDA
import { useEffect, useRef, useState } from "react";
import api from '../utils/api'; // 🆕 ADICIONAR: Import da configuração do axios

const ContactForm = ({ onAdd }) => {
  // ✅ MANTER: Estados existentes do projeto
  const [form, setForm] = useState({ nome: "", email: "", telefone: "" });
  const nomeInputRef = useRef(null);
  
  // 🆕 ADICIONAR: Estados para API e UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ MANTER: Foco automático do projeto existente
  useEffect(() => {
    nomeInputRef.current?.focus();
  }, []);

  // 🆕 ADICIONAR: Cleanup opcional para evitar memory leaks
  useEffect(() => {
    return () => {
      console.log('ContactForm desmontado');
    };
  }, []);

  // ✅ MANTER: handleChange existente
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // 🆕 SUBSTITUIR: handleSubmit com integração de API + fallback offline
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nome.trim()) return; // Validação simples

    try {
      setLoading(true);
      setError(null);

      // Tentar salvar via API primeiro
      try {
        const response = await api.post('/contacts', form);
        // Se API funcionar, usar o ID retornado
        onAdd({ ...form, id: response.data.id });
      } catch (apiError) {
        // Se API falhar, salvar localmente
        console.log('API offline, salvando localmente');
        onAdd({ ...form, id: Date.now() });
      }
      
      setForm({ nome: "", email: "", telefone: "" });
      // Focar novamente no campo nome após adicionar
      nomeInputRef.current?.focus();
      
    } catch (err) {
      setError('Erro ao adicionar contato');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Nome</label>
        <input
          ref={nomeInputRef}
          name="nome"
          className="w-full border rounded px-3 py-2 text-gray-900"
          value={form.nome}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
        <input
          name="email"
          type="email"
          className="w-full border rounded px-3 py-2 text-gray-900"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Telefone</label>
        <input
          name="telefone"
          className="w-full border rounded px-3 py-2 text-gray-900"
          value={form.telefone}
          onChange={handleChange}
        />
      </div>

      {/* 🆕 ADICIONAR: Feedback de erro */}
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      {/* 🆕 MODIFICAR: Botão com estado de loading */}
      <button 
        type="submit" 
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Salvando...' : 'Adicionar Contato'}
      </button>
    </form>
  );
};

export default ContactForm;