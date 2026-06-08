import React, { useState, useEffect, useRef } from 'react';
import { TerminalInput } from './TerminalInput';
import { TerminalOutput } from './TerminalOutput';
import type { HistoryRecord } from './TerminalOutput';
import { commands, asciiLogo } from '../utils/commands';

export const Terminal: React.FC = () => {
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const [interactiveMode, setInteractiveMode] = useState<'snake' | null>(null);
  const [currentDir] = useState('~');

  const inputRef = useRef<HTMLInputElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const welcomeId = Math.random().toString(36).substring(2, 9);
    const welcomeNode = (
      <div>
        <pre className="ascii-art terminal-glow" style={{ margin: '8px 0', fontSize: '0.85rem' }}>
          {asciiLogo}
        </pre>
        <p style={{ opacity: 0.8 }}>
          Initializing system assets... [OK]
        </p>

        <p style={{ opacity: 0.8, marginBottom: '16px' }}>
          Type <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>'help'</span> to see a list of available command utilities.
        </p>
      </div>
    );

    setHistory([{
      id: welcomeId,
      command: 'system_boot',
      output: welcomeNode,
      dir: '~'
    }]);
  }, []);

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [history]);

  const handleTerminalClick = () => {
    if (interactiveMode === null && inputRef.current) {
      inputRef.current.focus();
    }
  };





  const executeCommand = (fullCmd: string) => {
    const trimmed = fullCmd.trim();

    if (!trimmed) {
      setHistory((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 9),
          command: '',
          output: null,
          dir: currentDir
        }
      ]);
      return;
    }

    const parts = trimmed.split(/\s+/);
    const cmdName = parts[0].toLowerCase();
    const args = parts.slice(1);

    setCommandHistory((prev) => {
      if (prev.length > 0 && prev[prev.length - 1] === trimmed) {
        return prev;
      }
      return [...prev, trimmed];
    });
    setHistoryIndex(-1);

    const command = commands[cmdName];
    let output: React.ReactNode = null;

    if (cmdName === 'clear') {
      setHistory([]);
      setInputValue('');
      return;
    }

    if (command) {
      try {
        output = command.execute(args, {
          setInteractiveMode
        });
      } catch (err) {
        output = (
          <span style={{ color: 'var(--warning-color)' }}>
            Error executing command: {(err as Error).message}
          </span>
        );
      }
    } else {
      output = (
        <div>
          <span style={{ color: 'var(--warning-color)' }}>
            command not found: {cmdName}
          </span>
          <p style={{ fontSize: '0.9rem', opacity: 0.7, marginTop: '4px' }}>
            Type 'help' to see list of valid commands.
          </p>
        </div>
      );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        command: trimmed,
        output,
        dir: currentDir
      }
    ]);

    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

    if (e.key === 'Tab') {
      e.preventDefault();
      if (!inputValue.trim()) return;

      const trimmedVal = inputValue.trim().toLowerCase();

      if (trimmedVal.startsWith('skills ')) {
        const subInput = trimmedVal.substring(7).trim();
        const subCategories = ['languages', 'frameworks', 'technologies'];
        const matchedSub = subCategories.find(sub => sub.startsWith(subInput));
        if (matchedSub) {
          setInputValue(`skills ${matchedSub}`);
        }
        return;
      }

      const matchedCmd = Object.keys(commands).find((cmd) =>
        cmd.startsWith(trimmedVal)
      );

      if (matchedCmd) {
        setInputValue(matchedCmd);
      }
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;

      const newIndex = historyIndex === -1 ? commandHistory.length - 1 : historyIndex - 1;
      if (newIndex >= 0) {
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
      }
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length === 0) return;

      const newIndex = historyIndex + 1;
      if (newIndex < commandHistory.length) {
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInputValue('');
      }
    }
  };

  const handleShortcutTap = (cmdName: string) => {
    executeCommand(cmdName);
  };

  return (
    <div className="terminal-app" onClick={handleTerminalClick}>
      <div className="crt-effect" />
      <div className="crt-scanlines" />
      <div className="crt-flicker" />


      <div className="terminal-viewport" ref={viewportRef}>
        <TerminalOutput history={history} />

        {interactiveMode === null && (
          <TerminalInput
            ref={inputRef}
            value={inputValue}
            onChange={setInputValue}
            onSubmit={executeCommand}
            onKeyDown={handleKeyDown}
            dir={currentDir}
          />
        )}
      </div>

      <div className="mobile-shortcut-bar">
        <button type="button" className="shortcut-btn" onClick={() => handleShortcutTap('help')}>help</button>
        <button type="button" className="shortcut-btn" onClick={() => handleShortcutTap('about')}>about</button>
        <button type="button" className="shortcut-btn" onClick={() => handleShortcutTap('skills')}>skills</button>
        <button type="button" className="shortcut-btn" onClick={() => handleShortcutTap('projects')}>projects</button>
        <button type="button" className="shortcut-btn" onClick={() => handleShortcutTap('contact')}>contact</button>

        <button type="button" className="shortcut-btn" onClick={() => handleShortcutTap('clear')}>clear</button>
      </div>
    </div>
  );
};
