import { Company } from './company';
import { ContactPerson } from './contactPerson';
import { User } from './user';
import { ProductFeed } from './productfeed';

export type CompanyFormProps = {
  onSubmit: (company: Company) => Promise<void>;
  buttonTitle: string;
  company?: Company;
};

export type ContactPersonFormProps = {
  onSubmit: (contactPerson: ContactPerson) => Promise<void>;
  buttonTitle: string;
  companyId: string;
  contactPerson?: ContactPerson;
};

export type UserFormProps = {
  onSubmit: (user: User) => Promise<void>;
  buttonTitle: string;
  companyId: string;
  role: string;
  user?: User;
};

export type ProductFeedFormProps = {
  onSubmit: (productFeed: ProductFeed) => Promise<void>;
  buttonTitle: string;
  companyId: string;
  productFeed?: ProductFeed;
};
