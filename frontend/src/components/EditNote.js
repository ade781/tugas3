import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";

const EditNote = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [judul, setJudul] = useState("");
    const [kategori, setKategori] = useState("");
    const [isi, setIsi] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const fetchNote = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                setErrorMsg("🌙 Anda harus login terlebih dahulu.");
                return;
            }

            try {
                const response = await axios.get(`${BASE_URL}/note/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setJudul(response.data.judul);
                setKategori(response.data.kategori);
                setIsi(response.data.isi);
                setErrorMsg("");
            } catch (error) {
                setErrorMsg("❌ Gagal mengambil data catatan.");
                console.error(error);
            }
        };
        fetchNote();
    }, [id]);

    const updateNote = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("accessToken");
        if (!token) {
            setErrorMsg("🌙 Anda harus login terlebih dahulu.");
            return;
        }

        try {
            await axios.put(
                `${BASE_URL}/note/${id}`,
                { judul, kategori, isi },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate("/note");
        } catch (error) {
            setErrorMsg("❌ Gagal memperbarui catatan.");
            console.error(error);
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
        subtitle: {
            textAlign: "center",
            fontSize: "0.95rem",
            color: "#ccc",
            marginBottom: "1.5rem",
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
        error: {
            color: "#ff6b6b",
            textAlign: "center",
            marginBottom: "1rem",
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>✏️ Sunting Catatan</h2>
            <p style={styles.subtitle}>Perbaiki jejak pikiranmu di bawah sinar rembulan 🌒</p>

            {errorMsg && <p style={styles.error}>{errorMsg}</p>}

            <form onSubmit={updateNote}>
                <label style={styles.label}>📌 Judul</label>
                <input
                    type="text"
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
                    💾 Simpan Perubahan
                </button>
            </form>
        </div>
    );
};

export default EditNote;
