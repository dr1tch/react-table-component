export interface IProfile {
  key?: string;
  ID_ROWID?: number;
  APFCODEXT: string; // Code profile
  APFLIBPRF: string; // Libelle Profile
  APFNIVACC: string; // Niveau d'accees
  menus?: string[] | object[];
  MENUS?: object;
  UTIL?: number;
  DCRE?: string;
  DMAJ?: string;
}
