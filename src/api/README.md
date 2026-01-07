# API Integration Guide

This guide explains how to integrate backend API calls into your React application.

## 📁 Structure

```
src/api/
├── client.js                 # Base API client with authentication
├── services/
│   ├── userService.js        # User-related API calls
│   ├── deviceService.js      # Device-related API calls
│   └── authService.js        # Authentication API calls
├── examples/
│   ├── UserPageExample.jsx   # Complete example for UserPage
│   └── DevicePageExample.jsx # Complete example for DevicePage
└── index.js                  # Barrel exports
```

## 🚀 Quick Start

### 1. Set up Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 2. Basic Usage

#### GET Request Example

```javascript
import { userService } from '@api';

// Fetch all users
const fetchUsers = async () => {
  try {
    const response = await userService.getUsers({ name: 'John' }, { page: 1, limit: 20 });
    console.log(response.data); // Array of users
  } catch (error) {
    console.error('Error:', error.message);
  }
};
```

#### POST Request Example

```javascript
import { userService } from '@api';

// Create a new user
const createUser = async () => {
  try {
    const newUser = await userService.createUser({
      username: 'john_doe',
      email: 'john@example.com',
      password: 'securePassword123',
      phone: '1234567890',
      group: 'Veridface Company'
    });
    console.log('User created:', newUser);
  } catch (error) {
    console.error('Error:', error.message);
  }
};
```

## 📝 API Service Methods

### User Service

| Method | Type | Description |
|--------|------|-------------|
| `getUsers(filters, pagination)` | GET | Fetch users with filters |
| `getUserById(userId)` | GET | Get single user by ID |
| `createUser(userData)` | POST | Create new user |
| `updateUser(userId, userData)` | PUT | Update existing user |
| `deleteUser(userId)` | DELETE | Delete user |
| `deleteUsers(userIds)` | POST | Delete multiple users |
| `importUsers(files)` | POST | Import users from file |
| `exportUsers(filters)` | GET | Export users to CSV |
| `updateCredentials(userId, data)` | POST | Update user credentials |

### Device Service

| Method | Type | Description |
|--------|------|-------------|
| `getDevices(filters, pagination)` | GET | Fetch devices with filters |
| `getDeviceById(deviceId)` | GET | Get single device by ID |
| `createDevice(deviceData)` | POST | Create new device |
| `updateDevice(deviceId, deviceData)` | PUT | Update existing device |
| `deleteDevice(deviceId)` | DELETE | Delete device |
| `deleteDevices(deviceIds)` | POST | Delete multiple devices |
| `configureDevice(deviceId, configData)` | POST | Configure device |
| `generateConfigCode(deviceId, configData)` | POST | Generate config code |
| `remoteUnlock(deviceId)` | POST | Remote unlock device |
| `queryPermissions(deviceId)` | GET | Query device permissions |
| `toggleDevice(deviceId, isOn)` | PATCH | Toggle device on/off |

### Auth Service

| Method | Type | Description |
|--------|------|-------------|
| `login(credentials)` | POST | Login user |
| `logout()` | POST | Logout user |
| `refreshToken(refreshToken)` | POST | Refresh auth token |
| `getCurrentUser()` | GET | Get current user info |

## 🔧 Integration Examples

### Example 1: Fetching Data on Component Mount

```javascript
import { useState, useEffect } from 'react';
import { userService } from '@api';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await userService.getUsers();
      setUsers(response.data || response);
    } catch (err) {
      setError(err.message);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};
```

### Example 2: Creating Data with POST

```javascript
import { useState } from 'react';
import { userService } from '@api';

const AddUserForm = () => {
  const [formData, setFormData] = useState({ username: '', email: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newUser = await userService.createUser(formData);
      console.log('User created:', newUser);
      alert('User created successfully!');
      // Reset form or redirect
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
};
```

### Example 3: File Upload with FormData

```javascript
import { userService } from '@api';

const ImportUsers = () => {
  const handleFileUpload = async (files) => {
    try {
      const result = await userService.importUsers(files);
      console.log('Import result:', result);
      alert(`Successfully imported ${result.count} users!`);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <input
      type="file"
      multiple
      onChange={(e) => handleFileUpload(e.target.files)}
    />
  );
};
```

### Example 4: Search with Filters

```javascript
import { useState } from 'react';
import { userService } from '@api';

const UserSearch = () => {
  const [filters, setFilters] = useState({ name: '', email: '' });
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await userService.getUsers(filters, { page: 1, limit: 20 });
      setUsers(response.data || response);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <input
        value={filters.name}
        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        placeholder="Search by name"
      />
      <button onClick={handleSearch}>Search</button>
      
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};
```

## 🔐 Authentication

The API client automatically includes authentication tokens from `localStorage`. Make sure to store the token after login:

```javascript
import { authService } from '@api';

const handleLogin = async (credentials) => {
  try {
    const response = await authService.login(credentials);
    // Store token
    localStorage.setItem('authToken', response.token);
    // Redirect or update state
  } catch (error) {
    alert(`Login failed: ${error.message}`);
  }
};
```

## ⚠️ Error Handling

All API methods throw errors that should be caught:

```javascript
try {
  const data = await userService.getUsers();
} catch (error) {
  // Error object contains:
  // - error.status: HTTP status code
  // - error.statusText: HTTP status text
  // - error.data: Error response data
  // - error.message: Error message
  console.error('Error:', error.message);
}
```

## 📦 Response Format

The API client handles different response formats:

- **Paginated Response**: `{ data: [...], total: 100, page: 1 }`
- **Array Response**: `[...]`
- **Object Response**: `{ id: 1, name: '...' }`

## 🎯 Best Practices

1. **Always handle loading states**: Show loading indicators during API calls
2. **Handle errors gracefully**: Display user-friendly error messages
3. **Use try-catch**: Wrap API calls in try-catch blocks
4. **Update UI after mutations**: Refresh data after POST/PUT/DELETE operations
5. **Validate data**: Validate form data before sending to API
6. **Use loading states**: Disable buttons/forms during API calls

## 🔄 Complete Integration Example

See the example files in `src/api/examples/` for complete integration examples:
- `UserPageExample.jsx` - Full UserPage with all API calls
- `DevicePageExample.jsx` - Full DevicePage with all API calls

These examples show:
- Fetching data on mount
- Search with filters
- Creating new records
- Updating existing records
- Deleting records
- File uploads
- Error handling
- Loading states

## 🛠️ Customization

To add new API services:

1. Create a new service file in `src/api/services/`
2. Import `apiClient` from `../client`
3. Export service functions
4. Add to `src/api/index.js` exports

Example:

```javascript
// src/api/services/customService.js
import apiClient from '../client';

export const getCustomData = async (params) => {
  return await apiClient.get('/custom', params);
};

export const createCustomData = async (data) => {
  return await apiClient.post('/custom', data);
};

export default { getCustomData, createCustomData };
```

