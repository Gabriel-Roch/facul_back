import { createHash } from 'node:crypto';

export const generateHashMd5 = (password: string): string => {
    try {
        return createHash('md5').update(password).digest('hex');
    } catch (error) {
        console.error(error);
        throw new Error('Error creating hash password');
    }
};

export const comparePassword = (passwordLogin: string, passwordDB: string): boolean => {
    try {
        const hashedPasswordLogin = generateHashMd5(passwordLogin);
        return hashedPasswordLogin === passwordDB;
    } catch (error) {
        console.error(error);
        throw new Error('Error comparing password');
    }
};