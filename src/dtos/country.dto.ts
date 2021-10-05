import { IsString, IsBoolean } from 'class-validator';

export class SearchCountryDto {
  @IsString()
  public name: string;

  @IsBoolean()
  public isFullText: boolean;
}
