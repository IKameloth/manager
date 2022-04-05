import React from 'react';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { Chip } from '@material-ui/core';
import { RoleType } from '@/app/types';

export default function RoleNames(props: { rolesArr: [RoleType?] }) {
  if (props.rolesArr?.length > 0) {
    return <>
      {props.rolesArr.map((role) => {
        if(role)
          return <Chip key={role.id} size="small" color="primary" icon={<LocalOfferIcon />} label={role.name} />
      })
      }
    </>
  };
  return(
    <Chip size="small" color="primary" icon={<LocalOfferIcon />} label="Vacio" />
  ); 

};
