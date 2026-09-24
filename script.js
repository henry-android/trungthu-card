const introScreen = document.getElementById('introScreen');
const openBtn = document.getElementById('openBtn');
const bgMusic = document.getElementById('bgMusic');
const typeText = document.getElementById('typewriter-text');
const hugBtn = document.getElementById('hugBtn');
const cursor = document.querySelector('.typewriter-cursor');
const desktopBg = document.getElementById('desktopBg');
const cardFireflies = document.getElementById('cardFireflies');
const customPopup = document.getElementById('customPopup');
const closePopupBtn = document.getElementById('closePopup');

// 1. TẠO HIỆU ỨNG NỀN ĐỘNG (Chỉ hiển thị trên Desktop)
if (desktopBg) {
    // Tạo 100 ngôi sao lấp lánh ngẫu nhiên
    for (let i = 0; i < 100; i++) {
        let star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        const size = Math.random() * 3;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        star.style.animationDelay = (Math.random() * 2) + 's';
        desktopBg.appendChild(star);
    }

    // Tạo lồng đèn bay lên từ dưới
    setInterval(() => {
        let lantern = document.createElement('div');
        lantern.className = 'bg-lantern';
        lantern.style.left = Math.random() * 100 + '%';
        lantern.style.animationDuration = (Math.random() * 15 + 10) + 's';
        desktopBg.appendChild(lantern);
        setTimeout(() => lantern.remove(), 25000); // Dọn dẹp DOM
    }, 3500);
}

// 2. TẠO HẠT ĐOM ĐÓM BAY LƯỢN
function createFirefly(container) {
    if (!container) return;
    let firefly = document.createElement('div');
    firefly.className = 'firefly';
    firefly.style.left = Math.random() * 100 + '%';
    firefly.style.top = (Math.random() * 80 + 20) + '%';
    // Hướng bay ngẫu nhiên X và Y
    firefly.style.setProperty('--dir-x', (Math.random() - 0.5) * 2);
    firefly.style.setProperty('--dir-y', Math.random());
    firefly.style.animationDuration = (Math.random() * 6 + 4) + 's';
    container.appendChild(firefly);
    setTimeout(() => firefly.remove(), 10000);
}
// Chạy đom đóm bên trong thiệp
setInterval(() => createFirefly(cardFireflies), 600);
// Chạy đom đóm ngoài màn hình nền
if (desktopBg) setInterval(() => createFirefly(desktopBg), 400);

// 3. HIỆU ỨNG GÕ CHỮ (TYPEWRITER)
const message = "Dưới bầu trời rực rỡ muôn vàn vì sao và ánh trăng thanh bình, anh chỉ muốn gửi đến em những điều ngọt ngào nhất. Cảm ơn em đã là ánh sáng rực rỡ nhất trong cuộc đời anh. Chúc em một mùa Trung Thu thật ấm áp, viên mãn và tràn ngập tiếng cười. Trái tim anh luôn hướng về em. Yêu em vô vàn! 🌕🏮❤️";

let i = 0;
const typingSpeed = 65; 

function typeWriter() {
    if (i < message.length) {
        typeText.innerHTML += message.charAt(i);
        i++;
        setTimeout(typeWriter, typingSpeed);
    } else {
        cursor.style.display = 'none'; // Ẩn con trỏ
        hugBtn.style.display = 'block'; // Hiện nút tương tác cuối thiệp
    }
}

// 4. MỞ THIỆP (Zoom Intro)
openBtn.addEventListener('click', () => {
    // Hiệu ứng phóng to mờ dần
    introScreen.classList.add('hidden');
    
    setTimeout(() => {
        introScreen.style.display = 'none';
        setTimeout(typeWriter, 500); // Bắt đầu gõ chữ
    }, 1000); 
    
    // Play nhạc
    bgMusic.play().catch(error => console.log("Autoplay prevented:", error));
});

// 5. HIỆU ỨNG NỔ TRÁI TIM (Heart Explosion)
hugBtn.addEventListener('click', (e) => {
    // Lấy tọa độ nút bấm để nổ từ giữa nút
    const rect = hugBtn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let k = 0; k < 60; k++) {
        let heart = document.createElement('div');
        heart.className = 'explosion-heart';
        heart.innerHTML = '❤️';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        
        // Tính toán hướng bay 360 độ
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 400 + 100; // Tốc độ văng
        const tx = Math.cos(angle) * velocity + 'px';
        const ty = Math.sin(angle) * velocity + 'px';
        const rot = Math.random() * 360 + 'deg';
        
        // Truyền biến CSS custom
        heart.style.setProperty('--tx', tx);
        heart.style.setProperty('--ty', ty);
        heart.style.setProperty('--rot', rot);
        
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 2500);
    }
    
    // Hiện Popup tỏ tình sau khi nổ tim
    setTimeout(() => {
        customPopup.classList.add('active');
    }, 1500);
});

// 6. ĐÓNG POPUP
closePopupBtn.addEventListener('click', () => {
    customPopup.classList.remove('active');
});

// 7. ĐỒNG HỒ THANH TRẠNG THÁI
function updateTime() {
    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    const timeElem = document.querySelector('.time');
    if (timeElem) timeElem.textContent = timeStr;
}
setInterval(updateTime, 60000);
updateTime();
