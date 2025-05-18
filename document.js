document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a, footer a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Εξαίρεση για σύνδεσμους που περιέχουν "privacy.html" ή "TermsOfUse.html"
            if (this.getAttribute('href').includes('privacy.html') || this.getAttribute('href').includes('TermsOfUse.html')) {
                return true; // Αφήνει τον σύνδεσμο να λειτουργήσει κανονικά
            }
            
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
            
            // Update active link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            
            // Scroll to top
            window.scrollTo(0, 0);
        });
    });
});
    
    // Show the home page by default
    showPage('home');

   document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validate email
    if (!email.includes('@')) {
        alert('Εισάγετε έγκυρο email!');
        return;
    }
    
    // Prepare the data to send
    const formData = {
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message,
        to: 'retailsparts@gmail.com' // Προσθήκη του email παραλήπτη
    };
    
    // Display loading message
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = 'Αποστολή μηνύματος...';
    formMessage.className = 'form-message';
    formMessage.style.display = 'block';
    
    // Send the data to the server
   fetch('send_email.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message
    })
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        formMessage.textContent = data.message;
        formMessage.className = 'form-message success';
        document.getElementById('contactForm').reset();
    } else {
        formMessage.textContent = data.message;
        formMessage.className = 'form-message error';
    }
});
});
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would normally send the form data to the server
            // For this example, we'll just simulate a successful submission
            
            // Display success message
            const formMessage = document.getElementById('formMessage');
            formMessage.textContent = 'Το μήνυμά σας στάλθηκε με επιτυχία! Θα επικοινωνήσουμε μαζί σας σύντομα.';
            formMessage.className = 'form-message success';
            
            // In a real implementation, you would send the data to the server
            // For example using fetch():
            /*
            fetch('send_email.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    subject: subject,
                    message: message,
                    to: 'christos.panos17@gmail.com'
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    formMessage.textContent = 'Το μήνυμά σας στάλθηκε με επιτυχία! Θα επικοινωνήσουμε μαζί σας σύντομα.';
                    formMessage.className = 'form-message success';
                    contactForm.reset();
                } else {
                    formMessage.textContent = 'Υπήρξε ένα πρόβλημα κατά την αποστολή του μηνύματος. Παρακαλώ δοκιμάστε ξανά.';
                    formMessage.className = 'form-message error';
                }
            })
            .catch(error => {
                formMessage.textContent = 'Υπήρξε ένα πρόβλημα κατά την αποστολή του μηνύματος. Παρακαλώ δοκιμάστε ξανά.';
                formMessage.className = 'form-message error';
            });
            */
            
            // Reset form
            contactForm.reset();
        });
    }
    
    const inquiryButtons = document.querySelectorAll('.inquiry-btn');
    inquiryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Εμφάνιση της σελίδας επικοινωνίας
            showPage('contact');
            
            // Ενημέρωση ενεργού menu
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector('nav a[data-page="contact"]').classList.add('active');
            
            // Προαιρετικά: Αυτόματη κύλιση στη φόρμα
            document.getElementById('contactForm').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

// Tab switching functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const vehicleProducts = document.querySelectorAll('.vehicle-products');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 1. Αφαίρεση active class από όλα τα tabs και sections
        tabButtons.forEach(btn => btn.classList.remove('active'));
        vehicleProducts.forEach(section => section.classList.remove('active'));
        
        // 2. Προσθήκη active class στο επιλεγμένο tab
        button.classList.add('active');
        
        // 3. Εμφάνιση του αντίστοιχου section
        const targetId = button.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show the selected page
    const activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.classList.add('active');
    }
}

document.getElementById('langToggle').addEventListener('click', () => {
    const currentLang = document.documentElement.lang;
    const newLang = currentLang === 'el' ? 'en' : 'el';
    document.documentElement.lang = newLang;
    
    // Ενημέρωση κειμένων (αν υπάρχουν data-el/data-en attributes)
    document.querySelectorAll('[data-el], [data-en]').forEach(element => {
        element.textContent = newLang === 'el' ? element.getAttribute('data-el') : element.getAttribute('data-en');
    });
    
    // Αλλαγή κειμένου στο κουμπί
    document.getElementById('langToggle').textContent = newLang === 'el' ? 'EN' : 'EL';
});






document.addEventListener("DOMContentLoaded", function() {
    const cookieBanner = document.getElementById("cookie-banner");
    const acceptCookies = document.getElementById("accept-cookies");
    const rejectCookies = document.getElementById("reject-cookies");

    // Έλεγχος αν ο χρήστης έχει ήδη αποφασίσει για τα cookies
    if (!localStorage.getItem("cookiesAccepted")) {
        cookieBanner.style.display = "block"; // Εμφάνιση banner
    }

    // Αποδοχή cookies
    acceptCookies.addEventListener("click", function() {
        localStorage.setItem("cookiesAccepted", "true");
        cookieBanner.style.display = "none";
        // Εδώ μπορείς να φορτώσεις analytics/marketing scripts
        console.log("Cookies accepted!");
    });

    // Απόρριψη cookies
    rejectCookies.addEventListener("click", function() {
        localStorage.setItem("cookiesAccepted", "false");
        cookieBanner.style.display = "none";
        // Δεν φορτώνονται επιπλέον scripts
        console.log("Cookies rejected!");
    });
});


// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');

mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
});

   
