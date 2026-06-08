import React, { forwardRef, useEffect, useState } from 'react';
import { commands } from '../utils/commands';

interface TerminalInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: (val: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  dir: string;
}

export const TerminalInput = forwardRef<HTMLInputElement, TerminalInputProps>(
  ({ value, onChange, onSubmit, onKeyDown, dir }, ref) => {
    const [suggestion, setSuggestion] = useState('');

    useEffect(() => {
      if (!value.trim()) {
        setSuggestion('');
        return;
      }

      const trimmedVal = value.trim().toLowerCase();

      if (trimmedVal.startsWith('skills ')) {
        const subInput = trimmedVal.substring(7);
        const subCategories = ['languages', 'frameworks', 'technologies'];
        const matchedSub = subCategories.find((sub) =>
          sub.startsWith(subInput)
        );
        if (matchedSub && matchedSub !== subInput) {
          setSuggestion(matchedSub.substring(subInput.length));
        } else {
          setSuggestion('');
        }
        return;
      }

      const matchedCmd = Object.keys(commands).find((cmd) =>
        cmd.startsWith(trimmedVal)
      );

      if (matchedCmd && matchedCmd !== trimmedVal) {
        setSuggestion(matchedCmd.substring(value.length));
      } else {
        setSuggestion('');
      }
    }, [value]);

    const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(value);
    };

    return (
      <form onSubmit={handleFormSubmit} className="terminal-input-container">
        <div className="prompt-line" style={{ margin: 0 }}>
          <span className="prompt-user">visitor</span>
          <span className="prompt-host">@portfolio</span>
          <span className="prompt-symbol">:</span>
          <span className="prompt-dir">{dir}</span>
          <span className="prompt-symbol">$</span>
        </div>

        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          className="terminal-hidden-input"
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />

        <div className="terminal-visible-input">
          <span>{value}</span>
          {suggestion && (
            <span className="autocomplete-suggestion">{suggestion}</span>
          )}
          <span className="terminal-cursor" />
        </div>
      </form>
    );
  }
);

TerminalInput.displayName = 'TerminalInput';
