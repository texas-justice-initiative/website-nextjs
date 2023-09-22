import {
  INCOMPLETE_YEAR_NOTE,
  CUST_DEATHS_INCOMPLETE_YEARS,
} from '@/data/datasets';

export type Datasets = 'custodial-deaths' | 'civilians-shot' | 'officers-shot';

export type DatasetSchema = {
  [key in Datasets]: {
    lastUpdated?: {}; // TODO: pull this out of schema and just get it when we need it
    name: string;
    slug: Datasets;
    description: string;
    urls: {
      compressed: string;
      full: string;
    };
    chart_configs: {
      type: 'doughnut' | 'bar';
      group_by?: { name: string; description?: string };
      note?: typeof INCOMPLETE_YEAR_NOTE;
      incompleteYears?: typeof CUST_DEATHS_INCOMPLETE_YEARS;
    }[];
    filter_configs: { name: string; type?: string }[];
  };
};
