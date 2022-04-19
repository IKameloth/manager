export type AutentiaUserType = {
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
}

export type UsersListType = {
  data: [AutentiaUserType?]
  offset?: number
  total?: number
}
