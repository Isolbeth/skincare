var ADMIN_PASSWORD = 'admin123';

var categoryIcons = {
    'sunscreen': '☀️',
    'cream': '🧴',
    'foam': '🫧',
    'serum': '💧',
    'micellar': '💦',
    'oilcleanser': '🫒'
};

var categoryNames = {
    'sunscreen': '☀️ SPF защита',
    'cream': '🧴 Кремы',
    'foam': '🫧 Пенки / гели для умывания',
    'serum': '💧 Сыворотки',
    'micellar': '💦 Мицеллярная вода',
    'oilcleanser': '🫒 Гидрофильное масло'
};

var container = document.getElementById('products-container');
var userImageData = '';
var editingIndex = -1; // -1 = добавление, >=0 = редактирование

function getAllProducts() {
    var base = products;
    var userProducts = [];
    try {
        var stored = localStorage.getItem('user_products');
        if (stored) { userProducts = JSON.parse(stored); }
    } catch (e) { userProducts = []; }
    return base.concat(userProducts);
}

function saveUserProducts(userProducts) {
    localStorage.setItem('user_products', JSON.stringify(userProducts));
}

function getUserProducts() {
    try {
        var stored = localStorage.getItem('user_products');
        return stored ? JSON.parse(stored) : [];
    } catch (e) { return []; }
}

function renderImage(product, el) {
    el.innerHTML = '';
    if (product.image && product.image.trim() !== '') {
        var img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;
        img.onerror = function () { el.textContent = categoryIcons[product.category] || '🧴'; };
        el.appendChild(img);
    } else {
        el.textContent = categoryIcons[product.category] || '🧴';
    }
}

function renderProducts(filterType) {
    filterType = filterType || 'all';
    var allProducts = getAllProducts();
    container.innerHTML = '';
    var order = ['sunscreen', 'cream', 'foam', 'serum', 'micellar', 'oilcleanser'];

    for (var o = 0; o < order.length; o++) {
        var cat = order[o];
        var filtered = [];
        for (var i = 0; i < allProducts.length; i++) {
            var p = allProducts[i];
            if (p.category !== cat) continue;
            if (filterType === 'all' || p.skinType.toLowerCase().indexOf(filterType.toLowerCase()) !== -1) {
                filtered.push(p);
            }
        }
        if (filtered.length === 0) continue;

        var section = document.createElement('div');
        section.className = 'section';
        section.innerHTML = '<h2 class="section-heading">' + categoryNames[cat] + '</h2>';
        var grid = document.createElement('div');
        grid.className = 'cards-grid';

        for (var j = 0; j < filtered.length; j++) {
            (function () {
                var product = filtered[j];
                var index = allProducts.indexOf(product);
                var card = document.createElement('div');
                card.className = 'card';

                var imgWrapper = document.createElement('div');
                imgWrapper.className = 'card-img-wrapper';
                renderImage(product, imgWrapper);
                card.appendChild(imgWrapper);

                var body = document.createElement('div');
                body.className = 'card-body';
                body.innerHTML =
                    '<div class="card-brand">' + product.brand + '</div>' +
                    '<div class="card-name">' + product.name + '</div>' +
                    '<div class="card-type">' + product.skinType + '</div>' +
                    '<div class="card-volume">' + product.volume + (product.art ? ' | Арт: ' + product.art : '') + '</div>' +
                    '<div class="card-click-hint">Нажмите для подробностей →</div>';
                card.appendChild(body);
                card.onclick = function () { openModal(index); };
                grid.appendChild(card);
            })();
        }
        section.appendChild(grid);
        container.appendChild(section);
    }
}

function openModal(index) {
    var allProducts = getAllProducts();
    var p = allProducts[index];
    if (!p) return;

    var imgWrapper = document.getElementById('modal-img-wrapper');
    renderImage(p, imgWrapper);

    document.getElementById('modal-brand').textContent = p.brand;
    document.getElementById('modal-name').textContent = p.name;
    document.getElementById('modal-category').textContent = categoryNames[p.category] || p.category;
    document.getElementById('modal-skinType').textContent = 'Для кожи: ' + p.skinType;
    document.getElementById('modal-volume').textContent = p.volume + (p.art ? ' | Арт: ' + p.art : '');
    document.getElementById('modal-description').textContent = p.description;
    document.getElementById('modal-details').textContent = p.details || 'Информация уточняется';

    document.getElementById('modal-overlay').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('show');
    document.body.style.overflow = '';
}

