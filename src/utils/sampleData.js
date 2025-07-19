export const sampleItineraryData = {
  destination: 'Singapore',
  departureFrom: 'Kolkata', 
  departureDate: '2025-11-27',
  arrivalDate: '2025-12-01',
  travelers: 4,
  days: [
    {
      id: 1,
      date: '2025-11-27',
      activities: [
        {
          id: 1,
          time: '10:00',
          type: 'morning',
          name: 'Arrive in Singapore. Transfer From Airport To Hotel.',
          description: '',
          price: 0
        },
        {
          id: 2,
          time: '14:00',
          type: 'afternoon',
          name: 'Check Into Your Hotel',
          description: 'Visit Marina Bay Sands Sky Park (2-3 Hours)',
          price: 150
        },
        {
          id: 3,
          time: '15:30',
          type: 'afternoon',
          name: 'Optional Activity',
          description: 'Stroll Along Marina Bay Waterfront Promenade Or Helix Bridge',
          price: 0
        },
        {
          id: 4,
          time: '18:00',
          type: 'evening',
          name: 'Explore Gardens By The Bay',
          description: 'Including Super Tree Grove (3-4 Hours)',
          price: 200
        }
      ],
      transfers: [
        {
          id: 1,
          time: '10:00',
          type: 'airport',
          from: 'Airport',
          to: 'Hotel',
          duration: '45 mins',
          price: 50,
          maxPeople: 4
        }
      ],
      flights: []
    },
    {
      id: 2,
      date: '2025-11-28',
      activities: [
        {
          id: 5,
          time: '09:00',
          type: 'morning',
          name: 'Arrive in Singapore. Transfer From Airport To Hotel.',
          description: '',
          price: 0
        },
        {
          id: 6,
          time: '14:00',
          type: 'afternoon',
          name: 'Check Into Your Hotel',
          description: 'Visit Marina Bay Sands Sky Park (2-3 Hours)',
          price: 150
        },
        {
          id: 7,
          time: '15:30',
          type: 'afternoon',
          name: 'Optional Activity',
          description: 'Stroll Along Marina Bay Waterfront Promenade Or Helix Bridge',
          price: 0
        },
        {
          id: 8,
          time: '18:00',
          type: 'evening',
          name: 'Explore Gardens By The Bay',
          description: 'Including Super Tree Grove (3-4 Hours)',
          price: 200
        }
      ],
      transfers: [],
      flights: []
    },
    {
      id: 3,
      date: '2025-11-29',
      activities: [
        {
          id: 9,
          time: '09:00',
          type: 'morning',
          name: 'Arrive in Singapore. Transfer From Airport To Hotel.',
          description: '',
          price: 0
        },
        {
          id: 10,
          time: '14:00',
          type: 'afternoon',
          name: 'Check Into Your Hotel',
          description: 'Visit Marina Bay Sands Sky Park (2-3 Hours)',
          price: 150
        },
        {
          id: 11,
          time: '15:30',
          type: 'afternoon',
          name: 'Optional Activity',
          description: 'Stroll Along Marina Bay Waterfront Promenade Or Helix Bridge',
          price: 0
        },
        {
          id: 12,
          time: '18:00',
          type: 'evening',
          name: 'Explore Gardens By The Bay',
          description: 'Including Super Tree Grove (3-4 Hours)',
          price: 200
        }
      ],
      transfers: [],
      flights: []
    }
  ]
}
