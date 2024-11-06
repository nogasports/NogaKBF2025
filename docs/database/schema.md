# Database Schema Documentation

## Overview
The Kenya Basketball Federation (KBF) database schema is designed to manage all aspects of basketball league operations, including teams, players, matches, officials, and fan interactions.

## Tables

### Users
Stores all user accounts across different roles.
```sql
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
```

### Teams
Stores basketball team information.
```sql
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
```

### Players
Stores player information and their team affiliations.
```sql
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
```

### Matches
Stores game information and results.
```sql
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
```

### Officials
Stores referee and other match official information.
```sql
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
```

## Relationships

1. Users -> Players/Officials/Teams
   - One-to-one relationship through user_id
   - Users can have different roles (admin, team, official, player, fan)

2. Teams -> Players
   - One-to-many relationship
   - Each team has multiple players
   - Players belong to one team at a time

3. Matches -> Teams
   - Many-to-many relationship
   - Each match has a home team and away team
   - Teams participate in multiple matches

4. Matches -> Officials
   - Many-to-many relationship through match_officials
   - Each match has multiple officials in different roles
   - Officials can officiate multiple matches

## Enums

```sql
CREATE TYPE user_role AS ENUM ('admin', 'team', 'official', 'player', 'fan');
CREATE TYPE player_status AS ENUM ('active', 'injured', 'suspended');
CREATE TYPE player_position AS ENUM ('POINT_GUARD', 'SHOOTING_GUARD', 'SMALL_FORWARD', 'POWER_FORWARD', 'CENTER');
CREATE TYPE official_role AS ENUM ('REFEREE', 'UMPIRE', 'TABLE_OFFICIAL', 'COMMISSIONER');
CREATE TYPE official_status AS ENUM ('active', 'inactive', 'suspended');
CREATE TYPE match_status AS ENUM ('scheduled', 'live', 'completed', 'postponed', 'cancelled');
```

## Indexes

```sql
-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Teams
CREATE INDEX idx_teams_division ON teams(division);
CREATE INDEX idx_teams_is_active ON teams(is_active);

-- Players
CREATE INDEX idx_players_team_id ON players(team_id);
CREATE INDEX idx_players_status ON players(status);

-- Matches
CREATE INDEX idx_matches_status ON matches(status);
CREATE INDEX idx_matches_scheduled_time ON matches(scheduled_time);
CREATE INDEX idx_matches_home_team ON matches(home_team_id);
CREATE INDEX idx_matches_away_team ON matches(away_team_id);
```