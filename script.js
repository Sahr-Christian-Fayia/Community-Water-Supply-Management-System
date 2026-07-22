// ============================================
// FORGOT PASSWORD PAGE
// ============================================
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');
        
        // Clear previous messages
        successMessage.classList.remove('show');
        errorMessage.classList.remove('show');
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            errorMessage.textContent = 'Please enter a valid email address.';
            errorMessage.classList.add('show');
            return;
        }
        
        // Simulate API call
        setTimeout(() => {
            successMessage.textContent = 'Reset link has been sent to ' + email;
            successMessage.classList.add('show');
            forgotPasswordForm.reset();
        }, 500);
    });

    // Clear error message when user starts typing
    document.getElementById('email').addEventListener('input', function() {
        document.getElementById('errorMessage').classList.remove('show');
    });
}

// ============================================
// REGISTER HOUSEHOLD PAGE
// ============================================
const registerHouseholdForm = document.getElementById('registerHouseholdForm');
if (registerHouseholdForm) {
    registerHouseholdForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            householdName: document.getElementById('householdName').value,
            address: document.getElementById('address').value,
            contactNumber: document.getElementById('contactNumber').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirmPassword').value
        };
        
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');
        
        // Clear previous messages
        successMessage.classList.remove('show');
        errorMessage.classList.remove('show');
        
        // Validation
        if (formData.password !== formData.confirmPassword) {
            errorMessage.textContent = 'Passwords do not match!';
            errorMessage.classList.add('show');
            return;
        }
        
        if (formData.password.length < 6) {
            errorMessage.textContent = 'Password must be at least 6 characters long.';
            errorMessage.classList.add('show');
            return;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[\d\s\-\(\)]+$/;
        if (!phoneRegex.test(formData.contactNumber)) {
            errorMessage.textContent = 'Please enter a valid contact number.';
            errorMessage.classList.add('show');
            return;
        }
        
        // Simulate API call
        setTimeout(() => {
            successMessage.textContent = 'Household "' + formData.householdName + '" registered successfully!';
            successMessage.classList.add('show');
            registerHouseholdForm.reset();
            
            // Simulate redirect after 2 seconds
            setTimeout(() => {
                // window.location.href = 'dashboard.html';
            }, 2000);
        }, 500);
    });

    // Cancel button
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to cancel? All entered data will be lost.')) {
                registerHouseholdForm.reset();
                // window.location.href = 'dashboard.html';
            }
        });
    }

    // Toggle password visibility
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetInput = document.getElementById(targetId);
            
            if (targetInput.type === 'password') {
                targetInput.type = 'text';
                this.textContent = '🙈';
            } else {
                targetInput.type = 'password';
                this.textContent = '👁️';
            }
        });
    });

    // Clear error message when user starts typing
    const formInputs = registerHouseholdForm.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            document.getElementById('errorMessage').classList.remove('show');
        });
    });
}

// ============================================
// GLOBAL UTILITIES
// ============================================

// Format date
function formatDate() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    const dateElements = document.querySelectorAll('.header-date');
    dateElements.forEach(el => {
        el.textContent = today.toLocaleDateString('en-US', options);
    });
}

