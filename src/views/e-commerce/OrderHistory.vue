<script setup>
import { ref } from 'vue';
import { usePrimeVue } from 'primevue/config';
const $primevue = usePrimeVue();

defineExpose({
    $primevue
});

const orders = ref([
    {
        orderNumber: '45123',
        orderDate: '7 February 2023',
        amount: '$123.00',
        products: [
            {
                name: 'Product Name Placeholder A Little Bit Long One',
                color: 'White',
                size: 'Small',
                price: '$50',
                deliveryDate: 'Delivered on 7 February 2023',
                image: '/demo/images/ecommerce/order-history/orderhistory-1.png'
            },
            {
                name: 'Product Name Placeholder A Little Bit Long One',
                color: 'White',
                size: 'Small',
                price: '$50',
                deliveryDate: 'Delivered on 7 February 2023',
                image: '/demo/images/ecommerce/order-history/orderhistory-2.png'
            },
            {
                name: 'Product Name Placeholder A Little Bit Long One',
                color: 'White',
                size: 'Small',
                price: '$63',
                deliveryDate: 'Delivered on 7 February 2023',
                image: '/demo/images/ecommerce/order-history/orderhistory-3.png'
            }
        ]
    },
    {
        orderNumber: '45126',
        orderDate: '9 February 2023',
        amount: '$250.00',
        products: [
            {
                name: 'Product Name Placeholder A Little Bit Long One',
                color: 'White',
                size: 'Small',
                price: '$80',
                deliveryDate: 'Delivered on 9 February 2023',
                image: '/demo/images/ecommerce/order-history/orderhistory-4.png'
            },
            {
                name: 'Product Name Placeholder A Little Bit Long One',
                color: 'White',
                size: 'Small',
                price: '$20',
                deliveryDate: 'Delivered on 9 February 2023',
                image: '/demo/images/ecommerce/order-history/orderhistory-5.png'
            },
            {
                name: 'Product Name Placeholder A Little Bit Long One',
                color: 'White',
                size: 'Small',
                price: '$150',
                deliveryDate: 'Delivered on 9 February 2023',
                image: '/demo/images/ecommerce/order-history/orderhistory-6.png'
            }
        ]
    }
]);
</script>

<template>
    <div class="card">
        <div class="flex flex-column md:flex-row justify-content-between align-items-center mb-4">
            <div class="flex flex-column text-center md:text-left">
                <span class="text-900 text-2xl mb-2">My Orders</span>
                <span class="text-600 text-lg">Dignissim diam quis enim lobortis.</span>
            </div>
            <IconField iconPosition="left" class="mt-5 mb-2 md:mt-0 md:mb-0 w-full lg:w-25rem">
                <InputIcon class="pi pi-search text-gray-400" />
                <input type="text" class="p-inputtext w-full lg:w-25rem surface-50" placeholder="Search" />
            </IconField>
        </div>

        <div v-for="(order, i) in orders" :key="i" class="surface-card grid grid-nogutter border-round shadow-2 mb-6">
            <div class="col-12 flex p-2 surface-100 border-round-top">
                <div class="p-2 flex-auto text-center md:text-left">
                    <span class="text-700 block">Order Number</span>
                    <span class="text-900 font-medium block mt-2">{{ order.orderNumber }}</span>
                </div>
                <Divider align="center" layout="vertical" class="h-full mx-0 lg:mx-3 surface-border"></Divider>
                <div class="p-2 flex-auto text-center md:text-left">
                    <span class="text-700 block">Order Date</span>
                    <span class="text-900 font-medium block mt-2">{{ order.orderDate }}</span>
                </div>
                <Divider align="center" layout="vertical" class="h-full mx-0 lg:mx-3 surface-border"></Divider>
                <div class="p-2 flex-auto text-center md:text-left">
                    <span class="text-700 block">Total Amount</span>
                    <span class="text-900 font-medium block mt-2">{{ order.amount }}</span>
                </div>
            </div>
            <div class="col-12">
                <div v-for="(product, i) in order.products" :key="i" class="p-2 my-4 flex flex-column lg:flex-row justify-content-between align-items-center">
                    <div class="flex flex-column lg:flex-row justify-content-center align-items-center px-2">
                        <img :src="product.image" alt="product" class="w-8rem h-8rem mr-3 flex-shrink-0" />
                        <div class="flex flex-column my-auto text-center md:text-left">
                            <span class="text-900 font-medium mb-3 mt-3 lg:mt-0">{{ product.name }}</span>
                            <span class="text-700 text-sm mb-3"> {{ product.color }} | {{ product.size }} </span>
                            <a v-ripple tabindex="0" class="p-ripple p-2 select-none cursor-pointer w-10rem mx-auto lg:mx-0 border-round font-medium text-center border-1 border-primary text-primary transition-duration-150">
                                Buy Again <span class="font-light">| {{ product.price }}</span>
                            </a>
                        </div>
                    </div>
                    <div class="mr-0 lg:mr-3 mt-4 lg:mt-0 p-2 flex align-items-center" :style="{ 'background-color': 'rgba(76, 175, 80, 0.1)', 'border-radius': '2.5rem' }">
                        <span class="bg-green-500 text-white flex align-items-center justify-content-center border-circle mr-2" :style="{ minWidth: '2rem', minHeight: '2rem' }">
                            <i class="pi pi-check"></i>
                        </span>
                        <span class="text-green-500">{{ product.deliveryDate }}</span>
                    </div>
                    <Divider v-if="i !== order.products.length - 1" class="w-full block lg:hidden surface-border"></Divider>
                </div>
            </div>
            <div class="col-12 p-0 flex border-top-1 surface-border">
                <a
                    v-ripple
                    tabindex="0"
                    class="p-ripple cursor-pointer py-4 flex flex-column md:flex-row text-center justify-content-center align-items-center text-primary hover:bg-primary hover:text-0 transition-duration-150 w-full"
                    :style="{ borderBottomLeftRadius: '6px' }"
                >
                    <i class="pi pi-folder mr-2 mb-2 md:mb-1"></i>Archive Order
                </a>
                <a v-ripple tabindex="0" class="p-ripple cursor-pointer py-4 flex flex-column md:flex-row text-center justify-content-center align-items-center text-primary hover:bg-primary hover:text-0 transition-duration-150 w-full">
                    <i class="pi pi-refresh mr-2 mb-2 md:mb-1"></i>Return
                </a>
                <a v-ripple tabindex="0" class="p-ripple cursor-pointer py-4 flex flex-column md:flex-row text-center justify-content-center align-items-center text-primary hover:bg-primary hover:text-0 transition-duration-150 w-full">
                    <i class="pi pi-file mr-2 mb-2 md:mb-1"></i>View Invoice
                </a>
                <a
                    v-ripple
                    tabindex="0"
                    class="p-ripple cursor-pointer py-4 flex flex-column md:flex-row text-center justify-content-center align-items-center text-primary hover:bg-primary hover:text-0 transition-duration-150 w-full"
                    :style="{ borderBottomRightRadius: '6px' }"
                >
                    <i class="pi pi-comment mr-2 mb-2 md:mb-1"></i>Write a Review
                </a>
            </div>
        </div>
    </div>
</template>
