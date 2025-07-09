import React from 'react';
import { ArrowUp } from 'lucide-react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

interface MessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  onSend,
  onKeyPress
}) => {
  return (
    <div className="pt-4 px-4 pb-2 relative z-10 mt-auto">
      <div className="bg-white rounded-full border border-slate-200/50 shadow-[0_4px_16px_rgba(0,0,0,0.07)] px-4 py-5 w-full mx-auto hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-all duration-300">
        <div className="flex items-center space-x-3">
          <Input
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            placeholder="Type a message…"
            className="flex-1 bg-transparent text-slate-800 placeholder-slate-500"
          />
          <Button
            onClick={onSend}
            variant="ghost"
            className="p-2 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
          >
            <ArrowUp size={16} strokeWidth={1.5} className="text-slate-700" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput; 