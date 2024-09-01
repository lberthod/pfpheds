<script setup>
import { ref } from 'vue';

const products = ref([
    {
        price: '$140.00',
        image: '/demo/images/ecommerce/product-list/product-list-4-1.png'
    },
    {
        price: '$82.00',
        image: '/demo/images/ecommerce/product-list/product-list-4-2.png'
    },
    {
        price: '$54.00',
        image: '/demo/images/ecommerce/product-list/product-list-4-3.png'
    },
    {
        price: '$72.00',
        image: '/demo/images/ecommerce/product-list/product-list-4-4.png'
    },
    {
        price: '$99.00',
        image: '/demo/images/ecommerce/product-list/product-list-4-5.png'
    },
    {
        price: '$89.00',
        image: '/demo/images/ecommerce/product-list/product-list-4-6.png'
    }
]);

const products2 = ref([
    {
        color: 'Bluegray',
        image: '/demo/images/ecommerce/product-list/product-list-2-1.png'
    },
    {
        color: 'Indigo',
        image: '/demo/images/ecommerce/product-list/product-list-2-2.png'
    },
    {
        color: 'Purple',
        image: '/demo/images/ecommerce/product-list/product-list-2-3.png'
    },
    {
        color: 'Cyan',
        image: '/demo/images/ecommerce/product-list/product-list-2-4.png'
    }
]);
</script>

<template>
    <div class="card">
        <div class="text-900 font-medium text-4xl mb-4">Popular Products</div>
        <p class="mt-0 p-0 mb-5 text-700 text-2xl">Exclusive Selection</p>
        <div class="grid -mt-3 -ml-3 -mr-3">
            <div v-for="(product, i) in products" :key="i" class="col-12 md:col-6 lg:col-4">
                <div class="p-2">
                    <div class="shadow-2 p-4 surface-card border-round">
                        <div class="relative mb-3">
                            <span class="surface-card text-900 shadow-2 px-3 py-2 absolute border-round-3xl" :style="{ left: '1rem', top: '1rem' }"> Category </span>
                            <img :src="product.image" class="w-full" :alt="i" />
                        </div>
                        <div class="flex justify-content-between align-items-center mb-3">
                            <span class="text-900 font-medium text-xl">Product Name</span>
                            <span>
                                <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                                <span class="font-medium">5.0</span>
                            </span>
                        </div>
                        <p class="mt-0 mb-3 text-700 line-height-3">Enim nec dui nunc mattis enim ut tellus. Tincidunt arcu.</p>
                        <span class="text-primary text-xl font-medium">{{ product.price }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="card">
        <div class="grid -mt-3 -ml-3 -mr-3">
            <div v-for="(product, i) in products2" :key="i" class="col-12 md:col-6 lg:col-3 mb-5 lg:mb-0">
                <div class="mb-3 relative">
                    <img :src="product.image" class="w-full" :alt="i" />
                    <Button
                        type="button"
                        class="border-1 border-white border-round py-2 px-3 absolute bg-black-alpha-30 text-white inline-flex align-items-center justify-content-center hover:bg-black-alpha-40 transition-colors transition-duration-300 cursor-pointer"
                        :style="{ bottom: '1rem', left: '1rem', width: 'calc(100% - 2rem)' }"
                    >
                        <i class="pi pi-shopping-cart mr-3 text-base"></i>
                        <span class="text-base">Add to Cart</span>
                    </Button>
                </div>
                <div class="flex flex-column align-items-center">
                    <span class="text-xl text-900 font-medium mb-3">Product Name</span>
                    <span class="text-xl text-900 mb-3">$150.00</span>
                    <div class="flex align-items-center mb-3">
                        <div
                            class="w-2rem h-2rem flex-shrink-0 border-circle bg-bluegray-500 mr-3 cursor-pointer border-2 surface-border transition-all transition-duration-300"
                            :style="{ 'box-shadow': product.color === 'Bluegray' ? '0 0 0 0.2rem var(--bluegray-500)' : null }"
                            @click="product.color = 'Bluegray'"
                        ></div>
                        <div
                            class="w-2rem h-2rem flex-shrink-0 border-circle bg-indigo-500 hover:border-indigo-500 mr-3 cursor-pointer border-2 surface-border transition-all transition-duration-300"
                            :style="{ 'box-shadow': product.color === 'Indigo' ? '0 0 0 0.2rem var(--indigo-500)' : null }"
                            @click="product.color = 'Indigo'"
                        ></div>
                        <div
                            class="w-2rem h-2rem flex-shrink-0 border-circle bg-purple-500 hover:border-purple-500 mr-3 cursor-pointer border-2 surface-border transition-all transition-duration-300"
                            :style="{ 'box-shadow': product.color === 'Purple' ? '0 0 0 0.2rem var(--purple-500)' : null }"
                            @click="product.color = 'Purple'"
                        ></div>
                        <div
                            class="w-2rem h-2rem flex-shrink-0 border-circle bg-cyan-500 hover:border-cyan-500 cursor-pointer border-2 surface-border transition-all transition-duration-300"
                            :style="{ 'box-shadow': product.color === 'Cyan' ? '0 0 0 0.2rem var(--cyan-500)' : null }"
                            @click="product.color = 'Cyan'"
                        ></div>
                    </div>
                    <span class="text-700">{{ product.color }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
