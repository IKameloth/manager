import React from "react";
import { LoadingIcon, ContentLoading } from "../../../assets/styled/loading";

const Loading = () => {
  return(
    <ContentLoading className="columns is-centered">
      <div className="column">
        <div className="field">
          <LoadingIcon>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </LoadingIcon>
        </div>
      </div>
    </ContentLoading>
  )
}

export default Loading;
