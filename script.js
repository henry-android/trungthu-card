// Lấy các element trên giao diện
const introScreen = document.getElementById('introScreen');
const openBtn = document.getElementById('openBtn');
const bgMusic = document.getElementById('bgMusic');
const typeText = document.getElementById('typewriter-text');
const hugBtn = document.getElementById('hugBtn');
const cursor = document.querySelector('.typewriter-cursor');

// Nội dung lời chúc tình cảm
const message = "Dưới ánh trăng rằm rực rỡ, lồng đèn lung linh thắp sáng khắp phố phường. Nhưng với anh, ánh sáng dịu dàng và ấm áp nhất lại chính là nụ cười của em. Cảm ơn em đã đến và nắm tay anh cùng bước qua những mùa trăng yêu thương. Chúc bé yêu của anh một đêm Trung Thu thật ngọt ngào, hạnh phúc. Nhớ em và yêu em vô vàn! 🌕🏮❤️";

let i = 0;
const typingSpeed = 60; // Tốc độ gõ từng chữ (ms)

// 1. Hiệu ứng gõ chữ (Typewriter)
function typeWriter() {
    if (i < message.length) {
        typeText.innerHTML += message.charAt(i);
        i++;
        setTimeout(typeWriter, typingSpeed);
    } else {
        cursor.style.display = 'none'; // Ẩn con trỏ nhấp nháy khi gõ xong
        hugBtn.style.display = 'block'; // Hiển thị nút "Gửi ngàn cái ôm"
    }
}

// 2. Logic khi bấm nút "Mở quà Trung Thu"
openBtn.addEventListener('click', () => {
    // Làm mờ và ẩn màn hình chờ
    introScreen.style.opacity = '0';
    setTimeout(() => {
        introScreen.style.display = 'none';
        setTimeout(typeWriter, 500); // Đợi 0.5s rồi bắt đầu gõ thư
    }, 800); 
    
    // Tự động phát nhạc nền
    bgMusic.play().catch(error => {
        console.log("Trình duyệt chặn autoplay:", error);
    });
    
    // Bật hiệu ứng các hạt sáng bay
    createSparks();
});

// 3. Hiệu ứng các hạt sáng (Sparks) bay lơ lửng từ dưới lên
function createSparks() {
    const container = document.getElementById('sparksContainer');
    setInterval(() => {
        const spark = document.createElement('div');
        spark.classList.add('spark');
        
        const size = Math.random() * 4 + 2;
        spark.style.width = size + 'px';
        spark.style.height = size + 'px';
        spark.style.left = Math.random() * 100 + '%';
        spark.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        container.appendChild(spark);
        setTimeout(() => spark.remove(), 6000);
    }, 300);
}

// 4. Logic khi bấm nút "Gửi ngàn cái ôm"
hugBtn.addEventListener('click', () => {
    // Thả 35 trái tim bay ngập màn hình
    for(let j = 0; j < 35; j++) {
        setTimeout(createHeart, j * 80);
    }
    
    // Hiện thông báo popup ngọt ngào
    setTimeout(() => {
        alert("Anh đã nhận được ngàn cái ôm của em rồi nhé! Yêu em bé nhất trên đời! 🥰");
    }, 2000);
});

// Hàm tạo 1 trái tim bay
function createHeart() {
    const container = document.getElementById('heartsContainer');
    const heart = document.createElement('div');
    heart.classList.add('flying-heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 90 + 5 + '%';
    
    const size = Math.random() * 20 + 15;
    heart.style.fontSize = size + 'px';
    heart.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
    
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 4500);
}

// 5. Cập nhật đồng hồ thời gian thực cho thanh trạng thái giả lập
function updateTime() {
    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    const timeElem = document.querySelector('.time');
    if (timeElem) timeElem.textContent = timeStr;
}
setInterval(updateTime, 60000);
updateTime();
