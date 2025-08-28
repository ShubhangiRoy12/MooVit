// Paste your Firebase configuration object here
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",                   
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  // --- DOM Elements ---
  const loader = document.getElementById('loader');
  const profileContent = document.getElementById('profile-content');
  const initialsAvatar = document.getElementById('initials-avatar'); // Updated
  const userName = document.getElementById('user-name');
  const userEmail = document.getElementById('user-email');
  const userEmailDetail = document.getElementById('user-email-detail');
  const userIdDetail = document.getElementById('user-id-detail');
  const nameDisplayContainer = document.getElementById('name-display-container');
  const nameEditContainer = document.getElementById('name-edit-container');
  const nameInput = document.getElementById('name-input');
  const editNameBtn = document.getElementById('edit-name-btn');
  const saveNameBtn = document.getElementById('save-name-btn');
  const cancelNameBtn = document.getElementById('cancel-name-btn');
  const signoutButton = document.getElementById('signout-button');
  const logoutLink = document.getElementById('logout-link');
  const deleteAccountBtn = document.getElementById('delete-account-btn');
  
  // Function to generate initials
  const getInitials = (name) => {
      if (!name) return "?";
      const names = name.split(' ');
      let initials = names[0].substring(0, 1).toUpperCase();
      if (names.length > 1) {
          initials += names[names.length - 1].substring(0, 1).toUpperCase();
      }
      return initials;
  };
  
  // --- Auth State Logic ---
  auth.onAuthStateChanged(user => {
    if (user) {
      // User is signed in
      loader.classList.add('hidden');
      profileContent.classList.remove('hidden');
  
      // Populate profile with user data
      const displayName = user.displayName || 'No Name Provided';
      userName.textContent = displayName;
      userEmail.textContent = user.email;
      userEmailDetail.textContent = user.email;
      userIdDetail.textContent = user.uid;
      
      // Set the initials in the avatar
      initialsAvatar.textContent = getInitials(displayName);
      
      // --- Event Listeners for authenticated user ---
      editNameBtn.addEventListener('click', () => {
          nameDisplayContainer.classList.add('hidden');
          nameEditContainer.classList.remove('hidden');
          nameInput.value = user.displayName;
          nameInput.focus();
      });
  
      cancelNameBtn.addEventListener('click', () => {
          nameDisplay-container.classList.remove('hidden');
          nameEditContainer.classList.add('hidden');
      });
  
      saveNameBtn.addEventListener('click', () => {
          const newName = nameInput.value.trim();
          if (newName && newName !== user.displayName) {
              user.updateProfile({
                  displayName: newName
              }).then(() => {
                  userName.textContent = newName;
                  initialsAvatar.textContent = getInitials(newName); // Update initials
                  alert("Profile updated successfully!");
                  cancelNameBtn.click();
              }).catch(error => {
                  console.error("Error updating profile:", error);
                  alert("Error: " + error.message);
              });
          }
      });
  
      deleteAccountBtn.addEventListener('click', () => {
          if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
              user.delete().then(() => {
                  alert("Account deleted successfully.");
                  window.location.href = '/login.html';
              }).catch(error => {
                  console.error("Error deleting account:", error);
                  alert("Error: " + error.message + "\n\nYou may need to sign in again to perform this action.");
              });
          }
      });
  
    } else {
      // User is not signed in
      window.location.href = '/login.html';
    }
  });
  
  // --- General Event Listeners ---
  const signOutUser = () => {
    auth.signOut().then(() => {
      window.location.href = '/login.html';
    }).catch(error => {
      console.error("Sign out error:", error);
    });
  };
  
  signoutButton.addEventListener('click', signOutUser);
  logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      signOutUser();
  });