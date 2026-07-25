import { playSoundAt } from "@/app/lib/SoundManager";


type LoginPayload = {
    username: string,
    password: string
}

export async function handleLogin({ username, password }: LoginPayload) {

    //await new Promise((res) => setTimeout(res, 5000));
    if (username === "") {
        throw new Error("Login failed");
    }
    // TEMP: always succeed
    playSoundAt("granted2", .2);
    /*return {
        token: "mock-token-123",
        user: {
            username,
        },
    };*/

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    


    if (!res.ok) {
        throw new Error("Login failed");
    }

    const data = await res.json();
    console.log(data);

console.log("REAL LOGIN FUNCTION RUNNINGggggggg");
    return data;

}