app.component("product", {
    template: `
            <section class="product">
            <div class="product__thumbnails">
                <div
                    v-for="(image, index) in product.images"
                    :key="image.thumbnail"
                    class="thumb"
                    :class="{ active: activeImage === index }"
                    :style="{ backgroundImage: 'url('+ image.thumbnail +')' }"
                    @click="activeImage = index"
                ></div>
            </div>
            <div class="product__image">
                <img
                    v-bind:src="product.images[activeImage].image"
                    :alt="product.name"
                />
            </div>
        </section>
        <section class="description">
            <h4>
                {{product.name}} {{ product.stock === 0 ? "😢" : "😎" }}
            </h4>
            <badge :product="product"></badge>
            <p v-if="product.stock === 3">Quedan pocas unidades</p>
            <p v-else-if="product.stock === 2">
                El producto esta por terminarse.
            </p>
            <p v-else-if="product.stock === 1">
                Queda una unidad disponible.
            </p>
            <p class="description__status"></p>
            <p class="description__price" :style="{ color : priceColor}" >
                $ {{ Intl.NumberFormat("es-Es").format(product.price) }}
            </p>
            <p class="description__content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Neque fugiat fugit fuga sapiente alias eveniet pariatur
                iure libero facilis veniam.
            </p>
            <div class="discount">
                <span>Codigo de Descuento:</span>
                <input
                    type="text"
                    placeholder="Ingresa tu codigo"
                    @keyup.enter="applyDiscount($event)"
                />
            </div>
            <button
                :disabled="product.stock === 0"
                @click="sendToCart()"
            >
                Agregar al carrito
            </button>
        </section>
    `,
    data() {
        return {
            activeImage: 0,
            discountCodes: ["Platzi", "Platzi123"],
        };
    },
    props: ["product"],
    emits: ["sendtocart"],
    methods: {
        applyDiscount(event) {
            const index = this.discountCodes.indexOf(event.target.value);
            if (index >= 0) {
                this.product.price *= 50 / 100;
                this.discountCodes.splice(index, 1);
            }
        },
        sendToCart() {
            this.$emit("sendtocart", this.product);
        },
    },
    computed: {
        priceColor() {
            if (this.product.stock <= 1) {
                return "rgb(188 30 67)";
            }
            return "rgb(104, 104, 209)";
        },
    },
});
