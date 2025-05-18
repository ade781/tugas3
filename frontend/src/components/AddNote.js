import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";

const AddNote = () => {
    const [judul, setJudul] = useState("");
    const [kategori, setKategori] = useState("");
    const [isi, setIsi] = useState("");
    const navigate = useNavigate();

    const saveNote = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("accessToken");

        if (!token) {
            alert("🌙 Anda harus login terlebih dahulu.");
            return;
        }

        try {
            const response = await axios.post(
                `${BASE_URL}/note`,
                { judul, kategori, isi },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Note saved:", response.data);
            navigate("/note");
        } catch (error) {
            console.error("Save error:", error.response || error.message);
            alert("❌ Gagal menyimpan catatan: " + (error.response?.data?.message || error.message));
        }
    };

    const styles = {
        container: {
            maxWidth: "500px",
            margin: "3rem auto",
            padding: "2rem",
            backgroundColor: "#1a1a2e",
            color: "#e0e0e0",
            borderRadius: "12px",
            boxShadow: "0 0 20px rgba(255,255,255,0.05)",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
        heading: {
            textAlign: "center",
            fontSize: "1.8rem",
            marginBottom: "1.5rem",
            color: "#f1c40f",
        },
        label: {
            display: "block",
            marginBottom: 6,
            fontWeight: "600",
        },
        input: {
            width: "100%",
            padding: "10px",
            marginBottom: "1rem",
            borderRadius: "6px",
            border: "1px solid #444",
            backgroundColor: "#2c2c54",
            color: "#fff",
        },
        select: {
            width: "100%",
            padding: "10px",
            marginBottom: "1rem",
            borderRadius: "6px",
            border: "1px solid #444",
            backgroundColor: "#2c2c54",
            color: "#fff",
        },
        textarea: {
            width: "100%",
            height: "120px",
            padding: "10px",
            marginBottom: "1rem",
            borderRadius: "6px",
            border: "1px solid #444",
            backgroundColor: "#2c2c54",
            color: "#fff",
            resize: "vertical",
        },
        button: {
            width: "100%",
            padding: "12px",
            backgroundColor: "#4b6584",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background 0.3s ease",
        },
        buttonHover: {
            backgroundColor: "#3867d6",
        },
        subtitle: {
            textAlign: "center",
            fontSize: "0.95rem",
            color: "#ccc",
            marginBottom: "1.5rem",
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>📝 Tambahkan Catatan</h2>
            <p style={styles.subtitle}>Tumpahkan isi hati dan pikiranmu di bawah cahaya bulan 🌙</p>
            <form onSubmit={saveNote}>
                <label style={styles.label}>📌 Judul</label>
                <input
                    type="text"
                    placeholder="Judul catatanmu..."
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                    required
                    style={styles.input}
                />

                <label style={styles.label}>📂 Kategori</label>
                <select
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    required
                    style={styles.select}
                >
                    <option value="">--Pilih Kategori--</option>
                    <option value="Pribadi">Pribadi 🌿</option>
                    <option value="Pekerjaan">Pekerjaan 💼</option>
                    <option value="Keuangan">Keuangan 💰</option>
                    <option value="Pendidikan">Pendidikan 📚</option>
                    <option value="Kesehatan">Kesehatan 🏥</option>
                    <option value="Hiburan">Hiburan 🎬</option>
                    <option value="Lainnya">Lainnya ✨</option>
                </select>

                <label style={styles.label}>🖋️ Isi Catatan</label>
                <textarea
                    placeholder="Tuliskan catatan malam ini..."
                    value={isi}
                    onChange={(e) => setIsi(e.target.value)}
                    required
                    style={styles.textarea}
                />

                <button
                    type="submit"
                    style={styles.button}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#3867d6"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#4b6584"}
                >
                    🌌 Simpan Catatan
                </button>
            </form>
        </div>
    );
};

export default AddNote;
