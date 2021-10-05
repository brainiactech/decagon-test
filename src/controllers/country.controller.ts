import { NextFunction, Request, Response } from 'express';
import { Country } from '@interfaces/country.interface';
import CountryService from '@services/country.service';
import { SearchCountryDto } from '@dtos/country.dto';

class CountryController {
  public countryService = new CountryService();

  public searchCountry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const countryData: SearchCountryDto = req.body;
      const findCountry: Country = await this.countryService.searchCountry(countryData);

      res.status(200).json({ data: findCountry, message: 'country search successfully' });
    } catch (error) {
      next(error);
    }
  };

  public searchCountryByFilter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const countryData: SearchCountryDto = req.body;
      const findCountry: Country = await this.countryService.searchCountryByFilter(countryData);

      res.status(200).json({ data: findCountry, message: 'country search successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default CountryController;