// Call on page load
if (document.querySelector('.header-date')) {
    formatDate();
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
// ============================================
// MANAGE HOUSEHOLD PAGE
// ============================================

// Sample data (In real application, this would come from a database)
let householdsData = [
    { id: 'HH-101', name: 'Kamara Family', contact: 'SLL 539-5555', address: '23 Main St.' },
    { id: 'HH-102', name: 'Sesay Residence', contact: 'SLL 569-5510', address: '45 Liberty Ave.' },
    { id: 'HH-103', name: 'Jallah Household', contact: 'SLL 712-3334', address: '67 Cole St.' },
    { id: 'HH-104', name: 'Conteh Home', contact: 'SLL 787-2224', address: '89 Heritage Rd.' },
    { id: 'HH-105', name: 'Mansaray Villa', contact: 'SLL 890-5678', address: '101 Pine St.' },
    { id: 'HH-106', name: 'Koroma Estate', contact: 'SLL 234-5678', address: '12 Oak Avenue' },
    { id: 'HH-107', name: 'Bangura House', contact: 'SLL 345-6789', address: '34 Elm Street' },
    { id: 'HH-108', name: 'Turay Villa', contact: 'SLL 456-7890', address: '56 Maple Drive' },
    { id: 'HH-109', name: 'Kamara Residence', contact: 'SLL 567-8901', address: '78 Cedar Lane' },
    { id: 'HH-110', name: 'Fofana Home', contact: 'SLL 678-9012', address: '90 Birch Road' }
];

let currentPage = 1;
let itemsPerPage = 5;
let filteredData = [...householdsData];

const householdTableBody = document.getElementById('householdTableBody');
if (householdTableBody) {
    
    // Render table
    function renderTable() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = filteredData.slice(startIndex, endIndex);
        
        householdTableBody.innerHTML = '';
        
        pageData.forEach((household, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${startIndex + index + 1}</td>
                <td>${household.id}</td>
                <td>${household.name}</td>
                <td>${household.contact}</td>
                <td>${household.address}</td>
                <td>
                    <button class="btn-action btn-edit" data-id="${household.id}">✏️ Edit</button>
                    <button class="btn-action btn-delete" data-id="${household.id}">🗑️ Delete</button>
                </td>
            `;
            householdTableBody.appendChild(row);
        });
        
        updatePaginationInfo();
        attachActionButtons();
    }
    
    // Update pagination info
    function updatePaginationInfo() {
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);
        document.getElementById('currentPage').textContent = currentPage;
        document.getElementById('totalPages').textContent = totalPages;
        
        // Disable/enable buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) prevBtn.disabled = currentPage === 1;
        if (nextBtn) nextBtn.disabled = currentPage === totalPages;
    }
    
    // Search functionality
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            filteredData = [...householdsData];
        } else {
            filteredData = householdsData.filter(household => 
                household.name.toLowerCase().includes(searchTerm) ||
                household.contact.toLowerCase().includes(searchTerm) ||
                household.id.toLowerCase().includes(searchTerm) ||
                household.address.toLowerCase().includes(searchTerm)
            );
        }
        
        currentPage = 1;
        renderTable();
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Pagination
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                renderTable();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const totalPages = Math.ceil(filteredData.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderTable();
            }
        });
    }
    
    // Edit and Delete functionality
    function attachActionButtons() {
        // Edit buttons
        const editButtons = document.querySelectorAll('.btn-edit');
        editButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const householdId = this.getAttribute('data-id');
                openEditModal(householdId);
            });
        });
        
        // Delete buttons
        const deleteButtons = document.querySelectorAll('.btn-delete');
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const householdId = this.getAttribute('data-id');
                deleteHousehold(householdId);
            });
        });
    }
    
    // Modal functionality
    const editModal = document.getElementById('editModal');
    const closeEditModal = document.getElementById('closeEditModal');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const editHouseholdForm = document.getElementById('editHouseholdForm');
    
    function openEditModal(householdId) {
        const household = householdsData.find(h => h.id === householdId);
        
        if (household) {
            document.getElementById('editHouseholdId').value = household.id;
            document.getElementById('editHouseholdName').value = household.name;
            document.getElementById('editContact').value = household.contact;
            document.getElementById('editAddress').value = household.address;
            
            editModal.classList.add('show');
        }
    }
    
    function closeModal() {
        editModal.classList.remove('show');
        editHouseholdForm.reset();
    }
    
    if (closeEditModal) {
        closeEditModal.addEventListener('click', closeModal);
    }
    
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === editModal) {
            closeModal();
        }
    });
    
    // Handle edit form submission
    if (editHouseholdForm) {
        editHouseholdForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const householdId = document.getElementById('editHouseholdId').value;
            const updatedName = document.getElementById('editHouseholdName').value;
            const updatedContact = document.getElementById('editContact').value;
            const updatedAddress = document.getElementById('editAddress').value;
            
            // Update data
            const index = householdsData.findIndex(h => h.id === householdId);
            if (index !== -1) {
                householdsData[index].name = updatedName;
                householdsData[index].contact = updatedContact;
                householdsData[index].address = updatedAddress;
                
                // Update filtered data if search is active
                const filteredIndex = filteredData.findIndex(h => h.id === householdId);
                if (filteredIndex !== -1) {
                    filteredData[filteredIndex].name = updatedName;
                    filteredData[filteredIndex].contact = updatedContact;
                    filteredData[filteredIndex].address = updatedAddress;
                }
                
                renderTable();
                closeModal();
                
                // Show success message (you can add a toast notification here)
                alert('Household updated successfully!');
            }
        });
    }
    
    // Delete household
    function deleteHousehold(householdId) {
        if (confirm('Are you sure you want to delete this household? This action cannot be undone.')) {
            // Remove from main data
            householdsData = householdsData.filter(h => h.id !== householdId);
            
            // Remove from filtered data
            filteredData = filteredData.filter(h => h.id !== householdId);
            
            // Adjust current page if needed
            const totalPages = Math.ceil(filteredData.length / itemsPerPage);
            if (currentPage > totalPages && totalPages > 0) {
                currentPage = totalPages;
            }
            
            renderTable();
            
            // Show success message
            alert('Household deleted successfully!');
        }
    }
    
    // Initial render
    renderTable();
}
// ============================================
// RECORD PAYMENT PAGE
// ============================================

// Sample household data for payment (reusing from manage page)
const paymentHouseholdsData = [
    { id: 'HH-101', name: 'Kamara Family', contact: 'SLL 539-5555', address: '23 Main St.', status: 'unpaid' },
    { id: 'HH-102', name: 'Sesay Residence', contact: 'SLL 569-5510', address: '45 Liberty Ave.', status: 'paid' },
    { id: 'HH-103', name: 'Jallah Household', contact: 'SLL 712-3334', address: '67 Cole St.', status: 'unpaid' },
    { id: 'HH-104', name: 'Conteh Home', contact: 'SLL 787-2224', address: '89 Heritage Rd.', status: 'unpaid' },
    { id: 'HH-105', name: 'Mansaray Villa', contact: 'SLL 890-5678', address: '101 Pine St.', status: 'paid' }
];

const searchHouseholdBtn = document.getElementById('searchHouseholdBtn');
const fetchHouseholdBtn = document.getElementById('fetchHouseholdBtn');
const searchHouseholdInput = document.getElementById('searchHouseholdInput');
const householdIdInput = document.getElementById('householdIdInput');
const householdDetailsSection = document.getElementById('householdDetailsSection');
const paymentInfoSection = document.getElementById('paymentInfoSection');
const recordPaymentForm = document.getElementById('recordPaymentForm');

let selectedHousehold = null;

// Search household by name
if (searchHouseholdBtn) {
    searchHouseholdBtn.addEventListener('click', function() {
        const searchTerm = searchHouseholdInput.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            alert('Please enter a household name to search.');
            return;
        }
        
        const household = paymentHouseholdsData.find(h => 
            h.name.toLowerCase().includes(searchTerm)
        );
        
        if (household) {
            displayHouseholdDetails(household);
        } else {
            alert('Household not found. Please try another name.');
            hideHouseholdDetails();
        }
    });
}

// Fetch household by ID
if (fetchHouseholdBtn) {
    fetchHouseholdBtn.addEventListener('click', function() {
        const householdId = householdIdInput.value.trim().toUpperCase();
        
        if (householdId === '') {
            alert('Please enter a household ID.');
            return;
        }
        
        const household = paymentHouseholdsData.find(h => h.id === householdId);
        
        if (household) {
            displayHouseholdDetails(household);
        } else {
            alert('Household ID not found. Please check and try again.');
            hideHouseholdDetails();
        }
    });
}

// Display household details
function displayHouseholdDetails(household) {
    selectedHousehold = household;
    
    document.getElementById('householdName').textContent = household.name;
    document.getElementById('householdAddress').textContent = household.address;
    document.getElementById('householdContact').textContent = household.contact;
    
    const statusBadge = document.getElementById('paymentStatus');
    if (household.status === 'paid') {
        statusBadge.textContent = 'Status: PAID';
        statusBadge.className = 'status-badge status-paid';
    } else {
        statusBadge.textContent = 'Status: UNPAID';
        statusBadge.className = 'status-badge status-unpaid';
    }
    
    householdDetailsSection.style.display = 'block';
    paymentInfoSection.style.display = 'block';
    
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('paymentDate').value = today;
}

// Hide household details
function hideHouseholdDetails() {
    householdDetailsSection.style.display = 'none';
    paymentInfoSection.style.display = 'none';
    selectedHousehold = null;
}

// Handle payment form submission
if (recordPaymentForm) {
    recordPaymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!selectedHousehold) {
            alert('Please select a household first.');
            return;
        }
        
        const paymentData = {
            householdId: selectedHousehold.id,
            householdName: selectedHousehold.name,
            month: document.getElementById('paymentMonth').value,
            amount: document.getElementById('paymentAmount').value,
            date: document.getElementById('paymentDate').value,
            method: document.querySelector('input[name="paymentMethod"]:checked').value
        };
        
        const successMessage = document.getElementById('paymentSuccessMessage');
        const errorMessage = document.getElementById('paymentErrorMessage');
        
        // Clear previous messages
        successMessage.classList.remove('show');
        errorMessage.classList.remove('show');
        
        // Validation
        if (!paymentData.month) {
            errorMessage.textContent = 'Please select a payment month.';
            errorMessage.classList.add('show');
            return;
        }
        
        if (!paymentData.amount || parseFloat(paymentData.amount) <= 0) {
            errorMessage.textContent = 'Please enter a valid amount.';
            errorMessage.classList.add('show');
            return;
        }
        
        if (!paymentData.date) {
            errorMessage.textContent = 'Please select a payment date.';
            errorMessage.classList.add('show');
            return;
        }
        
        // Simulate API call
        setTimeout(() => {
            // Update household status
            const householdIndex = paymentHouseholdsData.findIndex(h => h.id === selectedHousehold.id);
            if (householdIndex !== -1) {
                paymentHouseholdsData[householdIndex].status = 'paid';
            }
            
            successMessage.textContent = '✅ Payment Recorded Successfully! Amount: SLL ' + paymentData.amount + ' for ' + paymentData.month;
            successMessage.classList.add('show');
            
            // Update status badge
            const statusBadge = document.getElementById('paymentStatus');
            statusBadge.textContent = 'Status: PAID';
            statusBadge.className = 'status-badge status-paid';
            
            // Reset form
            recordPaymentForm.reset();
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 500);
    });
}

// Cancel payment button
const cancelPaymentBtn = document.getElementById('cancelPaymentBtn');
if (cancelPaymentBtn) {
    cancelPaymentBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to cancel? All entered payment information will be lost.')) {
            recordPaymentForm.reset();
            
            // Set default date back to today
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('paymentDate').value = today;
            
            // Clear messages
            document.getElementById('paymentSuccessMessage').classList.remove('show');
            document.getElementById('paymentErrorMessage').classList.remove('show');
        }
    });
}

// Search on Enter key
if (searchHouseholdInput) {
    searchHouseholdInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchHouseholdBtn.click();
        }
    });
}

if (householdIdInput) {
    householdIdInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            fetchHouseholdBtn.click();
        }
    });
}

// Clear error messages when user starts typing
const paymentFormInputs = document.querySelectorAll('#recordPaymentForm .form-input, #recordPaymentForm input[type="radio"]');
paymentFormInputs.forEach(input => {
    input.addEventListener('input', function() {
        document.getElementById('paymentErrorMessage').classList.remove('show');
    });
    input.addEventListener('change', function() {
        document.getElementById('paymentErrorMessage').classList.remove('show');
    });
    /**
 * About Page - Interactive Features & Animations
 * Enhances user experience with smooth scrolling, animations, and dynamic interactions
 */

// ===================================
// Animated Particle Background
// ===================================

function createParticles() {
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 20) + 's';
        document.body.appendChild(particle);
    }
}

// Initialize particles on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createParticles);
} else {
    createParticles();
}

// ===================================
// Smooth Scroll for Navigation Links
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Update active navigation link
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// ===================================
// Intersection Observer for Animations
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all developer cards
document.querySelectorAll('.developer-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// ===================================
// Active Navigation Link on Scroll
// ===================================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===================================
// Parallax Effect for Hero Section
// ===================================

const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    if (heroBackground) {
        const scrollPosition = window.pageYOffset;
        heroBackground.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// ===================================
// Card Hover Effects
// ===================================

document.querySelectorAll('.developer-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// ===================================
// Social Icon Click Handler with Link Navigation
// ===================================

document.querySelectorAll('.social-link').forEach(icon => {
    icon.addEventListener('click', function(e) {
        // Allow default link behavior to navigate
        const platform = this.getAttribute('data-platform');
        const url = this.getAttribute('href');
        const developerName = this.closest('.developer-card').querySelector('.developer-name').textContent;
        
        // Log the action for analytics or debugging
        console.log(`Opening ${platform} profile for ${developerName}: ${url}`);
        
        // The link will open in a new tab due to target="_blank"
        // If you want to prevent default and handle it manually, uncomment below:
        // e.preventDefault();
        // window.open(url, '_blank', 'noopener,noreferrer');
    });
});

// ===================================
// Lazy Loading for Images
// ===================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Image will load naturally, but you can add custom logic here
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('.developer-image').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// Keyboard Navigation
// ===================================

document.addEventListener('keydown', (e) => {
    // Escape key to close any open modals (if added in future)
    if (e.key === 'Escape') {
        console.log('Escape key pressed');
    }

    // Tab key for accessibility
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ===================================
// Smooth Fade-in on Page Load
// ===================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease-in';
});

// ===================================
// Performance: Debounce Scroll Events
// ===================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedScroll = debounce(() => {
    // Add any expensive scroll operations here
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ===================================
// Console Welcome Message
// ===================================

console.log('%c🚀 Welcome to Our Team!', 'font-size: 20px; color: #3b82f6; font-weight: bold;');
console.log('%cCheck out our amazing developers and their contributions to this project.', 'font-size: 14px; color: #60a5fa;');
});