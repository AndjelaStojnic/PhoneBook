import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Input from "../components/Input";
import { contactsApi } from "../api/contacts";
import { callsApi } from "../api/calls";
import { usersApi } from "../api/users";
import { geoApi } from "../api/geo";

const TABS = [
  { key: "favorites", label: "Favorites", icon: "⭐" },
  { key: "recents",   label: "Recents",   icon: "⏱️" },
  { key: "contacts",  label: "Contacts",  icon: "👥" },
  { key: "keypad",    label: "Keypad",    icon: "🔢" },
  { key: "settings",  label: "Settings",  icon: "⚙️" },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [active, setActive] = useState(() => localStorage.getItem("pb_active_tab") || "favorites");

  useEffect(() => {
    localStorage.setItem("pb_active_tab", active);
  }, [active]);

  return (
    <div className="flex-1 flex flex-col">
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {active === "favorites" && <FavoritesTab />}
        {active === "recents" && <RecentsTab />}
        {active === "contacts" && <ContactsTab user={user} />}
        {active === "keypad" && <KeypadTab />}
        {active === "settings" && <SettingsTab user={user} />}
      </div>

      {/* Bottom Tab Bar */}
      <nav className="sticky bottom-0 w-full bg-white border-t shadow-sm">
        <div className="max-w-md mx-auto grid grid-cols-5">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`flex flex-col items-center gap-1 py-2 text-sm ${active === t.key ? "text-blue-600" : "text-gray-600"}`}
            >
              <span className="text-xl leading-none">{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

/* ---------------- Favorites ---------------- */
function FavoritesTab() {
  const { user } = useAuth();
  const [q, setQ] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (!user) return;
    loadFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function loadFavorites() {
    try {
      setLoading(true);
      const res = await contactsApi.favorites(user.userId);
      setFavorites(res.data || []);
    } catch (err) {
      console.error("Failed to load favorites:", err.message);
    } finally {
      setLoading(false);
    }
  }

  const filtered = favorites.filter((f) =>
    (f.contact?.fullName ||
      `${f.contact?.firstName || ""} ${f.contact?.lastName || ""}`)
      .toLowerCase()
      .includes(q.toLowerCase()) ||
    (f.contact?.phone || "").includes(q)
  );

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-3">Favorites</h2>

      <div className="flex gap-2 mb-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search favorites…"
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => setShowPicker(true)}
        >
          Add
        </button>
      </div>

      {loading ? (
        <div className="text-gray-500 border rounded-lg p-6 text-center">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="text-gray-500 border rounded-lg p-6 text-center">
          No favorites yet. Click <span className="font-semibold">Add</span> to pick from contacts.
        </div>
      ) : (
        <ul className="divide-y rounded-lg border bg-white">
          {filtered.map((f) => (
            <li key={`${f.type}-${f.id}`} className="p-3 flex items-center justify-between">
              <div>
                <div className="font-medium">
                  {f.type === "userContact"
                    ? `${f.contact?.firstName} ${f.contact?.lastName}`
                    : f.contact?.fullName}
                </div>
                <div className="text-gray-500 text-sm">
                  {f.contact?.phone || f.contact?.email}
                </div>
              </div>
              <button className="text-blue-600 hover:underline">Call</button>
            </li>
          ))}
        </ul>
      )}

      {showPicker && (
        <ContactPickerModal
          userId={user.userId}
          favorites={favorites}
          onClose={() => setShowPicker(false)}
          onPicked={async (contact) => {
            try {
              await contactsApi.update(contact.id, { favorite: true });
              await loadFavorites();
              setShowPicker(false);
            } catch (err) {
              alert("Failed to add favorite: " + err.message);
            }
          }}
        />
      )}
    </div>
  );
}