// ========== ЗАГРУЗКА ФОТО ==========
document.getElementById('file-upload-area').onclick = function () {
    document.getElementById('user-image-file').click();
};

document.getElementById('user-image-file').onchange = function () {
    var file = this.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (e) {
        userImageData = e.target.result;
        var preview = document.getElementById('user-image-preview');
        preview.src = userImageData;
        preview.style.display = 'block';
        document.getElementById('file-upload-text').textContent = '✅ Фото выбрано: ' + file.name;
    };
    reader.readAsDataURL(file);
};

// ========== ОТКРЫТЬ ФОРМУ ==========
document.getElementById('open-add-form').onclick = function () {
    editingIndex = -1;
    document.getElementById('add-form-overlay').querySelector('h2').textContent = '➕ Добавить продукт';
    document.getElementById('submit-product').textContent = 'Добавить';
    clearAddForm();
    document.getElementById('add-form-overlay').classList.add('show');
    document.body.style.overflow = 'hidden';
};

function clearAddForm() {
    document.getElementById('user-brand').value = '';
    document.getElementById('user-name').value = '';
    document.getElementById('user-category').value = 'sunscreen';
    document.getElementById('user-skinType').value = '';
    document.getElementById('user-description').value = '';
    document.getElementById('user-details').value = '';
    document.getElementById('user-volume').value = '';
    document.getElementById('user-image-file').value = '';
    document.getElementById('user-image-preview').style.display = 'none';
    document.getElementById('file-upload-text').textContent = '📁 Нажмите, чтобы выбрать фото';
    userImageData = '';
    document.getElementById('add-msg').innerHTML = '';
}

document.getElementById('add-form-close').onclick = function () {
    document.getElementById('add-form-overlay').classList.remove('show');
    document.body.style.overflow = '';
};

document.getElementById('add-form-overlay').onclick = function (e) {
    if (e.target === this) {
        document.getElementById('add-form-overlay').classList.remove('show');
        document.body.style.overflow = '';
    }
};

// ========== ДОБАВЛЕНИЕ / РЕДАКТИРОВАНИЕ ==========
document.getElementById('submit-product').onclick = function () {
    var brand = document.getElementById('user-brand').value.trim();
    var name = document.getElementById('user-name').value.trim();

    if (!brand || !name) {
        document.getElementById('add-msg').innerHTML = '<span style="color: red;">Бренд и название обязательны!</span>';
        return;
    }

    var productData = {
        brand: brand,
        name: name,
        category: document.getElementById('user-category').value,
        skinType: document.getElementById('user-skinType').value.trim() || 'все типы',
        description: document.getElementById('user-description').value.trim(),
        details: document.getElementById('user-details').value.trim(),
        volume: document.getElementById('user-volume').value.trim(),
        image: userImageData,
        addedByUser: true
    };

    var userProducts = getUserProducts();

    if (editingIndex >= 0) {
        // Редактирование
        userProducts[editingIndex] = productData;
        saveUserProducts(userProducts);
        document.getElementById('add-msg').innerHTML = '<span style="color: green;">✅ Изменения сохранены!</span>';
    } else {
        // Добавление
        userProducts.push(productData);
        saveUserProducts(userProducts);
        document.getElementById('add-msg').innerHTML = '<span style="color: green;">✅ Спасибо за помощь! Продукт добавлен!</span>';
    }

    renderProducts(document.querySelector('.skin-btn.active').getAttribute('data-filter'));

    setTimeout(function () {
        document.getElementById('add-form-overlay').classList.remove('show');
        document.body.style.overflow = '';
        document.getElementById('add-msg').innerHTML = '';
    }, 2000);
};

// ========== АДМИНКА ==========
document.getElementById('secret-login').onclick = function () {
    document.getElementById('login-overlay').classList.add('show');
    document.body.style.overflow = 'hidden';
    document.getElementById('login-password').focus();
};

document.getElementById('login-cancel').onclick = function () {
    document.getElementById('login-overlay').classList.remove('show');
    document.body.style.overflow = '';
};

document.getElementById('login-overlay').onclick = function (e) {
    if (e.target === this) {
        document.getElementById('login-overlay').classList.remove('show');
        document.body.style.overflow = '';
    }
};

document.getElementById('login-password').onkeypress = function (e) {
    if (e.key === 'Enter') { document.getElementById('login-btn').click(); }
};

