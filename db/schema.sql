CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =========================================================
-- CUSTOMERS / CLIENTS
-- Code: English | Documentation métier: Français + English
-- =========================================================
CREATE TABLE customers (
    customer_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,       -- Prénom / First name
    last_name VARCHAR(100) NOT NULL,        -- Nom / Last name
    email VARCHAR(180) UNIQUE NOT NULL,
    phone VARCHAR(30),                      -- Téléphone / Phone
    password_hash TEXT NOT NULL,            -- Mot de passe chiffré / Password hash
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ADDRESSES / ADRESSES
CREATE TABLE addresses (
    address_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES customers(customer_id) ON DELETE CASCADE,
    address_type VARCHAR(30) DEFAULT 'shipping', -- livraison / shipping
    recipient_name VARCHAR(150),
    address_line_1 VARCHAR(255) NOT NULL,
    address_line_2 VARCHAR(255),
    city VARCHAR(120) NOT NULL,
    postal_code VARCHAR(30),
    country VARCHAR(100) NOT NULL,
    phone VARCHAR(30),
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- PRODUCTS / PRODUITS
CREATE TABLE products (
    product_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_fr VARCHAR(180) NOT NULL,
    name_en VARCHAR(180) NOT NULL,
    slug VARCHAR(220) UNIQUE NOT NULL,
    description_fr TEXT,
    description_en TEXT,
    category VARCHAR(50) NOT NULL,
    sale_price NUMERIC(10,2) NOT NULL CHECK (sale_price >= 0),
    promotional_price NUMERIC(10,2) CHECK (promotional_price >= 0),
    displayed_stock INTEGER DEFAULT 0 CHECK (displayed_stock >= 0),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- PRODUCT VARIANTS / VARIANTES PRODUIT
CREATE TABLE product_variants (
    variant_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    sku VARCHAR(120) UNIQUE,
    size VARCHAR(80),
    color VARCHAR(80),
    extra_price NUMERIC(10,2) NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- PRODUCT IMAGES / IMAGES PRODUIT
CREATE TABLE product_images (
    image_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text_fr VARCHAR(255),
    alt_text_en VARCHAR(255),
    position INTEGER NOT NULL DEFAULT 0
);

-- SUPPLIERS / FOURNISSEURS
CREATE TABLE suppliers (
    supplier_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(180) NOT NULL,
    website_url TEXT,
    email VARCHAR(180),
    phone VARCHAR(30),
    country VARCHAR(100),
    average_delivery_days INTEGER CHECK (average_delivery_days >= 0),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- PRODUCT SUPPLIERS / PRODUITS FOURNISSEURS
CREATE TABLE product_suppliers (
    product_supplier_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    supplier_id UUID NOT NULL REFERENCES suppliers(supplier_id) ON DELETE CASCADE,
    supplier_reference VARCHAR(150),
    supplier_product_url TEXT,
    purchase_price NUMERIC(10,2) NOT NULL CHECK (purchase_price >= 0),
    supplier_shipping_cost NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (supplier_shipping_cost >= 0),
    estimated_delivery_days INTEGER CHECK (estimated_delivery_days >= 0),
    is_primary_supplier BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    UNIQUE(product_id, supplier_id)
);

-- CARTS / PANIERS
CREATE TABLE carts (
    cart_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(customer_id) ON DELETE CASCADE,
    guest_email VARCHAR(180),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE cart_items (
    cart_item_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID NOT NULL REFERENCES carts(cart_id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(product_id),
    variant_id UUID REFERENCES product_variants(variant_id),
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    unit_price NUMERIC(10,2) NOT NULL CHECK (unit_price >= 0),
    added_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- PROMO CODES / CODES PROMO
CREATE TABLE promo_codes (
    promo_code_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(80) UNIQUE NOT NULL,
    discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('percentage','fixed_amount')),
    discount_value NUMERIC(10,2) NOT NULL CHECK (discount_value > 0),
    minimum_order_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
    starts_at TIMESTAMPTZ,
    ends_at TIMESTAMPTZ,
    max_uses INTEGER,
    current_uses INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- ORDERS / COMMANDES
CREATE TABLE orders (
    order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id UUID REFERENCES customers(customer_id),
    shipping_address_id UUID REFERENCES addresses(address_id),
    promo_code_id UUID REFERENCES promo_codes(promo_code_id),
    subtotal NUMERIC(10,2) NOT NULL DEFAULT 0,
    shipping_cost NUMERIC(10,2) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
    total_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
    currency VARCHAR(10) NOT NULL DEFAULT 'EUR',
    status VARCHAR(40) NOT NULL DEFAULT 'received',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE order_items (
    order_item_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(product_id),
    variant_id UUID REFERENCES product_variants(variant_id),
    supplier_id UUID REFERENCES suppliers(supplier_id),
    product_name_fr VARCHAR(180) NOT NULL,
    product_name_en VARCHAR(180) NOT NULL,
    product_reference VARCHAR(120),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_sale_price NUMERIC(10,2) NOT NULL,
    purchase_price NUMERIC(10,2) NOT NULL DEFAULT 0,
    supplier_shipping_cost NUMERIC(10,2) NOT NULL DEFAULT 0,
    estimated_margin NUMERIC(10,2) GENERATED ALWAYS AS (
        (unit_sale_price - purchase_price - supplier_shipping_cost) * quantity
    ) STORED
);

-- PAYMENTS / PAIEMENTS
CREATE TABLE payments (
    payment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL,
    provider_payment_reference VARCHAR(180),
    amount NUMERIC(10,2) NOT NULL CHECK (amount >= 0),
    currency VARCHAR(10) NOT NULL DEFAULT 'EUR',
    status VARCHAR(40) NOT NULL DEFAULT 'pending',
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SHIPMENTS / EXPEDITIONS
CREATE TABLE shipments (
    shipment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
    supplier_id UUID REFERENCES suppliers(supplier_id),
    carrier VARCHAR(120),
    tracking_number VARCHAR(180),
    tracking_url TEXT,
    status VARCHAR(40) NOT NULL DEFAULT 'to_prepare',
    shipped_at TIMESTAMPTZ,
    estimated_delivery_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- REVIEWS / AVIS
CREATE TABLE reviews (
    review_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES customers(customer_id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    order_id UUID REFERENCES orders(order_id),
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

-- NEWSLETTER / INFOLETTRE
CREATE TABLE newsletter_subscribers (
    subscriber_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(180) UNIQUE NOT NULL,
    consent BOOLEAN NOT NULL DEFAULT TRUE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    unsubscribed_at TIMESTAMPTZ
);

-- INDEXES / INDEX
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_payments_order ON payments(order_id);
CREATE INDEX idx_shipments_order ON shipments(order_id);
CREATE INDEX idx_reviews_product ON reviews(product_id);

-- ORDER NUMBER / NUMERO DE COMMANDE
CREATE SEQUENCE nekopaw_order_seq START 1001;

CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
        NEW.order_number :=
            'NKP-' ||
            TO_CHAR(CURRENT_DATE, 'YYYYMMDD') ||
            '-' ||
            LPAD(nextval('nekopaw_order_seq')::TEXT, 5, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_generate_order_number
BEFORE INSERT ON orders
FOR EACH ROW
EXECUTE FUNCTION generate_order_number();
