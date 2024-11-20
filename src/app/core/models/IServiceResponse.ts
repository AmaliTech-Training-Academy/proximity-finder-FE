import { ServiceCategory } from './IServiceCategory';

export interface ServiceResponse {
  status: string;
  result: ServiceCategory[];
  errors: string | null;
}
