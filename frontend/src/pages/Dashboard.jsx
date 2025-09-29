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
  { key: "users",     label: "Users",     icon: "🌍" },
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
        {active === "users" && <UsersTab user={user} />}
      </div>

      {/* Bottom Tab Bar */}
      <nav className="sticky bottom-0 w-full bg-white border-t shadow-sm">
        <div className="max-w-md mx-auto grid grid-cols-6">
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
    <div className="max-w-3xl mx-auto px-6 py-4 w-full">
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
                <div className="font-medium">{displayName(f.contact, f.type)}</div>
                <div className="text-gray-500 text-sm">
                  {f.contact?.phone || f.contact?.email}
                </div>
              </div>
              <div className="flex gap-3">
                {/* Call */}
                <button
                  onClick={async () => {
                    try {
                      await callsApi.create({
                        callerId: user.userId,
                        phone: f.contact?.phone,
                      });
                      alert(`Poziv zabilježen: ${f.contact?.phone}`);
                    } catch (err) {
                      alert("Greška kod poziva: " + err.message);
                    }
                  }}
                  className="text-green-600 hover:underline"
                >
                  Call
                </button>

                {/* Remove from favorites */}
                <button
                  onClick={async () => {
                    try {
                      await contactsApi.update({ ...f, favorite: false });
                      // reload favorites
                      await loadFavorites();
                    } catch (err) {
                      alert("Failed to remove favorite: " + err.message);
                    }
                  }}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
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
            await contactsApi.update({ ...contact, favorite: true });
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
                <div className="font-medium">{displayName(c.contact, c.type)}</div>
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
      .filter((c) => {
        if (filter === "missed") {
          // prikazuj samo incoming missed
          return c.status === "incoming_missed";
        }
        return true;
      })
      .filter((c) => {
        const target =
          c.to?.type === "user"
            ? c.to.user
            : c.to?.type === "contact"
            ? c.to.contact
            : null;

        const name = displayName(target, c.to?.type);
        return q ? name.toLowerCase().includes(q.toLowerCase()) : true;
      });
  }, [calls, q, filter]);

  // 🎨 helper za stil
  function statusClasses(status) {
    switch (status) {
      case "incoming_missed":
        return { row: "bg-red-50", text: "text-red-600" };
      case "outgoing_missed":
        return { row: "bg-orange-50", text: "text-orange-600" };
      case "incoming_accepted":
        return { row: "bg-green-50", text: "text-green-600" };
      case "outgoing_accepted":
        return { row: "bg-blue-50", text: "text-blue-600" };
      default:
        return { row: "", text: "" };
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-4 w-full">
      <h2 className="text-2xl font-semibold mb-3">Recents</h2>

      {/* Filter i search */}
      <div className="flex items-center gap-2 mb-3">
        <div className="bg-gray-100 rounded-lg p-1 inline-flex">
          <TabPill active={filter === "all"} onClick={() => setFilter("all")}>
            All
          </TabPill>
          <TabPill
            active={filter === "missed"}
            onClick={() => setFilter("missed")}
          >
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
          let target = null;
          let name = "Unknown";
          let phone = "";

          // outgoing → gledamo TO
          if (c.status.startsWith("outgoing")) {
            if (c.to?.type === "user") {
              target = c.to.user;
              phone = c.to.user?.phone;
            } else if (c.to?.type === "contact") {
              target = c.to.contact;
              phone = c.to.contact?.phone;
            } else {
              phone = c.to?.number || "";
            }
          }

          // incoming → gledamo FROM
          else if (c.status.startsWith("incoming")) {
            target = c.from;
            phone = c.from?.phone || "";
          }

          name = displayName(target, c.to?.type || "userContact");
          if (phone) name += ` (${phone})`;

          const cls = statusClasses(c.status);

            return (
              <li
                key={c.callId}
                className={`p-3 flex items-center justify-between ${cls.row}`}
              >
                <div>
                  <div className={`font-medium ${cls.text}`}>
                    {c.status.startsWith("outgoing") ? "→ " : "← "}
                    {name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {c.status} • {new Date(c.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      console.log("Details still in progress…", c);
                      alert("Details feature is still in progress 🚧");
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Details
                  </button>
                  <button
                    onClick={async () => {
                      await callsApi.remove(c.callId, user.userId);
                      setCalls(calls.filter((x) => x.callId !== c.callId));
                    }}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
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
  const [editingContact, setEditingContact] = useState(null);

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
    <div className="max-w-3xl mx-auto px-6 py-4 w-full">
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
                <div className="font-medium">{displayName(c.contact, c.type)}</div>
                <div className="text-sm text-gray-500">
                  {c.contact?.phone || c.contact?.email}
                </div>
                {c.favorite && (
                  <div className="text-yellow-500 text-xs">★ Favorite</div>
                )}
              </div>
              <div className="flex gap-2">
              <button
                onClick={async () => {
                  try {
                    await callsApi.create({
                      callerId: user.userId,
                      phone: c.contact?.phone,
                    });
                    alert(`Poziv zabilježen: ${c.contact?.phone}`);
                  } catch (err) {
                    alert("Greška kod poziva: " + err.message);
                  }
                }}
                className="text-green-600 hover:underline"
              >
                Call
              </button>
              <button
                onClick={() => setEditingContact(c)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={async () => {
                  await contactsApi.remove(c);
                  loadContacts();
                }}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
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

      {editingContact && (
        <EditContactModal
          contact={editingContact}
          onClose={() => setEditingContact(null)}
          onUpdated={loadContacts}
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

function EditContactModal({ contact, onClose, onUpdated }) {
  const isUserContact = contact.type === "userContact"; // 👈 provjera tipa

  const [form, setForm] = useState({
    fullName:
      contact.contact?.fullName ||
      `${contact.contact?.firstName || ""} ${contact.contact?.lastName || ""}`.trim(),
    phone: contact.contact?.phone || "",
    email: contact.contact?.email || "",
    note: contact.contact?.note || "",
    nickname: contact.contact?.nickname || "",
  });
  const [saving, setSaving] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // 🔥 ovdje ide novi onSave
  const onSave = async () => {
    try {
      setSaving(true);

      await contactsApi.update({
        ...contact,
        nickname: form.nickname,
        ...(!isUserContact ? form : {}), // ako je manualContact šalje sve fieldove
      });

      onUpdated();
      onClose();
    } catch (err) {
      alert("Failed to update contact: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Edit Contact</h3>

        <div className="space-y-3">
          <Input
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={onChange}
            disabled={isUserContact} // disable za userContact
          />
          <Input
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={onChange}
            disabled={isUserContact}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            disabled={isUserContact}
          />
          <Input
            label="Note"
            name="note"
            value={form.note}
            onChange={onChange}
            disabled={isUserContact}
          />
          <Input
            label="Nickname"
            name="nickname"
            value={form.nickname}
            onChange={onChange}
          />
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

  // long press logika
  let pressTimer;

  const handlePress = (k) => {
    if (k === "0") {
      pressTimer = setTimeout(() => {
        setNumber((prev) => (prev + "+").slice(0, 32));
        pressTimer = null; // reset
      }, 600); // duže od 600ms = "+"
    }
  };

  const handleRelease = (k) => {
    if (k === "0") {
      if (pressTimer) {
        clearTimeout(pressTimer);
        setNumber((prev) => (prev + "0").slice(0, 32));
      }
    } else {
      setNumber((prev) => (prev + k).slice(0, 32));
    }
  };

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
    <div className="max-w-3xl mx-auto px-6 py-4 w-full">
      <h2 className="text-2xl font-semibold mb-4">Keypad</h2>

      <div className="mb-4 px-3 py-4 text-center text-3xl bg-white border rounded-lg font-mono tracking-widest">
        {number || <span className="text-gray-400">Enter number…</span>}
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
        {keys.map(k => (
          <button
            key={k}
            onMouseDown={() => handlePress(k)}
            onMouseUp={() => handleRelease(k)}
            onTouchStart={() => handlePress(k)}
            onTouchEnd={() => handleRelease(k)}
            className="relative px-10 py-6 rounded-2xl bg-white border text-3xl font-bold hover:bg-gray-50 active:scale-95 shadow-sm"
          >
            {k}
            {k === "0" && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-sm text-gray-500">+</span>
            )}
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-3 mt-6">
        <button onClick={backspace} className="px-5 py-2 rounded-lg border bg-white hover:bg-gray-50">⌫</button>
        <button onClick={clear} className="px-5 py-2 rounded-lg border bg-white hover:bg-gray-50">Clear</button>
        <button
          onClick={call}
          disabled={saving}
          className="px-8 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-60"
        >
          {saving ? "Calling…" : "Call"}
        </button>
      </div>
    </div>
  );
}

/* ---------------- Settings ---------------- */
function SettingsTab({ user }) {
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    email: user?.email || "",
    countryId: user?.countryId || "",
    cityId: user?.cityId || "",
    newPassword: "",
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

      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));

      setMsg("Profil uspješno ažuriran.");
    } catch (err) {
      setMsg("❌ " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const onChangePassword = async () => {
    try {
      setSaving(true);
      setMsg("");

      const res = await usersApi.changePassword(user.userId, form.newPassword);
      if (!res.ok) throw new Error(res.error || "Greška kod promjene lozinke");

      setMsg("Lozinka uspješno promijenjena.");
      setForm({ ...form, newPassword: "" });
    } catch (err) {
      setMsg("❌ " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-4 w-full">
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>

      <div className="bg-white border rounded-xl p-4 space-y-4">
        <Input label="First Name" name="firstName" value={form.firstName} onChange={onChange} />
        <Input label="Last Name" name="lastName" value={form.lastName} onChange={onChange} />
        <Input label="Phone" name="phone" value={form.phone} onChange={onChange} />

        {/* Email sa overlay-em */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={user?.newEmail || form.email} 
            onChange={onChange}
            className={`mt-1 block w-full rounded-lg px-3 py-2 border focus:outline-none 
              ${user?.newEmail
                ? "border-yellow-400 bg-yellow-50 focus:ring-yellow-500"
                : "border-gray-300 focus:ring-blue-500"
              }`}
          />

          {user?.newEmail && (
            <div className="mt-1 text-sm text-yellow-600">
              Still using <b>{user.email}</b> until new is verified.
            </div>
          )}
        </div>

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

        <div className="flex justify-end">
          <button
            onClick={onSave}
            disabled={saving}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Profile"}
          </button>
        </div>

        {/* Change password */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">Change Password</h3>
          <Input
            label="New Password"
            name="newPassword"
            type="password"
            value={form.newPassword}
            onChange={onChange}
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={onChangePassword}
              disabled={saving || !form.newPassword}
              className="px-5 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-60"
            >
              {saving ? "Changing…" : "Change Password"}
            </button>
          </div>
        </div>

        {msg && <div className="text-sm text-gray-600">{msg}</div>}
      </div>
    </div>
  );
}

/* ---------------- Users ---------------- */
function UsersTab({ user }) {
  const [q, setQ] = useState("");
  const [users, setUsers] = useState([]);
  const [myContacts, setMyContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
    loadMyContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // učitaj sve usere
  async function loadUsers() {
    try {
      setLoading(true);
      const res = await usersApi.list(); // 👈 /api/users
      setUsers(res.data || []);
    } catch (err) {
      console.error("Failed to load users:", err.message);
    } finally {
      setLoading(false);
    }
  }

  // učitaj moje kontakte (da znamo ko je već dodat)
  async function loadMyContacts() {
    try {
      const res = await contactsApi.allCombined(user.userId);
      setMyContacts(res.data || []);
    } catch (err) {
      console.error("Failed to load contacts:", err.message);
    }
  }

  // helper da li je user već u kontaktima
  function isAlreadyContact(contactUserId) {
    return myContacts.some((c) => c.contact?.userId === contactUserId);
  }

  // dodavanje u kontakte
  async function addToContacts(contactUserId, u) {
    try {
      const res = await contactsApi.createUserContact({
        userId: user.userId,
        contactUserId,
      });
      if (!res.ok) throw new Error(res.error || "Greška kod dodavanja");
      alert(`✅ ${u.firstName} ${u.lastName} dodat u kontakte`);
      loadMyContacts(); // odmah osvježi
    } catch (err) {
      alert("❌ " + err.message);
    }
  }

  // filtriranje
  const filtered = useMemo(() => {
    return users
      // izbaci mene
      .filter((u) => u.userId !== user.userId)
      // pretraga
      .filter(
        (u) =>
          `${u.firstName} ${u.lastName}`.toLowerCase().includes(q.toLowerCase()) ||
          (u.email || "").toLowerCase().includes(q.toLowerCase()) ||
          (u.phone || "").includes(q)
      );
  }, [users, q, user.userId]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-4 w-full">
      <h2 className="text-2xl font-semibold mb-3">All Users</h2>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search users…"
        className="w-full mb-3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {loading ? (
        <div className="text-gray-500 border rounded-lg p-6 text-center">
          Loading…
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-gray-500 border rounded-lg p-6 text-center">
          No users found.
        </div>
      ) : (
        <ul className="divide-y rounded-lg border bg-white">
          {filtered.map((u) => (
            <li
              key={u.userId}
              className="p-3 flex items-center justify-between"
            >
              <div>
                <div className="font-medium">
                  {displayName(u, "userContact")}
                </div>
                <div className="text-gray-500 text-sm">
                  {u.phone || u.email}
                </div>
              </div>
              {u.userId !== user.userId && (
                <button
                  onClick={() => addToContacts(u.userId, u)}
                  disabled={isAlreadyContact(u.userId)}
                  className={`px-3 py-1 rounded text-white ${
                    isAlreadyContact(u.userId)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isAlreadyContact(u.userId) ? "Added" : "Add"}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
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

function displayName(contact, type) {
  if (!contact) return "Unknown";

  if (contact.nickname) return contact.nickname;

  if (type === "user" || type === "userContact") {
    return `${contact.firstName || ""} ${contact.lastName || ""}`.trim() || "Unknown";
  }

  return contact.fullName || "Unknown";
}