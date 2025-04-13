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
        <div className="columns is-centered mt-5 moonlight-sonata-bg" style={{
            minHeight: '100vh',
            padding: '2rem',
            fontFamily: "'Playfair Display', serif"
        }}>
            <div className="column is-half">
                <div className="card moonlight-card" style={{
                    background: 'rgba(15, 32, 39, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}>
                    <div className="card-header" style={{
                        background: 'rgba(0, 0, 0, 0.2)',
                        padding: '1.5rem',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                        <h2 className="title is-4 has-text-centered moonlight-title" style={{
                            color: '#e6e6e6',
                            textShadow: '0 0 10px rgba(173, 216, 230, 0.5)',
                            letterSpacing: '1px'
                        }}>
                            <span className="icon-text">
                                <span className="icon">
                                    <i className="fas fa-moon" style={{ color: '#b8d8eb' }}></i>
                                </span>
                                <span>Moonlight Sonata</span>
                                <small className="is-size-7" style={{
                                    display: 'block',
                                    marginTop: '0.5rem',
                                    color: '#b8d8eb',
                                    fontWeight: 300,
                                    fontStyle: 'italic'
                                }}>
                                    "tambah catatan baru"
                                </small>
                            </span>
                        </h2>
                    </div>

                    <div className="card-content" style={{ padding: '2rem' }}>
                        <form onSubmit={saveUser}>
                            {/* Judul Field */}
                            <div className="field">
                                <label className="label moonlight-label">Judul</label>
                                <div className="control has-icons-left">
                                    <input
                                        type="text"
                                        className="input moonlight-input"
                                        value={judul}
                                        onChange={(e) => setJudul(e.target.value)}
                                        placeholder="Judul Catatan"
                                        style={{
                                            backgroundColor: 'rgba(32, 58, 67, 0.5)',
                                            borderColor: 'rgba(184, 216, 235, 0.3)',
                                            color: '#e6e6e6',
                                            fontFamily: "'Crimson Text', serif"
                                        }}
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-music" style={{ color: '#b8d8eb' }}></i>
                                    </span>
                                </div>
                            </div>

                            {/* Kategori Field */}
                            <div className="field">
                                <label className="label moonlight-label">Movement</label>
                                <div className="control has-icons-left">
                                    <div className="select is-fullwidth moonlight-select">
                                        <select
                                            value={kategori}
                                            onChange={(e) => setKategori(e.target.value)}
                                            style={{
                                                backgroundColor: 'rgba(32, 58, 67, 0.5)',
                                                borderColor: 'rgba(184, 216, 235, 0.3)',
                                                color: '#e6e6e6',
                                                fontFamily: "'Crimson Text', serif"
                                            }}
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
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-ellipsis-h" style={{ color: '#b8d8eb' }}></i>
                                    </span>
                                </div>
                            </div>

                            {/* Isi Field */}
                            <div className="field">
                                <label className="label moonlight-label">isi</label>
                                <div className="control">
                                    <textarea
                                        className="textarea moonlight-textarea"
                                        value={isi}
                                        onChange={(e) => setIsi(e.target.value)}
                                        placeholder="....."
                                        rows={5}
                                        style={{
                                            backgroundColor: 'rgba(32, 58, 67, 0.5)',
                                            borderColor: 'rgba(184, 216, 235, 0.3)',
                                            color: '#e6e6e6',
                                            minHeight: '150px',
                                            fontFamily: "'Crimson Text', serif",
                                            lineHeight: '1.8'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="field has-text-centered mt-6">
                                <button
                                    type="submit"
                                    className="button is-medium is-rounded moonlight-button"
                                    style={{
                                        background: 'rgba(184, 216, 235, 0.1)',
                                        color: '#e6e6e6',
                                        fontWeight: 400,
                                        border: '1px solid rgba(184, 216, 235, 0.5)',
                                        padding: '0 2.5rem',
                                        height: '3rem',
                                        letterSpacing: '1px'
                                    }}
                                >
                                    <span className="icon-text">

                                        <span>✅ Simpan Catatan</span>
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default AddUser
