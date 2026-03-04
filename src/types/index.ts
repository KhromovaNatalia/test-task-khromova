export interface PersonalInfo {
  phone: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | '';
}


export interface AddressWorkInfo {
  workplace: string;
  address: string;
}

export interface LoanParams {
  amount: number;
  term: number;
}

export interface FormData extends PersonalInfo, AddressWorkInfo, LoanParams {}

export interface FormErrors {
  phone?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  workplace?: string;
  address?: string;
  amount?: string;
  term?: string;
}

export type WorkplaceCategory = {
  slug: string;
  name: string;
  url: string;
};