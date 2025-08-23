import React, { useState,useEffect } from 'react';
import { X, User, Phone, Tag, DollarSign, Calendar } from 'lucide-react';
// These types are mocked to ensure the code is runnable.
// In a real application, you would import them from your files.
// import { Category } from '../types/Event';
// import { registrationService } from '../services/registrationService';

// Mock types and service for demonstration purposes
type Category = 'Singles' | 'Doubles' | 'Mixed Doubles';

interface SinglesPlayer {
  id: bigint;
  created_at: string;
  name: string;
}

interface DoublesPlayer {
  id: bigint;
  created_at: string;
  team_name: string;
  player1: string;
  player2: string;
}

const registrationService = {
  registerEvent: (id: bigint, newRegister: Omit<SinglesPlayer | DoublesPlayer, 'id' | 'created_at'>) => {
    console.log(`Registering for event ${id}.`);
    console.log('Registration Data:', newRegister);
    return Promise.resolve({ success: true, data: newRegister });
  }
};


interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  // This onSubmit now expects player data instead of full event details
  onSubmit: (id:bigint|null,data: any) => void; 
  eventDetails: { id: bigint; category: Category } | null;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, onSubmit, eventDetails }) => {
  // Use a dynamic state to handle registration data for both singles and doubles
  const [formData, setFormData] = useState({
    name1: '',
    phone1: '',
    gender1: 'Male', // Default gender for Person 1
    name2: '',
    phone2: '',
    gender2: 'Male', // Default gender for Person 2
  });

// inside RegistrationModal
  useEffect(() => {
  if (isOpen && eventDetails) {
    if (eventDetails.category === "Singles") {
      setFormData({
        name1: '',
        phone1: '',
        gender1: 'Male',
        name2: '',
        phone2: '',
        gender2: '',
      });
    } else if (eventDetails.category === "Doubles") {
      setFormData({
        name1: '',
        phone1: '',
        gender1: 'Male',
        name2: '',
        phone2: '',
        gender2: 'Male',
      });
    }
    setErrors({});
  }
}, [isOpen, eventDetails]);


  const [errors, setErrors] = useState<Record<string, string>>({});
  const genderOptions = ['Male', 'Female'];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const isDoubles = eventDetails?.category === 'Doubles';

    // --- Validation for Person 1 (Required for both Singles and Doubles) ---
    if (!formData.name1.trim()) {
      newErrors.name1 = 'Name is required';
    }
    if (!formData.phone1.trim()) {
      newErrors.phone1 = 'Phone number is required';
    }
    if (!formData.gender1) {
      newErrors.gender1 = 'Gender is required';
    }

    // --- Validation for Person 2 (Required only for Doubles) ---
    if (isDoubles) {
      if (!formData.name2.trim()) {
        newErrors.name2 = 'Name is required for person 2';
      }
      // Phone for Person 2 is NOT required as per the instructions
      if (!formData.gender2) {
        newErrors.gender2 = 'Gender is required for person 2';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Pass the relevant data to the onSubmit handler
      if("playerid" in eventDetails){
        onSubmit(eventDetails?.playerid, formData);
      }
      else {

        onSubmit(eventDetails?.id,formData);
      }
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear the error for the field as the user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Only render the modal if it's open
  if (!isOpen || !eventDetails) return null;

  return (
    <div className="modal modal-open" data-theme="light">
      <div className="modal-box w-11/12 max-w-2xl bg-base-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-2xl text-neutral flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-primary" />
            Register for {eventDetails.category} Event
          </h3>
          <button 
            className="btn btn-sm btn-circle btn-ghost text-neutral"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Person 1 Details Section (Common to both Singles and Doubles) */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-primary">Person 1 Details</h4>
            
            {/* Person 1 Name */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-neutral font-semibold">Name <span className="text-red-500">*</span></span>
              </label>
              <input
                type="text"
                className={`input input-bordered w-full text-black placeholder:text-gray-400 ${errors.name1 ? 'input-error' : 'focus:input-primary'}`}
                placeholder="Enter person 1's name"
                value={formData.name1}
                onChange={(e) => handleInputChange('name1', e.target.value)}
                required
              />
              {errors.name1 && <label className="label"><span className="label-text-alt text-error">{errors.name1}</span></label>}
            </div>

            {/* Person 1 Phone */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-neutral font-semibold">Phone <span className="text-red-500">*</span></span>
              </label>
              <input
                type="tel"
                className={`input input-bordered w-full text-black placeholder:text-gray-400 ${errors.phone1 ? 'input-error' : 'focus:input-primary'}`}
                placeholder="Enter person 1's phone number"
                value={formData.phone1}
                onChange={(e) => handleInputChange('phone1', e.target.value)}
                required
              />
              {errors.phone1 && <label className="label"><span className="label-text-alt text-error">{errors.phone1}</span></label>}
            </div>

            {/* Person 1 Gender */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-neutral font-semibold">Gender <span className="text-red-500">*</span></span>
              </label>
              <select
                className={`select select-bordered w-full text-black ${errors.gender1 ? 'select-error' : 'focus:select-primary'}`}
                onChange={(e) => handleInputChange('gender1', e.target.value)}
                required
              >
                <option value="" className="text-gray-400" disabled selected>
                  Select gender
                </option>
                {genderOptions.map((gender) => (
                  <option key={gender} value={gender}>{gender}</option>
                ))}
              </select>
              {errors.gender1 && <label className="label"><span className="label-text-alt text-error">{errors.gender1}</span></label>}
            </div>
          </div>


          {/* Conditionally render details for Person 2 if it's a Doubles event */}
          {eventDetails.category === 'Doubles' && (
            <div>
              <h4 className="text-xl font-semibold mb-4 text-primary">Person 2 Details</h4>
              
              {/* Person 2 Name */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-neutral font-semibold">Name <span className="text-red-500">*</span></span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered w-full text-black placeholder:text-gray-400 ${errors.name2 ? 'input-error' : 'focus:input-primary'}`}
                  placeholder="Enter person 2's name"
                  value={formData.name2}
                  onChange={(e) => handleInputChange('name2', e.target.value)}
                  required
                />
                {errors.name2 && <label className="label"><span className="label-text-alt text-error">{errors.name2}</span></label>}
              </div>

              {/* Person 2 Phone (Not Required) */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-neutral font-semibold">Phone</span>
                </label>
                <input
                  type="tel"
                  className={`input input-bordered w-full text-black placeholder:text-gray-400 ${errors.phone2 ? 'input-error' : 'focus:input-primary'}`}
                  placeholder="Enter person 2's phone number"
                  value={formData.phone2}
                  onChange={(e) => handleInputChange('phone2', e.target.value)}
                />
                {errors.phone2 && <label className="label"><span className="label-text-alt text-error">{errors.phone2}</span></label>}
              </div>

              {/* Person 2 Gender */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-neutral font-semibold">Gender <span className="text-red-500">*</span></span>
                </label>
                <select
                  className={`select select-bordered w-full text-black ${errors.gender2 ? 'select-error' : 'focus:select-primary'}`}
                  onChange={(e) => handleInputChange('gender2', e.target.value)}
                  required
                >
                  <option value="" className="text-gray-400" disabled selected>
                    Select gender
                  </option>
                  {genderOptions.map((gender) => (
                    <option key={gender} value={gender}>{gender}</option>
                  ))}
                </select>
                {errors.gender2 && <label className="label"><span className="label-text-alt text-error">{errors.gender2}</span></label>}
              </div>

            </div>
          )}

          {/* Action Buttons */}
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-outline btn-neutral"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;
