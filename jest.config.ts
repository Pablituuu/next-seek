import nextJest from "next/jest";

const createJestConfig = nextJest({
    dir: "./", // Indica la raíz del proyecto de Next.js
});

const customJestConfig = {
    testEnvironment: "jest-environment-jsdom",
    moduleNameMapper: {
        // Maneja alias de Next.js como `@/` en las importaciones
        "^@/(.*)$": "<rootDir>/$1",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Archivo para configuraciones adicionales
};

export default createJestConfig(customJestConfig);
