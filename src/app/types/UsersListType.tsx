export type UsersListType = {
  data: [{
      dni: string
      email: string
      flag_dec: string
      name: string
      roles: [{
        country: string
        from: string
        institution: string
        institution_dni: string
        name: string
        place: string
        system: string
        to: string
      }]
  }?]
  offset?: number
  total?: number
}
