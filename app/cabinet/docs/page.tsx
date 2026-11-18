import ProtectedRoute from "@/components/protected-route"
import CabinetHeader from "@/components/cabinet-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, Eye, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DocsPage() {
  const savedDocuments = [
    {
      id: 1,
      name: "John Smith Analysis",
      date: "2024-01-15",
      type: "Personal Numerology",
    },
    {
      id: 2,
      name: "Business Name Analysis",
      date: "2024-01-14",
      type: "Business Numerology",
    },
    {
      id: 3,
      name: "Sarah Johnson Report",
      date: "2024-01-13",
      type: "Personal Numerology",
    },
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <CabinetHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Saved docs</h1>
            <p className="text-xl text-gray-600">Access your previously saved numerology generated docs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedDocuments.map((doc) => (
              <Card
                key={doc.id}
                className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-indigo-600" />
                    <div>
                      <CardTitle className="text-lg text-gray-800">{doc.name}</CardTitle>
                      <p className="text-sm text-gray-600">{doc.type}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">Saved on {doc.date}</p>
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-300 bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {savedDocuments.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No saved documents yet</h3>
              <p className="text-gray-500">Your generated documents will appear here</p>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  )
}
