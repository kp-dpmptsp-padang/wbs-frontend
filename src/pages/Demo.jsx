import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Accordion, { AccordionItem } from '@/components/common/Accordion';
import Alert from '@/components/common/Alert';
import Avatar from '@/components/common/Avatar';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Carousel, { CarouselSlide } from '@/components/common/Carousel';
import CardSection from '@/components/common/CardSection'
import Chart from '@/components/common/Chart';
import ChatBubbles, { ChatBubble } from '@/components/common/ChatBubbles';
import Checkbox from '@/components/common/Checkbox';
import Clipboard from '@/components/common/Clipboard'; // Import the Clipboard component
import DatePicker from '@/components/common/DatePicker'; // Import DatePicker
import FileInput from '@/components/common/FileInput';
import FileUpload from '@/components/common/FileUpload';
import List, { ListItem } from '@/components/common/List';
import RadioButton from '@/components/common/RadioButton';
import RadioButtonGroup from '@/components/common/RadioButtonGroup';
import Input from '@/components/common/Input';
import Skeleton, {SkeletonItem, SkeletonText, SkeletonAvatar, SkeletonCard, SkeletonTable } from '@/components/common/Skeleton';
import Spinner, { SpinnerOverlay, FullscreenSpinner, ButtonSpinner } from '@/components/common/Spinner';
import TextArea from '@/components/common/TextArea';
import Table from '@/components/common/Table';
import Toast, { ToastContainer, useToast } from '@/components/common/Toast'; 

// import CheckboxGroup from '@/components/common/CheckboxGroup';

import Logo from '@/components/common/Logo';
import FeatureCard from '@/components/guest/FeatureCard';
import ReportCard from '@/components/user/ReportCard';

