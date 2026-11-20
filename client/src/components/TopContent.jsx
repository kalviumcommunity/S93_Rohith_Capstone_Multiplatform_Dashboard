
import { useEffect, useState } from 'react'
import { API_URL as SERVER_URL } from '../config/api'

const API_URL = `${SERVER_URL}/api/users`

function TopContent() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingUser, setEditingUser] = useState(null)
  const [saving, setSaving] = useState(false)

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
    <section className="dashboard-panel accounts-section" id="accounts">
      <div className="panel-heading">
        <div>
          <h2>Account directory</h2>
          <p>Manage the people in your workspace.</p>
        </div>
        {!loading && (
          <span className="account-count">
            {users.length} {users.length === 1 ? 'account' : 'accounts'}
          </span>
        )}
      </div>

      {error && (
        <p className="inline-alert" role="alert">
          {error}
        </p>
      )}

      {loading ? (
        <p className="empty-state">Loading accounts...</p>
      ) : users.length === 0 ? (
        <p className="empty-state">No accounts to show yet.</p>
      ) : (
        <div className="account-table-wrap">
          <table className="account-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <span className="account-name">
                      <span className="account-initial" aria-hidden="true">
                        {(user.name || user.email || '?')[0].toUpperCase()}
                      </span>
                      {user.name}
                    </span>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <div className="table-actions">
                    <button
                      className="table-action"
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
                      className="table-action danger"
                      type="button"
                      onClick={() => deleteUser(user)}
                    >
                      Delete
                    </button>
                    </div>
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
          className="edit-user-form"
        >
          <h3>Edit account</h3>

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
            />
          </label>

          <div className="form-actions">
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
