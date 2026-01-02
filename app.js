// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBBE65PjvXiLKmv1rUlMMW9fSGpHIJvi34",
    authDomain: "pushnotify-1d475.firebaseapp.com",
    databaseURL: "https://pushnotify-1d475-default-rtdb.firebaseio.com",
    projectId: "pushnotify-1d475",
    storageBucket: "pushnotify-1d475.firebasestorage.app",
    messagingSenderId: "172722712842",
    appId: "1:172722712842:web:def575b9e57f57ad05caf3",
    measurementId: "G-WGFRGZKBWG"
};

// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { getDatabase, ref, set, push, onValue, get, child } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// DOM Elements
const subscribeBtn = document.getElementById('subscribeBtn');
const emailInput = document.getElementById('email');
const nameInput = document.getElementById('name');
const statusMessage = document.getElementById('statusMessage');
const totalSubscribers = document.getElementById('totalSubscribers');
const totalNotifications = document.getElementById('totalNotifications');
const recentPosts = document.getElementById('recentPosts');
const notificationList = document.getElementById('notificationList');

// Show status message
function showStatus(message, type = 'success') {
    statusMessage.textContent = message;
    statusMessage.className = `status-message status-${type}`;
    statusMessage.style.display = 'block';
    
    setTimeout(() => {
        statusMessage.style.display = 'none';
    }, 5000);
}

// Subscribe function
async function subscribeUser(email, name = '') {
    try {
        if (!email || !validateEmail(email)) {
            showStatus('Please enter a valid email address', 'error');
            return;
        }

        // Check if email already exists
        const subscribersRef = ref(database, 'subscribers');
        const snapshot = await get(subscribersRef);
        let emailExists = false;
        
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const subscriber = childSnapshot.val();
                if (subscriber.email.toLowerCase() === email.toLowerCase()) {
                    emailExists = true;
                }
            });
        }
        
        if (emailExists) {
            showStatus('This email is already subscribed!', 'error');
            return;
        }

        // Add new subscriber
        const newSubscriberRef = push(subscribersRef);
        await set(newSubscriberRef, {
            email: email,
            name: name || '',
            subscribedAt: new Date().toISOString(),
            isActive: true,
            lastNotified: null
        });

        showStatus('Successfully subscribed! You will receive notifications for new blog posts.', 'success');
        emailInput.value = '';
        nameInput.value = '';
        
        // Update stats
        updateStats();
        
    } catch (error) {
        console.error('Subscription error:', error);
        showStatus('An error occurred. Please try again.', 'error');
    }
}

// Validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Update statistics
function updateStats() {
    const subscribersRef = ref(database, 'subscribers');
    const notificationsRef = ref(database, 'notifications');
    
    // Count subscribers
    onValue(subscribersRef, (snapshot) => {
        if (snapshot.exists()) {
            const count = Object.keys(snapshot.val()).length;
            totalSubscribers.textContent = count;
        } else {
            totalSubscribers.textContent = '0';
        }
    });
    
    // Count notifications
    onValue(notificationsRef, (snapshot) => {
        if (snapshot.exists()) {
            const count = Object.keys(snapshot.val()).length;
            totalNotifications.textContent = count;
            
            // Show recent posts (last 3 notifications)
            const notifications = [];
            snapshot.forEach((childSnapshot) => {
                notifications.push(childSnapshot.val());
            });
            
            // Sort by date (newest first)
            notifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            recentPosts.textContent = Math.min(3, notifications.length);
            
            // Display notifications
            displayNotifications(notifications.slice(0, 3));
        } else {
            totalNotifications.textContent = '0';
            recentPosts.textContent = '0';
            notificationList.innerHTML = '<p style="text-align: center; color: #6b7280;">No notifications yet</p>';
        }
    });
}

// Display notifications
function displayNotifications(notifications) {
    notificationList.innerHTML = '';
    
    if (notifications.length === 0) {
        notificationList.innerHTML = '<p style="text-align: center; color: #6b7280;">No notifications yet</p>';
        return;
    }
    
    notifications.forEach((notification) => {
        const notificationItem = document.createElement('div');
        notificationItem.className = 'notification-item';
        
        const timeAgo = getTimeAgo(notification.timestamp);
        
        notificationItem.innerHTML = `
            <div class="notification-icon">
                <i class="fas fa-bullhorn"></i>
            </div>
            <div class="notification-content">
                <h4>${notification.title}</h4>
                <p>${notification.message}</p>
                <div class="notification-time">${timeAgo}</div>
            </div>
        `;
        
        notificationList.appendChild(notificationItem);
    });
}

// Get time ago string
function getTimeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diff = now - past;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 7) return `${days} days ago`;
    
    return past.toLocaleDateString();
}

// Admin function to send notification (You'll use this from your Blogger dashboard)
// This would typically be triggered when you publish a new post
window.sendNotification = async function(title, message, postUrl) {
    try {
        const notificationsRef = ref(database, 'notifications');
        const newNotificationRef = push(notificationsRef);
        
        await set(newNotificationRef, {
            title: title,
            message: message,
            postUrl: postUrl || '',
            timestamp: new Date().toISOString()
        });
        
        console.log('Notification sent successfully!');
        
        // Here you would typically send emails to all subscribers
        // For now, we just log it
        const subscribersRef = ref(database, 'subscribers');
        const snapshot = await get(subscribersRef);
        
        if (snapshot.exists()) {
            const subscribers = [];
            snapshot.forEach((childSnapshot) => {
                subscribers.push(childSnapshot.val());
            });
            
            console.log(`Notification sent to ${subscribers.length} subscribers:`, {
                title,
                message,
                postUrl
            });
        }
        
        return true;
    } catch (error) {
        console.error('Error sending notification:', error);
        return false;
    }
}

// Event Listeners
subscribeBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();
    const name = nameInput.value.trim();
    subscribeUser(email, name);
});

emailInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const email = emailInput.value.trim();
        const name = nameInput.value.trim();
        subscribeUser(email, name);
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateStats();
    showStatus('System loaded successfully!', 'success');
});

// Export for use in Blogger
window.firebaseApp = app;
window.firebaseDatabase = database;