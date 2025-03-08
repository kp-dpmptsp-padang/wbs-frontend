import React, { useState } from 'react';

const FAQItem = ({ question, answer, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200">
      <button 
        className={`hs-accordion-toggle py-4 inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 hover:text-primary transition ${isOpen ? 'text-primary' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
          </svg>
        ) : (
          <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg>
        )}
        {question}
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
        aria-hidden={!isOpen}
      >
        <div className="pb-4 pt-0">
          <p className="text-gray-700">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqItems = [
    {
      id: 1,
      question: 'Apa itu Whistle Blowing System (WBS)?',
      answer: 'Whistleblowing System itu adalah suatu metode pelaporan yang terstruktur. Sistem ini dirancang untuk menerima laporan terkait indikasi pelanggaran, seperti korupsi, suap, dan pelanggaran kode etik lainnya dengan menjamin kerahasiaan identitas pelapor dan informasi yang dilaporkan.'
    },
    {
      id: 2,
      question: 'Apa itu Whistle Blowing System (WBS)?',
      answer: 'Whistleblowing System adalah platform digital yang memungkinkan pengguna untuk melaporkan tindakan pelanggaran secara anonim. WBS ini dikelola secara profesional untuk memastikan setiap laporan ditindaklanjuti dengan baik.'
    },
    {
      id: 3,
      question: 'Apa itu Whistle Blowing System (WBS)?',
      answer: 'Whistleblowing System adalah platform digital yang memungkinkan pengguna untuk melaporkan tindakan pelanggaran seperti suap dan tindakan serupa. Sistem ini dirancang dengan mempertimbangkan privasi pelapor dan pengelolaan yang terstruktur dalam pemrosesan laporan.'
    },
    {
      id: 4,
      question: 'Apa itu Whistle Blowing System (WBS)?',
      answer: 'Whistleblowing System adalah saluran pelaporan khusus yang disediakan untuk melaporkan dugaan tindakan pelanggaran atau kecurangan yang terjadi di lingkungan organisasi. Pelaporan melalui sistem ini akan diproses dengan prinsip kerahasiaan, independen, dan profesional.'
    },
    {
      id: 5,
      question: 'Apa itu Whistle Blowing System (WBS)?',
      answer: 'Whistleblowing System merupakan sistem yang memfasilitasi pelaporan tindakan tidak etis atau ilegal yang terjadi dalam organisasi. Melalui sistem ini, Anda dapat melaporkan kasus-kasus pelanggaran dengan jaminan perlindungan identitas dan informasi yang Anda laporkan.'
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Menjawab Pertanyaan Anda</h2>
          <p className="text-lg text-gray-700">
            Jawaban dari Pertanyaan yang Sering Ditanyakan
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-2">
            {faqItems.map((item, index) => (
              <FAQItem 
                key={item.id}
                question={item.question}
                answer={item.answer}
                defaultOpen={index === 2} // Open the third item by default
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;