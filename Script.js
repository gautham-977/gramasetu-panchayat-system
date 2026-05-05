const panchayatData = {
    Kasaragod: [
        "Manjeshwaram",
        "Mangalpady",
        "Kumbadaje",
        "Pullur-Periya",
        "Ajanur",
        "Madhur",
        "Cheruvathur"
    ],

    Kannur: [
        "Taliparamba",
        "Mayyil",
        "Irikkur",
        "Kalliasseri",
        "Dharmadam"
    ],

    Wayanad: [
        "Mananthavady",
        "Panamaram",
        "Vellamunda",
        "Meppadi",
        "Pozhuthana"
    ],

    Kozhikode: [
        "Koduvally",
        "Balussery",
        "Chelannur",
        "Kunnamangalam",
        "Perambra"
    ],

    Malappuram: [
        "Perinthalmanna",
        "Manjeri",
        "Nilambur",
        "Tanur",
        "Kottakkal"
    ],

    Palakkad: [
        "Ottapalam",
        "Mannarkkad",
        "Kollengode",
        "Alathur",
        "Chittur"
    ],

    Thrissur: [
        "Kodungallur",
        "Chavakkad",
        "Wadakkanchery",
        "Irinjalakuda",
        "Guruvayur"
    ],

    Ernakulam: [
        "Aluva",
        "Angamaly",
        "Perumbavoor",
        "Muvattupuzha",
        "Kothamangalam"
    ],

    Idukki: [
        "Adimali",
        "Devikulam",
        "Kattappana",
        "Nedumkandam",
        "Thodupuzha"
    ],

    Kottayam: [
        "Athirampuzha",
        "Ayarkunnam",
        "Kurichy",
        "Kumarakom",
        "Pampady"
    ],

    Alappuzha: [
        "Ambalappuzha",
        "Kuttanad",
        "Chengannur",
        "Mavelikkara",
        "Haripad"
    ],

    Pathanamthitta: [
        "Ranni",
        "Konni",
        "Adoor",
        "Pandalam",
        "Thiruvalla"
    ],

    Kollam: [
        "Kottarakkara",
        "Punalur",
        "Karunagappally",
        "Chathannoor",
        "Anchal"
    ],

    Thiruvananthapuram: [
        "Neyyattinkara",
        "Varkala",
        "Kattakada",
        "Kazhakkoottam",
        "Attingal"
    ]
};

function loadPanchayats() {
    const districtSelect = document.getElementById("district");
    const panchayatSelect = document.getElementById("panchayat");

    const selectedDistrict = districtSelect.value;

    // Reset panchayat dropdown
    panchayatSelect.innerHTML =
        '<option value="">-- Select Panchayat --</option>';

    if (!selectedDistrict) return;

    panchayatData[selectedDistrict].forEach(panchayat => {
        const option = document.createElement("option");
        option.value = panchayat;
        option.textContent = panchayat;
        panchayatSelect.appendChild(option);
    });
}

// --- Member 3: Complaint Filing Logic ---
async function submitComplaint(event) {
    event.preventDefault(); // Prevents the page from refreshing

    // 1. Capture Form Data from HTML IDs
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const priority = document.getElementById('priority').value;

    // 2. Simple Validation Check
    if(!description || !category || !priority) {
        alert("Please fill in all complaint details (Category, Priority, and Description).");
        return;
    }

    try {
        // 3. Send Data to your Running Backend (Port 3000)
        const response = await fetch('https://gramasetu-panchayat-system.onrender.com/api/complaints/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description, category, priority })
        });

        const data = await response.json();

        // 4. Handle Server Response
        if (response.ok) {
            alert("Success! Complaint Filed. ID: " + data.complaintId);
            // Optional: Reset form after success
            document.querySelector('form').reset();
            document.getElementById("panchayat").innerHTML = '<option value="">-- Select Panchayat --</option>';
        } else {
            alert("Error: " + (data.error || "Failed to file complaint"));
        }
    } catch (error) {
        console.error("Connection failed:", error);
        alert("Backend not reached. Ensure your terminal says 'MongoDB Connected Successfully'.");
    }
}