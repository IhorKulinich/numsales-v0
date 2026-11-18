import ProtectedRoute from "@/components/protected-route"
import CabinetHeader from "@/components/cabinet-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, User, Calendar, Star } from "lucide-react"

export default function SavesPage() {
  const personData = [
    {
      id: 1,
      firstName: "John",
      lastName: "Smith",
      fathersName: "Michael",
      savedDate: "2024-01-15",
    },
    {
      id: 2,
      firstName: "Sarah",
      lastName: "Johnson",
      fathersName: "Robert",
      savedDate: "2024-01-14",
    },
    {
      id: 3,
      firstName: "Maria",
      lastName: "Garcia",
      fathersName: "Carlos",
      savedDate: "2024-01-13",
    },
  ]

  const destinyProgramData = [
    {
      id: 1,
      fullName: "Alexander Thompson",
      sex: "Male",
      day: 15,
      month: 3,
      year: 1985,
      savedDate: "2024-01-15",
    },
    {
      id: 2,
      fullName: "Emma Wilson",
      sex: "Female",
      day: 22,
      month: 7,
      year: 1992,
      savedDate: "2024-01-14",
    },
    {
      id: 3,
      fullName: "David Brown",
      sex: "Male",
      day: 8,
      month: 11,
      year: 1978,
      savedDate: "2024-01-13",
    },
  ]

  const karmData = [
    {
      id: 1,
      fullName: "Jennifer Davis",
      sex: "Female",
      day: 3,
      month: 9,
      year: 1988,
      savedDate: "2024-01-15",
    },
    {
      id: 2,
      fullName: "Michael Rodriguez",
      sex: "Male",
      day: 17,
      month: 12,
      year: 1975,
      savedDate: "2024-01-14",
    },
    {
      id: 3,
      fullName: "Lisa Anderson",
      sex: "Female",
      day: 29,
      month: 5,
      year: 1990,
      savedDate: "2024-01-13",
    },
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <CabinetHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Saved Calculations</h1>
            <p className="text-xl text-gray-600">Access your previously saved calculation data and inputs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Person Column */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <User className="w-6 h-6 text-indigo-600" />
                  <CardTitle className="text-xl text-gray-800">Person</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {personData.map((person) => (
                    <div key={person.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <span className="font-medium text-gray-600">First Name:</span>
                              <span className="text-gray-800">{person.firstName}</span>
                              <span className="font-medium text-gray-600">Last Name:</span>
                              <span className="text-gray-800">{person.lastName}</span>
                              <span className="font-medium text-gray-600">Father's Name:</span>
                              <span className="text-gray-800">{person.fathersName}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Saved: {person.savedDate}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {personData.length === 0 && (
                    <div className="text-center py-8">
                      <User className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">No person data saved yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Destiny Program Column */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-6 h-6 text-indigo-600" />
                  <CardTitle className="text-xl text-gray-800">Destiny Program</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {destinyProgramData.map((destiny) => (
                    <div key={destiny.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <span className="font-medium text-gray-600">Full Name:</span>
                              <span className="text-gray-800">{destiny.fullName}</span>
                              <span className="font-medium text-gray-600">Sex:</span>
                              <span className="text-gray-800">{destiny.sex}</span>
                              <span className="font-medium text-gray-600">Day:</span>
                              <span className="text-gray-800">{destiny.day}</span>
                              <span className="font-medium text-gray-600">Month:</span>
                              <span className="text-gray-800">{destiny.month}</span>
                              <span className="font-medium text-gray-600">Year:</span>
                              <span className="text-gray-800">{destiny.year}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Saved: {destiny.savedDate}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {destinyProgramData.length === 0 && (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">No destiny program data saved yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Karm Column */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Star className="w-6 h-6 text-indigo-600" />
                  <CardTitle className="text-xl text-gray-800">Karm</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {karmData.map((karm) => (
                    <div key={karm.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <span className="font-medium text-gray-600">Full Name:</span>
                              <span className="text-gray-800">{karm.fullName}</span>
                              <span className="font-medium text-gray-600">Sex:</span>
                              <span className="text-gray-800">{karm.sex}</span>
                              <span className="font-medium text-gray-600">Day:</span>
                              <span className="text-gray-800">{karm.day}</span>
                              <span className="font-medium text-gray-600">Month:</span>
                              <span className="text-gray-800">{karm.month}</span>
                              <span className="font-medium text-gray-600">Year:</span>
                              <span className="text-gray-800">{karm.year}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Saved: {karm.savedDate}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {karmData.length === 0 && (
                    <div className="text-center py-8">
                      <Star className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">No karm data saved yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
