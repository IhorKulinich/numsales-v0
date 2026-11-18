import ProtectedRoute from "@/components/protected-route"
import CabinetHeader from "@/components/cabinet-header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  const faqs = [
    {
      question: "How do I save my calculations?",
      answer:
        "You can save your calculations by clicking the 'Save' button after completing any numerology analysis. Saved calculations will appear in your 'Saves' section.",
    },
    {
      question: "Can I customize interpretations?",
      answer:
        "Yes! Pro users can edit and customize interpretations in the 'Interpretations' section. Your custom interpretations will be used in all future calculations.",
    },
    {
      question: "How do I export my reports?",
      answer:
        "Standard and Pro users can export reports as PDF or PNG files. Look for the download button in your calculation results or saved calculations.",
    },
    {
      question: "What's the difference between plans?",
      answer:
        "Light includes basic calculations, Standard adds interpretations and saving, Pro includes custom interpretations and export features. Check the Plans section for full details.",
    },
    {
      question: "How do I upgrade my plan?",
      answer:
        "Visit the 'Plans' section in your cabinet to see available upgrades. You can upgrade at any time, and the new features will be available immediately.",
    },
    {
      question: "Can I downgrade my plan?",
      answer:
        "Plans cannot be downgraded, but you can always upgrade to access more features. This policy ensures you don't lose access to saved data and customizations.",
    },
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <CabinetHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600">Find answers to common questions about using Numculator</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white/80 backdrop-blur-sm rounded-lg px-6 border-0 shadow-sm"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-800 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
