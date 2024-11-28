document.addEventListener('DOMContentLoaded', () => {
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const restrictionInput = document.getElementById('restriction-input');
        const addRestrictionBtn = document.getElementById('add-restriction-btn');
        const restrictionList = document.getElementById('restriction-list');
        const restaurantList = document.getElementById('restaurant-list');
        const searchSection = document.querySelector('.form-container'); // Search section
        const restaurantHeader = document.querySelector('h2'); // Header for restaurant recommendations
        const authContainers = document.querySelectorAll('.auth-container'); // Auth sections
    
        // Sample data for restaurants and their dietary options
        const restaurants = [
            { name: 'Healthy Eats', restrictions: ['nuts', 'gluten'] },
            { name: 'Vegan Paradise', restrictions: ['meat', 'dairy'] },
            { name: 'Seafood Shack', restrictions: ['gluten'] },
            { name: 'Pizza Place', restrictions: ['gluten', 'dairy'] },
            { name: 'Ethnic Cuisine', restrictions: ['nuts'] }
        ];
    
        // Function to hide authentication containers
        function hideAuthContainers() {
            authContainers.forEach(container => {
                container.style.display = 'none';
            });
        }
    
        // Function to add a new dietary restriction
        function addRestriction() {
            const restrictionName = restrictionInput.value.trim();
            if (restrictionName === "") return;
    
            const li = document.createElement('li');
            li.textContent = restrictionName;
    
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => {
                li.remove();
                updateRestaurantList(); // Update restaurant list when a restriction is removed
            });
    
            li.appendChild(deleteBtn);
            restrictionList.appendChild(li);
            restrictionInput.value = '';
    
            updateRestaurantList();
        }
    
        // Function to update restaurant recommendations based on restrictions
        function updateRestaurantList() {
            const restrictions = Array.from(restrictionList.children).map(li => li.textContent.replace('Delete', '').trim());
            restaurantList.innerHTML = ''; // Clear previous recommendations
    
            restaurants.forEach(restaurant => {
                const isSuitable = restrictions.every(restriction => !restaurant.restrictions.includes(restriction));
                if (isSuitable) {
                    const li = document.createElement('li');
                    li.textContent = restaurant.name;
                    restaurantList.appendChild(li);
                }
            });
        }
    
        // Event listener for the login form

       loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
        
            console.log('Email:', email); // Log email
            console.log('Password:', password); // Log password
        
            try {
                const response = await fetch('http://localhost:5000/login', { // Ensure this is the backend URL
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
        
                const data = await response.json();
                console.log('Backend response:', data); // Log response from the backend
        
                if (response.ok) {
                    alert('Login successful!');
                    hideAuthContainers(); // Hide login and register sections
                    searchSection.style.display = 'flex'; // Show search section
                    restaurantHeader.style.display = 'block'; // Show restaurant header
                } else {
                    console.error('Login failed:', data.message);
                    alert(data.message || 'Invalid email or password.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred during login.');
            }
        });


          /*loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
    
            // Hardcoded credentials for demonstration purposes
            if (email === "nnamdionwu@gmail.com" && password === "123") {
                alert('Login successful!');
                hideAuthContainers(); // Hide login and register sections
                searchSection.style.display = 'flex'; // Show search section
                restaurantHeader.style.display = 'block'; // Show restaurant header
            } else {
                alert('Invalid email or password.');
            }
        });*/
        
    

    
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
        
            try {
                const response = await fetch('http://localhost:5000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
        
                const data = await response.json();
        
                if (response.ok) {
                    alert('Registration successful!');
                    registerForm.reset(); // Clear form after registration
                } else {
                    console.error('Registration failed:', data.message);
                    alert(data.message || 'An error occurred during registration.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred during registration.');
            }
        });
        
        // Event listener for the Add Restriction button
        addRestrictionBtn.addEventListener('click', addRestriction);
    
        // Event listener for Enter key in the restriction input field
        restrictionInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addRestriction();
            }
        });
    });

