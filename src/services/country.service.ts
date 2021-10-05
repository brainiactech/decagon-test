import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { SearchCountryDto } from '@dtos/country.dto';
import { Country } from '@interfaces/country.interface';
import axiosRequest from '@utils/axiosRequest';
import { allCountries } from '@utils/allCountries';

class CountryService {
  public async searchCountry(countryData: SearchCountryDto): Promise<Country> {
    if (isEmpty(countryData)) throw new HttpException(400, 'name is required');

    const response = await axiosRequest(countryData.name, countryData.isFullText);

    console.log('================================response');
    console.log(response);
    console.log('================================response');

    return { callingCodes: response.callingCodes, region: response.region, name: response.name };
  }

  public async searchCountryByFilter(countryData: SearchCountryDto): Promise<Country> {
    if (isEmpty(countryData)) throw new HttpException(400, 'countryData is required');

    const response = allCountries
      .filter(item => {
        const itemLowerCased = item.name.toLowerCase();
        return itemLowerCased.includes(countryData.name.toLowerCase());
      })
      .map(data => {
        return {
          name: data.name,
          region: data.region,
          callingCodes: data.callingCodes,
        };
      });

    return {
      callingCodes: response.length > 0 ? response[0].callingCodes : [],
      region: response.length > 0 ? response[0].region : '',
      name: response.length > 0 ? response[0].name : '',
    };
  }
}

export default CountryService;
