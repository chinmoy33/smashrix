import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, DollarSign, Tag, FileText } from 'lucide-react';
import { Event, Category } from '../../types/Event';

interface EventHostingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: Omit<Event, 'id' | 'created_at'>) => void;
}

const EventHostingModal: React.FC<EventHostingModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Singles' as Category,
    date: '',
    time: '',
    venue: '',
    amount: 0,
    free: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories: Category[] = ['Singles', 'Doubles', 'Mixed Doubles', 'Team Event', 'Training', 'Social'];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.venue.trim()) newErrors.venue = 'Venue is required';
    if (!formData.free && formData.amount <= 0) newErrors.amount = 'Amount must be greater than 0 for paid events';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        title: '',
        description: '',
        category: 'Singles',
        date: '',
        time: '',
        venue: '',
        amount: 0,
        free: false
      });
      setErrors({});
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open" data-theme="smashrix">
      <div className="modal-box w-11/12 max-w-2xl bg-base-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-2xl text-neutral flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-primary" />
            Host New Event
          </h3>
          <button 
            className="btn btn-sm btn-circle btn-ghost text-neutral"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-neutral font-semibold flex items-center">
                <Tag className="w-4 h-4 mr-2 text-primary" />
                Event Title
              </span>
            </label>
            <input
              type="text"
              className={`input input-bordered w-full ${errors.title ? 'input-error' : 'focus:input-primary'}`}
              placeholder="Enter event title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
            {errors.title && <label className="label"><span className="label-text-alt text-error">{errors.title}</span></label>}
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-neutral font-semibold flex items-center">
                <FileText className="w-4 h-4 mr-2 text-primary" />
                Description
              </span>
            </label>
            <textarea
              className={`textarea textarea-bordered h-24 ${errors.description ? 'textarea-error' : 'focus:textarea-primary'}`}
              placeholder="Describe your event"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
            {errors.description && <label className="label"><span className="label-text-alt text-error">{errors.description}</span></label>}
          </div>

          {/* Category */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-neutral font-semibold">Category</span>
            </label>
            <select
              className="select select-bordered focus:select-primary"
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value as Category)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-neutral font-semibold flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-primary" />
                  Date
                </span>
              </label>
              <input
                type="date"
                className={`input input-bordered ${errors.date ? 'input-error' : 'focus:input-primary'}`}
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
              />
              {errors.date && <label className="label"><span className="label-text-alt text-error">{errors.date}</span></label>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-neutral font-semibold flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-primary" />
                  Time
                </span>
              </label>
              <input
                type="time"
                className={`input input-bordered ${errors.time ? 'input-error' : 'focus:input-primary'}`}
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
              />
              {errors.time && <label className="label"><span className="label-text-alt text-error">{errors.time}</span></label>}
            </div>
          </div>

          {/* Venue */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-neutral font-semibold flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                Venue
              </span>
            </label>
            <input
              type="text"
              className={`input input-bordered ${errors.venue ? 'input-error' : 'focus:input-primary'}`}
              placeholder="Enter venue location"
              value={formData.venue}
              onChange={(e) => handleInputChange('venue', e.target.value)}
            />
            {errors.venue && <label className="label"><span className="label-text-alt text-error">{errors.venue}</span></label>}
          </div>

          {/* Free Event Toggle */}
          <div className="form-control">
            <label className="label cursor-pointer justify-start">
              <input
                type="checkbox"
                className="checkbox checkbox-primary mr-3"
                checked={formData.free}
                onChange={(e) => handleInputChange('free', e.target.checked)}
              />
              <span className="label-text text-neutral font-semibold">This is a free event</span>
            </label>
          </div>

          {/* Amount (if not free) */}
          {!formData.free && (
            <div className="form-control">
              <label className="label">
                <span className="label-text text-neutral font-semibold flex items-center">
                  <DollarSign className="w-4 h-4 mr-2 text-primary" />
                  Registration Fee
                </span>
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                className={`input input-bordered ${errors.amount ? 'input-error' : 'focus:input-primary'}`}
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', parseFloat(e.target.value) || 0)}
              />
              {errors.amount && <label className="label"><span className="label-text-alt text-error">{errors.amount}</span></label>}
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
              Host Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventHostingModal;