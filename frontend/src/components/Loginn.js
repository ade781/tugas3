import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        try {
            const response = await axios.post(`${BASE_URL}/login`, { email, password });
            localStorage.setItem("accessToken", response.data.accessToken);
            navigate("/note");
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrorMsg("Email atau password salah");
            } else {
                setErrorMsg("Terjadi kesalahan, coba lagi");
            }
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        try {
            await axios.post(`${BASE_URL}/add-user`, { name, email, password });
            alert("Registrasi berhasil! Silakan login.");
            setIsLogin(true);
            setName("");
            setEmail("");
            setPassword("");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMsg(error.response.data.message);
            } else {
                setErrorMsg("Terjadi kesalahan saat registrasi, coba lagi");
            }
        }
    };

    return (
        <div style={styles.container}>
            {/* Moon element */}
            <div style={styles.moon}></div>

            {/* Music notes decoration */}
            <div style={styles.musicNote1}>♬</div>
            <div style={styles.musicNote2}>♫</div>

            <div style={styles.card}>
                <h2 style={styles.title}>
                    {isLogin ? "Login" : "Register"}
                    <span style={styles.pianoKey}></span>
                </h2>
                <p style={styles.subtitle}>
                    {isLogin ? "Masuk untuk melanjutkan" : "Buat akun baru"}
                    <span style={styles.subtitleDecoration}>♪</span>
                </p>

                <form onSubmit={isLogin ? handleLogin : handleRegister} style={styles.form}>
                    {!isLogin && (
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>
                                <span style={styles.labelIcon}>♩</span> Nama
                            </label>
                            <input
                                type="text"
                                placeholder="Masukkan nama"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required={!isLogin}
                                style={styles.input}
                            />
                        </div>
                    )}

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>
                            <span style={styles.labelIcon}>♪</span> Email
                        </label>
                        <input
                            type="email"
                            placeholder="Masukkan email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>
                            <span style={styles.labelIcon}>♫</span> Password
                        </label>
                        <input
                            type="password"
                            placeholder="Masukkan password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>

                    {errorMsg && <p style={styles.error}>{errorMsg}</p>}

                    <button type="submit" style={styles.submitButton}>
                        {isLogin ? "Login" : "Register"}
                        <span style={styles.buttonIcon}>→</span>
                    </button>
                </form>

                <p style={styles.switchText}>
                    {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
                    <button
                        style={styles.switchButton}
                        onClick={() => {
                            setErrorMsg("");
                            setIsLogin(!isLogin);
                        }}
                    >
                        {isLogin ? "Daftar di sini ♬" : "Login di sini ♬"}
                    </button>
                </p>
            </div>
        </div>
    );
};

// Enhanced Moonlight Sonata inspired styles
const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#0a0e23", // Darker navy blue for deeper night
        backgroundImage: "radial-gradient(circle at 20% 30%, rgba(72, 101, 157, 0.3) 0%, transparent 30%), radial-gradient(circle at 80% 70%, rgba(114, 147, 203, 0.2) 0%, transparent 30%)",
        padding: "20px",
        fontFamily: "'Cormorant Garamond', serif", // More classical font
        position: "relative",
        overflow: "hidden",
    },
    moon: {
        position: "absolute",
        top: "10%",
        right: "15%",
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        background: "radial-gradient(circle at 30% 30%, #f8f8f8, #c0c0c0 60%, #a0a0a0 90%)",
        boxShadow: "0 0 40px rgba(248, 248, 255, 0.4)",
        opacity: "0.9",
        zIndex: "0",
    },
    musicNote1: {
        position: "absolute",
        top: "25%",
        left: "15%",
        fontSize: "24px",
        color: "rgba(228, 241, 254, 0.4)",
        transform: "rotate(-15deg)",
        animation: "float 6s ease-in-out infinite",
    },
    musicNote2: {
        position: "absolute",
        bottom: "20%",
        right: "20%",
        fontSize: "32px",
        color: "rgba(228, 241, 254, 0.3)",
        transform: "rotate(20deg)",
        animation: "float 8s ease-in-out infinite",
    },
    card: {
        backgroundColor: "rgba(15, 23, 42, 0.9)", // Dark blue with transparency
        borderRadius: "12px",
        padding: "40px",
        width: "100%",
        maxWidth: "400px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(12px)",
        position: "relative",
        zIndex: "1",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
    },
    title: {
        color: "#e4f1fe",
        fontSize: "32px",
        fontWeight: "500",
        marginBottom: "8px",
        textAlign: "center",
        letterSpacing: "1px",
        position: "relative",
        fontVariant: "small-caps",
    },
    pianoKey: {
        display: "block",
        width: "60px",
        height: "4px",
        background: "linear-gradient(to right, #e4f1fe, #a7c4d4, #e4f1fe)",
        margin: "10px auto",
        borderRadius: "2px",
    },
    subtitle: {
        color: "rgba(228, 241, 254, 0.7)",
        fontSize: "16px",
        textAlign: "center",
        marginBottom: "30px",
        fontStyle: "italic",
        position: "relative",
    },
    subtitleDecoration: {
        position: "absolute",
        marginLeft: "8px",
        fontSize: "18px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "24px",
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },
    label: {
        color: "#a7c4d4",
        fontSize: "15px",
        fontWeight: "500",
        letterSpacing: "0.5px",
        display: "flex",
        alignItems: "center",
    },
    labelIcon: {
        marginRight: "8px",
        fontSize: "14px",
    },
    input: {
        padding: "14px 16px",
        borderRadius: "6px",
        border: "1px solid rgba(167, 196, 212, 0.2)",
        backgroundColor: "rgba(10, 17, 40, 0.6)",
        color: "#e4f1fe",
        fontSize: "15px",
        outline: "none",
        transition: "all 0.3s ease",
        letterSpacing: "0.5px",
    },
    inputFocus: {
        borderColor: "#5d8bf4",
        boxShadow: "0 0 0 2px rgba(93, 139, 244, 0.2)",
    },
    error: {
        color: "#ff9e9e",
        fontSize: "14px",
        textAlign: "center",
        margin: "10px 0",
        fontStyle: "italic",
    },
    submitButton: {
        padding: "16px",
        borderRadius: "6px",
        border: "none",
        background: "linear-gradient(135deg, #5d8bf4 0%, #3a5fc8 100%)",
        color: "#fff",
        fontSize: "16px",
        fontWeight: "500",
        cursor: "pointer",
        transition: "all 0.3s ease",
        marginTop: "10px",
        letterSpacing: "0.5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 4px 15px rgba(93, 139, 244, 0.3)",
    },
    buttonIcon: {
        marginLeft: "8px",
        transition: "all 0.3s ease",
    },
    switchText: {
        color: "rgba(228, 241, 254, 0.7)",
        fontSize: "15px",
        textAlign: "center",
        marginTop: "24px",
        fontStyle: "italic",
    },
    switchButton: {
        color: "#a7c4d4",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "0",
        fontSize: "15px",
        fontWeight: "500",
        textDecoration: "none",
        fontStyle: "italic",
        transition: "all 0.3s ease",
        letterSpacing: "0.5px",
    },
};
export default Auth;