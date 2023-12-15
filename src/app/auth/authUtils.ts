import axios from "axios";

export const login = async (loginForm: { email: string; password: string }) => {
    const logged = await axios.post("/api/auth/login", {
        body: JSON.stringify(loginForm),
    });

    if (logged.data.error) {
        if (logged.data.error.field === "email") {
            return {
                email: {
                    error: true,
                    message: "Email or Username is incorrect",
                },
                password: {
                    error: false,
                    message: "",
                },
                id: -1,
                username: "",
            };
        } else if (logged.data.error.field === "password") {
            return {
                email: {
                    error: false,
                    message: "",
                },
                password: {
                    error: true,
                    message: "Password is incorrect",
                },
                id: -1,
                username: "",
            };
        }
    } else {
        return {
            email: {
                error: false,
                message: "",
            },
            password: {
                error: false,
                message: "",
            },
            id: logged.data.id,
            username: logged.data.username,
        };
    }
};

export const getUser = async () => {
    try {
        const data = await axios.get("http://localhost:3000/api/auth/me", {
            headers: {},
        });
        return {
            user: data.data.user,
            error: {},
        };
    } catch (e) {
        return {
            user: {},
            error: e,
        };
    }
};
