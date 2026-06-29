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
var editingIndex = -1;

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
                    '<div class="card-name">' + product.name
