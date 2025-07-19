import { useState } from 'react'
import { FaPlane, FaCar, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaPlus, FaTrash } from 'react-icons/fa'
import { MdAccessTime, MdDescription } from 'react-icons/md'

export default function ItineraryForm({ onGenerate }) {
  const [formData, setFormData] = useState({
    destination: '',
    departureFrom: '',
    departureDate: '',
    arrivalDate: '',
    travelers: 1,
    days: []
  })

  const addDay = () => {
    const newDay = {
      id: Date.now(),
      date: '',
      activities: [],
      transfers: [],
      flights: []
    }
    setFormData(prev => ({
      ...prev,
      days: [...prev.days, newDay]
    }))
  }

  const addActivity = (dayId) => {
    const newActivity = {
      id: Date.now(),
      time: '',
      type: 'morning', // morning, afternoon, evening
      name: '',
      description: '',
      price: 0
    }
    
    setFormData(prev => ({
      ...prev,
      days: prev.days.map(day => 
        day.id === dayId 
          ? { ...day, activities: [...day.activities, newActivity] }
          : day
      )
    }))
  }

  const addTransfer = (dayId) => {
    const newTransfer = {
      id: Date.now(),
      time: '',
      type: 'airport', // airport, hotel, local
      from: '',
      to: '',
      duration: '',
      price: 0,
      maxPeople: 4
    }
    
    setFormData(prev => ({
      ...prev,
      days: prev.days.map(day => 
        day.id === dayId 
          ? { ...day, transfers: [...day.transfers, newTransfer] }
          : day
      )
    }))
  }

  const updateBasicInfo = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const updateDayField = (dayId, field, value) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.map(day => 
        day.id === dayId ? { ...day, [field]: value } : day
      )
    }))
  }

  const updateActivity = (dayId, activityId, field, value) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.map(day => 
        day.id === dayId 
          ? {
              ...day,
              activities: day.activities.map(activity =>
                activity.id === activityId ? { ...activity, [field]: value } : activity
              )
            }
          : day
      )
    }))
  }

  const updateTransfer = (dayId, transferId, field, value) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.map(day => 
        day.id === dayId 
          ? {
              ...day,
              transfers: day.transfers.map(transfer =>
                transfer.id === transferId ? { ...transfer, [field]: value } : transfer
              )
            }
          : day
      )
    }))
  }

  const removeActivity = (dayId, activityId) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.map(day => 
        day.id === dayId 
          ? { ...day, activities: day.activities.filter(a => a.id !== activityId) }
          : day
      )
    }))
  }

  const removeTransfer = (dayId, transferId) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.map(day => 
        day.id === dayId 
          ? { ...day, transfers: day.transfers.filter(t => t.id !== transferId) }
          : day
      )
    }))
  }

  const removeDay = (dayId) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.filter(day => day.id !== dayId)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onGenerate(formData)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-vigovia-primary mb-4">
          vigovia
          <span className="text-sm font-normal ml-2 text-vigovia-secondary">PLAN.PACK.GO</span>
        </h1>
        <p className="text-vigovia-dark text-lg">Create Your Perfect Travel Itinerary</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-vigovia-accent/20">
          <h2 className="text-2xl font-semibold text-vigovia-primary mb-6 flex items-center">
            <FaMapMarkerAlt className="mr-3" />
            Trip Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-vigovia-dark font-medium mb-2">Destination</label>
              <input
                type="text"
                value={formData.destination}
                onChange={(e) => updateBasicInfo('destination', e.target.value)}
                className="w-full px-4 py-3 border border-vigovia-accent/30 rounded-lg focus:ring-2 focus:ring-vigovia-primary focus:border-transparent"
                placeholder="e.g., Singapore"
                required
              />
            </div>
            
            <div>
              <label className="block text-vigovia-dark font-medium mb-2">Departure From</label>
              <input
                type="text"
                value={formData.departureFrom}
                onChange={(e) => updateBasicInfo('departureFrom', e.target.value)}
                className="w-full px-4 py-3 border border-vigovia-accent/30 rounded-lg focus:ring-2 focus:ring-vigovia-primary focus:border-transparent"
                placeholder="e.g., Kolkata"
                required
              />
            </div>
            
            <div>
              <label className="block text-vigovia-dark font-medium mb-2 flex items-center">
                <FaCalendarAlt className="mr-2" />
                Departure Date
              </label>
              <input
                type="date"
                value={formData.departureDate}
                onChange={(e) => updateBasicInfo('departureDate', e.target.value)}
                className="w-full px-4 py-3 border border-vigovia-accent/30 rounded-lg focus:ring-2 focus:ring-vigovia-primary focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-vigovia-dark font-medium mb-2">Arrival Date</label>
              <input
                type="date"
                value={formData.arrivalDate}
                onChange={(e) => updateBasicInfo('arrivalDate', e.target.value)}
                className="w-full px-4 py-3 border border-vigovia-accent/30 rounded-lg focus:ring-2 focus:ring-vigovia-primary focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-vigovia-dark font-medium mb-2 flex items-center">
                <FaUsers className="mr-2" />
                Number of Travelers
              </label>
              <input
                type="number"
                min="1"
                value={formData.travelers}
                onChange={(e) => updateBasicInfo('travelers', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-vigovia-accent/30 rounded-lg focus:ring-2 focus:ring-vigovia-primary focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        {/* Daily Itinerary */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-vigovia-accent/20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-vigovia-primary flex items-center">
              <FaCalendarAlt className="mr-3" />
              Daily Itinerary
            </h2>
            <button
              type="button"
              onClick={addDay}
              className="bg-vigovia-primary text-white px-4 py-2 rounded-lg hover:bg-vigovia-secondary transition-colors flex items-center"
            >
              <FaPlus className="mr-2" />
              Add Day
            </button>
          </div>

          {formData.days.map((day, dayIndex) => (
            <div key={day.id} className="border border-vigovia-accent/20 rounded-lg p-6 mb-6 bg-vigovia-light/50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-vigovia-dark">Day {dayIndex + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeDay(day.id)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <FaTrash />
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-vigovia-dark font-medium mb-2">Date</label>
                <input
                  type="date"
                  value={day.date}
                  onChange={(e) => updateDayField(day.id, 'date', e.target.value)}
                  className="w-full px-3 py-2 border border-vigovia-accent/30 rounded-lg focus:ring-2 focus:ring-vigovia-primary focus:border-transparent"
                />
              </div>

              {/* Activities Section */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium text-vigovia-dark">Activities</h4>
                  <button
                    type="button"
                    onClick={() => addActivity(day.id)}
                    className="bg-vigovia-accent text-white px-3 py-1 rounded-md hover:bg-vigovia-secondary transition-colors text-sm flex items-center"
                  >
                    <FaPlus className="mr-1" />
                    Add Activity
                  </button>
                </div>

                {day.activities.map((activity) => (
                  <div key={activity.id} className="border border-vigovia-accent/20 rounded-lg p-4 mb-3 bg-white">
                    <div className="flex justify-between items-start mb-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
                        <div>
                          <label className="block text-sm font-medium text-vigovia-dark mb-1">Time Slot</label>
                          <select
                            value={activity.type}
                            onChange={(e) => updateActivity(day.id, activity.id, 'type', e.target.value)}
                            className="w-full px-3 py-2 border border-vigovia-accent/30 rounded-md focus:ring-2 focus:ring-vigovia-primary focus:border-transparent text-sm"
                          >
                            <option value="morning">Morning</option>
                            <option value="afternoon">Afternoon</option>
                            <option value="evening">Evening</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-vigovia-dark mb-1">Time</label>
                          <input
                            type="time"
                            value={activity.time}
                            onChange={(e) => updateActivity(day.id, activity.id, 'time', e.target.value)}
                            className="w-full px-3 py-2 border border-vigovia-accent/30 rounded-md focus:ring-2 focus:ring-vigovia-primary focus:border-transparent text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-vigovia-dark mb-1">Price</label>
                          <input
                            type="number"
                            value={activity.price}
                            onChange={(e) => updateActivity(day.id, activity.id, 'price', parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-vigovia-accent/30 rounded-md focus:ring-2 focus:ring-vigovia-primary focus:border-transparent text-sm"
                            placeholder="0"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeActivity(day.id, activity.id)}
                        className="text-red-500 hover:text-red-700 p-1 ml-2"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                    
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-vigovia-dark mb-1">Activity Name</label>
                      <input
                        type="text"
                        value={activity.name}
                        onChange={(e) => updateActivity(day.id, activity.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-vigovia-accent/30 rounded-md focus:ring-2 focus:ring-vigovia-primary focus:border-transparent text-sm"
                        placeholder="e.g., Visit Marina Bay Sands Sky Park"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-vigovia-dark mb-1">Description</label>
                      <textarea
                        value={activity.description}
                        onChange={(e) => updateActivity(day.id, activity.id, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-vigovia-accent/30 rounded-md focus:ring-2 focus:ring-vigovia-primary focus:border-transparent text-sm"
                        rows="2"
                        placeholder="Optional: Stroll Along Marina Bay Waterfront Promenade Or Helix Bridge"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Transfers Section */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium text-vigovia-dark">Transfers</h4>
                  <button
                    type="button"
                    onClick={() => addTransfer(day.id)}
                    className="bg-vigovia-accent text-white px-3 py-1 rounded-md hover:bg-vigovia-secondary transition-colors text-sm flex items-center"
                  >
                    <FaCar className="mr-1" />
                    Add Transfer
                  </button>
                </div>

                {day.transfers.map((transfer) => (
                  <div key={transfer.id} className="border border-vigovia-accent/20 rounded-lg p-4 mb-3 bg-white">
                    <div className="flex justify-between items-start mb-3">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 flex-1">
                        <div>
                          <label className="block text-sm font-medium text-vigovia-dark mb-1">Type</label>
                          <select
                            value={transfer.type}
                            onChange={(e) => updateTransfer(day.id, transfer.id, 'type', e.target.value)}
                            className="w-full px-3 py-2 border border-vigovia-accent/30 rounded-md focus:ring-2 focus:ring-vigovia-primary focus:border-transparent text-sm"
                          >
                            <option value="airport">Airport Transfer</option>
                            <option value="hotel">Hotel Transfer</option>
                            <option value="local">Local Transport</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-vigovia-dark mb-1">Time</label>
                          <input
                            type="time"
                            value={transfer.time}
                            onChange={(e) => updateTransfer(day.id, transfer.id, 'time', e.target.value)}
                            className="w-full px-3 py-2 border border-vigovia-accent/30 rounded-md focus:ring-2 focus:ring-vigovia-primary focus:border-transparent text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-vigovia-dark mb-1">Duration</label>
                          <input
                            type="text"
                            value={transfer.duration}
                            onChange={(e) => updateTransfer(day.id, transfer.id, 'duration', e.target.value)}
                            className="w-full px-3 py-2 border border-vigovia-accent/30 rounded-md focus:ring-2 focus:ring-vigovia-primary focus:border-transparent text-sm"
                            placeholder="e.g., 30 mins"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-vigovia-dark mb-1">Price</label>
                          <input
                            type="number"
                            value={transfer.price}
                            onChange={(e) => updateTransfer(day.id, transfer.id, 'price', parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-vigovia-accent/30 rounded-md focus:ring-2 focus:ring-vigovia-primary focus:border-transparent text-sm"
                            placeholder="0"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeTransfer(day.id, transfer.id)}
                        className="text-red-500 hover:text-red-700 p-1 ml-2"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-vigovia-dark mb-1">From</label>
                        <input
                          type="text"
                          value={transfer.from}
                          onChange={(e) => updateTransfer(day.id, transfer.id, 'from', e.target.value)}
                          className="w-full px-3 py-2 border border-vigovia-accent/30 rounded-md focus:ring-2 focus:ring-vigovia-primary focus:border-transparent text-sm"
                          placeholder="e.g., Airport"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-vigovia-dark mb-1">To</label>
                        <input
                          type="text"
                          value={transfer.to}
                          onChange={(e) => updateTransfer(day.id, transfer.id, 'to', e.target.value)}
                          className="w-full px-3 py-2 border border-vigovia-accent/30 rounded-md focus:ring-2 focus:ring-vigovia-primary focus:border-transparent text-sm"
                          placeholder="e.g., Hotel"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Generate Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-vigovia-primary to-vigovia-secondary text-white px-12 py-4 rounded-xl text-lg font-semibold hover:from-vigovia-secondary hover:to-vigovia-primary transition-all duration-300 shadow-lg hover:shadow-xl flex items-center mx-auto"
          >
            <FaPlane className="mr-3" />
            Generate Itinerary
          </button>
        </div>
      </form>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-vigovia-accent/20">
        <div className="text-center text-vigovia-dark">
          <p className="text-sm">© 2025 Vigovia Tech. Made by kuldeep.</p>
          <p className="text-xs mt-2"></p>
        </div>
      </footer>
    </div>
  )
}
