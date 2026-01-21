# API Integration Guide - Quick Reference

## ✅ What Has Been Created

1. **API Client** (`src/api/client.js`)
   - Base HTTP client with authentication
   - Handles GET, POST, PUT, PATCH, DELETE requests
   - Automatic token injection from localStorage
   - Error handling and response parsing

2. **Service Files**
   - `src/api/services/userService.js` - User management APIs
   - `src/api/services/deviceService.js` - Device management APIs
   - `src/api/services/authService.js` - Authentication APIs

3. **Example Files**
   - `src/api/examples/UserPageExample.jsx` - Complete UserPage integration
   - `src/api/examples/DevicePageExample.jsx` - Complete DevicePage integration

4. **Documentation**
   - `src/api/README.md` - Comprehensive API documentation

## 🚀 Quick Examples

### GET Request - Fetch Users

```javascript
import { userService } from '@api';

// In your component
const [users, setUsers] = useState([]);

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await userService.getUsers({ name: 'John' }, { page: 1, limit: 20 });
      setUsers(response.data || response);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  fetchUsers();
}, []);
```

### POST Request - Create User

```javascript
import { userService } from '@api';

const handleCreateUser = async (formData) => {
  try {
    const newUser = await userService.createUser({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      group: formData.group
    });
    console.log('User created:', newUser);
    // Refresh user list or show success message
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
};
```

### POST Request with File Upload

```javascript
import { userService } from '@api';

const handleImport = async (files) => {
  try {
    const result = await userService.importUsers(files);
    console.log('Import result:', result);
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
};
```

## 📋 Common Patterns

### Pattern 1: Fetch on Mount with Loading State

```javascript
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.getUsers();
      setData(response.data || response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);
```

### Pattern 2: Create with Form Data

```javascript
const handleSubmit = async (formData) => {
  setLoading(true);
  try {
    await userService.createUser(formData);
    // Success: refresh list, close modal, show message
    await fetchUsers(); // Refresh
    setIsModalOpen(false); // Close modal
    alert('User created successfully!');
  } catch (error) {
    alert(`Error: ${error.message}`);
  } finally {
    setLoading(false);
  }
};
```

### Pattern 3: Update Existing Record

```javascript
const handleUpdate = async (userId, updatedData) => {
  try {
    await userService.updateUser(userId, updatedData);
    await fetchUsers(); // Refresh list
    alert('User updated successfully!');
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
};
```

### Pattern 4: Delete Multiple Records

```javascript
const handleDelete = async (selectedIds) => {
  if (selectedIds.length === 0) return;
  
  try {
    await userService.deleteUsers(selectedIds);
    await fetchUsers(); // Refresh list
    setSelectedIds([]); // Clear selection
    alert(`${selectedIds.length} user(s) deleted!`);
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
};
```

## 🔧 Setup Steps

1. **Set Environment Variable**
   Create `.env` file:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

2. **Store Auth Token After Login**
   ```javascript
   import { authService } from '@api';
   
   const handleLogin = async (credentials) => {
     const response = await authService.login(credentials);
     localStorage.setItem('authToken', response.token);
   };
   ```

3. **Import Services in Your Components**
   ```javascript
   import { userService, deviceService } from '@api';
   ```

## 📝 Available Services

### User Service
- `getUsers(filters, pagination)` - GET users
- `getUserById(userId)` - GET single user
- `createUser(userData)` - POST create user
- `updateUser(userId, userData)` - PUT update user
- `deleteUser(userId)` - DELETE user
- `deleteUsers(userIds)` - POST bulk delete
- `importUsers(files)` - POST import from file
- `exportUsers(filters)` - GET export to CSV
- `updateCredentials(userId, data)` - POST update credentials

### Device Service
- `getDevices(filters, pagination)` - GET devices
- `getDeviceById(deviceId)` - GET single device
- `createDevice(deviceData)` - POST create device
- `updateDevice(deviceId, deviceData)` - PUT update device
- `deleteDevice(deviceId)` - DELETE device
- `deleteDevices(deviceIds)` - POST bulk delete
- `configureDevice(deviceId, configData)` - POST configure
- `generateConfigCode(deviceId, configData)` - POST generate code
- `remoteUnlock(deviceId)` - POST remote unlock
- `queryPermissions(deviceId)` - GET permissions
- `toggleDevice(deviceId, isOn)` - PATCH toggle on/off

### Auth Service
- `login(credentials)` - POST login
- `logout()` - POST logout
- `refreshToken(refreshToken)` - POST refresh token
- `getCurrentUser()` - GET current user

## 🎯 Next Steps

1. **Review Example Files**
   - Check `src/api/examples/UserPageExample.jsx`
   - Check `src/api/examples/DevicePageExample.jsx`

2. **Integrate into Your Pages**
   - Replace hardcoded data with API calls
   - Add loading and error states
   - Update handlers to use API services

3. **Test with Your Backend**
   - Update `VITE_API_BASE_URL` in `.env`
   - Ensure backend endpoints match the service methods
   - Test authentication flow

4. **Customize as Needed**
   - Add more service files for other resources
   - Modify error handling
   - Add request/response interceptors if needed

## 📚 Full Documentation

See `src/api/README.md` for complete documentation with detailed examples.

