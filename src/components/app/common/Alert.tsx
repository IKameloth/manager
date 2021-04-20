import React from "react";
import { connect } from "react-redux";
import * as alertAction from "../../../actions/alertAction";
import { Notification } from "../../../assets/styled/alert";

const Alert = (props: any) => {
  const { alerts } = props;

  const onClickClose = (id: string) => {
    props.removeAlert(id);
  };

  if (alerts !== null && alerts?.length > 0) {
    let alertList;
    
    alertList = alerts.map((alert: any) => {
      return(
        <Notification key={alert.id}>
          <div className={`show notification is-${alert.alertType} is-light`}>
            <button onClick={() => onClickClose(alert.id)} className="delete"></button>
            { alert.message }
          </div>
        </Notification>
      );
    });

    return alertList;
  } else {
    return null;
  };
};

const mapStateToProps = (state: any) => ({
  alerts: state.alertsReducer
});

export default connect(mapStateToProps, alertAction)(Alert);
