import { AppDataSource } from '../config/database';
import { StatisticsService } from './statistics.service';
import { UploadService } from './upload.service';
import { logger } from '../utils/logger';
import * as PDFDocument from 'pdfkit';

interface ReportOptions {
  type: 'match' | 'team' | 'player' | 'league';
  id: string;
  format: 'pdf' | 'csv';
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export class ReportService {
  private statisticsService = new StatisticsService();
  private uploadService = new UploadService();

  public async generateReport(options: ReportOptions): Promise<string> {
    try {
      // Get report data based on type
      const data = await this.getReportData(options);

      // Generate report in specified format
      const report = options.format === 'pdf' 
        ? await this.generatePDFReport(data, options)
        : await this.generateCSVReport(data, options);

      // Upload report to storage
      const folder = `reports/${options.type}`;
      const file = {
        buffer: report,
        originalname: `${options.type}_report_${options.id}.${options.format}`,
        mimetype: options.format === 'pdf' ? 'application/pdf' : 'text/csv'
      } as Express.Multer.File;

      const url = await this.uploadService.uploadDocument(file, folder);
      
      logger.info(`Report generated successfully for ${options.type} ${options.id}`);
      return url;
    } catch (error) {
      logger.error('Error generating report:', error);
      throw error;
    }
  }

  private async getReportData(options: ReportOptions): Promise<any> {
    switch (options.type) {
      case 'match':
        return this.getMatchReportData(options.id);
      case 'team':
        return this.getTeamReportData(options.id, options.dateRange);
      case 'player':
        return this.getPlayerReportData(options.id, options.dateRange);
      case 'league':
        return this.getLeagueReportData(options.dateRange);
      default:
        throw new Error('Invalid report type');
    }
  }

  private async getMatchReportData(matchId: string): Promise<any> {
    const matchRepository = AppDataSource.getRepository('matches');
    const match = await matchRepository
      .createQueryBuilder('match')
      .leftJoinAndSelect('match.homeTeam', 'homeTeam')
      .leftJoinAndSelect('match.awayTeam', 'awayTeam')
      .leftJoinAndSelect('match.officials', 'officials')
      .leftJoinAndSelect('match.playerStats', 'playerStats')
      .leftJoinAndSelect('playerStats.player', 'player')
      .where('match.id = :matchId', { matchId })
      .getOne();

    return {
      match,
      stats: await this.statisticsService.getMatchStats(matchId)
    };
  }

  private async getTeamReportData(teamId: string, dateRange?: { start: Date; end: Date }): Promise<any> {
    const teamRepository = AppDataSource.getRepository('teams');
    const team = await teamRepository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.players', 'players')
      .leftJoinAndSelect('team.matches', 'matches')
      .where('team.id = :teamId', { teamId })
      .getOne();

    return {
      team,
      stats: await this.statisticsService.getTeamStats(teamId, dateRange),
      players: await this.statisticsService.getTeamPlayerStats(teamId, dateRange)
    };
  }

  private async getPlayerReportData(playerId: string, dateRange?: { start: Date; end: Date }): Promise<any> {
    const playerRepository = AppDataSource.getRepository('players');
    const player = await playerRepository
      .createQueryBuilder('player')
      .leftJoinAndSelect('player.team', 'team')
      .leftJoinAndSelect('player.stats', 'stats')
      .where('player.id = :playerId', { playerId })
      .getOne();

    return {
      player,
      stats: await this.statisticsService.getPlayerStats(playerId, dateRange),
      matches: await this.statisticsService.getPlayerMatches(playerId, dateRange)
    };
  }

  private async getLeagueReportData(dateRange?: { start: Date; end: Date }): Promise<any> {
    return {
      standings: await this.statisticsService.getLeagueStandings(dateRange),
      topScorers: await this.statisticsService.getLeagueLeaders('points', dateRange),
      topRebounders: await this.statisticsService.getLeagueLeaders('rebounds', dateRange),
      topAssists: await this.statisticsService.getLeagueLeaders('assists', dateRange)
    };
  }

  private async generatePDFReport(data: any, options: ReportOptions): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument();
        const chunks: Buffer[] = [];

        doc.on('data', chunk => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        // Add report content based on type
        this.addPDFContent(doc, data, options);

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }

  private addPDFContent(doc: PDFKit.PDFDocument, data: any, options: ReportOptions): void {
    // Add header
    doc.fontSize(20).text(`${options.type.toUpperCase()} REPORT`, { align: 'center' });
    doc.moveDown();

    // Add content based on report type
    switch (options.type) {
      case 'match':
        this.addMatchPDFContent(doc, data);
        break;
      case 'team':
        this.addTeamPDFContent(doc, data);
        break;
      case 'player':
        this.addPlayerPDFContent(doc, data);
        break;
      case 'league':
        this.addLeaguePDFContent(doc, data);
        break;
    }

    // Add footer
    doc.moveDown();
    doc.fontSize(10).text(`Generated on ${new Date().toLocaleString()}`, { align: 'right' });
  }

  private addMatchPDFContent(doc: PDFKit.PDFDocument, data: any): void {
    // Implement match report content
  }

  private addTeamPDFContent(<boltAction type="file" filePath="src/services/report.service.ts">  private addTeamPDFContent(doc: PDFKit.PDFDocument, data: any): void {
    // Team Information
    doc.fontSize(16).text('Team Information');
    doc.fontSize(12)
      .text(`Name: ${data.team.name}`)
      .text(`Division: ${data.team.division}`)
      .text(`Home Venue: ${data.team.homeVenue}`);
    doc.moveDown();

    // Team Stats
    doc.fontSize(16).text('Team Statistics');
    doc.fontSize(12)
      .text(`Games Played: ${data.stats.gamesPlayed}`)
      .text(`Win Rate: ${data.stats.winRate}%`)
      .text(`Points Per Game: ${data.stats.pointsPerGame}`)
      .text(`Rebounds Per Game: ${data.stats.reboundsPerGame}`)
      .text(`Assists Per Game: ${data.stats.assistsPerGame}`);
    doc.moveDown();

    // Player Stats
    doc.fontSize(16).text('Player Statistics');
    data.players.forEach((player: any) => {
      doc.fontSize(12)
        .text(`${player.name} - #${player.jerseyNumber}`)
        .text(`PPG: ${player.stats.pointsPerGame} | RPG: ${player.stats.reboundsPerGame} | APG: ${player.stats.assistsPerGame}`)
        .moveDown(0.5);
    });
  }

  private addPlayerPDFContent(doc: PDFKit.PDFDocument, data: any): void {
    // Player Information
    doc.fontSize(16).text('Player Information');
    doc.fontSize(12)
      .text(`Name: ${data.player.name}`)
      .text(`Team: ${data.player.team.name}`)
      .text(`Position: ${data.player.position}`)
      .text(`Jersey Number: ${data.player.jerseyNumber}`);
    doc.moveDown();

    // Season Stats
    doc.fontSize(16).text('Season Statistics');
    doc.fontSize(12)
      .text(`Games Played: ${data.stats.gamesPlayed}`)
      .text(`Points Per Game: ${data.stats.pointsPerGame}`)
      .text(`Rebounds Per Game: ${data.stats.reboundsPerGame}`)
      .text(`Assists Per Game: ${data.stats.assistsPerGame}`)
      .text(`Field Goal %: ${data.stats.fieldGoalPercentage}%`);
    doc.moveDown();

    // Recent Matches
    doc.fontSize(16).text('Recent Matches');
    data.matches.slice(0, 5).forEach((match: any) => {
      doc.fontSize(12)
        .text(`vs ${match.opponent}`)
        .text(`Stats: ${match.points} pts, ${match.rebounds} reb, ${match.assists} ast`)
        .moveDown(0.5);
    });
  }

  private addLeaguePDFContent(doc: PDFKit.PDFDocument, data: any): void {
    // Standings
    doc.fontSize(16).text('League Standings');
    data.standings.forEach((team: any, index: number) => {
      doc.fontSize(12)
        .text(`${index + 1}. ${team.name} (${team.wins}-${team.losses})`)
        .moveDown(0.5);
    });
    doc.moveDown();

    // League Leaders
    doc.fontSize(16).text('League Leaders');
    
    doc.fontSize(14).text('Points');
    data.topScorers.forEach((player: any) => {
      doc.fontSize(12)
        .text(`${player.name} (${player.team}): ${player.ppg} PPG`)
        .moveDown(0.5);
    });
    
    doc.fontSize(14).text('Rebounds');
    data.topRebounders.forEach((player: any) => {
      doc.fontSize(12)
        .text(`${player.name} (${player.team}): ${player.rpg} RPG`)
        .moveDown(0.5);
    });
    
    doc.fontSize(14).text('Assists');
    data.topAssists.forEach((player: any) => {
      doc.fontSize(12)
        .text(`${player.name} (${player.team}): ${player.apg} APG`)
        .moveDown(0.5);
    });
  }

  private async generateCSVReport(data: any, options: ReportOptions): Promise<Buffer> {
    const rows: string[] = [];
    
    // Add headers based on report type
    switch (options.type) {
      case 'match':
        rows.push('Team,Points,Rebounds,Assists,Steals,Blocks');
        this.addMatchCSVRows(rows, data);
        break;
      case 'team':
        rows.push('Player,Games,Points,Rebounds,Assists,FG%');
        this.addTeamCSVRows(rows, data);
        break;
      case 'player':
        rows.push('Date,Opponent,Points,Rebounds,Assists,Minutes');
        this.addPlayerCSVRows(rows, data);
        break;
      case 'league':
        rows.push('Position,Team,Games,Wins,Losses,Points');
        this.addLeagueCSVRows(rows, data);
        break;
    }

    return Buffer.from(rows.join('\n'));
  }

  private addMatchCSVRows(rows: string[], data: any): void {
    const { match, stats } = data;
    
    // Home team stats
    rows.push(`${match.homeTeam.name},${stats.home.points},${stats.home.rebounds},${stats.home.assists},${stats.home.steals},${stats.home.blocks}`);
    
    // Away team stats
    rows.push(`${match.awayTeam.name},${stats.away.points},${stats.away.rebounds},${stats.away.assists},${stats.away.steals},${stats.away.blocks}`);
    
    // Player stats
    rows.push('');
    rows.push('Player,Team,Points,Rebounds,Assists,Minutes');
    stats.players.forEach((player: any) => {
      rows.push(`${player.name},${player.team},${player.points},${player.rebounds},${player.assists},${player.minutes}`);
    });
  }

  private addTeamCSVRows(rows: string[], data: any): void {
    data.players.forEach((player: any) => {
      rows.push(`${player.name},${player.stats.gamesPlayed},${player.stats.pointsPerGame},${player.stats.reboundsPerGame},${player.stats.assistsPerGame},${player.stats.fieldGoalPercentage}`);
    });
  }

  private addPlayerCSVRows(rows: string[], data: any): void {
    data.matches.forEach((match: any) => {
      rows.push(`${match.date},${match.opponent},${match.points},${match.rebounds},${match.assists},${match.minutes}`);
    });
  }

  private addLeagueCSVRows(rows: string[], data: any): void {
    data.standings.forEach((team: any, index: number) => {
      rows.push(`${index + 1},${team.name},${team.gamesPlayed},${team.wins},${team.losses},${team.points}`);
    });
  }
}