function ContactPickerModal({ userId, favorites, onClose, onPicked }) {
  const [contacts, setContacts] = useState([]);
  const [q, setQ] = useState("");
  const [letter, setLetter] = useState("");

  useEffect(() => {
    contactsApi.allCombined(userId).then((res) => setContacts(res.data || []));
  }, [userId]);

  // napravi set svih favorite ID-jeva za brzo poređenje
  const favoriteIds = new Set(favorites.map((f) => `${f.type}-${f.id}`));

  const filtered = contacts
    // 1️⃣ izbacimo već favorite
    .filter((c) => !favoriteIds.has(`${c.type}-${c.id}`))
    // 2️⃣ pretraga po query
    .filter((c) => {
      const name =
        c.contact?.fullName ||
        `${c.contact?.firstName || ""} ${c.contact?.lastName || ""}`;
      const matchQ = q ? name.toLowerCase().includes(q.toLowerCase()) : true;
      const matchLetter = letter
        ? name?.toUpperCase().startsWith(letter)
        : true;
      return matchQ && matchLetter;
    });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto relative">
        <h3 className="text-xl font-semibold mb-3">Pick a Contact</h3>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search…"
          className="w-full mb-3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {filtered.length === 0 ? (
          <div className="text-gray-500 text-center">No contacts available.</div>
        ) : (
          <ul className="divide-y rounded-lg border bg-white">
            {filtered.map((c) => (
              <li
                key={`${c.type}-${c.id}`}
                className="p-3 hover:bg-gray-50 cursor-pointer"
                onClick={() => onPicked(c)}
              >
                <div className="font-medium">
                  {c.type === "userContact"
                    ? `${c.contact?.firstName} ${c.contact?.lastName}`
                    : c.contact?.fullName}
                </div>
                <div className="text-sm text-gray-500">
                  {c.contact?.phone || c.contact?.email}
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* A–Z filter */}
        <div className="flex flex-wrap gap-1 mt-3 text-xs text-gray-500">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((l) => (
            <button
              key={l}
              className={`px-1 ${letter === l ? "text-blue-600 font-bold" : ""}`}
              onClick={() => setLetter(l === letter ? "" : l)}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Recents ---------------- */
function RecentsTab() {
  const { user } = useAuth();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all"); // all | missed
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    loadCalls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function loadCalls() {
    try {
      setLoading(true);
      const res = await callsApi.listByUser(user.userId);
      setCalls(res.data || []);
    } catch (err) {
      console.error("Failed to load calls:", err.message);
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    return calls
      .filter((c) => (filter === "missed" ? c.status === "missed" : true))
      .filter((c) => {
        const displayName =
          c.to?.type === "user"
            ? `${c.to?.user?.firstName || ""} ${c.to?.user?.lastName || ""}`.trim()
            : c.to?.type === "contact"
            ? c.to?.contact?.fullName || ""
            : c.to?.number || "";

        return q
          ? displayName.toLowerCase().includes(q.toLowerCase())
          : true;
      });
  }, [calls, q, filter]);

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-3">Recents</h2>

      {/* Filter i search */}
      <div className="flex items-center gap-2 mb-3">
        <div className="bg-gray-100 rounded-lg p-1 inline-flex">
          <TabPill active={filter === "all"} onClick={() => setFilter("all")}>
            All
          </TabPill>
          <TabPill active={filter === "missed"} onClick={() => setFilter("missed")}>
            Missed
          </TabPill>
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search calls…"
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Lista poziva */}
      {loading ? (
        <div className="text-gray-500 border rounded-lg p-6 text-center">
          Loading…
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-gray-500 border rounded-lg p-6 text-center">
          No calls yet.
        </div>
      ) : (
        <ul className="divide-y rounded-lg border bg-white">
          {filtered.map((c) => {
            const isOutgoing = c.from?.userId === user.userId;

            // Ime i broj
            let displayName = "";
            if (c.to?.type === "user") {
              const name = `${c.to?.user?.firstName || ""} ${c.to?.user?.lastName || ""}`.trim();
              displayName = name ? `${name} (${c.to?.user?.phone || ""})` : c.to?.user?.phone || "Unknown";
            } else if (c.to?.type === "contact") {
              const name = c.to?.contact?.fullName || "";
              displayName = name ? `${name} (${c.to?.contact?.phone || ""})` : c.to?.contact?.phone || "Unknown";
            } else {
              displayName = c.to?.number || "Unknown";
            }

            return (
              <li
                key={c.callId}
                className="p-3 flex items-center justify-between"
              >
                <div>
                  <div className="font-medium">
                    {isOutgoing ? "→ " : "← "}
                    {displayName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {c.status} • {new Date(c.createdAt).toLocaleString()}
                  </div>
                </div>
                <button className="text-blue-600 hover:underline">
                  Details
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ---------------- Contacts ---------------- */
function ContactsTab({ user }) {
  const [q, setQ] = useState("");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    if (!user) return;
    loadContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function loadContacts() {
    try {
      setLoading(true);
      const res = await contactsApi.allCombined(user.userId, "");
      setContacts(res.data || []);
    } catch (err) {
      console.error("Failed to load contacts:", err.message);
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    return contacts.filter((c) =>
      ((c.contact?.fullName) || `${c.contact?.firstName || ""} ${c.contact?.lastName || ""}`)
        .toLowerCase()
        .includes(q.toLowerCase()) ||
      (c.contact?.phone || "").includes(q)
    );
  }, [contacts, q]);

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-3">Contacts</h2>

      {/* My Info */}
      <div className="mb-4 p-4 rounded-xl bg-white border">
        <div className="font-semibold">My Info</div>
        <div className="text-gray-600 text-sm">
          {user?.firstName} {user?.lastName}
        </div>
        <div className="text-gray-500 text-sm">{user?.email}</div>
      </div>

      <div className="flex gap-2 mb-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search contacts…"
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => setShowAdd(true)}
        >
          Add
        </button>
      </div>

      {loading ? (
        <div className="text-gray-500 text-center">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="text-gray-500 border rounded-lg p-6 text-center">
          No contacts yet.
        </div>
      ) : (
        <ul className="divide-y rounded-lg border bg-white">
          {filtered.map((c) => (
            <li key={`${c.type}-${c.id}`} className="p-3 flex items-center justify-between">
              <div>
                <div className="font-medium">
                  {c.type === "userContact"
                    ? `${c.contact?.firstName} ${c.contact?.lastName}`
                    : c.contact?.fullName}
                </div>
                <div className="text-sm text-gray-500">
                  {c.contact?.phone || c.contact?.email}
                </div>
                {c.favorite && (
                  <div className="text-yellow-500 text-xs">★ Favorite</div>
                )}
              </div>
              <button
                onClick={async () => {
                  await contactsApi.remove(c.id);
                  loadContacts();
                }}
                className="text-red-500 hover:underline"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Add Contact Modal */}
      {showAdd && (
        <AddContactModal
          userId={user.userId}
          onClose={() => setShowAdd(false)}
          onCreated={loadContacts}
        />
      )}
    </div>
  );
}

function AddContactModal({ userId, onClose, onCreated }) {
  const [form, setForm] = useState({ fullName: "", phone: "", email: "", note: "" });
  const [saving, setSaving] = useState(false);
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSave = async () => {
    try {
      setSaving(true);
      await contactsApi.create({ userId, ...form });
      onCreated(); // refresh contacts list
      onClose();
    } catch (err) {
      alert("Failed to create contact: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Add Contact</h3>

        <div className="space-y-3">
          <Input label="Full Name" name="fullName" value={form.fullName} onChange={onChange} />
          <Input label="Phone" name="phone" value={form.phone} onChange={onChange} />
          <Input label="Email" name="email" type="email" value={form.email} onChange={onChange} />
          <Input label="Note" name="note" value={form.note} onChange={onChange} />
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Keypad ---------------- */
function KeypadTab() {
  const { user } = useAuth();
  const [number, setNumber] = useState("");
  const [saving, setSaving] = useState(false);

  const keys = ["1","2","3","4","5","6","7","8","9","*","0","#"];

  const press = (k) => setNumber((prev) => (prev + k).slice(0, 32));
  const backspace = () => setNumber((prev) => prev.slice(0, -1));
  const clear = () => setNumber("");

  const call = async () => {
    if (!number || !user) return;
    try {
      setSaving(true);
      await callsApi.create({
        callerId: user.userId,
        phone: number,
      });
      alert(`Poziv snimljen: ${number}`);
      setNumber("");
    } catch (err) {
      alert("Greška: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Keypad</h2>

      <div className="mb-4 px-3 py-4 text-center text-2xl bg-white border rounded-lg font-mono tracking-widest">
        {number || <span className="text-gray-400">Enter number…</span>}
      </div>

      <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
        {keys.map(k => (
          <button
            key={k}
            onClick={() => press(k)}
            className="h-14 rounded-full bg-white border text-xl font-semibold hover:bg-gray-50 active:scale-95"
          >
            {k}
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-3 mt-4">
        <button onClick={backspace} className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50">⌫</button>
        <button onClick={clear} className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50">Clear</button>
        <button
          onClick={call}
          disabled={saving}
          className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-60"
        >
          {saving ? "Calling…" : "Call"}
        </button>
      </div>
    </div>
  );
}

function SettingsTab({ user }) {
  const { setUser } = useAuth(); // 👈 uzmi setUser iz contexta

  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    email: user?.email || "",
    countryId: user?.countryId || "",
    cityId: user?.cityId || "",
  });
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    geoApi.countries().then((res) => setCountries(res.data || []));
  }, []);

  useEffect(() => {
    if (form.countryId) {
      geoApi.cities(form.countryId).then((res) => setCities(res.data || []));
    } else {
      setCities([]);
    }
  }, [form.countryId]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSave = async () => {
    try {
      setSaving(true);
      setMsg("");

      const res = await usersApi.update(user.userId, form);
      if (!res.ok) throw new Error(res.error || "Greška kod ažuriranja profila");

      // 🚀 update konteksta odmah
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));

      setMsg("Profil uspješno ažuriran.");
    } catch (err) {
      setMsg("❌ " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>

      <div className="bg-white border rounded-xl p-4 space-y-4">
        <Input label="First Name" name="firstName" value={form.firstName} onChange={onChange} />
        <Input label="Last Name" name="lastName" value={form.lastName} onChange={onChange} />
        <Input label="Phone" name="phone" value={form.phone} onChange={onChange} />
        <Input label="Email" name="email" type="email" value={form.email} onChange={onChange} />

        {/* Country select */}
        <div>
          <label className="block text-sm font-medium">Country</label>
          <select
            name="countryId"
            value={form.countryId}
            onChange={onChange}
            className="mt-1 block w-full border rounded-lg px-3 py-2"
          >
            <option value="">-- Select country --</option>
            {countries.map((c) => (
              <option key={c.countryId} value={c.countryId}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* City select */}
        <div>
          <label className="block text-sm font-medium">City</label>
          <select
            name="cityId"
            value={form.cityId}
            onChange={onChange}
            disabled={!form.countryId}
            className="mt-1 block w-full border rounded-lg px-3 py-2"
          >
            <option value="">-- Select city --</option>
            {cities.map((c) => (
              <option key={c.cityId} value={c.cityId}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {msg && <div className="text-sm text-gray-600">{msg}</div>}

        <div className="flex justify-end">
          <button
            onClick={onSave}
            disabled={saving}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Helper ---------------- */
function TabPill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-md text-sm ${
        active ? "bg-white text-blue-600 shadow" : "text-gray-600"
      }`}
    >
      {children}
    </button>
  );
}
