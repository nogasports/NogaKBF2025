import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { ValidationError } from '../utils/errors';

export class AuthController {
  private authService = new AuthService();
  private tokenService = new TokenService();

  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await this.authService.validateUser(email, password);
      const tokens = this.tokenService.generateTokens(user);
      
      res.json({
        success: true,
        data: { user, ...tokens }
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(401).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
    }
  };

  public register = async (req: Request, res: Response) => {
    try {
      const user = await this.authService.createUser(req.body);
      const tokens = this.tokenService.generateTokens(user);
      
      res.status(201).json({
        success: true,
        data: { user, ...tokens }
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
    }
  };

  public refreshToken = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;
      const tokens = await this.tokenService.refreshTokens(refreshToken);
      
      res.json({
        success: true,
        data: tokens
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(401).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
    }
  };

  public logout = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;
      await this.tokenService.revokeToken(refreshToken);
      
      res.json({
        success: true,
        message: 'Logged out successfully'
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
    }
  };
}