export default function Demo() {
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('buttons');
  const [selectedDate, setSelectedDate] = useState('');
  
  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };
  
  // Group components by category
  const componentCategories = [
    {
      title: 'Basic Elements',
      items: [
        { id: 'buttons', name: 'Buttons' },
        { id: 'badges', name: 'Badges' },
        { id: 'clipboards', name: 'Clipboards' }, // Added Clipboards section
        { id: 'alerts', name: 'Alerts' },
        { id: 'avatars', name: 'Avatars' },
        { id: 'logos', name: 'Logo' },
      ]
    },
    {
      title: 'Form Controls',
      items: [
        { id: 'inputs', name: 'Inputs' },
        { id: 'checkboxes', name: 'Checkboxes' },
        { id: 'radioButtons', name: 'Radio Buttons' },
        { id: 'selects', name: 'Select Dropdowns' },
        { id: 'textareas', name: 'Text Areas' },
        { id: 'datePickers', name: 'Date Pickers' },
        { id: 'fileInputs', name: 'File Inputs' },
        { id: 'fileUploads', name: 'File Uploads' },
      ]
    },
    {
      title: 'Layout Components',
      items: [
        { id: 'cards', name: 'Cards' },
        { id: 'carousel', name: 'Carousels' },
        { id: 'modals', name: 'Modals' },
        { id: 'tables', name: 'Tables' },
        { id: 'accordions', name: 'Accordions' },
        { id: 'lists', name: 'Lists' },
        { id: 'pagination', name: 'Pagination' },
      ]
    },
    {
      title: 'Feedback Components',
      items: [
        { id: 'spinners', name: 'Spinners' },
        { id: 'loadings', name: 'Loading Indicators' },
        { id: 'toasts', name: 'Toast Notifications' },
        { id: 'skeletons', name: 'Skeletons' }, // Add this line
        { id: 'statusIndicators', name: 'Status Indicators' },
      ]
    },
    {
      title: 'Data Display',
      items: [
        { id: 'charts', name: 'Charts' },
        { id: 'statCards', name: 'Stat Cards' },
        { id: 'chatBubbles', name: 'Chat Bubbles' },
      ]
    }
  ];
  
  // Render component section based on active selection
  const renderComponentSection = () => {
    switch(activeSection) {
      case 'accordions':
        return renderAccordionSection();
      case 'alerts':
        return renderAlertsSection();
      case 'avatars':
        return renderAvatarsSection();
      case 'badges':
        return renderBadgesSection();
      case 'buttons':
        return renderButtonsSection();
      case 'cards':
        return (
          <>
            {renderCardsSection()}
            {renderSpecializedCardsSection()}
            {renderCardSectionDemo()}
          </>
        );
      case 'carousel':
        return renderCarouselsSection();
      case 'charts':
        return renderChartsSection();
      case 'chatBubbles':
        return renderChatBubblesSection();
      case 'checkboxes':
        return renderCheckboxesSection();
      case 'clipboards':
        return renderClipboardsSection();
      case 'datePickers': // Add DatePickers case
        return renderDatePickersSection();
      case 'fileInputs':
        return renderFileInputsSection();
      case 'fileUploads':
        return renderFileUploadsSection();
      case 'lists':
        return renderListsSection();
      case 'radioButtons':
        return renderRadioButtonsSection();
      case 'inputs':
        return renderInputsSection();
      case 'skeletons':
        return renderSkeletonsSection();
      case 'spinners':
        return renderSpinnersSection();
      case 'textareas':
        return renderTextAreasSection();
      case 'logos':
        return renderLogosSection();
      case 'tables':
        return renderTablesSection();
      case 'toasts':
        return renderToastsSection();
      
      // Add more cases for other components
      default:
        return (
          <div className="p-6 bg-neutral-50 rounded-lg">
            <p className="text-neutral-600">Component demonstration will be added soon.</p>
          </div>
        );
    }
  };

  const renderAccordionSection = () => (
    <section>
      <div className="space-y-6">
        {/* Default Accordion */}
        <div>
          <h3 className="text-lg font-medium mb-3">Default Accordion</h3>
          <Accordion>
            <AccordionItem title="Accordion Item 1" defaultOpen>
              <p className="text-gray-600">
                This is the first item's accordion body. It is shown by default because of the defaultOpen prop.
              </p>
            </AccordionItem>
            <AccordionItem title="Accordion Item 2">
              <p className="text-gray-600">
                This is the second item's accordion body. It is hidden by default and opens when clicked.
              </p>
            </AccordionItem>
            <AccordionItem title="Accordion Item 3">
              <p className="text-gray-600">
                This is the third item's accordion body. You can put complex content here.
              </p>
            </AccordionItem>
          </Accordion>
        </div>
  
        {/* Bordered Accordion */}
        <div>
          <h3 className="text-lg font-medium mb-3">Bordered Accordion</h3>
          <Accordion variant="bordered">
            <AccordionItem title="Section 1: Introduction">
              <p className="text-gray-600">
                The introduction section provides an overview of the topic.
              </p>
            </AccordionItem>
            <AccordionItem title="Section 2: Main Content">
              <p className="text-gray-600">
                This section contains the primary information about the subject.
              </p>
            </AccordionItem>
            <AccordionItem title="Section 3: Conclusion">
              <p className="text-gray-600">
                The conclusion summarizes the key points discussed.
              </p>
            </AccordionItem>
          </Accordion>
        </div>
  
        {/* Card Style Accordion */}
        <div>
          <h3 className="text-lg font-medium mb-3">Card Style Accordion</h3>
          <Accordion variant="card">
            <AccordionItem title="FAQ Question 1">
              <p className="text-gray-600">
                Detailed answer to the first frequently asked question.
              </p>
            </AccordionItem>
            <AccordionItem title="FAQ Question 2">
              <p className="text-gray-600">
                Detailed answer to the second frequently asked question.
              </p>
            </AccordionItem>
            <AccordionItem title="FAQ Question 3" disabled>
              <p className="text-gray-600">
                This item is disabled and cannot be opened.
              </p>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
  
  const renderAlertsSection = () => (
    <section>
      <div className="space-y-6">
        {/* Basic Alerts */}
        <div>
          <h3 className="text-lg font-medium mb-3">Basic Alerts</h3>
          <div className="space-y-4">
            <Alert variant="info" title="Information">
              This is an informational alert message.
            </Alert>
            
            <Alert variant="success" title="Success">
              Operation completed successfully.
            </Alert>
            
            <Alert variant="warning" title="Warning">
              Please note this important warning.
            </Alert>
            
            <Alert variant="danger" title="Error">
              An error occurred while processing your request.
            </Alert>
          </div>
        </div>
        
        {/* Bordered Alerts */}
        <div>
          <h3 className="text-lg font-medium mb-3">Bordered Alerts</h3>
          <div className="space-y-4">
            <Alert variant="border-success" title="Successfully updated.">
              You have successfully updated your email preferences.
            </Alert>
            
            <Alert variant="border-danger" title="Error!">
              Your purchase has been declined.
            </Alert>
          </div>
        </div>
        
        {/* Card Style Alert */}
        <div>
          <h3 className="text-lg font-medium mb-3">Card Style Alert</h3>
          <Alert variant="card" title="New version published">
            Chris Lynch published a new version of this page. Refresh to see the changes.
          </Alert>
        </div>
        
        {/* Dismissible Alert */}
        <div>
          <h3 className="text-lg font-medium mb-3">Dismissible Alert</h3>
          <Alert 
            variant="info" 
            title="Dismissible Alert" 
            dismissible 
            onDismiss={() => alert('Alert dismissed!')}
          >
            This alert can be dismissed by clicking the X button.
          </Alert>
        </div>
        
        {/* Alert without Title */}
        <div>
          <h3 className="text-lg font-medium mb-3">Alert without Title</h3>
          <Alert variant="success">
            This is a simple alert without a title.
          </Alert>
        </div>
        
        {/* Alert without Icon */}
        <div>
          <h3 className="text-lg font-medium mb-3">Alert without Icon</h3>
          <Alert variant="warning" title="No Icon Alert" icon={null}>
            This alert has no icon.
          </Alert>
        </div>
      </div>
    </section>
  );

  const renderAvatarsSection = () => (
    <section>
      <div className="space-y-6">
        {/* Avatar Sizes */}
        <div>
          <h3 className="text-lg font-medium mb-3">Avatar Sizes</h3>
          <div className="flex flex-wrap items-end gap-4">
            <Avatar 
              size="xs" 
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
              alt="User Avatar"
            />
            <Avatar 
              size="sm" 
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
              alt="User Avatar"
            />
            <Avatar 
              size="md" 
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
              alt="User Avatar"
            />
            <Avatar 
              size="lg" 
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
              alt="User Avatar"
            />
            <Avatar 
              size="xl" 
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
              alt="User Avatar"
            />
            <Avatar 
              size="2xl" 
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
              alt="User Avatar"
            />
          </div>
        </div>
        
        {/* Avatar Shapes */}
        <div>
          <h3 className="text-lg font-medium mb-3">Avatar Shapes</h3>
          <div className="flex flex-wrap gap-4">
            <Avatar 
              size="lg" 
              shape="circle" 
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
              alt="Circle Avatar"
            />
            <Avatar 
              size="lg" 
              shape="square" 
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
              alt="Square Avatar"
            />
            <Avatar 
              size="lg" 
              shape="rounded" 
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
              alt="Rounded Avatar"
            />
          </div>
        </div>
        
        {/* Avatar with Status */}
        <div>
          <h3 className="text-lg font-medium mb-3">Avatar with Status</h3>
          <div className="flex flex-wrap gap-4">
            <Avatar 
              size="lg" 
              status="online"
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
              alt="Online User"
            />
            <Avatar 
              size="lg" 
              status="busy"
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
              alt="Busy User"
            />
            <Avatar 
              size="lg" 
              status="away"
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
              alt="Away User"
            />
            <Avatar 
              size="lg" 
              status="offline"
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
              alt="Offline User"
            />
          </div>
        </div>
        
        {/* Avatar with Status Position */}
        <div>
          <h3 className="text-lg font-medium mb-3">Status Position</h3>
          <div className="flex flex-wrap gap-4">
            <Avatar 
              size="lg" 
              status="online"
              statusPosition="top-right"
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
              alt="Status Top-Right"
            />
            <Avatar 
              size="lg" 
              status="online"
              statusPosition="top-left"
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
              alt="Status Top-Left"
            />
            <Avatar 
              size="lg" 
              status="online"
              statusPosition="bottom-right"
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
              alt="Status Bottom-Right"
            />
            <Avatar 
              size="lg" 
              status="online"
              statusPosition="bottom-left"
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
              alt="Status Bottom-Left"
            />
          </div>
        </div>
        
        {/* Fallback with Initials */}
        <div>
          <h3 className="text-lg font-medium mb-3">Fallback with Initials</h3>
          <div className="flex flex-wrap gap-4">
            <Avatar 
              size="lg" 
              alt="John Doe" 
            />
            <Avatar 
              size="lg" 
              alt="Jane Smith" 
            />
            <Avatar 
              size="lg" 
              initials="AB"
              fallbackClassName="bg-primary-light text-primary" 
            />
            <Avatar 
              size="lg" 
              initials="YZ"
              fallbackClassName="bg-red-100 text-red-600" 
            />
          </div>
        </div>
      </div>
    </section>
  );

  const renderBadgesSection = () => (
    <section>
      <div className="space-y-6">
        {/* Basic Variants */}
        <div>
          <h3 className="text-lg font-medium mb-3">Basic Variants</h3>
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="light">Light</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
          </div>
        </div>
        
        {/* Solid Variants */}
        <div>
          <h3 className="text-lg font-medium mb-3">Solid Variants</h3>
          <div className="flex flex-wrap gap-3">
            <Badge variant="primary-solid">Primary</Badge>
            <Badge variant="info-solid">Info</Badge>
            <Badge variant="success-solid">Success</Badge>
            <Badge variant="warning-solid">Warning</Badge>
            <Badge variant="danger-solid">Danger</Badge>
          </div>
        </div>
        
        {/* Outline Variants */}
        <div>
          <h3 className="text-lg font-medium mb-3">Outline Variants</h3>
          <div className="flex flex-wrap gap-3">
            <Badge variant="outline-default">Default</Badge>
            <Badge variant="outline-primary">Primary</Badge>
            <Badge variant="outline-info">Info</Badge>
            <Badge variant="outline-success">Success</Badge>
            <Badge variant="outline-warning">Warning</Badge>
            <Badge variant="outline-danger">Danger</Badge>
          </div>
        </div>
        
        {/* Sizes */}
        <div>
          <h3 className="text-lg font-medium mb-3">Sizes</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="primary" size="xs">Extra Small</Badge>
            <Badge variant="primary" size="sm">Small</Badge>
            <Badge variant="primary" size="md">Medium</Badge>
            <Badge variant="primary" size="lg">Large</Badge>
          </div>
        </div>
        
        {/* Shapes */}
        <div>
          <h3 className="text-lg font-medium mb-3">Shapes</h3>
          <div className="flex flex-wrap gap-3">
            <Badge variant="primary" shape="rounded">Rounded</Badge>
            <Badge variant="primary" shape="pill">Pill</Badge>
            <Badge variant="primary" shape="square">Square</Badge>
          </div>
        </div>
        
        {/* With Icons */}
        <div>
          <h3 className="text-lg font-medium mb-3">With Icons</h3>
          <div className="flex flex-wrap gap-3">
            <Badge 
              variant="success" 
              icon={
                <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              }
            >
              Verified
            </Badge>
            
            <Badge 
              variant="warning" 
              icon={
                <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                  <path d="M12 9v4"></path>
                  <path d="M12 17h.01"></path>
                </svg>
              }
            >
              Warning
            </Badge>
            
            <Badge 
              variant="danger" 
              icon={
                <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              }
            >
              Error
            </Badge>
          </div>
        </div>
        
        {/* Notification Dot */}
        <div>
          <h3 className="text-lg font-medium mb-3">Notification Dot</h3>
          <div className="flex flex-wrap gap-6">
            <div className="relative">
              <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                </svg>
                Notifications
              </button>
              <Badge dot variant="danger" />
            </div>
            
            <div className="relative">
              <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                  <line x1="3" x2="21" y1="9" y2="9"></line>
                  <path d="m9 16 2 2 4-4"></path>
                </svg>
                Tasks
              </button>
              <Badge dot variant="primary" />
            </div>
            
            <div className="relative">
              <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Messages
              </button>
              <Badge dot variant="success" />
            </div>
          </div>
        </div>
        
        {/* Count Badge */}
        <div>
          <h3 className="text-lg font-medium mb-3">Count Badge</h3>
          <div className="flex flex-wrap gap-6">
            <div className="relative">
              <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                </svg>
                Notifications
              </button>
              <Badge count={5} variant="danger" />
            </div>
            
            <div className="relative">
              <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                  <line x1="3" x2="21" y1="9" y2="9"></line>
                  <path d="m9 16 2 2 4-4"></path>
                </svg>
                Tasks
              </button>
              <Badge count={12} variant="primary" />
            </div>
            
            <div className="relative">
              <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Messages
              </button>
              <Badge count={150} maxCount={99} variant="success" />
            </div>
          </div>
        </div>
        
        {/* Interactive Badge */}
        <div>
          <h3 className="text-lg font-medium mb-3">Interactive Badge</h3>
          <div className="flex flex-wrap gap-3">
            <Badge 
              variant="primary" 
              onClick={() => alert('Badge clicked!')}
            >
              Click Me
            </Badge>
            
            <Badge 
              variant="danger-solid" 
              onClick={() => alert('Badge clicked!')}
            >
              Clickable
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
  
  const renderButtonsSection = () => (
    <section>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Variants</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline-primary">Outline Primary</Button>
          <Button variant="ghost-primary">Ghost Primary</Button>
          <Button variant="success">Success</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="warning">Warning</Button>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Sizes</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" size="small">Small</Button>
          <Button variant="primary" size="default">Default</Button>
          <Button variant="primary" size="large">Large</Button>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">States</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" loading={loading} onClick={simulateLoading}>
            {loading ? 'Loading...' : 'Click to Load'}
          </Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="outline-primary" disabled>Disabled Outline</Button>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Block Button</h3>
        <div className="space-y-2 max-w-md">
          <Button variant="primary" block>Block Primary</Button>
          <Button variant="outline-primary" block>Block Outline</Button>
        </div>
      </div>
    </section>
  );
  
  const renderCardsSection = () => {
    return (
      <section>
        <div className="space-y-8">
          {/* Basic Cards */}
          <div>
            <h3 className="text-lg font-medium mb-3">Basic Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Default Card" subtitle="With title and subtitle">
                <p className="text-gray-600">
                  This is a basic card with a title and subtitle. Cards are used to group and display content in a way that's easily readable.
                </p>
              </Card>
              
              <Card>
                <p className="text-gray-600">
                  This is a simple card without a header or footer. It only contains body content.
                </p>
              </Card>
            </div>
          </div>
          
          {/* Card Variants */}
          <div>
            <h3 className="text-lg font-medium mb-3">Card Variants</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card title="Default" variant="default">
                <p className="text-gray-600">
                  Standard card with border and light shadow
                </p>
              </Card>
              
              <Card title="Elevated" variant="elevated">
                <p className="text-gray-600">
                  Card with a stronger shadow effect
                </p>
              </Card>
              
              <Card title="Outline" variant="outline">
                <p className="text-gray-600">
                  Card with border only, no shadow
                </p>
              </Card>
              
              <Card title="Flat" variant="flat">
                <p className="text-gray-600">
                  Card with no border or shadow
                </p>
              </Card>
              
              <Card title="Primary" variant="primary">
                <p className="text-gray-600">
                  Card with primary color accent
                </p>
              </Card>
              
              <Card title="Danger" variant="danger">
                <p className="text-gray-600">
                  Card with danger color accent
                </p>
              </Card>
            </div>
          </div>
          
          {/* Card Sizes */}
          <div>
            <h3 className="text-lg font-medium mb-3">Card Sizes</h3>
            <div className="space-y-6">
              <Card title="Small Card" size="sm">
                <p className="text-gray-600">
                  This card uses the small size option with reduced padding.
                </p>
              </Card>
              
              <Card title="Default Card" size="default">
                <p className="text-gray-600">
                  This card uses the default size option with standard padding.
                </p>
              </Card>
              
              <Card title="Large Card" size="lg">
                <p className="text-gray-600">
                  This card uses the large size option with increased padding.
                </p>
              </Card>
            </div>
          </div>
          
          {/* Interactive Cards */}
          <div>
            <h3 className="text-lg font-medium mb-3">Interactive Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card 
                title="Hoverable Card" 
                hoverable={true}
              >
                <p className="text-gray-600">
                  Hover over this card to see a shadow effect.
                </p>
              </Card>
              
              <Card 
                title="Clickable Card" 
                clickable={true}
                onClick={() => alert('Card clicked!')}
              >
                <p className="text-gray-600">
                  Click this card to trigger an action.
                </p>
              </Card>
            </div>
          </div>
          
          {/* Cards with Footer */}
          <div>
            <h3 className="text-lg font-medium mb-3">Cards with Footer</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card 
                title="Card with Action Buttons"
                footer={
                  <div className="flex justify-end gap-2">
                    <Button variant="outline-primary" size="small">Cancel</Button>
                    <Button variant="primary" size="small">Submit</Button>
                  </div>
                }
              >
                <p className="text-gray-600">
                  This card includes a footer with action buttons.
                </p>
              </Card>
              
              <Card 
                title="Card with Info Footer"
                footer={
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Last updated: 2 hours ago</span>
                    <span className="text-sm font-medium text-primary">3 comments</span>
                  </div>
                }
              >
                <p className="text-gray-600">
                  This card includes a footer with status information.
                </p>
              </Card>
            </div>
          </div>
          
          {/* Complex Card Examples */}
          <div>
            <h3 className="text-lg font-medium mb-3">Complex Card Examples</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Report Card */}
              <Card 
                headerContent={
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Incident Report #12345</h3>
                      <p className="text-sm text-gray-500">Submitted on March 7, 2025</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      In Progress
                    </span>
                  </div>
                }
                footer={
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Avatar size="sm" />
                      <span className="text-sm font-medium text-gray-700">Assigned to: J. Smith</span>
                    </div>
                    <Button variant="outline-primary" size="small">View Details</Button>
                  </div>
                }
                variant="elevated"
              >
                <div className="space-y-3">
                  <p className="text-gray-600">
                    Issue reported in the Accounting department regarding inconsistencies in financial records for Q1 2025.
                  </p>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      Finance
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Est. 3 days
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      2 Attachments
                    </span>
                  </div>
                </div>
              </Card>
              
              {/* User Profile Card */}
              <Card 
                variant="outline"
                className="flex flex-col"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Avatar 
                    size="lg"
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                    alt="User"
                    status="online"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">James Wilson</h3>
                    <p className="text-sm text-gray-500">Compliance Officer</p>
                    <div className="mt-1 flex items-center">
                      <span className="text-sm text-gray-500">Employee ID: WB-78954</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Department</p>
                    <p className="text-sm font-medium text-gray-800">Legal & Compliance</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Role</p>
                    <p className="text-sm font-medium text-gray-800">Administrator</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-800">j.wilson@example.com</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium text-gray-800">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="mt-auto pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Last active: Today, 9:42 AM</p>
                    <div className="flex gap-2">
                      <Button variant="outline-primary" size="small">Message</Button>
                      <Button variant="primary" size="small">View Profile</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderSpecializedCardsSection = () => {
    return (
      <section>
        <div className="space-y-8">
          {/* Feature Cards (Homepage) */}
          <div>
            <h3 className="text-lg font-medium mb-3">Feature Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard 
                title="Kerahasiaan Identitas"
                description="Jaminan Privasi Absolut untuk Keamanan Anda"
                icon={
                  <svg className="size-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
                bgColor="bg-primary-dark"
              />
              
              <FeatureCard 
                title="Pelacakan Laporan"
                description="Pantau Status Laporan Anda Secara Langsung"
                icon={
                  <svg className="size-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                }
                bgColor="bg-primary-dark"
              />
              
              <FeatureCard 
                title="Komunikasi Dua Arah"
                description="Dialog Aman dengan Tim Penangan"
                icon={
                  <svg className="size-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                }
                bgColor="bg-primary-dark"
              />
              
              <FeatureCard 
                title="Proses Terstruktur"
                description="Proses Verifikasi Secara Profesional dan Terstandar"
                icon={
                  <svg className="size-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                }
                bgColor="bg-primary-dark"
              />
            </div>
          </div>
          
          {/* Report Cards (Monitoring Page) */}
          <div>
            <h3 className="text-lg font-medium mb-3">Report Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <ReportCard 
                title="Tindakan Korupsi Oleh Oknum Pejabat"
                date="12 Oktober lalu"
                description="Terjadi pada 12 Oktober lalu, saya rasa melihat seorang pejabat menerima suap di mana ia mendapatkan duit untuk menyelak antrian pelayanan publik."
                status="menunggu-verifikasi"
                onClick={(action) => console.log(`${action} clicked`)}
              />
              
              <ReportCard 
                title="Tindakan Korupsi Oleh Oknum Pejabat"
                date="12 Oktober lalu"
                description="Terjadi pada 12 Oktober lalu, saya rasa melihat seorang pejabat menerima suap di mana ia mendapatkan duit untuk menyelak antrian pelayanan publik."
                status="sedang-diproses"
                onClick={(action) => console.log(`${action} clicked`)}
              />
              
              <ReportCard 
                title="Tindakan Korupsi Oleh Oknum Pejabat"
                date="12 Oktober lalu"
                description="Terjadi pada 12 Oktober lalu, saya rasa melihat seorang pejabat menerima suap di mana ia mendapatkan duit untuk menyelak antrian pelayanan publik."
                status="selesai"
                onClick={(action) => console.log(`${action} clicked`)}
              />
              
              <ReportCard 
                title="Tindakan Korupsi Oleh Oknum Pejabat"
                date="12 Oktober lalu"
                description="Terjadi pada 12 Oktober lalu, saya rasa melihat seorang pejabat menerima suap di mana ia mendapatkan duit untuk menyelak antrian pelayanan publik."
                status="ditolak"
                onClick={(action) => console.log(`${action} clicked`)}
              />
              
              <ReportCard 
                title="Tindakan Korupsi Oleh Oknum Pejabat"
                date="12 Oktober lalu"
                description="Terjadi pada 12 Oktober lalu, saya rasa melihat seorang pejabat menerima suap di mana ia mendapatkan duit untuk menyelak antrian pelayanan publik."
                status="sedang-diproses"
                hasNewMessages={true}
                onClick={(action) => console.log(`${action} clicked`)}
              />
            </div>
          </div>
          
          {/* Grid Layout Example */}
          <div>
            <h3 className="text-lg font-medium mb-3">Responsive Layout Example</h3>
            <p className="mb-4 text-sm text-gray-600">
              Example of homepage "Fitur Utama" layout with feature cards in a grid
            </p>
            
            <div className="p-6 bg-gray-100 rounded-lg">
              <h2 className="text-2xl font-bold text-center text-primary-dark mb-8">Fitur Utama</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FeatureCard 
                  title="Kerahasiaan Identitas"
                  description="Jaminan Privasi Absolut untuk Keamanan Anda"
                  icon={
                    <svg className="size-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  }
                  bgColor="bg-primary-dark"
                />
                
                <FeatureCard 
                  title="Pelacakan Laporan"
                  description="Pantau Status Laporan Anda Secara Langsung"
                  icon={
                    <svg className="size-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  }
                  bgColor="bg-primary-dark"
                />
                
                <FeatureCard 
                  title="Komunikasi Dua Arah"
                  description="Dialog Aman dengan Tim Penangan"
                  icon={
                    <svg className="size-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  }
                  bgColor="bg-primary-dark"
                />
                
                <FeatureCard 
                  title="Proses Terstruktur"
                  description="Proses Verifikasi Secara Profesional dan Terstandar"
                  icon={
                    <svg className="size-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  }
                  bgColor="bg-primary-dark"
                />
              </div>
            </div>
          </div>
          
          {/* Report List Example */}
          <div>
            <h3 className="text-lg font-medium mb-3">Report List Example</h3>
            <p className="mb-4 text-sm text-gray-600">
              Example of "Laporan Saya" page layout with report cards
            </p>
            
            <div className="p-6 bg-gray-100 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Laporan Saya</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ReportCard 
                  title="Tindakan Korupsi Oleh Oknum Pejabat"
                  date="12 Oktober lalu"
                  description="Terjadi pada 12 Oktober lalu, saya rasa melihat seorang pejabat menerima suap di mana ia mendapatkan duit untuk menyelak antrian pelayanan publik."
                  status="menunggu-verifikasi"
                  onClick={(action) => console.log(`${action} clicked`)}
                />
                
                <ReportCard 
                  title="Tindakan Korupsi Oleh Oknum Pejabat"
                  date="12 Oktober lalu"
                  description="Terjadi pada 12 Oktober lalu, saya rasa melihat seorang pejabat menerima suap di mana ia mendapatkan duit untuk menyelak antrian pelayanan publik."
                  status="sedang-diproses"
                  hasNewMessages={true}
                  onClick={(action) => console.log(`${action} clicked`)}
                />
                
                <ReportCard 
                  title="Tindakan Korupsi Oleh Oknum Pejabat"
                  date="12 Oktober lalu"
                  description="Terjadi pada 12 Oktober lalu, saya rasa melihat seorang pejabat menerima suap di mana ia mendapatkan duit untuk menyelak antrian pelayanan publik."
                  status="sedang-diproses"
                  onClick={(action) => console.log(`${action} clicked`)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderCardSectionDemo = () => {
    // Sample cards data
    const apiCards = [
      {
        id: 1,
        bgColor: 'bg-blue-600',
        image: (
          <svg className="size-28" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="56" height="56" rx="10" fill="white"/>
            <path d="M20.2819 26.7478C20.1304 26.5495 19.9068 26.4194 19.6599 26.386C19.4131 26.3527 19.1631 26.4188 18.9647 26.5698C18.848 26.6622 18.7538 26.78 18.6894 26.9144L10.6019 43.1439C10.4874 43.3739 10.4686 43.6401 10.5496 43.884C10.6307 44.1279 10.805 44.3295 11.0342 44.4446C11.1681 44.5126 11.3163 44.5478 11.4664 44.5473H22.7343C22.9148 44.5519 23.0927 44.5037 23.2462 44.4084C23.3998 44.3132 23.5223 44.1751 23.5988 44.011C26.0307 38.9724 24.5566 31.3118 20.2819 26.7478Z" fill="url(#paint0_linear_2204_541)"/>
            <path d="M28.2171 11.9791C26.201 15.0912 25.026 18.6755 24.8074 22.3805C24.5889 26.0854 25.3342 29.7837 26.9704 33.1126L32.403 44.0113C32.4833 44.1724 32.6067 44.3079 32.7593 44.4026C32.912 44.4973 33.088 44.5475 33.2675 44.5476H44.5331C44.6602 44.5479 44.7861 44.523 44.9035 44.4743C45.0209 44.4257 45.1276 44.3543 45.2175 44.2642C45.3073 44.1741 45.3785 44.067 45.427 43.9492C45.4755 43.8314 45.5003 43.7052 45.5 43.5777C45.5001 43.4274 45.4659 43.2791 45.3999 43.1441L29.8619 11.9746C29.7881 11.8184 29.6717 11.6864 29.5261 11.594C29.3805 11.5016 29.2118 11.4525 29.0395 11.4525C28.8672 11.4525 28.6984 11.5016 28.5529 11.594C28.4073 11.6864 28.2908 11.8184 28.2171 11.9746V11.9791Z" fill="#2684FF"/>
            <defs>
            <linearGradient id="paint0_linear_2204_541" x1="24.734" y1="29.2284" x2="16.1543" y2="44.0429" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0052CC"/>
            <stop offset="0.92" stopColor="#2684FF"/>
            </linearGradient>
            </defs>
          </svg>
        ),
        tag: 'Atlassian API',
        tagColor: 'text-blue-600',
        title: 'Atlassian',
        description: 'A software that develops products for software developers and developments.',
        actions: [
          { text: 'View sample', href: '#' },
          { text: 'View API', href: '#' }
        ]
      },
      {
        id: 2,
        bgColor: 'bg-rose-500',
        image: (
          <svg className="size-28" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="56" height="56" rx="10" fill="white"/>
            <g clipPath="url(#clip0_2204_541)">
            <path d="M37.0409 28.8697C33.1968 28.8697 30.0811 31.9854 30.0811 35.8288C30.0811 39.6726 33.1968 42.789 37.0409 42.789C40.8843 42.789 44 39.6726 44 35.8288C44 31.9854 40.8843 28.8697 37.0409 28.8697ZM18.9594 28.8701C15.116 28.8704 12 31.9854 12 35.8292C12 39.6726 15.116 42.7886 18.9594 42.7886C22.8032 42.7886 25.9192 39.6726 25.9192 35.8292C25.9192 31.9854 22.8032 28.8701 18.9591 28.8701H18.9594ZM34.9595 20.1704C34.9595 24.0138 31.8438 27.1305 28.0004 27.1305C24.1563 27.1305 21.0406 24.0138 21.0406 20.1704C21.0406 16.3269 24.1563 13.2109 28.0003 13.2109C31.8438 13.2109 34.9591 16.3269 34.9591 20.1704H34.9595Z" fill="url(#paint0_radial_2204_541)"/>
            </g>
            <defs>
            <radialGradient id="paint0_radial_2204_541" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(28.0043 29.3944) scale(21.216 19.6102)">
            <stop offset="0%" stopColor="#FFB900"/>
            <stop offset="0.6" stopColor="#F95D8F"/>
            <stop offset="0.999" stopColor="#F95353"/>
            </radialGradient>
            <clipPath id="clip0_2204_541">
            <rect width="32" height="29.5808" fill="white" transform="translate(12 13.2096)"/>
            </clipPath>
            </defs>
          </svg>
        ),
        tag: 'Asana API',
        tagColor: 'text-rose-600',
        title: 'Asana',
        description: 'Track tasks and projects, use agile boards, measure progress.',
        actions: [
          { text: 'View sample', href: '#' },
          { text: 'View API', href: '#' }
        ]
      },
      {
        id: 3,
        bgColor: 'bg-amber-500',
        image: (
          <svg className="size-28" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="56" height="56" rx="10" fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M23.7326 11.968C21.9637 11.9693 20.5321 13.4049 20.5334 15.1738C20.5321 16.9427 21.965 18.3782 23.7339 18.3795H26.9345V15.1751C26.9358 13.4062 25.5029 11.9706 23.7326 11.968C23.7339 11.968 23.7339 11.968 23.7326 11.968M23.7326 20.5184H15.2005C13.4316 20.5197 11.9987 21.9553 12 23.7242C11.9974 25.4931 13.4303 26.9286 15.1992 26.9312H23.7326C25.5016 26.9299 26.9345 25.4944 26.9332 23.7255C26.9345 21.9553 25.5016 20.5197 23.7326 20.5184V20.5184Z" fill="#36C5F0"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M44.0001 23.7242C44.0014 21.9553 42.5684 20.5197 40.7995 20.5184C39.0306 20.5197 37.5977 21.9553 37.599 23.7242V26.9312H40.7995C42.5684 26.9299 44.0014 25.4944 44.0001 23.7242ZM35.4666 23.7242V15.1738C35.4679 13.4062 34.0363 11.9706 32.2674 11.968C30.4985 11.9693 29.0656 13.4049 29.0669 15.1738V23.7242C29.0643 25.4931 30.4972 26.9286 32.2661 26.9312C34.035 26.9299 35.4679 25.4944 35.4666 23.7242Z" fill="#2EB67D"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M32.2661 44.0322C34.035 44.0309 35.4679 42.5953 35.4666 40.8264C35.4679 39.0575 34.035 37.622 32.2661 37.6207H29.0656V40.8264C29.0642 42.594 30.4972 44.0295 32.2661 44.0322ZM32.2661 35.4804H40.7995C42.5684 35.4791 44.0013 34.0436 44 32.2747C44.0026 30.5058 42.5697 29.0702 40.8008 29.0676H32.2674C30.4985 29.0689 29.0656 30.5045 29.0669 32.2734C29.0656 34.0436 30.4972 35.4791 32.2661 35.4804V35.4804Z" fill="#ECB22E"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M12 32.2746C11.9987 34.0435 13.4316 35.479 15.2005 35.4804C16.9694 35.479 18.4024 34.0435 18.401 32.2746V29.0688H15.2005C13.4316 29.0702 11.9987 30.5057 12 32.2746ZM20.5334 32.2746V40.825C20.5308 42.5939 21.9637 44.0295 23.7326 44.0321C25.5016 44.0308 26.9345 42.5952 26.9332 40.8263V32.2772C26.9358 30.5083 25.5029 29.0728 23.7339 29.0702C21.9637 29.0702 20.5321 30.5057 20.5334 32.2746C20.5334 32.2759 20.5334 32.2746 20.5334 32.2746Z" fill="#E01E5A"/>
          </svg>
        ),
        tag: 'Slack API',
        tagColor: 'text-amber-500',
        title: 'Slack',
        description: 'Email collaboration and email service desk made easy.',
        actions: [
          { text: 'View sample', href: '#' },
          { text: 'View API', href: '#' }
        ]
      }
    ];
  
    // WBS themed cards
    const wbsCards = [
      {
        id: 1,
        bgColor: 'bg-primary',
        image: <div className="text-white text-5xl font-bold flex items-center justify-center h-full">WBS</div>,
        tag: 'Pelaporan',
        tagColor: 'text-primary',
        title: 'Buat Laporan',
        description: 'Laporkan dugaan pelanggaran atau penyimpangan yang terjadi di lingkungan DPMPTSP.',
        actions: [
          { text: 'Buat Laporan', href: '/report/create' }
        ]
      },
      {
        id: 2,
        bgColor: 'bg-secondary',
        image: <div className="text-white text-5xl font-bold flex items-center justify-center h-full">FAQ</div>,
        tag: 'Informasi',
        tagColor: 'text-secondary',
        title: 'Tanya Jawab',
        description: 'Temukan jawaban atas pertanyaan umum seputar Whistle Blowing System.',
        actions: [
          { text: 'Lihat FAQ', href: '/faq' }
        ]
      },
      {
        id: 3,
        bgColor: 'bg-success',
        image: <div className="text-white text-5xl font-bold flex items-center justify-center h-full">CEK</div>,
        tag: 'Status',
        tagColor: 'text-success',
        title: 'Cek Status Laporan',
        description: 'Pantau status laporan yang telah Anda kirimkan melalui sistem WBS.',
        actions: [
          { text: 'Cek Status', href: '/report/status' }
        ]
      }
    ];
  
    // Image cards
    const imageCards = [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1633613286991-611fe299c4be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        title: 'Transparansi',
        description: 'Membangun tata kelola yang transparan dan akuntabel.',
        actions: [
          { text: 'Pelajari Lebih Lanjut', href: '#' }
        ]
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        title: 'Integritas',
        description: 'Komitmen terhadap nilai-nilai integritas dan kejujuran dalam pelayanan publik.',
        actions: [
          { text: 'Pelajari Lebih Lanjut', href: '#' }
        ]
      },
      {
        id: 3,
        image: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        title: 'Akuntabilitas',
        description: 'Memastikan pertanggungjawaban dalam setiap kebijakan dan tindakan.',
        actions: [
          { text: 'Pelajari Lebih Lanjut', href: '#' }
        ]
      }
    ];
    
    // Simple cards without images
    const simpleCards = [
      {
        id: 1,
        tag: 'Dokumentasi',
        tagColor: 'text-blue-600',
        title: 'Panduan Pengguna',
        description: 'Temukan cara menggunakan sistem Whistle Blowing dengan mudah dan efektif.',
        actions: [
          { text: 'Baca Panduan', href: '#' }
        ]
      },
      {
        id: 2,
        tag: 'Regulasi',
        tagColor: 'text-green-600',
        title: 'Dasar Hukum',
        description: 'Informasi mengenai peraturan dan dasar hukum yang melandasi sistem WBS.',
        actions: [
          { text: 'Lihat Regulasi', href: '#' }
        ]
      },
      {
        id: 3,
        tag: 'Keamanan',
        tagColor: 'text-red-600',
        title: 'Kerahasiaan Data',
        description: 'Kebijakan perlindungan data dan kerahasiaan identitas pelapor.',
        actions: [
          { text: 'Pelajari Kebijakan', href: '#' }
        ]
      }
    ];
  
    // Custom styled cards with different border and shadow
    const customStyledCards = [
      {
        id: 1,
        title: 'Alur Pelaporan',
        description: 'Proses pelaporan mulai dari pengisian formulir hingga penyelesaian kasus.',
        content: (
          <div className="mt-4">
            <ol className="space-y-2">
              <li className="flex items-center">
                <span className="bg-blue-100 text-blue-800 font-medium mr-2 px-2.5 py-0.5 rounded-full">1</span>
                <span>Isi formulir laporan</span>
              </li>
              <li className="flex items-center">
                <span className="bg-blue-100 text-blue-800 font-medium mr-2 px-2.5 py-0.5 rounded-full">2</span>
                <span>Verifikasi oleh admin</span>
              </li>
              <li className="flex items-center">
                <span className="bg-blue-100 text-blue-800 font-medium mr-2 px-2.5 py-0.5 rounded-full">3</span>
                <span>Proses penyelidikan</span>
              </li>
              <li className="flex items-center">
                <span className="bg-blue-100 text-blue-800 font-medium mr-2 px-2.5 py-0.5 rounded-full">4</span>
                <span>Penyelesaian kasus</span>
              </li>
            </ol>
          </div>
        ),
        actions: [
          { text: 'Lihat Detail', href: '#' }
        ]
      },
      {
        id: 2,
        title: 'Statistik Laporan',
        description: 'Data statistik laporan yang telah masuk dan diselesaikan.',
        content: (
          <div className="mt-4 space-y-3">
            <div className="flex justify-between">
              <span>Total Laporan</span>
              <span className="font-semibold">124</span>
            </div>
            <div className="flex justify-between">
              <span>Dalam Proses</span>
              <span className="font-semibold">36</span>
            </div>
            <div className="flex justify-between">
              <span>Selesai</span>
              <span className="font-semibold">82</span>
            </div>
            <div className="flex justify-between">
              <span>Ditolak</span>
              <span className="font-semibold">6</span>
            </div>
          </div>
        ),
        actions: [
          { text: 'Lihat Statistik Lengkap', href: '#' }
        ]
      },
      {
        id: 3,
        title: 'Tim Pengelola',
        description: 'Informasi tentang tim yang mengelola sistem Whistle Blowing.',
        content: (
          <div className="mt-4 space-y-3">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
              <div>
                <div className="font-medium">Admin Verifikator</div>
                <div className="text-sm text-gray-500">Verifikasi awal laporan</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
              <div>
                <div className="font-medium">Tim Investigasi</div>
                <div className="text-sm text-gray-500">Menindaklanjuti laporan</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
              <div>
                <div className="font-medium">Pimpinan</div>
                <div className="text-sm text-gray-500">Pengambilan keputusan</div>
              </div>
            </div>
          </div>
        ),
        actions: [
          { text: 'Lihat Struktur Organisasi', href: '#' }
        ]
      }
    ];
  
    return (
      <div className="space-y-16">
        {/* API Integration Cards Demo */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">API Integration Cards Example</h2>
          <CardSection 
            title="API Integrations"
            subtitle="Connect with third-party services through our API integrations"
            cards={apiCards}
            columns={3}
            rounded="xl"
            shadow="2xs"
          />
        </div>
  
        {/* WBS Themed Cards Demo */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">WBS Themed Cards Example</h2>
          <CardSection 
            title="Whistle Blowing System"
            subtitle="Sistem pelaporan pelanggaran untuk mewujudkan tata kelola yang bersih"
            cards={wbsCards}
            columns={3}
            padding="default"
          />
        </div>
  
        {/* Image Cards Demo */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Image Cards Example</h2>
          <CardSection 
            title="Nilai-Nilai Kami"
            subtitle="Prinsip yang mendasari Whistle Blowing System"
            cards={imageCards}
            columns={3}
            gap={8}
            rounded="lg"
          />
        </div>
  
        {/* Simple Cards Without Images */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Simple Cards (No Images)</h2>
          <CardSection 
            title="Informasi Tambahan"
            subtitle="Temukan berbagai informasi penting terkait Whistle Blowing System"
            cards={simpleCards}
            columns={3}
            shadow="md"
            padding="small"
          />
        </div>
  
        {/* Custom Styled Cards */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Custom Styled Cards</h2>
          <CardSection 
            title="Informasi Sistem"
            subtitle="Pelajari lebih lanjut tentang sistem Whistle Blowing"
            cards={customStyledCards}
            columns={3}
            rounded="md"
            shadow="lg"
            border={true}
            bodyClassName="p-5"
            cardClassName="hover:border-primary transition-colors duration-300"
          />
        </div>
  
        {/* Single Column Layout */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Single Column Layout</h2>
          <CardSection 
            title="Kontak Kami"
            subtitle="Hubungi kami untuk informasi lebih lanjut"
            cards={[{
              id: 1,
              bgColor: 'bg-indigo-500',
              image: <div className="text-white text-5xl font-bold flex items-center justify-center h-full">📞</div>,
              title: "Kontak Layanan WBS",
              description: "Silakan hubungi kami melalui telepon, email, atau kunjungi kantor kami untuk informasi lebih lanjut tentang sistem Whistle Blowing.",
              content: (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                    <span>(+62) 123-4567-890</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                    <span>wbs@dpmptsp.example.com</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                    <span>Jl. Contoh No. 123, Kota Padang</span>
                  </div>
                </div>
              ),
              actions: [
                { text: 'Kirim Pesan', href: '/contact' }
              ]
            }]}
            columns={1}
            rounded="xl"
            maxWidth="60rem"
          />
        </div>
      </div>
    );
  };

  const renderCarouselsSection = () => (
    <section>
      <div className="space-y-10">
        {/* Basic Carousel */}
        <div>
          <h3 className="text-lg font-medium mb-3">Basic Carousel</h3>
          <Carousel className="h-64">
            <CarouselSlide>
              <div className="flex justify-center items-center h-full bg-gray-100 p-6">
                <span className="text-3xl text-gray-800">First Slide</span>
              </div>
            </CarouselSlide>
            <CarouselSlide>
              <div className="flex justify-center items-center h-full bg-gray-200 p-6">
                <span className="text-3xl text-gray-800">Second Slide</span>
              </div>
            </CarouselSlide>
            <CarouselSlide>
              <div className="flex justify-center items-center h-full bg-gray-300 p-6">
                <span className="text-3xl text-gray-800">Third Slide</span>
              </div>
            </CarouselSlide>
          </Carousel>
        </div>
        
        {/* Autoplay Carousel */}
        <div>
          <h3 className="text-lg font-medium mb-3">Autoplay Carousel</h3>
          <Carousel 
            className="h-64" 
            autoplay={true} 
            autoplayInterval={3000}
            dotStyle="primary"
          >
            <CarouselSlide>
              <div className="flex justify-center items-center h-full bg-blue-100 p-6">
                <span className="text-2xl text-blue-800">Auto Slide 1</span>
              </div>
            </CarouselSlide>
            <CarouselSlide>
              <div className="flex justify-center items-center h-full bg-blue-200 p-6">
                <span className="text-2xl text-blue-800">Auto Slide 2</span>
              </div>
            </CarouselSlide>
            <CarouselSlide>
              <div className="flex justify-center items-center h-full bg-blue-300 p-6">
                <span className="text-2xl text-blue-800">Auto Slide 3</span>
              </div>
            </CarouselSlide>
          </Carousel>
          <p className="text-sm text-gray-500 mt-2">This carousel automatically advances every 3 seconds</p>
        </div>
        
        {/* Fade Transition */}
        <div>
          <h3 className="text-lg font-medium mb-3">Fade Transition</h3>
          <Carousel 
            className="h-64" 
            transition="fade"
            dotStyle="light"
            dotPosition="top"
          >
            <CarouselSlide>
              <div className="flex justify-center items-center h-full bg-green-100 p-6">
                <span className="text-2xl text-green-800">Fade Slide 1</span>
              </div>
            </CarouselSlide>
            <CarouselSlide>
              <div className="flex justify-center items-center h-full bg-green-200 p-6">
                <span className="text-2xl text-green-800">Fade Slide 2</span>
              </div>
            </CarouselSlide>
            <CarouselSlide>
              <div className="flex justify-center items-center h-full bg-green-300 p-6">
                <span className="text-2xl text-green-800">Fade Slide 3</span>
              </div>
            </CarouselSlide>
          </Carousel>
        </div>
        
        {/* Carousel with Content */}
        <div>
          <h3 className="text-lg font-medium mb-3">Carousel with Content</h3>
          <Carousel 
            className="h-80" 
            arrowSize="lg"
            dotPosition="bottom-outside"
          >
            <CarouselSlide>
              <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-8 text-center">
                <h4 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Whistle Blowing System</h4>
                <p className="text-gray-600 max-w-md">Our secure platform ensures your reports are handled with complete confidentiality and professionalism.</p>
              </div>
            </CarouselSlide>
            <CarouselSlide>
              <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-8 text-center">
                <h4 className="text-2xl font-bold text-gray-800 mb-4">How It Works</h4>
                <div className="flex justify-center gap-8 mt-4">
                  <div className="text-center">
                    <div className="size-12 rounded-full bg-primary flex items-center justify-center text-white font-bold mx-auto mb-2">1</div>
                    <p className="text-sm">Submit Report</p>
                  </div>
                  <div className="text-center">
                    <div className="size-12 rounded-full bg-primary flex items-center justify-center text-white font-bold mx-auto mb-2">2</div>
                    <p className="text-sm">Review Process</p>
                  </div>
                  <div className="text-center">
                    <div className="size-12 rounded-full bg-primary flex items-center justify-center text-white font-bold mx-auto mb-2">3</div>
                    <p className="text-sm">Resolution</p>
                  </div>
                </div>
              </div>
            </CarouselSlide>
            <CarouselSlide>
              <div className="flex items-center justify-center h-full bg-gray-100 p-8">
                <div className="bg-white p-6 rounded-lg shadow-sm max-w-md">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">Commitment to Integrity</h4>
                  <p className="text-gray-600 mb-4">We are committed to maintaining the highest standards of ethical conduct and transparency.</p>
                  <button className="py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">Learn More</button>
                </div>
              </div>
            </CarouselSlide>
          </Carousel>
        </div>
        
        {/* No-loop Carousel */}
        <div>
          <h3 className="text-lg font-medium mb-3">Non-Infinite Carousel</h3>
          <Carousel 
            className="h-64" 
            infiniteLoop={false}
          >
            <CarouselSlide>
              <div className="flex justify-center items-center h-full bg-purple-100 p-6">
                <span className="text-2xl text-purple-800">First Slide (No Loop)</span>
              </div>
            </CarouselSlide>
            <CarouselSlide>
              <div className="flex justify-center items-center h-full bg-purple-200 p-6">
                <span className="text-2xl text-purple-800">Second Slide (No Loop)</span>
              </div>
            </CarouselSlide>
            <CarouselSlide>
              <div className="flex justify-center items-center h-full bg-purple-300 p-6">
                <span className="text-2xl text-purple-800">Third Slide (No Loop)</span>
              </div>
            </CarouselSlide>
          </Carousel>
          <p className="text-sm text-gray-500 mt-2">This carousel disables buttons at the endpoints and doesn't loop around</p>
        </div>
      </div>
    </section>
  );

  const renderChartsSection = () => {
    // Dummy action buttons for chart actions
    const chartActions = (
      <div className="flex space-x-2">
        <button className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
          <svg className="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
        <button className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
          <svg className="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </button>
      </div>
    );
    
    return (
      <section>
        <div className="space-y-6">
          {/* Basic Chart Container */}
          <div>
            <h3 className="text-lg font-medium mb-3">Basic Chart Container</h3>
            <Chart 
              title="Monthly Revenue"
              subtitle="Last 12 months performance"
              height={300}
            >
              <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                <div className="text-center p-6">
                  <svg className="size-10 mx-auto text-gray-400 mb-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                    <path d="M18 10l-2-3-4 7-4-3"></path>
                  </svg>
                  <p className="text-gray-500">Chart visualization will be shown here</p>
                  <p className="text-sm text-gray-400 mt-1">Chart.js or Recharts can be integrated later</p>
                </div>
              </div>
            </Chart>
          </div>
          
          {/* Chart with Actions and Footer */}
          <div>
            <h3 className="text-lg font-medium mb-3">Chart with Actions and Footer</h3>
            <Chart 
              title="Sales Analytics"
              subtitle="Revenue vs. Expenses"
              height={300}
              actions={chartActions}
              footer={
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Updated: Mar 7, 2025</div>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <span className="size-3 bg-blue-500 rounded-full mr-2"></span>
                      <span className="text-sm text-gray-700">Revenue</span>
                    </div>
                    <div className="flex items-center">
                      <span className="size-3 bg-red-500 rounded-full mr-2"></span>
                      <span className="text-sm text-gray-700">Expenses</span>
                    </div>
                  </div>
                </div>
              }
            >
              <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                <div className="text-center p-6">
                  <svg className="size-10 mx-auto text-gray-400 mb-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18"></path>
                    <path d="m21 15-6-6-4 4-3-3"></path>
                  </svg>
                  <p className="text-gray-500">Line chart visualization will be shown here</p>
                </div>
              </div>
            </Chart>
          </div>
          
          {/* Chart Variants */}
          <div>
            <h3 className="text-lg font-medium mb-3">Chart Variants</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Chart 
                title="Elevated Style"
                variant="elevated"
                height={200}
              >
                <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                  <div className="text-center">
                    <p className="text-gray-500">Chart placeholder</p>
                  </div>
                </div>
              </Chart>
              
              <Chart 
                title="Outlined Style"
                variant="outlined"
                height={200}
              >
                <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                  <div className="text-center">
                    <p className="text-gray-500">Chart placeholder</p>
                  </div>
                </div>
              </Chart>
            </div>
          </div>
          
          {/* Chart States */}
          <div>
            <h3 className="text-lg font-medium mb-3">Chart States</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Chart 
                title="Loading State"
                height={200}
                loading={true}
              >
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Chart content (not visible during loading)</p>
                </div>
              </Chart>
              
              <Chart 
                title="Error State"
                height={200}
                error="Failed to fetch data"
              >
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Chart content (not visible during error)</p>
                </div>
              </Chart>
              
              <Chart 
                title="Empty State"
                height={200}
                isEmpty={true}
                emptyText="No data for selected period"
              >
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Chart content (not visible when empty)</p>
                </div>
              </Chart>
            </div>
          </div>
          
          {/* Placeholder for Different Chart Types */}
          <div>
            <h3 className="text-lg font-medium mb-3">Chart Type Examples</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Chart 
                title="Bar Chart"
                height={250}
              >
                <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                  <div className="text-center p-4">
                    <svg className="size-10 mx-auto text-gray-400 mb-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="20" x2="18" y2="10"></line>
                      <line x1="12" y1="20" x2="12" y2="4"></line>
                      <line x1="6" y1="20" x2="6" y2="14"></line>
                    </svg>
                    <p className="text-gray-500">Bar Chart Placeholder</p>
                  </div>
                </div>
              </Chart>
              
              <Chart 
                title="Pie Chart"
                height={250}
              >
                <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                  <div className="text-center p-4">
                    <svg className="size-10 mx-auto text-gray-400 mb-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 2a10 10 0 0 1 0 20"></path>
                    </svg>
                    <p className="text-gray-500">Pie Chart Placeholder</p>
                  </div>
                </div>
              </Chart>
              
              <Chart 
                title="Line Chart"
                height={250}
              >
                <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                  <div className="text-center p-4">
                    <svg className="size-10 mx-auto text-gray-400 mb-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 3v18h18"></path>
                      <path d="m3 15 5-5 4 4 10-10"></path>
                    </svg>
                    <p className="text-gray-500">Line Chart Placeholder</p>
                  </div>
                </div>
              </Chart>
              
              <Chart 
                title="Area Chart"
                height={250}
              >
                <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                  <div className="text-center p-4">
                    <svg className="size-10 mx-auto text-gray-400 mb-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 3v18h18"></path>
                      <path d="M3 18s3-6 7-6 11 6 11 6"></path>
                    </svg>
                    <p className="text-gray-500">Area Chart Placeholder</p>
                  </div>
                </div>
              </Chart>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderChatBubblesSection = () => {
    const adminAvatar = "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80";
    const userAvatar = "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80";
    
    return (
      <section>
        <div className="space-y-8">
          {/* Basic Chat Example */}
          <div>
            <h3 className="text-lg font-medium mb-3">Basic Chat Conversation</h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <ChatBubbles>
                <ChatBubble 
                  avatar={adminAvatar}
                  sender="Admin"
                  headerText="How can we help?"
                  showHeader={true}
                  message="You can ask questions or report issues through this secure channel."
                  timestamp="10:30 AM"
                  listItems={[
                    "How do I file a report?",
                    "What happens after I submit a report?",
                    "Is my identity protected?"
                  ]}
                />
                
                <ChatBubble 
                  isCurrentUser={true}
                  sender="Alex Zane"
                  message="I'd like to know more about the whistleblowing process and how confidentiality is maintained."
                  timestamp="10:32 AM"
                  status="read"
                />
                
                <ChatBubble 
                  avatar={adminAvatar}
                  sender="Admin"
                  message="All reports are strictly confidential. Your identity is protected through our secure system, and only authorized personnel can access the information."
                  timestamp="10:35 AM"
                  links={[
                    {
                      text: "Privacy Policy",
                      url: "#",
                      external: false
                    },
                    {
                      text: "Reporting Process",
                      url: "#",
                      external: false
                    }
                  ]}
                />
              </ChatBubbles>
            </div>
          </div>
          
          {/* Bubble Variants */}
          <div>
            <h3 className="text-lg font-medium mb-3">Bubble Variants</h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <ChatBubbles>
                <ChatBubble 
                  avatar={adminAvatar}
                  sender="Admin"
                  message="This is a default variant for incoming messages"
                  variant="default"
                />
                
                <ChatBubble 
                  isCurrentUser={true}
                  sender="User"
                  message="This is a default variant for outgoing messages"
                  variant="default"
                />
                
                <ChatBubble 
                  avatar={adminAvatar}
                  sender="Admin"
                  message="This is a light variant for incoming messages"
                  variant="light"
                />
                
                <ChatBubble 
                  isCurrentUser={true}
                  sender="User"
                  message="This is a light variant for outgoing messages"
                  variant="light"
                />
                
                <ChatBubble 
                  avatar={adminAvatar}
                  sender="Admin"
                  message="This is a transparent variant for incoming messages"
                  variant="transparent"
                />
                
                <ChatBubble 
                  isCurrentUser={true}
                  sender="User"
                  message="This is a transparent variant for outgoing messages"
                  variant="transparent"
                />
                
                <ChatBubble 
                  avatar={adminAvatar}
                  sender="Admin"
                  message="This is an outlined variant for incoming messages"
                  variant="outlined"
                />
                
                <ChatBubble 
                  isCurrentUser={true}
                  sender="User"
                  message="This is an outlined variant for outgoing messages"
                  variant="outlined"
                />
              </ChatBubbles>
            </div>
          </div>
          
          {/* Message States */}
          <div>
            <h3 className="text-lg font-medium mb-3">Message States</h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <ChatBubbles>
                <ChatBubble 
                  isCurrentUser={true}
                  sender="User"
                  message="This message has been sent but not delivered yet"
                  timestamp="11:44 AM"
                  status="sent"
                />
                
                <ChatBubble 
                  isCurrentUser={true}
                  sender="User"
                  message="This message has been delivered but not read yet"
                  timestamp="11:45 AM"
                  status="delivered"
                />
                
                <ChatBubble 
                  isCurrentUser={true}
                  sender="User"
                  message="This message has been read by the recipient"
                  timestamp="11:46 AM"
                  status="read"
                />
              </ChatBubbles>
            </div>
          </div>
          
          {/* Message with Lists and Links */}
          <div>
            <h3 className="text-lg font-medium mb-3">Messages with Lists and Links</h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <ChatBubbles>
                <ChatBubble 
                  avatar={adminAvatar}
                  sender="Admin"
                  headerText="Reporting Guidelines"
                  showHeader={true}
                  message="Please follow these guidelines when submitting a report:"
                  timestamp="9:15 AM"
                  listItems={[
                    "Be specific about the incident",
                    "Include dates and times if possible",
                    "Mention names of individuals involved",
                    "Attach supporting documents if available"
                  ]}
                />
                
                <ChatBubble 
                  avatar={adminAvatar}
                  sender="Admin"
                  headerText="Useful Resources"
                  showHeader={true}
                  message="Here are some helpful resources about our whistleblowing system:"
                  timestamp="9:18 AM"
                  links={[
                    {
                      text: "Company Ethics Policy",
                      url: "#",
                      external: false
                    },
                    {
                      text: "FAQ on Whistleblowing",
                      url: "#",
                      external: false
                    },
                    {
                      text: "Legal Protections for Whistleblowers",
                      url: "#",
                      external: true
                    }
                  ]}
                />
              </ChatBubbles>
            </div>
          </div>
          
          {/* Avatar Variations */}
          <div>
            <h3 className="text-lg font-medium mb-3">Avatar Variations</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ChatBubbles>
                <ChatBubble 
                  avatar={adminAvatar}
                  sender="Admin"
                  message="This message uses an image avatar"
                  timestamp="2:30 PM"
                />
                
                <ChatBubble 
                  sender="John Doe"
                  message="This message uses initials for the avatar"
                  timestamp="2:32 PM"
                />
                
                <ChatBubble 
                  isCurrentUser={true}
                  sender="Alex Smith"
                  message="This is your own message with initials"
                  timestamp="2:35 PM"
                />
                
                <ChatBubble 
                  isCurrentUser={true}
                  avatar={userAvatar}
                  sender="You"
                  message="This is your own message with an avatar image"
                  timestamp="2:36 PM"
                />
              </ChatBubbles>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderCheckboxesSection = () => {
    return (
      <section>
        <div className="space-y-4">
          <h3 className="text-lg font-medium mb-3">Basic Checkboxes</h3>
          <div className="space-y-3">
            <Checkbox 
              id="basic-checkbox" 
              label="Default checkbox" 
            />
            
            <Checkbox 
              id="checked-checkbox" 
              label="Pre-checked checkbox" 
              checked={true}
            />
            
            <Checkbox 
              id="disabled-checkbox" 
              label="Disabled checkbox" 
              disabled
            />
          </div>
        </div>
      </section>
    );
  };

  // New render function for Clipboards section
  const renderClipboardsSection = () => (
    <section>
      <div className="space-y-6">
        {/* Basic Clipboard Examples */}
        <div>
          <h3 className="text-lg font-medium mb-3">Basic Clipboard Buttons</h3>
          <div className="flex flex-wrap gap-3">
            <Clipboard 
              value="npm install preline" 
              displayText="$ npm install preline" 
              monospace={true}
            />
            
            <Clipboard 
              value="yarn add preline" 
              displayText="$ yarn add preline" 
              monospace={true}
              variant="gray"
            />
            
            <Clipboard 
              value="pnpm add preline" 
              displayText="$ pnpm add preline" 
              monospace={true}
              variant="primary"
              successText="Command copied!"
            />
          </div>
        </div>
        
        {/* Clipboard Variants */}
        <div>
          <h3 className="text-lg font-medium mb-3">Clipboard Variants</h3>
          <div className="flex flex-wrap gap-3">
            <Clipboard 
              value="Default variant"
              variant="default"
            />
            
            <Clipboard 
              value="Primary variant"
              variant="primary"
            />
            
            <Clipboard 
              value="Outline primary variant"
              variant="outline-primary"
            />
            
            <Clipboard 
              value="Ghost primary variant"
              variant="ghost-primary"
            />
            
            <Clipboard 
              value="Secondary variant"
              variant="secondary"
            />
            
            <Clipboard 
              value="Outline secondary variant"
              variant="outline-secondary"
            />
          </div>
        </div>
        
        {/* Clipboard Sizes */}
        <div>
          <h3 className="text-lg font-medium mb-3">Clipboard Sizes</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Clipboard 
              value="Small size"
              size="sm"
            />
            
            <Clipboard 
              value="Medium size (default)"
              size="md"
            />
            
            <Clipboard 
              value="Large size"
              size="lg"
            />
          </div>
        </div>
        
        {/* Clipboard with Different Tooltip Positions */}
        <div>
          <h3 className="text-lg font-medium mb-3">Tooltip Positions</h3>
          <div className="flex flex-wrap gap-3">
            <Clipboard 
              value="Tooltip at top"
              tooltipPosition="top"
              tooltipVisible={true}
            />
            
            <Clipboard 
              value="Tooltip at bottom"
              tooltipPosition="bottom"
              tooltipVisible={true}
            />
            
            <Clipboard 
              value="Tooltip at left"
              tooltipPosition="left"
              tooltipVisible={true}
            />
            
            <Clipboard 
              value="Tooltip at right"
              tooltipPosition="right"
              tooltipVisible={true}
            />
          </div>
        </div>
        
        {/* Custom Clipboard Examples */}
        <div>
          <h3 className="text-lg font-medium mb-3">Custom Examples</h3>
          <div className="flex flex-wrap gap-4">
            <Clipboard 
              value="API_KEY=YOUR_SECRET_API_KEY"
              displayText="Copy API key" 
              variant="primary"
              successText="API key copied to clipboard!"
              tooltipDuration={3000}
            />
            
            <Clipboard 
              value="https://example.com/document/share/abc123"
              displayText="Copy share link" 
              variant="outline-primary"
              successText="Link copied!"
            />
            
            <div className="flex items-center p-3 bg-gray-100 rounded-lg w-full max-w-md">
              <span className="text-sm text-gray-700 mr-2 truncate">
                example-document-id-123456.pdf
              </span>
              <Clipboard 
                value="example-document-id-123456.pdf"
                displayText="Copy ID"
                variant="ghost-primary" 
                size="sm"
                className="ml-auto"
              />
            </div>
          </div>
        </div>
        
        {/* Disabled Clipboard */}
        <div>
          <h3 className="text-lg font-medium mb-3">Disabled State</h3>
          <div className="flex flex-wrap gap-3">
            <Clipboard 
              value="This cannot be copied"
              disabled={true}
            />
            
            <Clipboard 
              value="This cannot be copied"
              variant="primary"
              disabled={true}
            />
          </div>
        </div>
        
        {/* Without Copy Icon */}
        <div>
          <h3 className="text-lg font-medium mb-3">Without Copy Icon</h3>
          <div className="flex flex-wrap gap-3">
            <Clipboard 
              value="Click to copy text"
              showCopyIcon={false}
            />
            
            <Clipboard 
              value="Click to copy without icon"
              variant="primary"
              showCopyIcon={false}
            />
          </div>
        </div>
        
        {/* Clipboard with Event Handling */}
        <div>
          <h3 className="text-lg font-medium mb-3">With Event Handling</h3>
          <div className="flex flex-wrap gap-3">
            <Clipboard 
              value="Event-handling clipboard"
              onCopy={(text) => alert(`Copied: ${text}`)}
            />
          </div>
        </div>
      </div>
    </section>
  );

  // DatePicker section
  const renderDatePickersSection = () => (
    <section>
      <div className="space-y-6">
        {/* Basic DatePicker */}
        <div>
          <h3 className="text-lg font-medium mb-3">Basic DatePicker</h3>
          <div className="max-w-sm space-y-4">
            <div>
              <label htmlFor="basic-datepicker" className="block text-sm font-medium text-gray-700 mb-1">
                Default DatePicker
              </label>
              <DatePicker
                id="basic-datepicker"
                placeholderText="Select a date"
                value={selectedDate}
                onChange={(dateStr, date) => {
                  console.log('Selected date:', dateStr);
                  setSelectedDate(dateStr);
                }}
              />
              {selectedDate && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected date: {selectedDate}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* DatePicker with Min/Max Date */}
        <div>
          <h3 className="text-lg font-medium mb-3">DatePicker with Min/Max Date</h3>
          <div className="max-w-sm space-y-4">
            <div>
              <label htmlFor="range-datepicker" className="block text-sm font-medium text-gray-700 mb-1">
                Select a date (limited range)
              </label>
              <DatePicker
                id="range-datepicker"
                placeholderText="Select a date"
                minDate="2023-01-01"
                maxDate="2023-12-31"
              />
              <p className="mt-1 text-sm text-gray-500">
                Only dates in 2023 can be selected
              </p>
            </div>
          </div>
        </div>

        {/* Custom Format DatePicker */}
        <div>
          <h3 className="text-lg font-medium mb-3">Custom Format DatePicker</h3>
          <div className="max-w-sm space-y-4">
            <div>
              <label htmlFor="format-datepicker" className="block text-sm font-medium text-gray-700 mb-1">
                Custom Format (yyyy-MM-dd)
              </label>
              <DatePicker
                id="format-datepicker"
                dateFormat="yyyy-MM-dd"
                placeholderText="YYYY-MM-DD"
              />
            </div>
          </div>
        </div>

        {/* Disabled DatePicker */}
        <div>
          <h3 className="text-lg font-medium mb-3">Disabled State</h3>
          <div className="max-w-sm">
            <DatePicker
              disabled
              placeholderText="DatePicker disabled"
            />
          </div>
        </div>

        {/* With Custom Year Range */}
        <div>
          <h3 className="text-lg font-medium mb-3">With Custom Year Range</h3>
          <div className="max-w-sm">
            <DatePicker
              yearRange={10}
              placeholderText="Year range: ±10 years"
            />
          </div>
        </div>
      </div>
    </section>
  );

  // Add the renderFileInputsSection function
  const renderFileInputsSection = () => (
    <section>
      <div className="space-y-6">
        {/* Basic FileInput */}
        <div>
          <h3 className="text-lg font-medium mb-3">Basic File Input</h3>
          <div className="max-w-sm">
            <FileInput 
              label="Choose file"
              id="basic-file-input"
              name="basic-file"
            />
          </div>
        </div>
        
        {/* File Input Sizes */}
        <div>
          <h3 className="text-lg font-medium mb-3">File Input Sizes</h3>
          <div className="space-y-3 max-w-sm">
            <FileInput 
              label="Small size"
              size="sm"
            />
            
            <FileInput 
              label="Medium size (default)"
              size="md"
            />
            
            <FileInput 
              label="Large size"
              size="lg"
            />
          </div>
        </div>
        
        {/* File Input Button Variations */}
        <div>
          <h3 className="text-lg font-medium mb-3">Button Variations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FileInput 
              label="Default button"
              buttonClassName="default"
            />
            
            <FileInput 
              label="Primary button"
              buttonClassName="primary"
            />
            
            <FileInput 
              label="Secondary button"
              buttonClassName="secondary"
            />
            
            <FileInput 
              label="Outline button"
              buttonClassName="outline"
            />
            
            <FileInput 
              label="Ghost button"
              buttonClassName="ghost"
            />
          </div>
        </div>
        
        {/* File Input with Restrictions */}
        <div>
          <h3 className="text-lg font-medium mb-3">With File Type Restrictions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FileInput 
              label="Images only"
              accept="image/*"
              helperText="Accepts all image formats (jpg, png, etc.)"
            />
            
            <FileInput 
              label="Documents only"
              accept=".pdf,.doc,.docx"
              helperText="Accepts PDF and Word documents"
            />
          </div>
        </div>
        
        {/* Multiple File Input */}
        <div>
          <h3 className="text-lg font-medium mb-3">Multiple File Selection</h3>
          <div className="max-w-sm">
            <FileInput 
              label="Select multiple files"
              multiple
              helperText="You can select multiple files at once"
            />
          </div>
        </div>
        
        {/* FileInput States */}
        <div>
          <h3 className="text-lg font-medium mb-3">Input States</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FileInput 
              label="Required file input"
              required
              helperText="This field is required"
            />
            
            <FileInput 
              label="Disabled file input"
              disabled
              helperText="This input is disabled"
            />
            
            <FileInput 
              label="With error message"
              error="Please select a valid file"
              variant="error"
            />
            
            <FileInput 
              label="Success state"
              variant="success"
              helperText="File type is valid"
            />
          </div>
        </div>
      </div>
    </section>
  );

  // Add the renderListsSection function
  const renderListsSection = () => (
    <section>
      <div className="space-y-6">
        {/* Basic Lists */}
        <div>
          <h3 className="text-lg font-medium mb-3">Basic Lists</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <span className="font-medium text-sm text-gray-500 font-mono mb-3 block">list-disc</span>
              <List variant="disc">
                <ListItem>Now this is a story all about how, my life got flipped turned upside down</ListItem>
                <ListItem>And I like to take a minute and sit right here</ListItem>
                <ListItem>I'll tell you how I became the prince of a town called Bel-Air</ListItem>
              </List>
            </div>
            
            <div>
              <span className="font-medium text-sm text-gray-500 font-mono mb-3 block">list-decimal</span>
              <List type="ol" variant="decimal">
                <ListItem>Now this is a story all about how, my life got flipped turned upside down</ListItem>
                <ListItem>And I like to take a minute and sit right here</ListItem>
                <ListItem>I'll tell you how I became the prince of a town called Bel-Air</ListItem>
              </List>
            </div>
            
            <div>
              <span className="font-medium text-sm text-gray-500 font-mono mb-3 block">list-none</span>
              <List variant="none">
                <ListItem>Now this is a story all about how, my life got flipped turned upside down</ListItem>
                <ListItem>And I like to take a minute and sit right here</ListItem>
                <ListItem>I'll tell you how I became the prince of a town called Bel-Air</ListItem>
              </List>
            </div>
          </div>
        </div>
        
        {/* Other List Types */}
        <div>
          <h3 className="text-lg font-medium mb-3">Other List Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className="font-medium text-sm text-gray-500 font-mono mb-3 block">list-circle</span>
              <List variant="circle">
                <ListItem>Coffee</ListItem>
                <ListItem>Tea</ListItem>
                <ListItem>Milk</ListItem>
              </List>
            </div>
            
            <div>
              <span className="font-medium text-sm text-gray-500 font-mono mb-3 block">list-square</span>
              <List variant="square">
                <ListItem>Apple</ListItem>
                <ListItem>Banana</ListItem>
                <ListItem>Orange</ListItem>
              </List>
            </div>
            
            <div>
              <span className="font-medium text-sm text-gray-500 font-mono mb-3 block">list-alpha</span>
              <List type="ol" variant="alpha">
                <ListItem>First item</ListItem>
                <ListItem>Second item</ListItem>
                <ListItem>Third item</ListItem>
              </List>
            </div>
            
            <div>
              <span className="font-medium text-sm text-gray-500 font-mono mb-3 block">list-roman</span>
              <List type="ol" variant="roman">
                <ListItem>First item</ListItem>
                <ListItem>Second item</ListItem>
                <ListItem>Third item</ListItem>
              </List>
            </div>
          </div>
        </div>
        
        {/* List Sizes */}
        <div>
          <h3 className="text-lg font-medium mb-3">List Sizes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <span className="font-medium text-sm text-gray-500 mb-3 block">Small Size</span>
              <List variant="disc" size="sm">
                <ListItem>Small sized list item</ListItem>
                <ListItem>Another small item</ListItem>
                <ListItem>Third small item</ListItem>
              </List>
            </div>
            
            <div>
              <span className="font-medium text-sm text-gray-500 mb-3 block">Medium Size (Default)</span>
              <List variant="disc" size="md">
                <ListItem>Medium sized list item</ListItem>
                <ListItem>Another medium item</ListItem>
                <ListItem>Third medium item</ListItem>
              </List>
            </div>
            
            <div>
              <span className="font-medium text-sm text-gray-500 mb-3 block">Large Size</span>
              <List variant="disc" size="lg">
                <ListItem>Large sized list item</ListItem>
                <ListItem>Another large item</ListItem>
                <ListItem>Third large item</ListItem>
              </List>
            </div>
          </div>
        </div>
        
        {/* List Spacing */}
        <div>
          <h3 className="text-lg font-medium mb-3">List Spacing</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <span className="font-medium text-sm text-gray-500 mb-3 block">Tight Spacing</span>
              <List variant="disc" spacing="tight">
                <ListItem>Tight spaced item</ListItem>
                <ListItem>Another tight item</ListItem>
                <ListItem>Third tight item</ListItem>
              </List>
            </div>
            
            <div>
              <span className="font-medium text-sm text-gray-500 mb-3 block">Normal Spacing (Default)</span>
              <List variant="disc" spacing="normal">
                <ListItem>Normal spaced item</ListItem>
                <ListItem>Another normal item</ListItem>
                <ListItem>Third normal item</ListItem>
              </List>
            </div>
            
            <div>
              <span className="font-medium text-sm text-gray-500 mb-3 block">Loose Spacing</span>
              <List variant="disc" spacing="loose">
                <ListItem>Loose spaced item</ListItem>
                <ListItem>Another loose item</ListItem>
                <ListItem>Third loose item</ListItem>
              </List>
            </div>
          </div>
        </div>
        
        {/* Marker Position */}
        <div>
          <h3 className="text-lg font-medium mb-3">Marker Position</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-r border-gray-200 pr-6">
              <span className="font-medium text-sm text-gray-500 mb-3 block">Inside (Default)</span>
              <List variant="disc" marker="inside">
                <ListItem>This is a longer list item to demonstrate how the text wraps when the marker is positioned inside</ListItem>
                <ListItem>Another list item with the marker inside</ListItem>
              </List>
            </div>
            
            <div>
              <span className="font-medium text-sm text-gray-500 mb-3 block">Outside</span>
              <List variant="disc" marker="outside">
                <ListItem>This is a longer list item to demonstrate how the text wraps when the marker is positioned outside</ListItem>
                <ListItem>Another list item with the marker outside</ListItem>
              </List>
            </div>
          </div>
        </div>
        
        {/* Styled List */}
        <div>
          <h3 className="text-lg font-medium mb-3">Custom Styled Lists</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <List 
                variant="none" 
                spacing="loose"
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                itemClassName="flex items-start gap-2"
              >
                <ListItem>
                  <span className="inline-flex items-center justify-center size-5 rounded-full bg-primary-light text-white text-xs font-medium mt-0.5">1</span>
                  <span>First step of the process with custom styling</span>
                </ListItem>
                <ListItem>
                  <span className="inline-flex items-center justify-center size-5 rounded-full bg-primary-light text-white text-xs font-medium mt-0.5">2</span>
                  <span>Second step with nice formatting</span>
                </ListItem>
                <ListItem>
                  <span className="inline-flex items-center justify-center size-5 rounded-full bg-primary-light text-white text-xs font-medium mt-0.5">3</span>
                  <span>Final step of the process</span>
                </ListItem>
              </List>
            </div>
            
            <div>
              <List 
                variant="none" 
                className="space-y-2"
              >
                <ListItem className="flex items-center gap-3 p-3 bg-success/10 text-success rounded-lg border border-success/20">
                  <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
                  Proper document formatting
                </ListItem>
                <ListItem className="flex items-center gap-3 p-3 bg-warning/10 text-warning rounded-lg border border-warning/20">
                  <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
                  Evidence submission guidelines
                </ListItem>
                <ListItem className="flex items-center gap-3 p-3 bg-danger/10 text-danger rounded-lg border border-danger/20">
                  <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                  Information to avoid including
                </ListItem>
              </List>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderLogosSection = () => {
    return (
      <section>
        <div className="space-y-8">
          {/* Logo Variants */}
          <div>
            <h3 className="text-lg font-medium mb-3">Logo Variants</h3>
            <div className="p-6 bg-gray-50 rounded-lg flex flex-col gap-6">
              <div className="flex items-center gap-8">
                <div className="w-32 text-right font-medium text-gray-700">Full Logo:</div>
                <Logo variant="full" />
              </div>
              
              <div className="flex items-center gap-8">
                <div className="w-32 text-right font-medium text-gray-700">Icon Only:</div>
                <Logo variant="icon" />
              </div>
            </div>
          </div>
          
          {/* Logo Sizes */}
          <div>
            <h3 className="text-lg font-medium mb-3">Logo Sizes</h3>
            <div className="p-6 bg-gray-50 rounded-lg space-y-6">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-8">
                  <div className="w-32 text-right font-medium text-gray-700">Extra Small:</div>
                  <Logo variant="full" size="xs" />
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="w-32 text-right font-medium text-gray-700">Small:</div>
                  <Logo variant="full" size="sm" />
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="w-32 text-right font-medium text-gray-700">Medium (Default):</div>
                  <Logo variant="full" size="md" />
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="w-32 text-right font-medium text-gray-700">Large:</div>
                  <Logo variant="full" size="lg" />
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="w-32 text-right font-medium text-gray-700">Extra Large:</div>
                  <Logo variant="full" size="xl" />
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex gap-6 flex-wrap">
                  <Logo variant="icon" size="xs" />
                  <Logo variant="icon" size="sm" />
                  <Logo variant="icon" size="md" />
                  <Logo variant="icon" size="lg" />
                  <Logo variant="icon" size="xl" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Custom Styling */}
          <div>
            <h3 className="text-lg font-medium mb-3">Custom Styling</h3>
            <div className="p-6 bg-gray-50 rounded-lg space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="bg-primary p-6 rounded-lg">
                  <Logo 
                    variant="full" 
                    textClassName="text-white" 
                    className="justify-center"
                    isClickable={false}
                  />
                </div>
                
                <div className="bg-white shadow-md p-6 rounded-lg">
                  <Logo 
                    variant="full" 
                    textClassName="text-primary" 
                    className="justify-center"
                    isClickable={false}
                  />
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg">
                  <Logo 
                    variant="full" 
                    textClassName="text-white" 
                    className="justify-center"
                    isClickable={false}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Usage Examples */}
          <div>
            <h3 className="text-lg font-medium mb-3">Usage Examples</h3>
            <div className="space-y-4">
              {/* Header Example */}
              <div className="p-4 bg-white shadow rounded-lg">
                <div className="flex justify-between items-center">
                  <Logo variant="full" size="sm" />
                  
                  <div className="flex gap-4 items-center">
                    <div className="text-sm font-medium text-gray-700">Beranda</div>
                    <div className="text-sm font-medium text-gray-700">Tentang</div>
                    <div className="text-sm font-medium text-gray-700">Bantuan</div>
                    <button className="px-4 py-1.5 bg-primary text-white text-sm rounded">Login</button>
                  </div>
                </div>
              </div>
              
              {/* Footer Example */}
              <div className="p-4 bg-gray-100 rounded-lg">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <Logo variant="icon" size="sm" isClickable={false} />
                    <span className="text-sm text-gray-600">© 2025 DPMPTSP Kota Padang</span>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="size-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <svg className="size-4 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </div>
                    <div className="size-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <svg className="size-4 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                      </svg>
                    </div>
                    <div className="size-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <svg className="size-4 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Mobile App Example */}
              <div className="p-8 bg-gradient-to-r from-primary/10 to-blue-200 rounded-lg">
                <div className="flex flex-col items-center gap-3 text-center">
                  <Logo variant="icon" size="xl" isClickable={false} />
                  <h3 className="text-xl font-bold text-primary-dark">WBS Mobile</h3>
                  <p className="text-sm text-gray-700">Pengaduan Cepat, Tepat & Aman di Genggaman Anda</p>
                  <button className="mt-2 px-4 py-2 bg-primary text-white rounded-lg text-sm flex items-center gap-2">
                    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.665 16.811a10.316 10.316 0 0 1-1.021 1.837c-.537.767-.978 1.297-1.316 1.592-.525.482-1.089.73-1.692.744-.432 0-.954-.123-1.562-.373-.61-.249-1.17-.371-1.683-.371-.537 0-1.113.122-1.73.371-.616.25-1.114.381-1.495.393-.577.019-1.154-.242-1.729-.781-.367-.32-.826-.87-1.377-1.648-.59-.829-1.075-1.794-1.455-2.891-.407-1.187-.611-2.335-.611-3.447 0-1.273.275-2.372.826-3.292a4.857 4.857 0 0 1 1.73-1.751 4.65 4.65 0 0 1 2.34-.662c.46 0 1.063.142 1.81.422s1.227.422 1.436.422c.158 0 .689-.167 1.593-.498.853-.307 1.573-.434 2.163-.384 1.6.129 2.801.759 3.6 1.895-1.43.867-2.137 2.08-2.123 3.637.012 1.213.453 2.222 1.317 3.023a4.33 4.33 0 0 0 1.315.863c-.106.307-.218.6-.336.882zM15.998 2.38c0 .95-.348 1.838-1.039 2.659-.836.976-1.846 1.541-2.941 1.452a2.955 2.955 0 0 1-.021-.36c0-.913.396-1.889 1.103-2.688.352-.404.8-.741 1.343-1.009.542-.264 1.054-.41 1.536-.435.013.128.019.255.019.381z" />
                    </svg>
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Add state for radio examples
  const [selectedOption, setSelectedOption] = useState('option1');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [selectedSize, setSelectedSize] = useState('medium');

  // Add the renderRadioButtonsSection function
  const renderRadioButtonsSection = () => (
    <section>
      <div className="space-y-6">
        {/* Basic Radio Buttons */}
        <div>
          <h3 className="text-lg font-medium mb-3">Basic Radio Buttons</h3>
          <div className="space-y-2">
            <RadioButton
              name="demo-radio"
              id="radio-1"
              value="option1"
              label="Default radio"
              checked={selectedOption === 'option1'}
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            
            <RadioButton
              name="demo-radio"
              id="radio-2"
              value="option2"
              label="Second option"
              checked={selectedOption === 'option2'}
              onChange={(e) => setSelectedOption(e.target.value)}
            />

            <div className="mt-2 text-sm">
              Selected value: <span className="font-medium">{selectedOption}</span>
            </div>
          </div>
        </div>
        
        {/* Radio Button States */}
        <div>
          <h3 className="text-lg font-medium mb-3">Radio Button States</h3>
          <div className="space-y-2">
            <RadioButton
              name="radio-states"
              id="radio-default"
              value="default"
              label="Default radio button"
            />
            
            <RadioButton
              name="radio-states"
              id="radio-checked"
              value="checked"
              label="Checked radio button"
              checked={true}
            />
            
            <RadioButton
              name="radio-states"
              id="radio-disabled"
              value="disabled"
              label="Disabled radio button"
              disabled
            />
            
            <RadioButton
              name="radio-states"
              id="radio-disabled-checked"
              value="disabled-checked"
              label="Disabled and checked"
              disabled
              checked
            />
            
            <RadioButton
              name="radio-states"
              id="radio-error"
              value="error"
              label="Radio with error"
              error="This field has an error"
            />
            
            <RadioButton
              name="radio-states"
              id="radio-helper"
              value="helper"
              label="Radio with helper text"
              helperText="This is some additional information"
            />
          </div>
        </div>
        
        {/* Radio Button Sizes */}
        <div>
          <h3 className="text-lg font-medium mb-3">Radio Button Sizes</h3>
          <div className="space-y-2">
            <RadioButton
              name="radio-sizes"
              value="small"
              label="Small radio button"
              size="sm"
            />
            
            <RadioButton
              name="radio-sizes"
              value="medium"
              label="Medium radio button (default)"
              size="md"
            />
            
            <RadioButton
              name="radio-sizes"
              value="large"
              label="Large radio button"
              size="lg"
            />
          </div>
        </div>
        
        {/* Radio Button Variants */}
        <div>
          <h3 className="text-lg font-medium mb-3">Radio Button Variants</h3>
          <div className="space-y-2">
            <RadioButton
              name="radio-variants"
              value="default"
              label="Default variant (Primary)"
              variant="default"
              checked
            />
            
            <RadioButton
              name="radio-variants-2"
              value="secondary"
              label="Secondary variant"
              variant="secondary"
              checked
            />
            
            <RadioButton
              name="radio-variants-3"
              value="success"
              label="Success variant"
              variant="success"
              checked
            />
            
            <RadioButton
              name="radio-variants-4"
              value="warning"
              label="Warning variant"
              variant="warning"
              checked
            />
            
            <RadioButton
              name="radio-variants-5"
              value="danger"
              label="Danger variant"
              variant="danger"
              checked
            />
          </div>
        </div>
        
        {/* Radio Button Group */}
        <div>
          <h3 className="text-lg font-medium mb-3">Radio Button Group</h3>
          <div className="space-y-4">
            <div>
              <RadioButtonGroup
                name="color-preference"
                label="Select your favorite color"
                value={selectedColor}
                onChange={(value) => setSelectedColor(value)}
                options={[
                  { value: 'red', label: 'Red' },
                  { value: 'blue', label: 'Blue' },
                  { value: 'green', label: 'Green' },
                  { value: 'yellow', label: 'Yellow' }
                ]}
              />
              
              <div className="mt-2 text-sm">
                Selected color: <span className="font-medium">{selectedColor}</span>
              </div>
            </div>
            
            <div>
              <RadioButtonGroup
                name="size-preference"
                label="Select a size"
                value={selectedSize}
                onChange={(value) => setSelectedSize(value)}
                options={[
                  { value: 'small', label: 'Small' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'large', label: 'Large' },
                  { value: 'xlarge', label: 'Extra Large', disabled: true }
                ]}
                helperText="Select the size that fits you best"
                inline
              />
              
              <div className="mt-2 text-sm">
                Selected size: <span className="font-medium">{selectedSize}</span>
              </div>
            </div>
            
            <div>
              <RadioButtonGroup
                name="demo-required"
                label="Required selection"
                required
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                  { value: 'option3', label: 'Option 3' }
                ]}
                error="This field is required"
                variant="danger"
              />
            </div>
          </div>
        </div>
        
        {/* Custom Styled Radio Buttons */}
        <div>
          <h3 className="text-lg font-medium mb-3">Custom Styled Examples</h3>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <RadioButtonGroup
              name="consent-options"
              label="Privacy Consent Options"
              value="full"
              options={[
                { 
                  value: 'full', 
                  label: <div>
                    <span className="font-medium text-primary block">Full Consent</span>
                    <span className="text-xs text-gray-500">Allow processing of all data for service improvement</span>
                  </div> 
                },
                { 
                  value: 'limited', 
                  label: <div>
                    <span className="font-medium text-primary block">Limited Processing</span>
                    <span className="text-xs text-gray-500">Only process data necessary for core service</span>
                  </div> 
                },
                { 
                  value: 'minimal', 
                  label: <div>
                    <span className="font-medium text-primary block">Minimal Consent</span>
                    <span className="text-xs text-gray-500">Only process legally required information</span>
                  </div> 
                }
              ]}
              helperText="Your privacy choices can be modified at any time"
              className="space-y-3"
            />
          </div>
        </div>
      </div>
    </section>
  );

  const renderInputsSection = () => {
    return (
      <section>
        <div className="space-y-6">
          {/* Basic Inputs */}
          <div>
            <h3 className="text-lg font-medium mb-3">Basic Inputs</h3>
            <div className="max-w-sm space-y-3">
              <Input 
                type="text" 
                placeholder="Default input"
              />
              
              <Input 
                type="email" 
                placeholder="Email address" 
                variant="gray"
                leftIcon={
                  <svg className="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                }
              />
              
              <Input 
                type="password" 
                placeholder="Password" 
                variant="gray"
                leftIcon={
                  <svg className="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path>
                    <circle cx="16.5" cy="7.5" r=".5"></circle>
                  </svg>
                }
              />
              
              <Input 
                type="text" 
                placeholder="Input with error" 
                error="This field is required"
              />
            </div>
          </div>
          
          {/* Input Sizes */}
          <div>
            <h3 className="text-lg font-medium mb-3">Input Sizes</h3>
            <div className="max-w-sm space-y-3">
              <Input 
                placeholder="Small size" 
                size="sm"
              />
              
              <Input 
                placeholder="Default size" 
                size="default"
              />
              
              <Input 
                placeholder="Large size" 
                size="lg"
              />
            </div>
          </div>
          
          {/* Input with Icons */}
          <div>
            <h3 className="text-lg font-medium mb-3">Input with Icons</h3>
            <div className="max-w-sm space-y-3">
              <Input 
                placeholder="Left icon" 
                leftIcon={
                  <svg className="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                }
              />
              
              <Input 
                placeholder="Right icon" 
                rightIcon={
                  <svg className="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16v-4"></path>
                    <path d="M12 8h.01"></path>
                  </svg>
                }
              />
              
              <Input 
                placeholder="Both icons" 
                leftIcon={
                  <svg className="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
                  </svg>
                }
                rightIcon={
                  <svg className="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                }
              />
            </div>
          </div>
          
          {/* Disabled Inputs */}
          <div>
            <h3 className="text-lg font-medium mb-3">Disabled Inputs</h3>
            <div className="max-w-sm space-y-3">
              <Input 
                placeholder="Disabled input" 
                disabled
              />
              
              <Input 
                placeholder="Disabled with icon" 
                disabled
                leftIcon={
                  <svg className="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                }
              />
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Add the renderFileUploadsSection function
  const renderFileUploadsSection = () => {
    // Mock upload handler to simulate server response
    const mockUpload = (fileObj, timeout = 1500) => {
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          resolve({ success: true, fileId: `mock-${fileObj.id}` });
        }, timeout);
        
        return () => clearTimeout(timer);
      });
    };
    
    // Event handlers
    const handleStart = (fileObj) => {
      console.log('Upload started:', fileObj.name);
    };
    
    const handleProgress = (fileObj, progress) => {
      console.log(`Upload progress for ${fileObj.name}: ${progress}%`);
    };
    
    const handleSuccess = (fileObj, response) => {
      console.log('Upload complete:', fileObj.name, response);
    };
    
    const handleError = (fileObj, type, message) => {
      console.error('Upload error:', fileObj.name, type, message);
    };
    
    const handleRemove = (fileObj) => {
      console.log('File removed:', fileObj.name);
    };
    
    return (
      <section>
        <div className="space-y-8">
          {/* Basic FileUpload */}
          <div>
            <h3 className="text-lg font-medium mb-3">Basic File Upload</h3>
            <div className="max-w-xl">
              <FileUpload 
                // Using mock endpoint for demo
                url="/api/upload"
                maxFileSize={2}
                onStart={handleStart}
                onProgress={handleProgress}
                onSuccess={handleSuccess}
                onError={handleError}
                onRemove={handleRemove}
              />
              <p className="mt-2 text-sm text-gray-500">
                Drag & drop files or click to browse. Uploads are simulated in this demo.
              </p>
            </div>
          </div>
          
          {/* Multiple File Upload */}
          <div>
            <h3 className="text-lg font-medium mb-3">Multiple File Upload</h3>
            <div className="max-w-xl">
              <FileUpload 
                url="/api/upload"
                multiple={true}
                maxFileSize={5}
                sizeDescription="Upload multiple files up to 5MB each."
                onStart={handleStart}
                onProgress={handleProgress}
                onSuccess={handleSuccess}
                onError={handleError}
                onRemove={handleRemove}
              />
            </div>
          </div>
          
          {/* Upload with File Type Restrictions */}
          <div>
            <h3 className="text-lg font-medium mb-3">File Type Restrictions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-base font-medium mb-2">Images Only</h4>
                <FileUpload 
                  url="/api/upload-images"
                  accept="image/*"
                  maxFileSize={3}
                  uploadText="Drop image here or"
                  sizeDescription="Accepts images up to 3MB."
                  onStart={handleStart}
                  onProgress={handleProgress}
                  onSuccess={handleSuccess}
                  onError={handleError}
                  onRemove={handleRemove}
                />
              </div>
              
              <div>
                <h4 className="text-base font-medium mb-2">Documents Only</h4>
                <FileUpload 
                  url="/api/upload-documents"
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  maxFileSize={10}
                  uploadText="Drop document here or"
                  sizeDescription="Accepts documents up to 10MB."
                  onStart={handleStart}
                  onProgress={handleProgress}
                  onSuccess={handleSuccess}
                  onError={handleError}
                  onRemove={handleRemove}
                />
              </div>
            </div>
          </div>
          
          {/* Disabled Upload */}
          <div>
            <h3 className="text-lg font-medium mb-3">Disabled State</h3>
            <div className="max-w-xl">
              <FileUpload 
                url="/api/upload"
                disabled={true}
                uploadText="Upload currently disabled"
                sizeDescription="Contact administrator for access."
              />
            </div>
          </div>
          
          {/* Custom Styling */}
          <div>
            <h3 className="text-lg font-medium mb-3">Custom Styling</h3>
            <div className="max-w-xl">
              <FileUpload 
                url="/api/upload"
                uploadClassName="p-8 border-primary border-opacity-30 hover:border-opacity-100"
                previewClassName="border-primary/20"
                progressClassName="bg-gray-100"
                uploadText="Upload your files"
                browseText="select files"
                sizeDescription="Customize the look and feel"
                onStart={handleStart}
                onProgress={handleProgress}
                onSuccess={handleSuccess}
                onError={handleError}
                onRemove={handleRemove}
              />
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Add this section rendering function
  const renderSkeletonsSection = () => {
    return (
      <section>
        <div className="space-y-8">
          {/* Basic Skeleton Items */}
          <div>
            <h3 className="text-lg font-medium mb-3">Basic Skeleton Items</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">Default line (full width)</p>
                <SkeletonItem />
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Custom width (40%)</p>
                <SkeletonItem width="40%" />
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Custom height</p>
                <SkeletonItem height="8" />
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Different border radius</p>
                <SkeletonItem shape="rounded-md" />
              </div>
            </div>
          </div>
          
          {/* Multiple Skeleton Items */}
          <div>
            <h3 className="text-lg font-medium mb-3">Multiple Skeleton Items</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">Multiple lines with count prop</p>
                <Skeleton count={4} />
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Custom gap between items</p>
                <Skeleton count={4} gap="2" />
              </div>
            </div>
          </div>
          
          {/* Skeleton Color Variants */}
          <div>
            <h3 className="text-lg font-medium mb-3">Skeleton Color Variants</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Default</p>
                  <Skeleton count={2} variant="default" />
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-2">Light</p>
                  <Skeleton count={2} variant="light" />
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-2">Dark</p>
                  <Skeleton count={2} variant="dark" />
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-2">Primary</p>
                  <Skeleton count={2} variant="primary" />
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-2">Secondary</p>
                  <Skeleton count={2} variant="secondary" />
                </div>
              </div>
            </div>
          </div>
          
          {/* With No Animation */}
          <div>
            <h3 className="text-lg font-medium mb-3">Animation Controls</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">Without animation</p>
                <Skeleton count={3} animation={false} />
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">With animation (default)</p>
                <Skeleton count={3} animation={true} />
              </div>
            </div>
          </div>
          
          {/* Specialized Skeleton Components */}
          <div>
            <h3 className="text-lg font-medium mb-3">Text Skeleton</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">Default text block (3 lines)</p>
                <SkeletonText />
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Custom number of lines</p>
                <SkeletonText lines={5} />
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Custom last line width</p>
                <SkeletonText lastLineWidth="40%" />
              </div>
            </div>
          </div>
          
          {/* Avatar Skeleton */}
          <div>
            <h3 className="text-lg font-medium mb-3">Avatar Skeleton</h3>
            <div>
              <p className="text-sm text-gray-500 mb-2">Various sizes</p>
              <div className="flex items-center gap-4 mb-4">
                <SkeletonAvatar size="xs" />
                <SkeletonAvatar size="sm" />
                <SkeletonAvatar size="md" />
                <SkeletonAvatar size="lg" />
                <SkeletonAvatar size="xl" />
              </div>
              
              <p className="text-sm text-gray-500 mb-2">Color variants</p>
              <div className="flex items-center gap-4">
                <SkeletonAvatar variant="default" />
                <SkeletonAvatar variant="primary" />
                <SkeletonAvatar variant="secondary" />
                <SkeletonAvatar variant="light" />
                <SkeletonAvatar variant="dark" />
              </div>
            </div>
          </div>
          
          {/* Skeleton Card */}
          <div>
            <h3 className="text-lg font-medium mb-3">Profile Card Skeleton</h3>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500 mb-2">Default profile card</p>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <SkeletonCard />
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Without avatar</p>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <SkeletonCard hasAvatar={false} />
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Primary variant</p>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <SkeletonCard variant="primary" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Skeleton Table */}
          <div>
            <h3 className="text-lg font-medium mb-3">Table Skeleton</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">Default table skeleton</p>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <SkeletonTable />
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Custom rows and columns</p>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <SkeletonTable rows={3} columns={3} />
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Without header</p>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <SkeletonTable hasHeader={false} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Complex Example */}
          <div>
            <h3 className="text-lg font-medium mb-3">Complex Loading State Example</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Header */}
              <div className="border-b border-gray-200 p-4">
                <SkeletonItem width="30%" height="6" />
              </div>
              
              {/* Main content */}
              <div className="p-4 space-y-6">
                {/* Card item */}
                <div className="flex">
                  <div className="shrink-0">
                    <SkeletonAvatar size="md" />
                  </div>
                  
                  <div className="ms-4 mt-1 w-full">
                    <SkeletonItem width="40%" height="5" className="mb-2" />
                    <SkeletonItem width="25%" height="4" className="mb-4" />
                    
                    <div className="space-y-2">
                      <SkeletonItem height="4" />
                      <SkeletonItem height="4" />
                      <SkeletonItem width="75%" height="4" />
                    </div>
                  </div>
                </div>
                
                {/* Card item */}
                <div className="flex">
                  <div className="shrink-0">
                    <SkeletonAvatar size="md" />
                  </div>
                  
                  <div className="ms-4 mt-1 w-full">
                    <SkeletonItem width="35%" height="5" className="mb-2" />
                    <SkeletonItem width="20%" height="4" className="mb-4" />
                    
                    <div className="space-y-2">
                      <SkeletonItem height="4" />
                      <SkeletonItem width="85%" height="4" />
                    </div>
                  </div>
                </div>
                
                {/* Stats grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <SkeletonItem width="50%" height="5" className="mb-3" />
                    <SkeletonItem width="70%" height="8" />
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <SkeletonItem width="50%" height="5" className="mb-3" />
                    <SkeletonItem width="70%" height="8" />
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <SkeletonItem width="50%" height="5" className="mb-3" />
                    <SkeletonItem width="70%" height="8" />
                  </div>
                </div>
              </div>
              
              {/* Footer */}
              <div className="border-t border-gray-200 p-4 flex justify-between">
                <SkeletonItem width="20%" height="4" />
                <SkeletonItem width="10%" height="4" />
              </div>
            </div>
          </div>
          
          {/* Custom Skeleton Composition */}
          <div>
            <h3 className="text-lg font-medium mb-3">Custom Composition</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-500 mb-2">Using children prop to create custom layouts</p>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <Skeleton>
                  {/* Report card skeleton */}
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                      <SkeletonItem width="30%" height="6" />
                      <SkeletonItem width="20%" height="4" shape="rounded-lg" />
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-2">
                      <SkeletonItem height="4" />
                      <SkeletonItem height="4" />
                      <SkeletonItem width="75%" height="4" />
                    </div>
                    
                    {/* Footer */}
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex gap-2">
                        <SkeletonItem width="10" height="5" shape="rounded-md" />
                        <SkeletonItem width="10" height="5" shape="rounded-md" />
                      </div>
                      <SkeletonItem width="15%" height="5" shape="rounded-md" />
                    </div>
                  </div>
                </Skeleton>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Add this section rendering function or update the existing one
  const renderSpinnersSection = () => {
    // Instead of useState, we'll use a regular variable and a timeout
    // for the fullscreen spinner example
    
    return (
      <section>
        <div className="space-y-8">
          {/* Basic Spinners */}
          <div>
            <h3 className="text-lg font-medium mb-3">Basic Spinners</h3>
            <div className="flex flex-wrap items-center gap-6 p-4 bg-white border border-gray-200 rounded-lg">
              <Spinner size="xs" />
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
              <Spinner size="xl" />
              <Spinner size="2xl" />
            </div>
          </div>
          
          {/* Spinner Colors */}
          <div>
            <h3 className="text-lg font-medium mb-3">Spinner Colors</h3>
            <div className="flex flex-wrap items-center gap-6 p-4 bg-white border border-gray-200 rounded-lg">
              <Spinner color="primary" />
              <Spinner color="secondary" />
              <Spinner color="success" />
              <Spinner color="danger" />
              <Spinner color="warning" />
              <Spinner color="info" />
              <Spinner color="dark" />
              <div className="p-2 bg-gray-800 rounded-md">
                <Spinner color="white" />
              </div>
            </div>
          </div>
          
          {/* Spinner Thickness */}
          <div>
            <h3 className="text-lg font-medium mb-3">Border Thickness</h3>
            <div className="flex flex-wrap items-center gap-6 p-4 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Spinner thickness="thin" />
                <span className="text-sm text-gray-600">Thin</span>
              </div>
              <div className="flex items-center gap-2">
                <Spinner thickness="normal" />
                <span className="text-sm text-gray-600">Normal</span>
              </div>
              <div className="flex items-center gap-2">
                <Spinner thickness="thick" />
                <span className="text-sm text-gray-600">Thick</span>
              </div>
            </div>
          </div>
          
          {/* Spinner Variants */}
          <div>
            <h3 className="text-lg font-medium mb-3">Spinner Variants</h3>
            <div className="flex flex-wrap items-center gap-12 p-4 bg-white border border-gray-200 rounded-lg">
              <div className="flex flex-col items-center gap-2">
                <Spinner variant="border" size="lg" />
                <span className="text-sm text-gray-600">Border</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Spinner variant="dots" size="lg" />
                <span className="text-sm text-gray-600">Dots</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Spinner variant="grow" size="lg" />
                <span className="text-sm text-gray-600">Grow</span>
              </div>
            </div>
          </div>
          
          {/* Spinners with Labels */}
          <div>
            <h3 className="text-lg font-medium mb-3">Spinners with Labels</h3>
            <div className="space-y-4 p-4 bg-white border border-gray-200 rounded-lg">
              <div className="flex flex-wrap gap-8">
                <Spinner showLabel labelPosition="right" />
                <Spinner showLabel label="Processing..." labelPosition="right" />
              </div>
              
              <div className="flex flex-wrap gap-8 mt-4">
                <Spinner showLabel labelPosition="bottom" />
                <Spinner showLabel label="Please wait..." labelPosition="top" />
                <Spinner showLabel label="Submitting..." labelPosition="left" />
              </div>
            </div>
          </div>
          
          {/* Button Spinners */}
          <div>
            <h3 className="text-lg font-medium mb-3">Button Spinners</h3>
            <div className="flex flex-wrap gap-4 p-4 bg-white border border-gray-200 rounded-lg">
              <Button variant="primary">
                <ButtonSpinner color="white" />
                <span className="ml-2">Loading</span>
              </Button>
              
              <Button variant="outline-primary">
                <ButtonSpinner color="primary" />
                <span className="ml-2">Processing</span>
              </Button>
              
              <Button variant="success">
                <span className="mr-2">Submitting</span>
                <ButtonSpinner color="white" />
              </Button>
              
              <Button variant="danger" disabled>
                <ButtonSpinner color="white" />
                <span className="ml-2">Please wait</span>
              </Button>
            </div>
          </div>
          
          {/* Spinners in Cards */}
          <div>
            <h3 className="text-lg font-medium mb-3">Spinners in Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Simple card with spinner */}
              <div className="min-h-60 flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl">
                <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
                  <div className="flex justify-center">
                    <Spinner size="lg" color="primary" />
                  </div>
                </div>
              </div>
              
              {/* Card with spinner and label */}
              <div className="min-h-60 flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl">
                <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
                  <div className="flex flex-col items-center gap-3">
                    <Spinner size="lg" color="primary" />
                    <p className="text-gray-500">Loading data...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Spinner Overlays */}
          <div>
            <h3 className="text-lg font-medium mb-3">Spinner Overlays</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card with content and overlay */}
              <div className="relative min-h-60 bg-white border border-gray-200 shadow-sm rounded-xl p-4">
                <div className="opacity-25">
                  <h4 className="text-lg font-medium mb-2">Card Title</h4>
                  <p className="text-gray-600 mb-3">This content is behind the loading overlay.</p>
                  <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.</p>
                </div>
                
                <SpinnerOverlay 
                  size="lg" 
                  color="primary" 
                  label="Loading content..." 
                />
              </div>
              
              {/* Card with content and transparent overlay */}
              <div className="relative min-h-60 bg-white border border-gray-200 shadow-sm rounded-xl p-4">
                <div className="opacity-25">
                  <h4 className="text-lg font-medium mb-2">Card Title</h4>
                  <p className="text-gray-600 mb-3">This content is behind the transparent loading overlay.</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-gray-100 rounded">Item 1</div>
                    <div className="p-2 bg-gray-100 rounded">Item 2</div>
                    <div className="p-2 bg-gray-100 rounded">Item 3</div>
                    <div className="p-2 bg-gray-100 rounded">Item 4</div>
                  </div>
                </div>
                
                <SpinnerOverlay 
                  size="lg" 
                  color="primary" 
                  label="Updating..." 
                  transparent={true}
                />
              </div>
            </div>
          </div>
          
          {/* Fullscreen Spinner Example (Without useState) */}
          <div>
            <h3 className="text-lg font-medium mb-3">Fullscreen Spinner</h3>
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <p className="text-gray-600 mb-4">For fullscreen loading states, use the FullscreenSpinner component:</p>
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <code className="text-sm text-gray-800">
                  {`<FullscreenSpinner 
    size="xl" 
    color="primary" 
    label="Loading application..." 
  />`}
                </code>
              </div>
              
              <p className="text-gray-600 mt-4">
                For a real demonstration, you would typically use this with a state variable:
              </p>
              
              <div className="bg-gray-100 p-4 rounded-lg mt-2">
                <code className="text-sm text-gray-800">
  {`// At the top level of your component
  const [isLoading, setIsLoading] = useState(false);
  
  // When you need to show the spinner
  setIsLoading(true);
  
  // Later, when loading is complete
  setIsLoading(false);
  
  // In your JSX
  {isLoading && (
    <FullscreenSpinner 
      size="xl" 
      color="primary" 
      label="Loading application..." 
    />
  )}`}
                </code>
              </div>
            </div>
          </div>
          
          {/* Custom Styling Examples */}
          <div>
            <h3 className="text-lg font-medium mb-3">Custom Styling Examples</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Custom styled spinner 1 */}
              <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-lg">
                <Spinner 
                  size="xl" 
                  color="primary" 
                  thickness="thick" 
                  showLabel 
                  labelPosition="bottom"
                  label="Processing"
                />
              </div>
              
              {/* Custom styled spinner 2 */}
              <div className="flex flex-col items-center justify-center p-6 bg-gray-900 rounded-lg">
                <Spinner 
                  variant="dots" 
                  size="lg" 
                  color="white" 
                  showLabel 
                  labelPosition="bottom"
                  label="Loading data"
                  containerClassName="text-white"
                />
              </div>
              
              {/* Custom styled spinner 3 */}
              <div className="flex flex-col items-center justify-center p-6 bg-success/10 rounded-lg border border-success/30">
                <Spinner 
                  variant="border" 
                  size="lg" 
                  color="success" 
                  showLabel 
                  labelPosition="bottom"
                  label="Upload complete"
                  containerClassName="text-success"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderTextAreasSection = () => {
    return (
      <section>
        <div className="space-y-6">
          {/* Basic TextAreas */}
          <div>
            <h3 className="text-lg font-medium mb-3">Basic TextAreas</h3>
            <div className="max-w-sm space-y-3">
              <TextArea 
                placeholder="Default textarea"
                rows={3}
              />
              
              <TextArea 
                placeholder="Gray variant"
                variant="gray"
                rows={3}
              />
              
              <TextArea 
                placeholder="With error message"
                error="This field is required"
                rows={3}
              />
            </div>
          </div>
          
          {/* TextArea Sizes */}
          <div>
            <h3 className="text-lg font-medium mb-3">TextArea Sizes</h3>
            <div className="max-w-sm space-y-3">
              <TextArea 
                placeholder="Small size"
                size="sm"
                rows={2}
              />
              
              <TextArea 
                placeholder="Default size"
                size="default"
                rows={3}
              />
              
              <TextArea 
                placeholder="Large size"
                size="lg"
                rows={4}
              />
            </div>
          </div>
          
          {/* Resize Options */}
          <div>
            <h3 className="text-lg font-medium mb-3">Resize Options</h3>
            <div className="max-w-sm space-y-3">
              <TextArea 
                placeholder="Vertical resize (default)"
                resize="vertical"
              />
              
              <TextArea 
                placeholder="No resize"
                resize="none"
              />
              
              <TextArea 
                placeholder="Horizontal resize"
                resize="horizontal"
              />
              
              <TextArea 
                placeholder="Resize in both directions"
                resize="both"
              />
            </div>
          </div>
          
          {/* Disabled State */}
          <div>
            <h3 className="text-lg font-medium mb-3">Disabled TextArea</h3>
            <div className="max-w-sm">
              <TextArea 
                placeholder="This textarea is disabled"
                disabled
              />
            </div>
          </div>
        </div>
      </section>
    );
  };

  // This is the fixed version of the renderTablesSection function
  // We'll avoid using useState hooks directly in this function

  const renderTablesSection = () => {
    // Sample data for tables
    const usersData = [
      { id: 1, name: "John Brown", age: 32, address: "New York No. 1 Lake Park", tags: ["developer"] },
      { id: 2, name: "Jim Green", age: 42, address: "London No. 1 Lake Park", tags: ["designer"] },
      { id: 3, name: "Joe Black", age: 32, address: "Sidney No. 1 Lake Park", tags: ["manager"] },
      { id: 4, name: "Jane Smith", age: 27, address: "Chicago No. 1 River View", tags: ["developer", "admin"] },
      { id: 5, name: "Mike Wilson", age: 35, address: "Tokyo Central Area", tags: ["designer"] },
      { id: 6, name: "Sarah Johnson", age: 29, address: "Berlin Downtown", tags: ["manager", "admin"] },
      { id: 7, name: "David Lee", age: 38, address: "Paris Avenue 23", tags: ["developer"] },
      { id: 8, name: "Lisa Wong", age: 41, address: "Singapore Marina Bay", tags: ["designer", "manager"] },
    ];
    
    // Table columns definition
    const columns = [
      {
        key: 'name',
        title: 'Name',
        sortable: true,
        searchable: true
      },
      {
        key: 'age',
        title: 'Age',
        sortable: true,
        searchable: true,
        align: 'right',
      },
      {
        key: 'address',
        title: 'Address',
        sortable: true,
        searchable: true,
        nowrap: false,
      },
      {
        key: 'tags',
        title: 'Tags',
        sortable: false,
        searchable: true,
        // Custom render function for tags
        render: (record) => (
          <div className="flex flex-wrap gap-1">
            {record.tags.map(tag => (
              <span 
                key={tag}
                className={`
                  inline-flex items-center gap-x-1 py-1 px-2 rounded-full text-xs font-medium
                  ${tag === 'developer' ? 'bg-blue-100 text-blue-800' : 
                  tag === 'designer' ? 'bg-purple-100 text-purple-800' : 
                  tag === 'manager' ? 'bg-yellow-100 text-yellow-800' : 
                  tag === 'admin' ? 'bg-red-100 text-red-800' : 
                  'bg-gray-100 text-gray-800'}
                `}
              >
                {tag}
              </span>
            ))}
          </div>
        )
      },
      {
        key: 'action',
        title: 'Action',
        align: 'right',
        sortable: false,
        searchable: false,
        // Custom render function for actions
        render: (record) => (
          <div className="flex justify-end gap-2">
            <button 
              type="button"
              className="py-1 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
              onClick={() => alert(`View ${record.name}`)}
            >
              View
            </button>
            <button 
              type="button"
              className="py-1 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-red-600 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none"
              onClick={() => alert(`Delete ${record.name}`)}
            >
              Delete
            </button>
          </div>
        )
      }
    ];
    
    // Action buttons for table header
    const tableActions = {
      left: (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 whitespace-nowrap">
            User Management
          </span>
        </div>
      ),
      right: (
        <>
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
          >
            <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" x2="12" y1="3" y2="15"></line>
            </svg>
            Export
          </button>
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-dark disabled:opacity-50 disabled:pointer-events-none"
          >
            <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add User
          </button>
        </>
      )
    };

    // Custom filter component example
    const filterComponent = (
      <div className="hs-dropdown relative inline-flex">
        <button
          type="button"
          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
        >
          <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"></path>
          </svg>
          Filter
        </button>
      </div>
    );

    return (
      <section>
        <div className="space-y-8">
          {/* Basic Table */}
          <div>
            <h3 className="text-lg font-medium mb-3">Basic Table</h3>
            <Table 
              columns={columns.filter(col => col.key !== 'tags')} 
              data={usersData.slice(0, 3)} 
              keyField="id"
            />
          </div>
          
          {/* Advanced Table with Features */}
          <div>
            <h3 className="text-lg font-medium mb-3">Advanced Table with Features</h3>
            <p className="text-sm text-gray-600 mb-3">
              This table demonstrates various features like sorting, searching, and custom rendering. 
              In a real application, you'd connect this with state to make it interactive.
            </p>
            <Table 
              columns={columns} 
              data={usersData} 
              keyField="id"
              sortable
              searchable
              searchPlaceholder="Search users..."
              pagination
              pageSize={5}
              actions={tableActions}
              filterComponent={filterComponent}
              emptyMessage="No users found"
              hoverable
              size="md"
            />
            <div className="mt-4 text-sm text-gray-600">
              <p>Features demonstrated:</p>
              <ul className="list-disc pl-5 mt-2">
                <li>Sortable columns (click on Name, Age, or Address headers)</li>
                <li>Searchable content (search across all columns)</li>
                <li>Pagination</li>
                <li>Custom actions in header</li>
                <li>Custom cell rendering (Tags column)</li>
              </ul>
            </div>
          </div>
          
          {/* Table Variants */}
          <div>
            <h3 className="text-lg font-medium mb-3">Table Variants</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-medium mb-2">Striped Table</h4>
                <Table 
                  columns={columns.filter(col => col.key !== 'tags' && col.key !== 'action')} 
                  data={usersData.slice(0, 4)} 
                  keyField="id"
                  striped
                  variant="default"
                />
              </div>
              
              <div>
                <h4 className="text-base font-medium mb-2">Primary Theme</h4>
                <Table 
                  columns={columns.filter(col => col.key !== 'tags' && col.key !== 'action')} 
                  data={usersData.slice(0, 4)} 
                  keyField="id"
                  variant="primary"
                />
              </div>
              
              <div>
                <h4 className="text-base font-medium mb-2">Bordered Table</h4>
                <Table 
                  columns={columns.filter(col => col.key !== 'tags' && col.key !== 'action')} 
                  data={usersData.slice(0, 4)} 
                  keyField="id"
                  variant="bordered"
                />
              </div>
            </div>
          </div>
          
          {/* Table Sizes */}
          <div>
            <h3 className="text-lg font-medium mb-3">Table Sizes</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-medium mb-2">Small Size</h4>
                <Table 
                  columns={columns.filter(col => col.key !== 'tags')} 
                  data={usersData.slice(0, 3)} 
                  keyField="id"
                  size="sm"
                />
              </div>
              
              <div>
                <h4 className="text-base font-medium mb-2">Medium Size (Default)</h4>
                <Table 
                  columns={columns.filter(col => col.key !== 'tags')} 
                  data={usersData.slice(0, 3)} 
                  keyField="id"
                  size="md"
                />
              </div>
              
              <div>
                <h4 className="text-base font-medium mb-2">Large Size</h4>
                <Table 
                  columns={columns.filter(col => col.key !== 'tags')} 
                  data={usersData.slice(0, 3)} 
                  keyField="id"
                  size="lg"
                />
              </div>
            </div>
          </div>
          
          {/* Empty State */}
          <div>
            <h3 className="text-lg font-medium mb-3">Empty Table</h3>
            <Table 
              columns={columns.filter(col => col.key !== 'tags')} 
              data={[]} 
              keyField="id"
              emptyMessage={
                <div className="py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No data</h3>
                  <p className="mt-1 text-sm text-gray-500">No records match your criteria.</p>
                  <div className="mt-6">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none"
                    >
                      Add New Data
                    </button>
                  </div>
                </div>
              }
            />
          </div>
          
          {/* Loading State */}
          <div>
            <h3 className="text-lg font-medium mb-3">Loading State</h3>
            <Table 
              columns={columns.filter(col => col.key !== 'tags')} 
              data={usersData.slice(0, 3)} 
              keyField="id"
              loading={true}
            />
          </div>
          
          {/* Custom Loading Component */}
          <div>
            <h3 className="text-lg font-medium mb-3">Custom Loading Component</h3>
            <Table 
              columns={columns.filter(col => col.key !== 'tags')} 
              data={usersData.slice(0, 3)} 
              keyField="id"
              loading={true}
              loadingComponent={
                <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center z-10">
                  <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mb-2"></div>
                  <p className="text-primary font-medium">Loading data...</p>
                </div>
              }
            />
          </div>
          
          {/* Column Customization */}
          <div>
            <h3 className="text-lg font-medium mb-3">Column Customization</h3>
            <Table 
              columns={[
                {
                  key: 'name',
                  title: 'User Information',
                  sortable: true,
                  searchable: true,
                  // Custom column render to show both name and address
                  render: (record) => (
                    <div>
                      <div className="font-medium text-gray-800">{record.name}</div>
                      <div className="text-gray-500 text-xs mt-1">{record.address}</div>
                    </div>
                  )
                },
                {
                  key: 'age',
                  title: 'Age',
                  align: 'center',
                  width: '100px',
                  // Custom column render for age with color coding
                  render: (record) => (
                    <span className={`
                      inline-flex items-center justify-center size-8 rounded-full font-medium
                      ${record.age < 30 ? 'bg-green-100 text-green-800' :
                      record.age < 40 ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'}
                    `}>
                      {record.age}
                    </span>
                  )
                },
                {
                  key: 'tags',
                  title: 'Role',
                  align: 'center',
                  // Show only the first tag
                  render: (record) => (
                    <span className={`
                      inline-block py-1 px-3 rounded-full text-xs font-medium
                      ${record.tags[0] === 'developer' ? 'bg-blue-100 text-blue-800' : 
                      record.tags[0] === 'designer' ? 'bg-purple-100 text-purple-800' : 
                      record.tags[0] === 'manager' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'}
                    `}>
                      {record.tags[0]}
                    </span>
                  )
                },
                {
                  key: 'status',
                  title: 'Status',
                  align: 'center',
                  // Render a column that doesn't exist in original data
                  render: () => (
                    <span className="inline-flex items-center gap-1 py-1 px-2 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <span className="size-2 inline-block bg-green-500 rounded-full"></span>
                      Active
                    </span>
                  )
                },
                {
                  key: 'action',
                  title: 'Action',
                  align: 'right',
                  render: (record) => (
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center size-8 rounded-full border border-transparent text-gray-500 hover:bg-gray-100"
                      >
                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center size-8 rounded-full border border-transparent text-gray-500 hover:bg-gray-100"
                      >
                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button
                        type="button" 
                        className="inline-flex items-center justify-center size-8 rounded-full border border-transparent text-red-500 hover:bg-red-50"
                      >
                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  )
                }
              ]} 
              data={usersData.slice(0, 5)} 
              keyField="id"
              sortable
              hoverable
            />
          </div>
        </div>
      </section>
    );
  };

  const renderToastsSection = () => {
    // Inner component to demonstrate the useToast hook
    // We need this inner component to use the hook properly
    const ToastDemo = () => {
      const toast = useToast();
      
      const showDefaultToast = () => {
        toast.addToast({
          message: 'This is a default toast message',
          title: 'Default Toast'
        });
      };
      
      const showSuccessToast = () => {
        toast.success('Operation completed successfully!', {
          title: 'Success',
          duration: 3000
        });
      };
      
      const showErrorToast = () => {
        toast.error('An error has occurred.', {
          title: 'Error',
          duration: 4000,
          showProgress: true
        });
      };
      
      const showWarningToast = () => {
        toast.warning('Please review your information.', {
          title: 'Warning',
          autoClose: false
        });
      };
      
      const showInfoToast = () => {
        toast.info('New updates are available.', {
          position: 'top-right'
        });
      };
      
      const showActionToast = () => {
        toast.info('Your file has been deleted.', {
          actionText: 'Undo',
          onAction: () => {
            toast.success('Action undone successfully!');
          }
        });
      };
      
      const showCustomPositionToast = () => {
        toast.addToast({
          message: 'This toast appears at the top center',
          type: 'info',
          position: 'top-center',
          variant: 'outline'
        });
      };
      
      const showNoAutoCloseToast = () => {
        toast.addToast({
          message: 'This toast will not auto-close',
          type: 'warning',
          autoClose: false,
          title: 'Manual Close'
        });
      };
      
      const showNoIconToast = () => {
        toast.success('This toast has no icon', {
          showIcon: false
        });
      };
      
      const showColoredVariantToast = () => {
        toast.addToast({
          message: 'This toast uses the colored variant',
          type: 'success',
          variant: 'colored'
        });
      };
      
      const showOutlineVariantToast = () => {
        toast.error('This toast uses the outline variant', {
          variant: 'outline'
        });
      };
      
      const showMinimalVariantToast = () => {
        toast.warning('This toast uses the minimal variant', {
          variant: 'minimal'
        });
      };
      
      const showLongDurationToast = () => {
        toast.info('This toast will stay for 10 seconds', {
          duration: 10000,
          showProgress: true
        });
      };
      
      return (
        <div className="space-y-6">
          {/* Interactive Demo */}
          <div>
            <h3 className="text-lg font-medium mb-3">Interactive Toast Demo</h3>
            <p className="text-sm text-gray-600 mb-4">
              Click the buttons below to show different types of toast notifications.
              The toasts will appear at the bottom right corner of the screen.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <Button onClick={showDefaultToast}>Default Toast</Button>
              <Button onClick={showSuccessToast} variant="success">Success Toast</Button>
              <Button onClick={showErrorToast} variant="danger">Error Toast</Button>
              <Button onClick={showWarningToast} variant="warning">Warning Toast</Button>
              <Button onClick={showInfoToast} variant="outline-primary">Info Toast</Button>
              <Button onClick={showActionToast} variant="outline-secondary">Toast with Action</Button>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-4">
              <Button onClick={showCustomPositionToast} variant="outline-gray">Custom Position</Button>
              <Button onClick={showNoAutoCloseToast} variant="outline-gray">No Auto-Close</Button>
              <Button onClick={showNoIconToast} variant="outline-gray">No Icon</Button>
              <Button onClick={showColoredVariantToast} variant="outline-gray">Colored Variant</Button>
              <Button onClick={showOutlineVariantToast} variant="outline-gray">Outline Variant</Button>
              <Button onClick={showMinimalVariantToast} variant="outline-gray">Minimal Variant</Button>
              <Button onClick={showLongDurationToast} variant="outline-gray">Long Duration</Button>
            </div>
          </div>
        </div>
      );
    };
    
    // Static examples section
    const StaticExamples = () => (
      <div className="space-y-6 mt-8">
        {/* Toast Types */}
        <div>
          <h3 className="text-lg font-medium mb-3">Toast Types</h3>
          <div className="space-y-3">
            <Toast
              id="static-default"
              message="This is a default toast message."
              isVisible={true}
              autoClose={false}
              onClose={() => {}}
            />
            
            <Toast
              id="static-success"
              message="Operation completed successfully!"
              type="success"
              isVisible={true}
              autoClose={false}
              onClose={() => {}}
            />
            
            <Toast
              id="static-error"
              message="An error has occurred."
              type="error"
              isVisible={true}
              autoClose={false}
              onClose={() => {}}
            />
            
            <Toast
              id="static-warning"
              message="Please review your information."
              type="warning"
              isVisible={true}
              autoClose={false}
              onClose={() => {}}
            />
          </div>
        </div>
        
        {/* Toast with Title */}
        <div>
          <h3 className="text-lg font-medium mb-3">Toast with Title</h3>
          <Toast
            id="static-with-title"
            title="Notification Title"
            message="This toast includes a title above the message."
            type="info"
            isVisible={true}
            autoClose={false}
            onClose={() => {}}
          />
        </div>
        
        {/* Toast with Action */}
        <div>
          <h3 className="text-lg font-medium mb-3">Toast with Action</h3>
          <Toast
            id="static-with-action"
            message="Your email has been sent."
            type="success"
            isVisible={true}
            autoClose={false}
            actionText="Undo"
            onAction={() => {}}
            onClose={() => {}}
          />
        </div>
        
        {/* Toast Variants */}
        <div>
          <h3 className="text-lg font-medium mb-3">Toast Variants</h3>
          <div className="space-y-3">
            <Toast
              id="static-default-variant"
              message="Default variant"
              type="info"
              variant="default"
              isVisible={true}
              autoClose={false}
              onClose={() => {}}
            />
            
            <Toast
              id="static-colored-variant"
              message="Colored variant"
              type="success"
              variant="colored"
              isVisible={true}
              autoClose={false}
              onClose={() => {}}
            />
            
            <Toast
              id="static-outline-variant"
              message="Outline variant"
              type="warning"
              variant="outline"
              isVisible={true}
              autoClose={false}
              onClose={() => {}}
            />
            
            <Toast
              id="static-minimal-variant"
              message="Minimal variant"
              type="error"
              variant="minimal"
              isVisible={true}
              autoClose={false}
              onClose={() => {}}
            />
          </div>
        </div>
        
        {/* Progress Toast */}
        <div>
          <h3 className="text-lg font-medium mb-3">Toast with Progress Bar</h3>
          <Toast
            id="static-progress"
            message="This toast displays a progress bar."
            type="info"
            isVisible={true}
            autoClose={false}
            showProgress={true}
            onClose={() => {}}
          />
        </div>
      </div>
    );
    
    return (
      <section>
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-medium mb-2">Toast Notifications</h3>
            <p className="text-gray-600 mb-4">
              Toast notifications provide brief messages about app processes. 
              The system is built with a context provider for easy management.
            </p>
            
            {/* Note on setup */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
              <h4 className="font-medium text-blue-800 mb-2">Implementation Note</h4>
              <p className="text-sm text-blue-700">
                To use toast notifications in your application, wrap your app with the <code className="bg-blue-100 px-1 rounded">ToastProvider</code> component
                in your main application file, then use the <code className="bg-blue-100 px-1 rounded">useToast</code> hook in your components.
              </p>
            </div>
            
            {/* Interactive Demo */}
            <ToastDemo />
            
            {/* Static Examples */}
            <StaticExamples />
            
            {/* Usage Examples */}
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-3">Usage Examples</h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                <pre className="text-sm text-gray-800 overflow-auto p-2">
                  {`// Setup
  import { ToastProvider, useToast } from '@/components/common/Toast';
  
  // In your main App component
  function App() {
    return (
      <ToastProvider>
        {/* Your app content */}
      </ToastProvider>
    );
  }
  
  // In any component
  function MyComponent() {
    const toast = useToast();
    
    const handleSubmit = async () => {
      try {
        // Your logic
        toast.success('Data saved successfully!');
      } catch (error) {
        toast.error('Failed to save data');
      }
    }
    
    return <Button onClick={handleSubmit}>Save</Button>;
  }`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-md">
        <div className="container mx-auto max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold">WBS Component Library</h1>
          <p className="text-sm opacity-80">Component documentation and examples</p>
        </div>
      </header>
       
      <div className="container mx-auto py-6 px-4 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="md:w-64 flex-shrink-0">
            <nav className="sticky top-6">
              <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
                {componentCategories.map((category, index) => (
                  <div key={index} className="border-b border-neutral-200 last:border-b-0">
                    <div className="px-4 py-3 bg-neutral-50 font-medium text-neutral-700">
                      {category.title}
                    </div>
                    <ul>
                      {category.items.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => setActiveSection(item.id)}
                            className={`w-full text-left px-4 py-2 text-sm ${
                              activeSection === item.id 
                              ? 'bg-primary-light/10 text-primary font-medium' 
                              : 'text-neutral-600 hover:bg-neutral-50'
                            }`}
                          >
                            {item.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Link 
                  to="/" 
                  className="flex items-center text-primary hover:underline text-sm"
                >
                  &larr; Back to Homepage
                </Link>
              </div>
            </nav>
          </aside>
          
          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h2 className="text-2xl font-semibold mb-6 pb-2 border-b border-neutral-200">
                {componentCategories.flatMap(c => c.items).find(i => i.id === activeSection)?.name || 'Components'}
              </h2>
              
              {renderComponentSection()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}   