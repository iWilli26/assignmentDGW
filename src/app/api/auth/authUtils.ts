import bcrypt from "bcrypt";

// Hash a password
export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10; // Adjust the cost factor as needed
    return await bcrypt.hash(password, saltRounds);
};

// Compare a password with its hash
export const comparePasswords = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};
