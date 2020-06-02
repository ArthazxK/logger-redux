import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogItem from "./LogItem";
import Preloader from "../layout/Preloader";
import { getLogs, logsSelector } from "../../store/logs";

const Logs = () => {
  const dispatch = useDispatch();
  const allLogs = useSelector(logsSelector);

  useEffect(() => {
    dispatch(getLogs());
  }, []);

  const { list: logs, loading, searchLog } = allLogs;

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
        filtered.map((log) => <LogItem key={log._id} log={log} />)
      )}
    </ul>
  );
};

export default Logs;
