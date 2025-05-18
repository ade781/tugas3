import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2, FiPlus, FiMoon } from "react-icons/fi";

const Navbar = ({ searchTerm, setSearchTerm }) => {
    return (
        <nav
            style={{
                padding: "1rem 2rem",
                backgroundColor: "#0a1128",
                marginBottom: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#fefcfb",
                boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div style={{ display: "flex", alignItems: "center" }}>
                <FiMoon size={24} style={{ marginRight: "10px" }} />
                <h2 style={{ margin: 0 }}>Moonlight Notes</h2>
            </div>
            <div style={{ position: "relative" }}>
                <input
                    type="text"
                    placeholder="Cari catatan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        padding: "0.5rem 1rem 0.5rem 2rem",
                        width: "250px",
                        borderRadius: "20px",
                        border: "none",
                        backgroundColor: "#1a2a4a",
                        color: "#fefcfb",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        left: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#7c8db5",
                    }}
                >
                    <FiMoon size={16} />
                </div>
            </div>
            <div
                style={{
                    position: "absolute",
                    top: "-50px",
                    right: "-50px",
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
            ></div>
        </nav>
    );
};

const Sidebar = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
        <aside
            style={{
                width: "250px",
                borderRight: "1px solid #1a2a4a",
                padding: "1.5rem",
                backgroundColor: "#0a1128",
                color: "#fefcfb",
                minHeight: "calc(100vh - 80px)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    bottom: "-50px",
                    left: "-50px",
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
            ></div>
            <h3 style={{ marginTop: 0, color: "#7c8db5" }}>Kategori</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
                <li
                    style={{
                        cursor: "pointer",
                        padding: "0.5rem 1rem",
                        marginBottom: "0.5rem",
                        borderRadius: "5px",
                        backgroundColor: selectedCategory === "" ? "#1a2a4a" : "transparent",
                        color: selectedCategory === "" ? "#fefcfb" : "#7c8db5",
                        transition: "all 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                    }}
                    onClick={() => setSelectedCategory("")}
                >
                    <div
                        style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: selectedCategory === "" ? "#fefcfb" : "#7c8db5",
                            marginRight: "10px",
                        }}
                    ></div>
                    Semua
                </li>
                {categories.map((cat) => (
                    <li
                        key={cat}
                        style={{
                            cursor: "pointer",
                            padding: "0.5rem 1rem",
                            marginBottom: "0.5rem",
                            borderRadius: "5px",
                            backgroundColor: selectedCategory === cat ? "#1a2a4a" : "transparent",
                            color: selectedCategory === cat ? "#fefcfb" : "#7c8db5",
                            transition: "all 0.3s ease",
                            display: "flex",
                            alignItems: "center",
                        }}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        <div
                            style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor: selectedCategory === cat ? "#fefcfb" : "#7c8db5",
                                marginRight: "10px",
                            }}
                        ></div>
                        {cat}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

const NoteList = () => {
    const [notes, setNotes] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            setErrorMsg("Anda harus login terlebih dahulu");
            return;
        }

        try {
            const response = await axios.get(`${BASE_URL}/note`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setNotes(response.data);
            setErrorMsg("");
        } catch (error) {
            setErrorMsg("Gagal mengambil data. Pastikan token valid.");
            console.error(error);
        }
    };

    const categories = Array.from(new Set(notes.map((note) => note.kategori)));

    const filteredNotes = notes.filter((note) => {
        const matchesCategory = selectedCategory ? note.kategori === selectedCategory : true;
        const matchesSearch =
            note.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.isi.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const deleteNote = async (id) => {
        if (!window.confirm("Yakin ingin menghapus catatan ini?")) return;

        const token = localStorage.getItem("accessToken");
        if (!token) {
            setErrorMsg("Anda harus login terlebih dahulu");
            return;
        }

        try {
            await axios.delete(`${BASE_URL}/note/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            getNotes();
        } catch (error) {
            setErrorMsg("Gagal menghapus catatan.");
            console.error(error);
        }
    };

    return (
        <div style={{ backgroundColor: "#050a1a", minHeight: "100vh" }}>
            <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div style={{ display: "flex" }}>
                <Sidebar
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
                <main
                    style={{
                        padding: "2rem",
                        flex: 1,
                        background:
                            "radial-gradient(circle at 90% 10%, rgba(26, 42, 74, 0.3) 0%, rgba(10, 17, 40, 0) 50%)",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "2rem",
                        }}
                    >
                        <h1 style={{ color: "#fefcfb", margin: 0 }}>Daftar Catatan</h1>
                        <button
                            onClick={() => navigate("/add")}
                            style={{
                                backgroundColor: "#1a2a4a",
                                color: "#fefcfb",
                                border: "none",
                                padding: "0.5rem 1rem",
                                borderRadius: "5px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                transition: "all 0.3s ease",
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2a3a5a")}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1a2a4a")}
                        >
                            <FiPlus /> Tambah Catatan
                        </button>
                    </div>

                    {errorMsg && (
                        <p style={{ color: "#ff6b6b", marginBottom: "1rem" }}>{errorMsg}</p>
                    )}

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                            gap: "1.5rem",
                        }}
                    >
                        {filteredNotes.map((note) => (
                            <div
                                key={note.id}
                                style={{
                                    backgroundColor: "#1a2a4a",
                                    borderRadius: "10px",
                                    padding: "1.5rem",
                                    color: "#fefcfb",
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                    display: "flex",
                                    flexDirection: "column",
                                    height: "100%",
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "-20px",
                                        right: "-20px",
                                        width: "60px",
                                        height: "60px",
                                        borderRadius: "50%",
                                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                                        border: "1px solid rgba(255, 255, 255, 0.1)",
                                    }}
                                ></div>
                                <h3
                                    style={{
                                        marginTop: 0,
                                        marginBottom: "0.5rem",
                                        color: "#fefcfb",
                                    }}
                                >
                                    {note.judul}
                                </h3>
                                <span
                                    style={{
                                        display: "inline-block",
                                        backgroundColor: "#0a1128",
                                        color: "#7c8db5",
                                        padding: "0.25rem 0.5rem",
                                        borderRadius: "4px",
                                        fontSize: "0.8rem",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    {note.kategori}
                                </span>
                                <p
                                    style={{
                                        color: "#c9d1e0",
                                        flexGrow: 1,
                                        marginBottom: "2rem",
                                    }}
                                >
                                    {note.isi.length > 100
                                        ? `${note.isi.substring(0, 100)}...`
                                        : note.isi}
                                </p>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        gap: "0.5rem",
                                        marginTop: "auto",
                                    }}
                                >
                                    <button
                                        onClick={() => navigate(`/edit/${note.id}`)}
                                        style={{
                                            backgroundColor: "transparent",
                                            border: "1px solid #7c8db5",
                                            color: "#7c8db5",
                                            borderRadius: "5px",
                                            padding: "0.5rem",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            transition: "all 0.3s ease",
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.backgroundColor = "#2a3a5a";
                                            e.currentTarget.color = "#fefcfb";
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.backgroundColor = "transparent";
                                            e.currentTarget.color = "#7c8db5";
                                        }}
                                    >
                                        <FiEdit size={16} />
                                    </button>
                                    <button
                                        onClick={() => deleteNote(note.id)}
                                        style={{
                                            backgroundColor: "transparent",
                                            border: "1px solid #ff6b6b",
                                            color: "#ff6b6b",
                                            borderRadius: "5px",
                                            padding: "0.5rem",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            transition: "all 0.3s ease",
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.backgroundColor = "#5a1a2a";
                                            e.currentTarget.color = "#fefcfb";
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.backgroundColor = "transparent";
                                            e.currentTarget.color = "#ff6b6b";
                                        }}
                                    >
                                        <FiTrash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredNotes.length === 0 && (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "300px",
                                color: "#7c8db5",
                            }}
                        >
                            <FiMoon size={48} style={{ marginBottom: "1rem" }} />
                            <p>Tidak ada catatan yang ditemukan</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default NoteList;