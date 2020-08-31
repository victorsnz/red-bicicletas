var map = L.map("main_map").setView([-27.4687004, -58.8312304], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([-27.4687004, -58.8312304]).addTo(map);
L.marker([-27.4887014, -58.8212314]).addTo(map);
