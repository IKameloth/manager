export type RoleType = {
  data?: [{
    id: string,
    type: string,
    attributes: {
      name: string,
      resource_type: string,
      resource_id: string,
      created_at: string,
    }
  }]
};
