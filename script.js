document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动功能
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 表单提交功能
    const form = document.getElementById('enrollmentForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const studentName = document.getElementById('studentName').value;
        const grade = document.getElementById('grade').value;
        const parentName = document.getElementById('parentName').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // 表单验证
        if (!validateForm(studentName, grade, parentName, phoneNumber, email)) {
            return;
        }
        
        // 显示提交信息
        const submissionInfo = `此页面显示
报名信息已提交！
学生姓名：${studentName}
报名年级：${grade}
家长姓名：${parentName}
联系电话：${phoneNumber}
电子邮箱：${email}
其他信息：${message}`;

        // 创建一个模态框来显示提交信息
        showModal(submissionInfo, function() {
            form.reset();
        });
    });

    // 添加"返回顶部"按钮功能
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '&#8593;'; // 上箭头符号
    backToTopButton.setAttribute('id', 'backToTop');
    backToTopButton.style.display = 'none';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

function validateForm(studentName, grade, parentName, phoneNumber, email) {
    const nameRegex = /^[\u4e00-\u9fa5]{2,20}$/;
    const phoneRegex = /^1[3-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(studentName)) {
        alert('请输入有效的学生姓名（2-20个中文字符）');
        return false;
    }

    if (!grade) {
        alert('请选择报名年级');
        return false;
    }

    if (!nameRegex.test(parentName)) {
        alert('请输入有效的家长姓名（2-20个中文字符）');
        return false;
    }

    if (!phoneRegex.test(phoneNumber)) {
        alert('请输入有效的11位中国大陆手机号码');
        return false;
    }

    if (!emailRegex.test(email)) {
        alert('请输入有效的电子邮箱地址');
        return false;
    }

    return true;
}

function showModal(content, onClose) {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';

    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'white';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '5px';
    modalContent.style.maxWidth = '80%';

    const closeButton = document.createElement('button');
    closeButton.textContent = '确定';
    closeButton.className = 'btn btn-primary';
    closeButton.style.marginTop = '10px';

    modalContent.innerHTML = content.replace(/\n/g, '<br>');
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);

    closeButton.onclick = function() {
        document.body.removeChild(modal);
        if (onClose) onClose();
    };
}

function initMap() {
    const schoolLocation = { lat: 21.8628, lng: 111.9823 }; // 请替换为学校的实际坐标
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: schoolLocation
    });
    const marker = new google.maps.Marker({
        position: schoolLocation,
        map: map,
        title: '城郊学校'
    });
}