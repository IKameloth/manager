import React from 'react';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { Chip } from '@material-ui/core';

export default function RoleNames(props: { rolesArr: any }) {
  if (props.rolesArr?.length > 0) {
    return props.rolesArr.map((ele: any) => {
      return <Chip key={ele.id} size="small" color="primary" icon={<LocalOfferIcon />} label={ele.name} />
    });
  };

  return(
    <Chip size="small" color="primary" icon={<LocalOfferIcon />} label="Empty" />
  ); 
};
