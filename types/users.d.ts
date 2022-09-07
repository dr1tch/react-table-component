import { IProfile } from "./profile";
export type UserDepartement = {
  ID_ROWID?: number;
  AUDUSERID: number;
  AUDDATDEB: any;
  AUDDATFIN: any;
  AUDDEPID?: number;
  UTIL?: number;
  DCRE?: string;
  DMAJ?: string;
};
export interface IUser {
  AUSCODEXT: string;
  AUSDATDEB: string;
  AUSDATFIN: string;
  AUSEMAIL: string;
  AUSIMAGE: string | null;
  AUSNAME?: string;
  AUSPRFID: number;
  AUSUSERNAME: string;
  DCRE?: string | Date;
  DMAJ?: string | Date;
  ID_ROWID: number;
  AUSPRFLIB?: string | undefined;
  UTIL?: number | null;
  contact?: Contact | null;
  CONTACT?: Contact | null;
  PROFILE?: IProfile | null;
  profile?: IProfile | null;
  ass_userdepartments?: any;
  ass_userdepartment?: any;
  userdeps?: UserDepartement;
}

export type User = {
  ID_ROWID: number;
  AUSCODEXT: string;
  AUSIMAGE: string;
  AUSUSERNAME: string;
  AUSPWDUSR: string;
  AUSEMAIL: string;
  AUSDATDEB: Date;
  AUSDATFIN: Date;
  AUSPRFID: string | number;
  MCTBAT: string | null;
  MCTCIVILE: string;
  MCTNOM: string | null;
  MCTPRENOM: string;
  MCTTYPE: string | null;
  MCTADRSS1: string | null;
  MCTADRSS2: string | null;
  MCTCODEPOS: string | null;
  MCTVILLE: string | null;
  MCTTELPER: string | null;
  MCTTELMOB: string | null;
  MCTTELPRO: string | null;
  MCTFAX: string | null;
  MCTETAGE: string | null;
  MCTPAYS: string | null;
  MCTEMAIL: string | null;
  UTIL?: number;
  DCRE?: string;
  DMAJ?: string;
};

export interface Contact {
  ID_ROWID?: number | null;
  MCTUSERID?: number | null;
  MCTCIVILE?: "mme" | "mr" | "mlle" | null;
  MCTNOM?: string | null;
  MCTPRENOM?: string | null;
  MCTTYPE?: string | null;
  MCTADRES1?: string | null;
  MCTADRES2?: string | null;
  MCTCODEPOS?: string | null;
  MCTVILLE?: string | null;
  MCTTELPER?: string | null;
  MCTTELMOB?: string | null;
  MCTTELPRO?: string | null;
  MCTFAX?: string | null;
  MCTPAYS?: "FR" | "DZ" | "EN" | "UK" | null;
  MCTEMAIL?: string | null;
  UTIL?: number | null;
  DCRE?: string | null;
  DMAJ?: string | null;
}

export type UserTab =
  | (IUser & {
      details?: {
        AUSIMAGE?: string | null;
        AUSNOM?: string | null;
        AUSPRENOM?: string | null;
        AUSEMAIL: string;
        AUSUSERNAME: string;
      };
    })
  | [];
