import React, { useState, useEffect, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';

// Array of month names
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Array of weekday names
const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const DatePicker = forwardRef(({
  id,
  name,
  value,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  readOnly = false,
  required = false,
  minDate,
  maxDate,
  placeholderText = 'Select date',
  dateFormat = 'MM/dd/yyyy',
  showMonthDropdown = true,
  showYearDropdown = true,
  yearRange = 5,
  className = '',
  calendarClassName = '',
  dayClassName,
  monthClassName,
  weekdayClassName,
  selectedDayClassName,
  disabledDayClassName,
  outsideDayClassName,
  ...rest
}, ref) => {
  // Parse the initial date value
  const parseDate = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  };
  
  // Initial state setup
  const [selectedDate, setSelectedDate] = useState(parseDate(value));
  const [viewDate, setViewDate] = useState(selectedDate || new Date());
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef(null);
  const inputRef = useRef(null);
  const combinedRef = ref || inputRef;
  
  // Update the month being viewed
  const setMonth = (month) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(month);
    setViewDate(newDate);
  };
  
  // Update the year being viewed
  const setYear = (year) => {
    const newDate = new Date(viewDate);
    newDate.setFullYear(year);
    setViewDate(newDate);
  };
  
  // Navigate to the previous month
  const prevMonth = () => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setViewDate(newDate);
  };
  
  // Navigate to the next month
  const nextMonth = () => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setViewDate(newDate);
  };
  
  // Check if a date is the selected date
  const isSelectedDate = (date) => {
    return selectedDate && 
           date.getDate() === selectedDate.getDate() && 
           date.getMonth() === selectedDate.getMonth() && 
           date.getFullYear() === selectedDate.getFullYear();
  };
  
  // Check if a date is outside the allowed range
  const isDisabledDate = (date) => {
    if (disabled) return true;
    
    const min = minDate ? new Date(minDate) : null;
    const max = maxDate ? new Date(maxDate) : null;
    
    if (min && date < min) return true;
    if (max && date > max) return true;
    
    return false;
  };
  
  // Check if a date is in the current month
  const isCurrentMonth = (date) => {
    return date.getMonth() === viewDate.getMonth();
  };
  
  // Format a date according to the dateFormat
  const formatDate = (date) => {
    if (!date) return '';
    
    let formattedDate = dateFormat;
    
    // Replace year
    formattedDate = formattedDate.replace('yyyy', date.getFullYear());
    formattedDate = formattedDate.replace('yy', date.getFullYear().toString().slice(-2));
    
    // Replace month
    const monthNumber = date.getMonth() + 1;
    formattedDate = formattedDate.replace('MM', monthNumber < 10 ? `0${monthNumber}` : monthNumber);
    formattedDate = formattedDate.replace('M', monthNumber);
    
    // Replace day
    const dayNumber = date.getDate();
    formattedDate = formattedDate.replace('dd', dayNumber < 10 ? `0${dayNumber}` : dayNumber);
    formattedDate = formattedDate.replace('d', dayNumber);
    
    return formattedDate;
  };
  
  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsOpen(false);
    
    if (onChange) {
      onChange(formatDate(date), date);
    }
  };
  
  // Generate an array of dates to display in the calendar
  const getDatesForCalendar = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    
    // Get the first day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    
    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    let firstDayOfWeek = firstDayOfMonth.getDay();
    // Adjust for our display starting with Monday (0)
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    // Get the last day of the month
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // Calculate dates from previous month to fill in the first week
    const daysFromPrevMonth = firstDayOfWeek;
    const prevMonthDates = [];
    
    if (daysFromPrevMonth > 0) {
      const prevMonth = new Date(year, month, 0);
      const prevMonthLastDay = prevMonth.getDate();
      
      for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
        prevMonthDates.push(new Date(year, month - 1, prevMonthLastDay - i));
      }
    }
    
    // Calculate dates for current month
    const currentMonthDates = [];
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      currentMonthDates.push(new Date(year, month, i));
    }
    
    // Calculate dates for next month to fill in the last week
    const totalDatesShown = 42; // 6 rows * 7 days
    const daysFromNextMonth = totalDatesShown - prevMonthDates.length - currentMonthDates.length;
    const nextMonthDates = [];
    
    for (let i = 1; i <= daysFromNextMonth; i++) {
      nextMonthDates.push(new Date(year, month + 1, i));
    }
    
    // Combine all dates
    return [...prevMonthDates, ...currentMonthDates, ...nextMonthDates];
  };
  
  // Generate array of years for dropdown
  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    
    for (let i = currentYear - yearRange; i <= currentYear + yearRange; i++) {
      years.push(i);
    }
    
    return years;
  };
  
  // Event handlers for input and calendar
  const handleInputClick = () => {
    if (!disabled && !readOnly) {
      setIsOpen(!isOpen);
    }
  };
  
  const handleBlur = (e) => {
    if (onBlur) {
      onBlur(e);
    }
  };
  
  const handleFocus = (e) => {
    if (onFocus) {
      onFocus(e);
    }
  };
  
  // Close the calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarRef.current && 
        !calendarRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Synchronize with value prop changes
  useEffect(() => {
    const parsedDate = parseDate(value);
    if (parsedDate) {
      setSelectedDate(parsedDate);
      setViewDate(parsedDate);
    }
  }, [value]);
  
  // Classes
  const inputClasses = `block w-full rounded-lg border border-gray-200 bg-white sm:text-sm py-2.5 px-4 focus:border-primary focus:ring-primary focus:ring-1 focus:outline-none ${
    disabled ? 'opacity-50 pointer-events-none' : ''
  } ${className}`;
  
  const calendarContainerClasses = `w-80 flex flex-col bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden ${calendarClassName}`;
  
  const weekdayClasses = `m-px w-10 block text-center text-sm text-gray-500 ${weekdayClassName || ''}`;
  
  const dayButtonBaseClasses = "m-px size-10 flex justify-center items-center border border-transparent text-sm rounded-full focus:outline-hidden";
  
  // Generate calendar days
  const calendarDates = getDatesForCalendar();
  const calendarRows = [];
  
  // Arrange dates into rows (weeks)
  for (let i = 0; i < calendarDates.length; i += 7) {
    calendarRows.push(calendarDates.slice(i, i + 7));
  }
  
  return (
    <div className="relative">
      {/* Input field */}
      <input
        ref={combinedRef}
        id={id}
        name={name}
        type="text"
        value={selectedDate ? formatDate(selectedDate) : ''}
        placeholder={placeholderText}
        className={inputClasses}
        disabled={disabled}
        readOnly={true}
        required={required}
        onClick={handleInputClick}
        onBlur={handleBlur}
        onFocus={handleFocus}
        {...rest}
      />
      
      {/* Calendar Popup */}
      {isOpen && (
        <div 
          ref={calendarRef}
          className={calendarContainerClasses}
          style={{
            position: 'absolute',
            zIndex: 50,
            top: 'calc(100% + 0.5rem)',
            left: 0,
          }}
        >
          <div className="p-3 space-y-0.5">
            {/* Month and Year Header */}
            <div className="grid grid-cols-5 items-center gap-x-3 mx-1.5 pb-3">
              {/* Previous Month Button */}
              <div className="col-span-1">
                <button 
                  type="button"
                  className="size-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full focus:outline-hidden focus:bg-gray-100"
                  onClick={prevMonth}
                  aria-label="Previous month"
                >
                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"></path>
                  </svg>
                </button>
              </div>
              
              {/* Month and Year Dropdowns */}
              <div className="col-span-3 flex justify-center items-center gap-x-1">
                {/* Month Dropdown */}
                {showMonthDropdown ? (
                  <select
                    value={viewDate.getMonth()}
                    onChange={(e) => setMonth(parseInt(e.target.value))}
                    className={`cursor-pointer font-medium bg-transparent text-gray-800 focus:outline-hidden focus:text-primary ${monthClassName || ''}`}
                  >
                    {MONTHS.map((month, index) => (
                      <option key={month} value={index}>
                        {month}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className="font-medium text-gray-800">
                    {MONTHS[viewDate.getMonth()]}
                  </span>
                )}
                
                <span className="text-gray-800">/</span>
                
                {/* Year Dropdown */}
                {showYearDropdown ? (
                  <select
                    value={viewDate.getFullYear()}
                    onChange={(e) => setYear(parseInt(e.target.value))}
                    className="cursor-pointer font-medium bg-transparent text-gray-800 focus:outline-hidden focus:text-primary"
                  >
                    {getYearOptions().map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className="font-medium text-gray-800">
                    {viewDate.getFullYear()}
                  </span>
                )}
              </div>
              
              {/* Next Month Button */}
              <div className="col-span-1 flex justify-end">
                <button 
                  type="button"
                  className="size-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full focus:outline-hidden focus:bg-gray-100"
                  onClick={nextMonth}
                  aria-label="Next month"
                >
                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Weekdays Header */}
            <div className="flex pb-1.5">
              {WEEKDAYS.map((day) => (
                <span key={day} className={weekdayClasses}>
                  {day}
                </span>
              ))}
            </div>
            
            {/* Calendar Rows */}
            {calendarRows.map((week, rowIndex) => (
              <div key={`week-${rowIndex}`} className="flex">
                {week.map((date, colIndex) => {
                  const isSelected = isSelectedDate(date);
                  const isDisabled = isDisabledDate(date);
                  const isOutsideMonth = !isCurrentMonth(date);
                  
                  // Determine the button classes based on state
                  let dayClasses = [
                    dayButtonBaseClasses,
                    isSelected && `bg-primary border-transparent text-white hover:bg-primary-dark ${selectedDayClassName || ''}`,
                    isDisabled && `text-gray-400 cursor-not-allowed ${disabledDayClassName || ''}`,
                    !isSelected && !isDisabled && `text-gray-800 hover:border-primary hover:text-primary focus:border-primary focus:text-primary`,
                    isOutsideMonth && !isSelected && `text-gray-400 ${outsideDayClassName || ''}`,
                    dayClassName || ''
                  ].filter(Boolean).join(' ');
                  
                  return (
                    <div key={`day-${rowIndex}-${colIndex}`}>
                      <button
                        type="button"
                        className={dayClasses}
                        onClick={() => !isDisabled && handleDateSelect(date)}
                        disabled={isDisabled}
                      >
                        {date.getDate()}
                      </button>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

DatePicker.displayName = 'DatePicker';

DatePicker.propTypes = {
  /** Input id attribute */
  id: PropTypes.string,
  /** Input name attribute */
  name: PropTypes.string,
  /** Selected date value (string format) */
  value: PropTypes.string,
  /** Function called when date changes */
  onChange: PropTypes.func,
  /** Function called on input blur */
  onBlur: PropTypes.func,
  /** Function called on input focus */
  onFocus: PropTypes.func,
  /** Whether the input is disabled */
  disabled: PropTypes.bool,
  /** Whether the input is read-only */
  readOnly: PropTypes.bool,
  /** Whether the input is required */
  required: PropTypes.bool,
  /** Minimum selectable date */
  minDate: PropTypes.string,
  /** Maximum selectable date */
  maxDate: PropTypes.string,
  /** Placeholder text for the input */
  placeholderText: PropTypes.string,
  /** Format for displaying the date (MM/dd/yyyy by default) */
  dateFormat: PropTypes.string,
  /** Whether to show the month dropdown */
  showMonthDropdown: PropTypes.bool,
  /** Whether to show the year dropdown */
  showYearDropdown: PropTypes.bool,
  /** Number of years to show before and after current year */
  yearRange: PropTypes.number,
  /** Additional CSS class for the input */
  className: PropTypes.string,
  /** Additional CSS class for the calendar */
  calendarClassName: PropTypes.string,
  /** Additional CSS class for day buttons */
  dayClassName: PropTypes.string,
  /** Additional CSS class for month elements */
  monthClassName: PropTypes.string,
  /** Additional CSS class for weekday elements */
  weekdayClassName: PropTypes.string,
  /** Additional CSS class for the selected day */
  selectedDayClassName: PropTypes.string,
  /** Additional CSS class for disabled days */
  disabledDayClassName: PropTypes.string,
  /** Additional CSS class for days outside the current month */
  outsideDayClassName: PropTypes.string
};

export default DatePicker;