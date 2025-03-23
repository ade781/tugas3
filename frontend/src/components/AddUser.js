import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";

const AddUser = () => {
    const [judul, setJudul] = useState("");
    const [kategori, setKategori] = useState("");
    const [isi, setIsi] = useState("");
    const navigate = useNavigate();

    const saveUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/note`, {
                judul,
                kategori,
                isi,
            });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={saveUser}>
                    <div className="field">
                        <label className="label">judul</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={judul}
                                onChange={(e) => setJudul(e.target.value)}
                                placeholder="judul"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">kategori</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select
                                    value={kategori}
                                    onChange={(e) => setKategori(e.target.value)}
                                >
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

                    <div className="field">
                        <label className="label">isi</label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                value={isi}
                                onChange={(e) => setIsi(e.target.value)}
                                placeholder="Isi catatan"
                                rows={5} // Mengatur tinggi awal
                            />
                        </div>
                    </div>

                    <div className="field">
                        <button type="submit" className="button is-success">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddUser
