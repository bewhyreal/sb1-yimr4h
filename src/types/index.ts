export type Language = 'tr' | 'en';

export interface Translations {
  [key: string]: {
    tr: string;
    en: string;
  };
}

export interface TopicData {
  id: number;
  imageUrl: string;
  title: {
    tr: string;
    en: string;
  };
  description: {
    tr: string;
    en: string;
  };
}
export interface SlideData {
  id: number;
  imageUrl: string;
  title: {
    tr: string;
    en: string;
  };
  description: {
    tr: string;
    en: string;
  };
}