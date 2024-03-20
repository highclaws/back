type ConfigConstantsType = {
    //app
    PORT: string;
    DEFAULT_PORT: number;
    STAGE: string;
    FRONT_URL: string;
    DEFAULT_FRONT_URL: string;

    //bdd
    DB_HOST: string;
    DB_PORT: string;
    DEFAULT_DB_PORT: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
    MIGRATION_RUN: string;
}


const ConfigConstants: ConfigConstantsType = {
    PORT: "PORT",
    DEFAULT_PORT: 3000,
    STAGE: "STAGE",
    FRONT_URL: "FRONT_URL",
    DEFAULT_FRONT_URL: "http://localhost:8080",
    DB_HOST: "DB_HOST",
    DB_PORT: "DB_PORT",
    DEFAULT_DB_PORT: 5432,
    DB_USERNAME: "DB_USERNAME",
    DB_PASSWORD: "DB_PASSWORD",
    DB_DATABASE: "DB_DATABASE",
    MIGRATION_RUN: "migrationsRun",
};

export default ConfigConstants;

