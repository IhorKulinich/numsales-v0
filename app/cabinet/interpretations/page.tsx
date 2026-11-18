import ProtectedRoute from "@/components/protected-route"
import CabinetHeader from "@/components/cabinet-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Save, Plus } from "lucide-react"

export default function InterpretationsPage() {
  const interpretations = [
    {
      id: 1,
      number: "1",
      title: "Life Path Number 1",
      content: "People with Life Path Number 1 are natural leaders, independent, and pioneering...",
    },
    {
      id: 2,
      number: "2",
      title: "Life Path Number 2",
      content: "Those with Life Path Number 2 are cooperative, diplomatic, and sensitive...",
    },
    {
      id: 3,
      number: "3",
      title: "Life Path Number 3",
      content: "Life Path Number 3 individuals are creative, expressive, and optimistic...",
    },
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <CabinetHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Custom Interpretations</h1>
            <p className="text-xl text-gray-600">Customize and manage your numerology interpretations</p>
          </div>

          <div className="mb-6">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Interpretation
            </Button>
          </div>

          <div className="grid gap-6">
            {interpretations.map((interpretation) => (
              <Card key={interpretation.id} className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-gray-800">{interpretation.title}</CardTitle>
                    <Button size="sm" variant="outline" className="border-gray-300 bg-transparent">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Number</label>
                      <Input value={interpretation.number} className="w-20" readOnly aria-readonly />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <Input value={interpretation.title} readOnly aria-readonly />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Interpretation</label>
                      <Textarea value={interpretation.content} rows={4} readOnly aria-readonly />
                    </div>
                    <div className="flex justify-end">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
