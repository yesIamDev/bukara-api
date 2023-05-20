import { MARTITAL_STATUS, TYPE_LANDLORD } from 'App/Models/Landlord'
import TypeAppartement from "App/Models/TypeAppartement"

/*
* - A L L -
*/
export interface ISimpleRegistre {
      designation: string
      description?: string
}

export interface IFindByKeyValue {
      key: string,
      value?: string
}

export interface IFindAddress {
      entreprise_id: string,
      id: string
}

export interface IQuerry {
      page: number,
      limit: number,
      status?: boolean,
      orderBy: string,
}

/**
 * - User -
 */
export interface IUser {
      password: string
      email: string
}

/**
 * - User -
 */
export interface IEntreprise {
      designation: string
      description: string
      rccm: string
      logo?: string
      // address: [IAddress]
      // bank_accounts: [IBankAcount]

}

export interface IAddress {
      entreprise_id?: string
      country: string
      town: string
      city: string
      quarter: string
      street: string
      number: number
}

export interface IAppartAddress {
      appartement_id?: string
      country: string
      town: string
      city: string
      quarter: string
      street: string
      number: number
}

export interface IBankAcount {
      entreprise_id?: string
      bank: string
      account_name: string
      account_number: number
}

/**
 * Appartement
 */

export interface IQAppartement extends IQuerry {
      typeAppartement: string
      typeBien: string
}

export interface IAppartement {
      typeBienId: string
      typeAppartementId: string
      designatiom?: string
      description: string
      features: string
      number?: number
      price: number
}

export interface IAppartementImage {
      appartement_id?: string
      url: string
}

export interface IImage {
      url: string
}

/**
 * landlord
 */

export interface ILandlord {
      name: string,
      lastname: string,
      email: string
      profile?: string
      cardType: string
      cardTypeId: string,
      maritalStatus: MARTITAL_STATUS,
      nationality: string,
      lastAdress: string,
      landlordType: TYPE_LANDLORD,
}

export interface ILandlordQuerry extends IQuerry {
      maritalStatus: MARTITAL_STATUS,
      landlordType: TYPE_LANDLORD,
}
export interface IUpdateLandlord {
      name: string,
      latsname: string,
      email: string,
      cardType: string,
      cardTypeId: string,
      maritalStatus: MARTITAL_STATUS,
      nationality: string,
      lastAdress: string
}

export interface IPhone {
      landlordId?: string,
      countryCode: string,
      number: string
}

export interface IPhoneRunning {
      running: boolean
}
/**
 * Rental Location
 */
export interface IRentalQuerry extends IQuerry {
      user: string
      landlord: string
      appartement: string
      startDate: DateTime
      endDate: DateTime
}

export interface IRental {
      appartementId: string
      landlordId: string
      amount: number
      userId?: string
}

export interface IGuarantee {
      rentalContratId: string
      month: number
      amount: number
}

export interface IGuaranteeQuerry extends IQuerry {
      rentalContrat: string
      month: string
      // amount?: string
}

export interface IBreakContrat {
      appartementId: string
      landlordId: string
}


/**
 * Recovery
 */
export interface IRecoveryQuery extends IQuerry {
      rentalContratStatus: boolean
}
export interface IRecovery {
      rentalContratId: string
      labelMonth: string
      labelStr: string
      date_recovery: moment.Moment
}