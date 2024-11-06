import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import { Team } from '../entities/Team';
import { Player } from '../entities/Player';
import { Official } from '../entities/Official';
import { Match } from '../entities/Match';
import * as bcrypt from 'bcrypt';

async function seed() {
  try {
    await AppDataSource.initialize();

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = new User();
    admin.name = 'Admin User';
    admin.email = 'admin@kbf.co.ke';
    admin.password = adminPassword;
    admin.role = 'admin';
    await AppDataSource.manager.save(admin);

    // Create sample teams
    const teams = [
      {
        name: 'Ulinzi Warriors',
        division: "Men's Premier League",
        homeVenue: 'Nyayo Stadium',
        foundedYear: 1995,
      },
      {
        name: 'KPA',
        division: "Men's Premier League",
        homeVenue: 'Makande Gymnasium',
        foundedYear: 1990,
      },
      {
        name: 'Equity Hawks',
        division: "Women's Premier League",
        homeVenue: 'Nyayo Stadium',
        foundedYear: 2005,
      },
    ];

    for (const teamData of teams) {
      const team = new Team();
      Object.assign(team, teamData);
      await AppDataSource.manager.save(team);
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();