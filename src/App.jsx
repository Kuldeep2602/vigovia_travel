import { useState } from 'react'
import ItineraryForm from './components/ItineraryForm'
import PDFGenerator from './components/PDFGenerator'

export default function App() {
  const [itineraryData, setItineraryData] = useState(null)
  const [showPDF, setShowPDF] = useState(false)

  const handleGenerateItinerary = (data) => {
    setItineraryData(data)
    setShowPDF(true)
  }

  const handleBackToForm = () => {
    setShowPDF(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-vigovia-light to-vigovia-accent/20">
      {!showPDF ? (
        <ItineraryForm onGenerate={handleGenerateItinerary} />
      ) : (
        <PDFGenerator 
          data={itineraryData} 
          onBack={handleBackToForm}
        />
      )}
    </div>
  )
}