import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Accordion, { AccordionItem } from '@/components/common/Accordion';
import Alert from '@/components/common/Alert';
import Avatar from '@/components/common/Avatar';
import Button from '@/components/common/Button';
// Uncomment when components are created
// import Card from '@/components/common/Card';
// import Badge from '@/components/common/Badge';
// import Alert from '@/components/common/Alert';
// import more components as needed

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
      case 'buttons':
        return renderButtonsSection();
      case 'cards':
        return renderCardsSection();
      case 'badges':
        return renderBadgesSection();
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
  
  const renderCardsSection = () => (
    <section>
      <div className="p-6 bg-neutral-50 rounded-lg">
        <p className="text-neutral-600">Card component will be implemented soon.</p>
      </div>
      
      {/* Uncomment when Card component is created
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Basic Card">
          <p>This is a basic card component with a title and content.</p>
        </Card>
        
        <Card title="Card with Footer" footer={<Button variant="primary" size="small">Action</Button>}>
          <p>This card includes a footer with an action button.</p>
        </Card>
        
        <Card title="Interactive Card" clickable>
          <p>This card is clickable and can be used for navigation.</p>
        </Card>
      </div>
      */}
    </section>
  );
  
  const renderBadgesSection = () => (
    <section>
      <div className="p-6 bg-neutral-50 rounded-lg">
        <p className="text-neutral-600">Badge component will be implemented soon.</p>
      </div>
      
      {/* Uncomment when Badge component is created
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Variants</h3>
        <div className="flex flex-wrap gap-3">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </div>
      */}
    </section>
  );
  
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">WBS Component Library</h1>
          <p className="text-sm opacity-80">Component documentation and examples</p>
        </div>
      </header>
      
      <div className="container mx-auto py-6 px-4">
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