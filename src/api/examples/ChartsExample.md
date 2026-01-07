# Chart Data API Integration Example

## Overview
Fungsi untuk mengambil data chart attendance sudah diintegrasikan ke komponen `Charts.jsx`.

## Service Functions

### 1. `getAttendanceTrend(filters)`
Mengambil data trend attendance untuk bar chart.

**Parameters:**
- `filters.period` - 'Daily', 'Weekly', atau 'Monthly' (default: 'Daily')
- `filters.startDate` - Tanggal mulai (optional)
- `filters.endDate` - Tanggal akhir (optional)

**Response Format:**
```javascript
{
  attendanceData: [
    { time: '08:30', value: 130 },
    { time: '08:45', value: 150 },
    { time: '09:00', value: 175 },
    { time: '09:15', value: 140 },
    { time: '09:30', value: 155 }
  ]
}
```

**Contoh Penggunaan:**
```javascript
import { attendanceService } from '@api';

// Get daily trend
const data = await attendanceService.getAttendanceTrend({ period: 'Daily' });

// Get weekly trend
const weeklyData = await attendanceService.getAttendanceTrend({ period: 'Weekly' });

// Get monthly trend with date range
const monthlyData = await attendanceService.getAttendanceTrend({ 
  period: 'Monthly',
  startDate: '2025-12-01',
  endDate: '2025-12-31'
});
```

### 2. `getTodayRecap(filters)`
Mengambil data recap untuk pie chart.

**Parameters:**
- `filters.period` - 'Daily', 'Weekly', atau 'Monthly' (default: 'Daily')
- `filters.date` - Tanggal spesifik (optional)

**Response Format:**
```javascript
{
  recapData: [
    { name: 'Ontime', value: 100, color: '#3B82F6' },
    { name: 'Late', value: 26, color: '#60A5FA' },
    { name: 'Sick', value: 10, color: '#93C5FD' }
  ]
}
```

**Contoh Penggunaan:**
```javascript
import { attendanceService } from '@api';

// Get today's recap
const recap = await attendanceService.getTodayRecap({ period: 'Daily' });

// Get recap for specific date
const dateRecap = await attendanceService.getTodayRecap({ 
  period: 'Daily',
  date: '2025-12-09'
});
```

## Implementasi di Charts.jsx

Komponen `Charts.jsx` sudah diupdate untuk:
1. ✅ Fetch data dari API saat component mount
2. ✅ Re-fetch data saat filter berubah (Daily/Weekly/Monthly)
3. ✅ Menampilkan loading state
4. ✅ Menampilkan error state
5. ✅ Auto-update chart saat data berubah

## Backend API Endpoints

Pastikan backend Anda menyediakan endpoint berikut:

### GET `/api/attendance/trend`
**Query Parameters:**
- `period` - 'Daily', 'Weekly', 'Monthly'
- `startDate` - (optional) Format: YYYY-MM-DD
- `endDate` - (optional) Format: YYYY-MM-DD

**Response:**
```json
{
  "attendanceData": [
    { "time": "08:30", "value": 130 },
    { "time": "08:45", "value": 150 },
    { "time": "09:00", "value": 175 }
  ]
}
```

### GET `/api/attendance/recap`
**Query Parameters:**
- `period` - 'Daily', 'Weekly', 'Monthly'
- `date` - (optional) Format: YYYY-MM-DD

**Response:**
```json
{
  "recapData": [
    { "name": "Ontime", "value": 100, "color": "#3B82F6" },
    { "name": "Late", "value": 26, "color": "#60A5FA" },
    { "name": "Sick", "value": 10, "color": "#93C5FD" }
  ]
}
```

## Testing

Untuk testing tanpa backend, Anda bisa menggunakan mock data:

```javascript
// Mock response untuk testing
const mockAttendanceTrend = {
  attendanceData: [
    { time: '08:30', value: 130 },
    { time: '08:45', value: 150 },
    { time: '09:00', value: 175 },
    { time: '09:15', value: 140 },
    { time: '09:30', value: 155 },
  ]
};

const mockRecap = {
  recapData: [
    { name: 'Ontime', value: 100, color: '#3B82F6' },
    { name: 'Late', value: 26, color: '#60A5FA' },
    { name: 'Sick', value: 10, color: '#93C5FD' },
  ]
};
```

## Error Handling

Jika terjadi error, komponen akan:
1. Menampilkan pesan error
2. Tetap menampilkan chart dengan data kosong atau data default
3. Log error ke console untuk debugging

## Customization

Jika format response backend berbeda, sesuaikan di `Charts.jsx`:

```javascript
// Jika response langsung array
if (Array.isArray(response)) {
  setAttendanceData(response);
}

// Jika response dalam property data
else if (response.data) {
  setAttendanceData(response.data);
}

// Jika response dalam property attendanceData
else if (response.attendanceData) {
  setAttendanceData(response.attendanceData);
}
```

