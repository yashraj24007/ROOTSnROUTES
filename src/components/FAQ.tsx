import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How does the AI chatbot help in planning my itinerary for Jharkhand?",
      answer: "Our AI chatbot uses advanced algorithms to analyze your preferences, budget, travel dates, and interests to create personalized itineraries. It considers factors like weather conditions, local events, and your travel style to recommend the best destinations, activities, and accommodations in Jharkhand."
    },
    {
      question: "What kind of eco-tourism experiences can I find on ROOTSnROUTES?",
      answer: "We offer a wide range of eco-tourism experiences including wildlife safaris at Betla National Park, waterfall trekking at Hundru Falls, tribal village stays, forest conservation activities, bird watching tours, and sustainable farming experiences with local communities."
    },
    {
      question: "How does ROOTSnROUTES ensure secure payments and verified services?",
      answer: "We use blockchain technology to ensure all transactions are secure and transparent. All service providers including homestays, guides, and transport operators are verified through our rigorous screening process. Smart contracts automatically handle payments and provide dispute resolution."
    },
    {
      question: "What are the benefits of booking homestays through the local marketplace?",
      answer: "Booking through our marketplace directly supports local families and communities. You get authentic cultural experiences, home-cooked traditional meals, and insights into local customs. All homestays are verified for safety and quality, and you can read genuine reviews from previous guests."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about ROOTSnROUTES
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-2xl px-6">
                <AccordionTrigger className="text-left text-lg font-medium text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;