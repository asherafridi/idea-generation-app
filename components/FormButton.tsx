import React from 'react';
import { Button } from './ui/button';
import { CircleDashed } from 'lucide-react';

interface FormButtonProps {
  state: boolean; // Indicates the loading or disabled state
  text?: string; // Optional button text, defaults to 'Submit'
  onClick?: (e:any) => void; // Optional onClick handler
  className? : string;
}

const FormButton: React.FC<FormButtonProps> = ({ state, text = 'Submit', onClick, className="null" }) => {
  return (
    <Button
      className={`bg-background font-body text-primary border-primary border h-16 w-full text-xl rounded-xl ${className} `}
      disabled={state} // Disable the button when `state` is true
      onClick={onClick} // Attach the onClick handler
    >
      {state ? <CircleDashed  className="w-[20px] animate-spin" /> : ''} &nbsp;
      {text}
    </Button>
  );
};

export default FormButton;
