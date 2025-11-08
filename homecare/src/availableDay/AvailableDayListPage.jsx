import React from 'react';
import { Table } from 'react-bootstrap';

const AvailableDayListPage = () => {
  const availableDays = [
    { id: 1, date: '2024-07-01', startTime:  '09:00', endTime: '17:00', healthcareWorker: 'John Doe', notes: 'N/A', serviceType: 'General Care'  },
    { id: 2, date: '2024-07-02', startTime:  '10:00', endTime: '18:00', healthcareWorker: 'Jane Smith', notes: 'Allergic to penicillin', serviceType: 'Specialized Care'  },
    { id: 3, date: '2024-07-03', startTime:  '08:00', endTime: '16:00', healthcareWorker: 'Emily Johnson', notes: 'Prefers morning visits', serviceType: 'Palliative Care'  },
  ];

    return (
    <div>
        <h1>Available Days</h1>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Healthcare worker</th>
                    <th>Notes</th>
                    <th>Service type</th>
                </tr>
            </thead>
            <tbody>
                {availableDays.map(availableDay => (
                    <tr key={availableDay.id}>
                        <td>{availableDay.id}</td>
                        <td>{availableDay.date}</td>
                        <td>{availableDay.startTime}</td>
                        <td>{availableDay.endTime}</td>
                        <td>{availableDay.healthcareWorker}</td>
                        <td>{availableDay.notes}</td>
                        <td>{availableDay.serviceType}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
    );
};

export default AvailableDayListPage;