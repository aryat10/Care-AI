
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bandage } from 'lucide-react';

interface FirstAidSelectProps {
  onSelect: (value: string) => void;
  disabled?: boolean;
}

const FIRST_AID_CONDITIONS = [
  { value: 'burn', label: 'Burns' },
  { value: 'cut', label: 'Cuts & Wounds' },
  { value: 'sprain', label: 'Sprains & Strains' },
  { value: 'choking', label: 'Choking' },
  { value: 'fever', label: 'Fever' },
];

const FirstAidSelect = ({ onSelect, disabled = false }: FirstAidSelectProps) => {
  return (
    <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-gray-200 w-full">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-medical-mint flex items-center justify-center text-white">
        <Bandage size={18} />
      </div>
      
      <Select onValueChange={onSelect} disabled={disabled}>
        <SelectTrigger className="border-none shadow-none focus:ring-0 flex-1">
          <SelectValue placeholder="Select first-aid condition..." />
        </SelectTrigger>
        <SelectContent>
          {FIRST_AID_CONDITIONS.map((condition) => (
            <SelectItem key={condition.value} value={condition.value}>
              {condition.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FirstAidSelect;
