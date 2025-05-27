import React, { useState } from "react";

export default function CadastroIdosoResponsavel() {
  const [cadastros, setCadastros] = useState([]);
  const [form, setForm] = useState({
    idosoNome: "",
    idosoCpf: "",
    idosoDataNascimento: "",
    respNome: "",
    respCpf: "",
    respTelefone: "",
    respEmail: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  // Atualiza o form conforme o usuário digita
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Salva cadastro novo ou editado
  function handleSubmit(e) {
    e.preventDefault();

    // Validação básica
    if (
      !form.idosoNome ||
      !form.idosoCpf ||
      !form.idosoDataNascimento ||
      !form.respNome ||
      !form.respCpf ||
      !form.respTelefone ||
      !form.respEmail
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (editIndex === null) {
      setCadastros([...cadastros, form]);
    } else {
      const novosCadastros = [...cadastros];
      novosCadastros[editIndex] = form;
      setCadastros(novosCadastros);
      setEditIndex(null);
    }

    setForm({
      idosoNome: "",
      idosoCpf: "",
      idosoDataNascimento: "",
      respNome: "",
      respCpf: "",
      respTelefone: "",
      respEmail: "",
    });
  }

  // Editar um cadastro
  function handleEdit(index) {
    setForm(cadastros[index]);
    setEditIndex(index);
  }

  // Deletar um cadastro
  function handleDelete(index) {
    if (window.confirm("Deseja realmente excluir esse cadastro?")) {
      const novosCadastros = cadastros.filter((_, i) => i !== index);
      setCadastros(novosCadastros);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Cadastro de Idoso e Responsável</h2>
      <form onSubmit={handleSubmit}>
        <h3>Dados do Idoso</h3>
        <input
          name="idosoNome"
          placeholder="Nome"
          value={form.idosoNome}
          onChange={handleChange}
        />
        <input
          name="idosoCpf"
          placeholder="CPF"
          value={form.idosoCpf}
          onChange={handleChange}
        />
        <input
          type="date"
          name="idosoDataNascimento"
          placeholder="Data de Nascimento"
          value={form.idosoDataNascimento}
          onChange={handleChange}
        />

        <h3>Dados do Responsável</h3>
        <input
          name="respNome"
          placeholder="Nome"
          value={form.respNome}
          onChange={handleChange}
        />
        <input
          name="respCpf"
          placeholder="CPF"
          value={form.respCpf}
          onChange={handleChange}
        />
        <input
          name="respTelefone"
          placeholder="Telefone"
          value={form.respTelefone}
          onChange={handleChange}
        />
        <input
          name="respEmail"
          type="email"
          placeholder="Email"
          value={form.respEmail}
          onChange={handleChange}
        />
        <button type="submit">{editIndex === null ? "Cadastrar" : "Salvar"}</button>
      </form>

      <h2>Lista de Cadastros</h2>
      {cadastros.length === 0 && <p>Nenhum cadastro ainda.</p>}
      <ul>
        {cadastros.map((c, i) => (
          <li key={i} style={{ marginBottom: 12 }}>
            <strong>Idoso:</strong> {c.idosoNome} - CPF: {c.idosoCpf} - Nasc:{" "}
            {c.idosoDataNascimento}
            <br />
            <strong>Responsável:</strong> {c.respNome} - CPF: {c.respCpf} - Tel: {c.respTelefone} - Email: {c.respEmail}
            <br />
            <button onClick={() => handleEdit(i)}>Editar</button>{" "}
            <button onClick={() => handleDelete(i)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
