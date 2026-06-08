import React from 'react';

export interface HistoryRecord {
  id: string;
  command: string;
  output: React.ReactNode;
  dir: string;
}

interface TerminalOutputProps {
  history: HistoryRecord[];
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ history }) => {
  return (
    <>
      {history.map((record) => (
        <div key={record.id} className="output-group">
          <div className="prompt-line">
            <span className="prompt-user">visitor</span>
            <span className="prompt-host">@portfolio</span>
            <span className="prompt-symbol">:</span>
            <span className="prompt-dir">{record.dir}</span>
            <span className="prompt-symbol">$</span>
            <span className="prompt-command-text">{record.command}</span>
          </div>

          {record.output && (
            <div className="command-result">
              {record.output}
            </div>
          )}
        </div>
      ))}
    </>
  );
};
