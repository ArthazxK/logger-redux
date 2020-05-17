import React, { useState, useEffect } from "react";
import LogItem from "./LogItem";
import Preloader from "../layout/Preloader";
import { connect } from "react-redux";
import { getLogs } from "../../store/logs";

const Logs = ({ getLogs, logs: { list: logs, loading } }) => {
  useEffect(() => {
    getLogs();
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <ul className="collection with-header">
      <li className="collection-header">
        <h4 className="center">System Logs</h4>
      </li>
      {!loading && logs.length === 0 ? (
        <p className="center">No logs to show...</p>
      ) : (
        logs.map((log) => <LogItem key={log.id} log={log} />)
      )}
    </ul>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getLogs: () => dispatch(getLogs()),
});

const mapStateToProps = (state) => ({
  logs: state.entities.logs,
});

export default connect(mapStateToProps, mapDispatchToProps)(Logs);
