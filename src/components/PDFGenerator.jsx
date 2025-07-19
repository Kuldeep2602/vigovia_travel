import { useRef } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { FaPlane, FaCar, FaBed, FaUtensils, FaArrowLeft, FaDownload } from 'react-icons/fa'
import { MdLocationOn, MdAccessTime } from 'react-icons/md'

export default function PDFGenerator({ data, onBack }) {
  const pdfRef = useRef()

  const generatePDF = async () => {
    const element = pdfRef.current
    
    // Configure html2canvas options for better quality
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    
    const imgWidth = 210 // A4 width in mm
    const pageHeight = 295 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight

    let position = 0

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    // Add additional pages if content exceeds one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    // Download the PDF
    pdf.save(`${data.destination}-itinerary.pdf`)
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    })
  }

  const getDaysNights = () => {
    if (!data.departureDate || !data.arrivalDate) return ''
    const start = new Date(data.departureDate)
    const end = new Date(data.arrivalDate)
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1
    const nights = days - 1
    return `${days} Days ${nights} Nights`
  }

  return (
    <div className="min-h-screen bg-vigovia-light">
      {/* Control Buttons */}
      <div className="fixed top-4 left-4 z-10 flex gap-3">
        <button
          onClick={onBack}
          className="bg-vigovia-primary text-white px-4 py-2 rounded-lg hover:bg-vigovia-secondary transition-colors flex items-center shadow-lg"
        >
          <FaArrowLeft className="mr-2" />
          Back to Form
        </button>
        <button
          onClick={generatePDF}
          className="bg-vigovia-accent text-white px-4 py-2 rounded-lg hover:bg-vigovia-secondary transition-colors flex items-center shadow-lg"
        >
          <FaDownload className="mr-2" />
          Download PDF
        </button>
      </div>

      {/* PDF Content */}
      <div ref={pdfRef} className="max-w-4xl mx-auto bg-white shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-gradient-blue via-vigovia-accent to-vigovia-secondary p-8 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">vigovia</h1>
              <p className="text-sm opacity-90">PLAN.PACK.GO</p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold">Hi, Kuldeep!</h2>
              <h3 className="text-xl font-semibold">{data.destination} Itinerary</h3>
              <p className="text-sm opacity-90">{getDaysNights()}</p>
            </div>
          </div>
          
          <div className="flex justify-center space-x-8 mt-6 text-sm">
            <FaPlane size={20} />
            <FaBed size={20} />
            <FaCar size={20} />
            <FaUtensils size={20} />
          </div>
        </div>

        {/* Trip Summary */}
        <div className="bg-white p-6 border-b border-vigovia-accent/20">
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div>
              <p className="font-semibold text-vigovia-dark">Departure From</p>
              <p className="text-vigovia-secondary">{data.departureFrom}</p>
            </div>
            <div>
              <p className="font-semibold text-vigovia-dark">Departure</p>
              <p className="text-vigovia-secondary">{formatDate(data.departureDate)}</p>
            </div>
            <div>
              <p className="font-semibold text-vigovia-dark">Arrival</p>
              <p className="text-vigovia-secondary">{formatDate(data.arrivalDate)}</p>
            </div>
            <div>
              <p className="font-semibold text-vigovia-dark">Destination</p>
              <p className="text-vigovia-secondary">{data.destination}</p>
            </div>
            <div className="col-span-4 mt-2">
              <p className="font-semibold text-vigovia-dark">No. Of Travellers</p>
              <p className="text-vigovia-secondary">{data.travelers}</p>
            </div>
          </div>
        </div>

        {/* Daily Itinerary */}
        <div className="p-6">
          {data.days.map((day, dayIndex) => (
            <div key={day.id} className="mb-8 last:mb-0">
              <div className="flex items-start">
                {/* Day Number */}
                <div className="bg-vigovia-primary text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg mr-6 flex-shrink-0">
                  Day {dayIndex + 1}
                </div>

                {/* Day Content */}
                <div className="flex-1">
                  {/* Day Header */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-vigovia-dark mb-1">
                      {formatDate(day.date) || `Day ${dayIndex + 1}`}
                    </h3>
                    <p className="text-sm text-vigovia-secondary">
                      Arrival in {data.destination} & City Exploration
                    </p>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-4">
                    {/* Activities grouped by time */}
                    {['morning', 'afternoon', 'evening'].map(timeSlot => {
                      const activities = day.activities.filter(activity => activity.type === timeSlot)
                      const transfers = day.transfers.filter(transfer => {
                        const transferTime = new Date(`2000-01-01 ${transfer.time}`)
                        const hour = transferTime.getHours()
                        if (timeSlot === 'morning') return hour >= 6 && hour < 12
                        if (timeSlot === 'afternoon') return hour >= 12 && hour < 18
                        return hour >= 18 || hour < 6
                      })

                      if (activities.length === 0 && transfers.length === 0) return null

                      return (
                        <div key={timeSlot} className="border-l-2 border-vigovia-accent pl-6 relative">
                          {/* Time Badge */}
                          <div className="absolute -left-3 top-0 bg-vigovia-accent text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            <MdAccessTime size={12} />
                          </div>
                          
                          <div className="mb-3">
                            <h4 className="font-semibold text-vigovia-primary capitalize mb-2">
                              {timeSlot}
                            </h4>

                            {/* Transfers */}
                            {transfers.map(transfer => (
                              <div key={transfer.id} className="mb-3 p-3 bg-vigovia-light/30 rounded-lg border border-vigovia-accent/20">
                                <div className="flex items-center text-sm text-vigovia-dark">
                                  <FaCar className="mr-2 text-vigovia-accent" />
                                  <span className="font-medium">
                                    {transfer.time} - {transfer.type.charAt(0).toUpperCase() + transfer.type.slice(1)} Transfer
                                  </span>
                                </div>
                                <p className="text-sm text-vigovia-secondary ml-6">
                                  {transfer.from} to {transfer.to} ({transfer.duration})
                                </p>
                              </div>
                            ))}

                            {/* Activities */}
                            {activities.map(activity => (
                              <div key={activity.id} className="mb-3">
                                <div className="flex items-start">
                                  <div className="flex items-center text-sm text-vigovia-dark mb-1">
                                    <MdLocationOn className="mr-2 text-vigovia-accent" />
                                    <span className="font-medium">
                                      {activity.time && `${activity.time} - `}
                                      {activity.name || 'Activity'}
                                    </span>
                                  </div>
                                </div>
                                {activity.description && (
                                  <p className="text-sm text-vigovia-secondary ml-6">
                                    {activity.description}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Activity Summary Table */}
        <div className="p-6 border-t border-vigovia-accent/20">
          <h2 className="text-2xl font-bold text-vigovia-primary mb-6">Activity Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-2 border-vigovia-primary rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-vigovia-primary text-white">
                  <th className="px-4 py-3 text-left font-semibold">City</th>
                  <th className="px-4 py-3 text-left font-semibold">Activity</th>
                  <th className="px-4 py-3 text-left font-semibold">Type</th>
                  <th className="px-4 py-3 text-left font-semibold">Time Required</th>
                </tr>
              </thead>
              <tbody>
                {data.days.map((day) => 
                  day.activities.map((activity, activityIndex) => (
                    <tr 
                      key={`${day.id}-${activity.id}`} 
                      className={`${activityIndex % 2 === 0 ? 'bg-vigovia-light/30' : 'bg-white'} border-b border-vigovia-accent/20`}
                    >
                      <td className="px-4 py-3 text-vigovia-dark font-medium">{data.destination}</td>
                      <td className="px-4 py-3 text-vigovia-dark">{activity.name || 'Activity'}</td>
                      <td className="px-4 py-3 text-vigovia-secondary capitalize">
                        {activity.type === 'morning' && 'Nature/Sightseeing'}
                        {activity.type === 'afternoon' && 'Cultural Experience'}
                        {activity.type === 'evening' && 'Entertainment'}
                      </td>
                      <td className="px-4 py-3 text-vigovia-secondary">
                        {activity.description ? '2-3 Hours' : '1-2 Hours'}
                      </td>
                    </tr>
                  ))
                )}
                {/* Add transfers as activities */}
                {data.days.map((day) => 
                  day.transfers.map((transfer, transferIndex) => (
                    <tr 
                      key={`${day.id}-transfer-${transfer.id}`} 
                      className={`${transferIndex % 2 === 0 ? 'bg-vigovia-light/30' : 'bg-white'} border-b border-vigovia-accent/20`}
                    >
                      <td className="px-4 py-3 text-vigovia-dark font-medium">{data.destination}</td>
                      <td className="px-4 py-3 text-vigovia-dark">
                        {transfer.type.charAt(0).toUpperCase() + transfer.type.slice(1)} Transfer - {transfer.from} to {transfer.to}
                      </td>
                      <td className="px-4 py-3 text-vigovia-secondary">Transport</td>
                      <td className="px-4 py-3 text-vigovia-secondary">{transfer.duration || '30-45 mins'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Terms and Conditions Section */}
        <div className="p-6 border-t border-vigovia-accent/20">
          <h3 className="text-lg font-bold text-vigovia-dark mb-3">Terms and Conditions</h3>
          <div className="text-sm text-vigovia-secondary space-y-2">
            <p>• All prices are subject to availability and may change without prior notice.</p>
            <p>• Bookings are subject to the terms and conditions of the respective service providers.</p>
            <p>• This is a demo website made by kuldeep 😊</p>
             </div>
        </div>

        {/* Footer */}
        <div className="bg-vigovia-light border-t border-vigovia-accent/20 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-bold text-vigovia-primary">Vigovia Tech Pvt. Ltd.</h4>
              <p className="text-xs text-vigovia-dark mt-1">
                Registered Office: 161-109 Chinnabar Hills,<br />
                Link Business Park, Karnataka, India
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-vigovia-dark">
                <span className="font-semibold">Phone:</span> +91-9903999999
              </p>
              <p className="text-sm text-vigovia-dark">
                <span className="font-semibold">Email ID:</span> Contact@Vigovia.Com
              </p>
            </div>
            <div className="text-right">
              <h4 className="font-bold text-vigovia-primary text-lg">vigovia</h4>
              <p className="text-xs text-vigovia-secondary">PLAN.PACK.GO</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
