import React, { useEffect, useState } from "react";

export default function ProvidersAdmin() {
  const [providers, setProviders] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", slug: "", baseUrl: "", authType: "hmac" });

  useEffect(() => {
    fetch("/api/providers").then(r => r.json()).then(setProviders);
  }, []);

  async function add() {
    const res = await fetch("/api/providers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, credentials: [{ key: "demo-key", secret: "demo-secret", env: "sandbox" }] })
    });
    const data = await res.json();
    setProviders(prev => [data, ...prev]);
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Admin - Providers</h1>
      <div style={{ marginBottom: 12 }}>
        <input placeholder="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="slug" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} />
        <input placeholder="baseUrl" value={form.baseUrl} onChange={e => setForm({ ...form, baseUrl: e.target.value })} />
        <select value={form.authType} onChange={e => setForm({ ...form, authType: e.target.value })}>
          <option value="none">none</option>
          <option value="bearer">bearer</option>
          <option value="basic">basic</option>
          <option value="hmac">hmac</option>
        </select>
        <button onClick={add}>Add provider</button>
      </div>

      <ul>
        {providers.map(p => (
          <li key={p.id}>
            <strong>{p.name}</strong> ({p.slug}) - {p.enabled ? "enabled" : "disabled"}
          </li>
        ))}
      </ul>
    </div>
  );
}
