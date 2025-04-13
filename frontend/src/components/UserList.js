import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils";

const UserList = () => {
    const [users, setUser] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get(`${BASE_URL}/note`);
        setUser(response.data);
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/note/${id}`);
            getUsers();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="columns mt-5 is-centered" style={{ padding: '2.5rem' }}>
            <div className="column is-full">
                <div className="mb-5 flex justify-between items-center">
                    <h1 className="title is-4">📒 Daftar Catatan</h1>
                    <Link
                        to={`add`}
                        className="button is-success is-rounded hover:transform hover:-translate-y-0.5 hover:shadow-md transition-all"
                    >
                        ➕ Tambah Catatan
                    </Link>
                </div>

                <div className="columns is-multiline">
                    {users.map((user, index) => (
                        <div key={user.id} className="column is-one-quarter">
                            <div
                                className="box hover:transform hover:-translate-y-1 hover:shadow-lg hover:border-blue-500 transition-all"
                                style={{
                                    height: '100%',
                                    border: '1px solid rgb(49, 89, 199)',
                                    transitionDuration: '200ms'
                                }}
                            >
                                <p className="has-text-weight-semibold mb-2">{user.judul}</p>
                                <p className="is-size-7 mb-1"><strong>Kategori:</strong> {user.kategori}</p>
                                <p className="is-size-7 mb-4">{user.isi}</p>
                                <div className="buttons are-small is-right">
                                    <Link
                                        to={`edit/${user.id}`}
                                        className="button is-info is-light hover:transform hover:scale-105 hover:shadow-sm transition-all"
                                    >
                                        ✏️ Edit
                                    </Link>
                                    <button
                                        onClick={() => deleteUser(user.id)}
                                        className="button is-danger is-light hover:transform hover:scale-105 hover:shadow-sm transition-all"
                                    >
                                        🗑️ Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <footer className="has-text-centered mt-6" style={{
                    color: '#b8d8eb',
                    fontSize: '0.9rem',
                    fontStyle: 'italic',
                    fontFamily: "'Playfair Display', serif",
                    padding: '1.5rem 0',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    backgroundColor: 'rgba(15, 32, 39, 0.8)',
                    backdropFilter: 'blur(6px)'
                }}>
                    <p>made by <strong>Arya Ade Wiguna</strong> — inspired by <em>Moonlight Sonata</em> 🌙</p>
                </footer>
            </div>
        </div>


    );

};

export default UserList;
