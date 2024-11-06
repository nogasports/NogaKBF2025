import { Request, Response } from 'express';
import { TeamService } from '../services/team.service';

export class TeamController {
  private teamService = new TeamService();

  public getAllTeams = async (req: Request, res: Response) => {
    try {
      const teams = await this.teamService.getAllTeams();
      res.json({
        success: true,
        data: teams
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  public getTeamById = async (req: Request, res: Response) => {
    try {
      const team = await this.teamService.getTeamById(req.params.id);
      if (!team) {
        return res.status(404).json({
          success: false,
          message: 'Team not found'
        });
      }
      res.json({
        success: true,
        data: team
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  public createTeam = async (req: Request, res: Response) => {
    try {
      const team = await this.teamService.createTeam(req.body);
      res.status(201).json({
        success: true,
        data: team
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };

  public updateTeam = async (req: Request, res: Response) => {
    try {
      const team = await this.teamService.updateTeam(req.params.id, req.body);
      res.json({
        success: true,
        data: team
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };

  public deleteTeam = async (req: Request, res: Response) => {
    try {
      await this.teamService.deleteTeam(req.params.id);
      res.json({
        success: true,
        message: 'Team deleted successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };
}