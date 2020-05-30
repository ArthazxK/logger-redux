import React, { useEffect } from "react";
import LogItem from "./LogItem";
import Preloader from "../layout/Preloader";
import { connect } from "react-redux";
import { getLogs } from "../../store/logs";

const Logs = ({ getLogs, logs: { list: logs, loading, searchLog } }) => {
  useEffect(() => {
    getLogs();
  }, []);

  if (loading) {
    return <Preloader />;
  }

  const filtered = searchLog
    ? logs.filter(
        (log) =>
          log.message.toLowerCase().includes(searchLog.toLowerCase()) ||
          log.tech.toLowerCase().includes(searchLog.toLowerCase())
      )
    : logs;

  return (
    <ul className="collection with-header">
      <li className="collection-header">
        <h4 className="center">System Logs</h4>
      </li>
      {!loading && filtered.length === 0 ? (
        <p className="center">No logs to show...</p>
      ) : (
        filtered.map((log) => <LogItem key={log.id} log={log} />)
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
