/**
 * Centralized Admin Session Management
 * ====================================
 * 
 * This module provides structured session handling for admin authentication.
 * Replaces weak localStorage existence checks with validated session objects.
 * 
 * Session Structure:
 * {
 *   isAdmin: true,
 *   loginTime: <timestamp>,
 *   expiresAt: <timestamp>
 * }
 * 
 * Validation includes:
 * - JSON parsing safety
 * - Required field checks
 * - Session expiration (default: 1 hour)
 * - Malformed session cleanup
 */

const AdminSession = {
  // Configuration
  SESSION_KEY: 'admin_session_v2',
  SESSION_DURATION_MS: 60 * 60 * 1000, // 1 hour in milliseconds
  
  /**
   * Create a new admin session
   * @returns {Object} session object
   */
  createSession() {
    const now = Date.now();
    const session = {
      isAdmin: true,
      loginTime: now,
      expiresAt: now + this.SESSION_DURATION_MS,
      version: 1
    };
    
    try {
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
      return session;
    } catch (e) {
      console.error('Failed to create admin session:', e);
      return null;
    }
  },

  /**
   * Validate and retrieve the current session
   * @returns {Object|null} valid session object or null if invalid/expired
   */
  getValidSession() {
    try {
      const sessionJSON = localStorage.getItem(this.SESSION_KEY);
      
      // Session doesn't exist
      if (!sessionJSON) {
        return null;
      }

      // Parse JSON safely
      let session;
      try {
        session = JSON.parse(sessionJSON);
      } catch (parseError) {
        console.warn('Malformed admin session JSON, clearing');
        this.clearSession();
        return null;
      }

      // Validate required fields
      if (!session || typeof session !== 'object') {
        console.warn('Invalid admin session object');
        this.clearSession();
        return null;
      }

      if (session.isAdmin !== true) {
        console.warn('Session missing isAdmin flag or isAdmin is not true');
        this.clearSession();
        return null;
      }

      if (typeof session.loginTime !== 'number' || session.loginTime <= 0) {
        console.warn('Invalid loginTime in session');
        this.clearSession();
        return null;
      }

      if (typeof session.expiresAt !== 'number' || session.expiresAt <= 0) {
        console.warn('Invalid expiresAt in session');
        this.clearSession();
        return null;
      }

      // Check expiration
      const now = Date.now();
      if (now > session.expiresAt) {
        console.warn('Admin session has expired');
        this.clearSession();
        return null;
      }

      // Session is valid
      return session;
    } catch (e) {
      console.error('Error validating session:', e);
      return null;
    }
  },

  /**
   * Check if user has a valid admin session
   * @returns {boolean} true if valid admin session exists
   */
  isAuthenticated() {
    return this.getValidSession() !== null;
  },

  /**
   * Clear the current session
   */
  clearSession() {
    try {
      localStorage.removeItem(this.SESSION_KEY);
    } catch (e) {
      console.error('Failed to clear session:', e);
    }
  },

  /**
   * Get remaining session time in milliseconds
   * @returns {number} milliseconds remaining, 0 if expired or no session
   */
  getRemainingTime() {
    const session = this.getValidSession();
    if (!session) {
      return 0;
    }
    
    const remaining = session.expiresAt - Date.now();
    return Math.max(0, remaining);
  },

  /**
   * Get session expiration time as a readable string
   * @returns {string} formatted time or 'No session'
   */
  getExpirationTime() {
    const session = this.getValidSession();
    if (!session) {
      return 'No session';
    }

    try {
      const expirationDate = new Date(session.expiresAt);
      return expirationDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch (e) {
      return 'Invalid time';
    }
  },

  /**
   * Debug function: log current session state
   */
  debugSession() {
    console.log('=== Admin Session Debug ===');
    const sessionJSON = localStorage.getItem(this.SESSION_KEY);
    console.log('Raw localStorage value:', sessionJSON);
    
    const session = this.getValidSession();
    if (session) {
      console.log('Valid session found:');
      console.log('  isAdmin:', session.isAdmin);
      console.log('  loginTime:', new Date(session.loginTime).toISOString());
      console.log('  expiresAt:', new Date(session.expiresAt).toISOString());
      console.log('  remaining:', Math.round(this.getRemainingTime() / 1000), 'seconds');
    } else {
      console.log('No valid session found');
    }
    console.log('============================');
  }
};

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdminSession;
}
