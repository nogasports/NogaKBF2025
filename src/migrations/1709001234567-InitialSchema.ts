import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1709001234567 implements MigrationInterface {
    name = 'InitialSchema1709001234567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Users table
        await queryRunner.query(`
            CREATE TYPE user_role AS ENUM ('admin', 'team', 'official', 'player', 'fan');
            
            CREATE TABLE "users" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "name" VARCHAR NOT NULL,
                "email" VARCHAR NOT NULL UNIQUE,
                "password" VARCHAR NOT NULL,
                "role" user_role NOT NULL,
                "is_active" BOOLEAN DEFAULT true,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now()
            );
        `);

        // Teams table
        await queryRunner.query(`
            CREATE TABLE "teams" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "name" VARCHAR NOT NULL,
                "logo" VARCHAR,
                "division" VARCHAR NOT NULL,
                "home_venue" VARCHAR NOT NULL,
                "founded_year" INTEGER,
                "is_active" BOOLEAN DEFAULT true,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now()
            );
        `);

        // Players table
        await queryRunner.query(`
            CREATE TYPE player_status AS ENUM ('active', 'injured', 'suspended');
            CREATE TYPE player_position AS ENUM ('POINT_GUARD', 'SHOOTING_GUARD', 'SMALL_FORWARD', 'POWER_FORWARD', 'CENTER');
            
            CREATE TABLE "players" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "user_id" UUID REFERENCES "users"(id),
                "team_id" UUID REFERENCES "teams"(id),
                "jersey_number" VARCHAR NOT NULL,
                "position" player_position NOT NULL,
                "date_of_birth" DATE NOT NULL,
                "nationality" VARCHAR NOT NULL,
                "height" VARCHAR NOT NULL,
                "weight" VARCHAR NOT NULL,
                "status" player_status DEFAULT 'active',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now()
            );
        `);

        // Officials table
        await queryRunner.query(`
            CREATE TYPE official_role AS ENUM ('REFEREE', 'UMPIRE', 'TABLE_OFFICIAL', 'COMMISSIONER');
            CREATE TYPE official_status AS ENUM ('active', 'inactive', 'suspended');
            
            CREATE TABLE "officials" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "user_id" UUID REFERENCES "users"(id),
                "license_number" VARCHAR NOT NULL UNIQUE,
                "role" official_role NOT NULL,
                "license_expiry" DATE NOT NULL,
                "status" official_status DEFAULT 'active',
                "rating" DECIMAL(3,2),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now()
            );
        `);

        // Matches table
        await queryRunner.query(`
            CREATE TYPE match_status AS ENUM ('scheduled', 'live', 'completed', 'postponed', 'cancelled');
            
            CREATE TABLE "matches" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "home_team_id" UUID REFERENCES "teams"(id),
                "away_team_id" UUID REFERENCES "teams"(id),
                "scheduled_time" TIMESTAMP NOT NULL,
                "venue" VARCHAR NOT NULL,
                "home_score" INTEGER,
                "away_score" INTEGER,
                "referee_id" UUID REFERENCES "officials"(id),
                "status" match_status DEFAULT 'scheduled',
                "attendance" INTEGER,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now()
            );
        `);

        // Match Officials table (for multiple officials per match)
        await queryRunner.query(`
            CREATE TABLE "match_officials" (
                "match_id" UUID REFERENCES "matches"(id),
                "official_id" UUID REFERENCES "officials"(id),
                "role" official_role NOT NULL,
                PRIMARY KEY ("match_id", "official_id")
            );
        `);

        // Player Stats table
        await queryRunner.query(`
            CREATE TABLE "player_stats" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "player_id" UUID REFERENCES "players"(id),
                "match_id" UUID REFERENCES "matches"(id),
                "minutes_played" INTEGER NOT NULL,
                "points" INTEGER NOT NULL DEFAULT 0,
                "rebounds" INTEGER NOT NULL DEFAULT 0,
                "assists" INTEGER NOT NULL DEFAULT 0,
                "steals" INTEGER NOT NULL DEFAULT 0,
                "blocks" INTEGER NOT NULL DEFAULT 0,
                "turnovers" INTEGER NOT NULL DEFAULT 0,
                "fouls" INTEGER NOT NULL DEFAULT 0,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                UNIQUE ("player_id", "match_id")
            );
        `);

        // Team Staff table
        await queryRunner.query(`
            CREATE TYPE staff_role AS ENUM ('HEAD_COACH', 'ASSISTANT_COACH', 'TEAM_MANAGER', 'PHYSIOTHERAPIST', 'TEAM_DOCTOR');
            
            CREATE TABLE "team_staff" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "user_id" UUID REFERENCES "users"(id),
                "team_id" UUID REFERENCES "teams"(id),
                "role" staff_role NOT NULL,
                "start_date" DATE NOT NULL,
                "end_date" DATE,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now()
            );
        `);

        // Seasons table
        await queryRunner.query(`
            CREATE TABLE "seasons" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "name" VARCHAR NOT NULL,
                "start_date" DATE NOT NULL,
                "end_date" DATE NOT NULL,
                "is_active" BOOLEAN DEFAULT true,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now()
            );
        `);

        // Team Seasons table (for team participation in seasons)
        await queryRunner.query(`
            CREATE TABLE "team_seasons" (
                "team_id" UUID REFERENCES "teams"(id),
                "season_id" UUID REFERENCES "seasons"(id),
                "division" VARCHAR NOT NULL,
                "registration_date" TIMESTAMP NOT NULL DEFAULT now(),
                PRIMARY KEY ("team_id", "season_id")
            );
        `);

        // Fan Favorites table
        await queryRunner.query(`
            CREATE TABLE "fan_favorites" (
                "user_id" UUID REFERENCES "users"(id),
                "team_id" UUID REFERENCES "teams"(id),
                "followed_since" TIMESTAMP NOT NULL DEFAULT now(),
                PRIMARY KEY ("user_id", "team_id")
            );
        `);

        // Notifications table
        await queryRunner.query(`
            CREATE TYPE notification_type AS ENUM ('match', 'team', 'player', 'official', 'system');
            
            CREATE TABLE "notifications" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "user_id" UUID REFERENCES "users"(id),
                "type" notification_type NOT NULL,
                "title" VARCHAR NOT NULL,
                "message" TEXT NOT NULL,
                "read" BOOLEAN DEFAULT false,
                "created_at" TIMESTAMP NOT NULL DEFAULT now()
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "notifications"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "fan_favorites"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "team_seasons"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "seasons"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "team_staff"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "player_stats"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "match_officials"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "matches"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "officials"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "players"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "teams"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
        
        await queryRunner.query(`DROP TYPE IF EXISTS notification_type`);
        await queryRunner.query(`DROP TYPE IF EXISTS staff_role`);
        await queryRunner.query(`DROP TYPE IF EXISTS match_status`);
        await queryRunner.query(`DROP TYPE IF EXISTS official_status`);
        await queryRunner.query(`DROP TYPE IF EXISTS official_role`);
        await queryRunner.query(`DROP TYPE IF EXISTS player_status`);
        await queryRunner.query(`DROP TYPE IF EXISTS player_position`);
        await queryRunner.query(`DROP TYPE IF EXISTS user_role`);
    }
}