document.getElementById('login-btn').onclick = function () {
    var pass = document.getElementById('login-password').value;
    if (pass === ADMIN_PASSWORD) {
        document.getElementById('login-overlay').classList.remove('show');
        document.getElementById('login-password').value = '';
        openAdminPanel();
    } else {
        document.getElementById('login-error').style.display = 'block';
        document.getElementById('login-password').value = '';
    }
};

function openAdminPanel() {
    var userProducts = getUserProducts();
    var list = document.getElementById('admin-product-list');
    list.innerHTML = '';

    if (userProducts.length === 0) {
        list.innerHTML = '<div style="padding: 20px; text-align: center; color: #888;">Нет пользовательских продуктов</div>';
    } else {
        for (var i = 0; i < userProducts.length; i++) {
            (function () {
                var p = userProducts[i];
                var index = i;
                var item = document.createElement('div');
                item.className = 'admin-product-item';
                item.innerHTML = '<span><strong>' + p.brand + '</strong> — ' + p.name + ' <span class="user-badge">пользователь</span></span>' +
                    '<span><button class="edit-btn">✏️</button> <button class="delete-btn">🗑️</button></span>';
                
                item.querySelector('.edit-btn').onclick = function (e) {
                    e.stopPropagation();
                    document.getElementById('admin-overlay').classList.remove('show');
                    editUserProduct(index);
                };
                
                item.querySelector('.delete-btn').onclick = function (e) {
                    e.stopPropagation();
                    if (confirm('Удалить «' + p.brand + ' — ' + p.name + '»?')) {
                        var up = getUserProducts();
                        up.splice(index, 1);
                        saveUserProducts(up);
                        renderProducts(document.querySelector('.skin-btn.active').getAttribute('data-filter'));
                        openAdminPanel();
                    }
                };
                list.appendChild(item);
            })();
        }
    }

    document.getElementById('admin-overlay').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function editUserProduct(index) {
    var userProducts = getUserProducts();
    var p = userProducts[index];
    if (!p) return;

    editingIndex = index;
    document.getElementById('add-form-overlay').querySelector('h2').textContent = '✏️ Редактировать продукт';
    document.getElementById('submit-product').textContent = 'Сохранить';

    document.getElementById('user-brand').value = p.brand || '';
    document.getElementById('user-name').value = p.name || '';
    document.getElementById('user-category').value = p.category || 'sunscreen';
    document.getElementById('user-skinType').value = p.skinType || '';
    document.getElementById('user-description').value = p.description || '';
    document.getElementById('user-details').value = p.details || '';
    document.getElementById('user-volume').value = p.volume || '';
    
    if (p.image && p.image.trim()) {
        userImageData = p.image;
        var preview = document.getElementById('user-image-preview');
        preview.src = p.image;
        preview.style.display = 'block';
        document.getElementById('file-upload-text').textContent = '📁 Нажмите, чтобы заменить фото';
    } else {
        userImageData = '';
        document.getElementById('user-image-preview').style.display = 'none';
        document.getElementById('file-upload-text').textContent = '📁 Нажмите, чтобы выбрать фото';
    }

    document.getElementById('add-msg').innerHTML = '';
    document.getElementById('add-form-overlay').classList.add('show');
    document.body.style.overflow = 'hidden';
}

document.getElementById('admin-close').onclick = function () {
    document.getElementById('admin-overlay').classList.remove('show');
    document.body.style.overflow = '';
};

document.getElementById('admin-overlay').onclick = function (e) {
    if (e.target === this) {
        document.getElementById('admin-overlay').classList.remove('show');
        document.body.style.overflow = '';
    }
};

// Escape
document.onkeydown = function (e) {
    if (e.key === 'Escape') {
        document.getElementById('modal-overlay').classList.remove('show');
        document.getElementById('add-form-overlay').classList.remove('show');
        document.getElementById('login-overlay').classList.remove('show');
        document.getElementById('admin-overlay').classList.remove('show');
        document.body.style.overflow = '';
    }
};

document.getElementById('modal-overlay').onclick = function (e) {
    if (e.target === this) closeModal();
};
document.getElementById('modal-close').onclick = closeModal;

// Фильтры
var buttons = document.querySelectorAll('.skin-btn');
for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
        for (var j = 0; j < buttons.length; j++) { buttons[j].classList.remove('active'); }
        this.classList.add('active');
        renderProducts(this.getAttribute('data-filter'));
    };
}

renderProducts('all');