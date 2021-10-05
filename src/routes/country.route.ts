import { Router } from 'express';
import CountryController from '@controllers/country.controller';
import { SearchCountryDto } from '@dtos/country.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';
import rateLimiterMiddleware from '@middlewares/rate-limiter.middleware';

class CountryRoute implements Routes {
  public path = '/country';
  public router = Router();
  public countryController = new CountryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      [validationMiddleware(SearchCountryDto, 'body'), authMiddleware, rateLimiterMiddleware],
      this.countryController.searchCountry,
      this.router.post(
        `${this.path}/filter`,
        [validationMiddleware(SearchCountryDto, 'body'), authMiddleware, rateLimiterMiddleware],
        this.countryController.searchCountryByFilter,
      ),
    );
  }
}

export default CountryRoute;
