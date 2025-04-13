import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils";

const EditNote = () => {
    const [judul, setJudul] = useState("");
    const [kategori, setKategori] = useState("");
    const [isi, setIsi] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getNoteById();
        // eslint-disable-next-line
    }, []);

    const getNoteById = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/note/${id}`);
            setJudul(response.data.judul);
            setKategori(response.data.kategori);
            setIsi(response.data.isi);
        } catch (error) {
            console.log("Terjadi kesalahan saat mengambil data:", error);
        }
    };

    const updateNote = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${BASE_URL}/note/${id}`, {
                judul,
                kategori,
                isi,
            });
            navigate("/");
        } catch (error) {
            console.log("Terjadi kesalahan saat memperbarui data:", error);
        }
    };

    return (
        <div className="columns is-centered mt-6" style={{ padding: '2rem' }}>
            <div className="column is-half">
                <div className="box" style={{ border: '1px solid #dbdbdb', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <h2 className="title is-4 has-text-centered has-text-info mb-5">
                        ✏️ Edit Catatan
                    </h2>

                    <form onSubmit={updateNote}>
                        {/* Input Judul */}
                        <div className="field">
                            <label className="label has-text-weight-medium">Judul</label>
                            <div className="control">
                                <input
                                    type="text"
                                    className="input is-info"
                                    value={judul}
                                    onChange={(e) => setJudul(e.target.value)}
                                    placeholder="Masukkan judul"
                                    required
                                />
                            </div>
                        </div>

                        {/* Select Kategori */}
                        <div className="field">
                            <label className="label has-text-weight-medium">Kategori</label>
                            <div className="control">
                                <div className="select is-fullwidth is-info">
                                    <select
                                        value={kategori}
                                        onChange={(e) => setKategori(e.target.value)}
                                        required
                                    >
                                        <option value="">Pilih Kategori</option>
                                        <option value="Pribadi">Pribadi</option>
                                        <option value="Pekerjaan">Pekerjaan</option>
                                        <option value="Keuangan">Keuangan</option>
                                        <option value="Pendidikan">Pendidikan</option>
                                        <option value="Kesehatan">Kesehatan</option>
                                        <option value="Hiburan">Hiburan</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Textarea Isi */}
                        <div className="field">
                            <label className="label has-text-weight-medium">Isi</label>
                            <div className="control">
                                <textarea
                                    className="textarea is-info"
                                    value={isi}
                                    onChange={(e) => setIsi(e.target.value)}
                                    placeholder="Tulis isi catatan..."
                                    rows={5}
                                    required
                                />
                            </div>
                        </div>

                        {/* Tombol Submit */}
                        <div className="field is-grouped is-grouped-right mt-4">
                            <div className="control">
                                <button type="submit" className="button is-info is-rounded">
                                    💾 Simpan Perubahan
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

};

export default EditNote;
