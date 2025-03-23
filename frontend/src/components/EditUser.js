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
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={updateNote}>
                    {/* Input Judul */}
                    <div className="field">
                        <label className="label">Judul</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={judul}
                                onChange={(e) => setJudul(e.target.value)}
                                placeholder="Masukkan judul"
                                required
                            />
                        </div>
                    </div>


                    <div className="field">
                        <label className="label">Kategori</label>
                        <div className="control">
                            <div className="select is-fullwidth">
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

                    {/* Input Isi Catatan */}
                    <div className="field">
                        <label className="label">Isi</label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                value={isi}
                                onChange={(e) => setIsi(e.target.value)}
                                placeholder="Tulis isi catatan..."
                                rows={5}
                                required
                            />
                        </div>
                    </div>


                    <div className="field">
                        <button type="submit" className="button is-primary">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditNote;
