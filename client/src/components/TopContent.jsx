
import { useEffect, useState } from 'react'

const API_URL = 'http://localhost:5000/api/users'

function TopContent() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingUser, setEditingUser] = useState(null)
  const [saving, setSaving] = useState(false)

  // async function loadUsers() {
  //   try {
  //     setError('')
  //     const response = await fetch(API_URL)
  //     const result = await response.json()

  //     if (!response.ok) {
  //       throw new Error(result.message || 'Could not load users')
  //     }

  //     setUsers(result.data || [])
  //   } catch (err) {
  //     setError(err.message || 'Could not connect to the server')
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  useEffect(() => {
  let cancelled = false

  async function fetchUsers() {
  try {
    setError('');

    const response = await fetch(API_URL);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Could not load users');
    }

    if (!cancelled) {
      const userList = Array.isArray(result.data)
        ? result.data
        : [];

      setUsers(userList);
    }
  } catch (err) {
    if (!cancelled) {
      setError(err.message || 'Could not connect to the server');
    }
  } finally {
    if (!cancelled) {
      setLoading(false);
    }
  }
}

  fetchUsers()

  return () => {
    cancelled = true
  }
}, [])

  async function saveUser(event) {
    event.preventDefault()
    if (!editingUser) return

    try {
      setSaving(true)
      setError('')

      const response = await fetch(
        `${API_URL}/${editingUser._id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: editingUser.name,
            email: editingUser.email,
          }),
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Could not update user')
      }

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user._id === editingUser._id ? result.data : user
        )
      )

      setEditingUser(null)
    } catch (err) {
      setError(err.message || 'Could not update user')
    } finally {
      setSaving(false)
    }
  }

  async function deleteUser(user) {
    if (!window.confirm(`Delete ${user.name}? This cannot be undone.`)) {
      return
    }

    try {
      setError('')

      const response = await fetch(`${API_URL}/${user._id}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || result.error || 'Could not delete user')
      }

      setUsers((currentUsers) =>
        currentUsers.filter((item) => item._id !== user._id)
      )

      if (editingUser?._id === user._id) {
        setEditingUser(null)
      }
    } catch (err) {
      setError(err.message || 'Could not delete user')
    }
  }

  return (
    <section style={{ padding: '24px' }}>
      <h2>User Management</h2>
      <p>Edit a user's details or delete a user from the database.</p>

      {error && (
        <p role="alert" style={{ color: 'crimson' }}>
          {error}
        </p>
      )}

      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found. Create a user through your API first.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '10px' }}>Name</th>
                <th style={{ textAlign: 'left', padding: '10px' }}>Email</th>
                <th style={{ textAlign: 'left', padding: '10px' }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td style={{ padding: '10px' }}>{user.name}</td>
                  <td style={{ padding: '10px' }}>{user.email}</td>
                  <td style={{ padding: '10px' }}>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingUser({
                          _id: user._id,
                          name: user.name,
                          email: user.email,
                        })
                      }
                    >
                      Edit
                    </button>{' '}

                    <button
                      type="button"
                      onClick={() => deleteUser(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingUser && (
        <form
          onSubmit={saveUser}
          style={{
            marginTop: '24px',
            display: 'grid',
            gap: '12px',
            maxWidth: '400px',
          }}
        >
          <h3>Edit User</h3>

          <label>
            Name
            <input
              required
              value={editingUser.name}
              onChange={(event) =>
                setEditingUser({
                  ...editingUser,
                  name: event.target.value,
                })
              }
              style={{ display: 'block', width: '100%', padding: '8px' }}
            />
          </label>

          <label>
            Email
            <input
              required
              type="email"
              value={editingUser.email}
              onChange={(event) =>
                setEditingUser({
                  ...editingUser,
                  email: event.target.value,
                })
              }
              style={{ display: 'block', width: '100%', padding: '8px' }}
            />
          </label>

          <div>
            <button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>{' '}

            <button
              type="button"
              onClick={() => setEditingUser(null)}
              disabled={saving}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  )
}

export default TopContent
