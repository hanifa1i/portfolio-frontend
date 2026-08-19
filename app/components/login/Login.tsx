import { playSound, stopSound, playLoopSoundAt } from "@/app/lib/SoundManager";
import { useState } from "react";
import style from "./Login.module.css"

import { handleLogin } from "@/auth/handleLogin";
import { useAuth } from "@/auth/useAuth";
import { blob } from "stream/consumers";

type Props = {
    switchPage: (url: string) => void;
    openLogin: boolean;
    setOpenLogin: (state: boolean) => void
}

export default function Login( { switchPage, openLogin, setOpenLogin} : Props) {
    const { login, username } = useAuth();
    const { isAuthenticated, logout } = useAuth();
    const [newUsername, setUsernameValue] = useState("");
    const [newPassword, setPasswordValue] = useState("");

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [logoutTransition, setLogoutTransition] = useState(false);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(false);
        playLoopSoundAt("loading2", 300, .2);

        try {
            const data = await handleLogin({
                username: newUsername,
                password: newPassword,
            });

            login(data.token, newUsername);

        } catch {
            setError(true);
            playSound("error");
            setTimeout (() => {setError(false)}, 3000)

            
        } finally {
            setLoading(false);
            stopSound("loading2");
        }
    };
    const handleLogout = () => {
        setLogoutTransition(true)
        setLoading(true)
        setOpenLogin(false);
        playLoopSoundAt("loading2", 300, .2);


        setTimeout (() => {logout(); playSound("logout"); stopSound("loading2"); setLoading(false); setLogoutTransition(false)}, 1000)
    }

    return (
        <>

            <div
                onMouseEnter={() => playSound("hover")}
                onClick={() => { playSound("blob"), setOpenLogin(true) }}
                className={`${style.avatar} ${openLogin ? style.openLogin : ""} ${isAuthenticated && openLogin ? style.paddingRight : ""}`}>
                <img src="/images/nav/avatarTrans.png" className={`${style.avatarImage}`} />
                
                {isAuthenticated && (<div className={`${style.usernameDisplay} ${logoutTransition ? style.hideUsername : ""}`}>{username !== "" ? "hanif" : ""}</div>)}


                <div className={`${loading ? `${style.loading} ${style.loadingRotate}` : style.hide}
                ${isAuthenticated && openLogin ? `${style.loading}` : style.hide}`}>
                </div>
                {!isAuthenticated && (
                    <form
                        onSubmit={handleSubmit}
                        className={`${style.form}`}>
                        <input
                            type="text"
                            value={newUsername}
                            className={`${openLogin ? style.password : style.hide} ${loading ? style.hide : ""} ${style.input}`}
                            onChange={(e) => setUsernameValue(e.target.value)}
                            placeholder="@"
                        />
                        <input
                            type="password"
                            value={newPassword}
                            className={`${openLogin ? style.password : style.hide} ${loading ? style.hide : ""} ${style.input}`}
                            onChange={(e) => setPasswordValue(e.target.value)}
                            placeholder="ꄗ"
                        />
                        <button className={`${openLogin ? style.loginButton : style.hide} ${loading ? style.hide : ""}`}>›</button>

                    </form>
                )}
                {isAuthenticated && (<>
                    <button onClick={() => switchPage("dashboard")} className={` 
                        ${openLogin ? `${style.loginButton} ${style.logoutButton}` : style.hide}`}>dashboard</button>
 
                    <button onClick={(e) => {e.stopPropagation(); handleLogout(); playSound("blob")}} className={`${openLogin ? `${style.loginButton} ${style.logoutButton}` : style.hide}`}>logout</button>
                </>
                )}
                <div className={`${style.error} ${error && openLogin ? "" : `${style.hideError} `}`}>you dumb dumb dummy... invalid login</div>

            </div>
            <div
                onClick={() => { playSound("blob"), setOpenLogin(false)}}
                className={`${style.exit} ${openLogin ? "" : `${style.hide} ${style.hideExit} `}`}>✕</div>

        </>
    )

};