import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Accordion, { AccordionItem } from '@/components/common/Accordion';
import Alert from '@/components/common/Alert';
import Avatar from '@/components/common/Avatar';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Carousel, { CarouselSlide } from '@/components/common/Carousel';
import Chart from '@/components/common/Chart';
import ChatBubbles, { ChatBubble } from '@/components/common/ChatBubbles';
import Checkbox from '@/components/common/Checkbox';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';

// import CheckboxGroup from '@/components/common/CheckboxGroup';

import Logo from '@/components/common/Logo';
import FeatureCard from '@/components/guest/FeatureCard';
import ReportCard from '@/components/user/ReportCard';

export default function Demo() {
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('buttons');
  
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
        { id: 'skeletons', name: 'Skeletons' },
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
      case 'inputs':
        return renderInputsSection();
      case 'textareas':
        return renderTextAreasSection();

      case 'logos':
        return renderLogosSection();
      
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