<script setup>
import { ref, onMounted } from 'vue';
import { CountryService } from '@/service/CountryService';

const value = ref('');
const quantities = ref([1, 1, 1]);
const checked = ref(true);
const checked2 = ref(true);
const selectedCountry = ref(null);
const countries = ref([]);
const countryService = new CountryService();

onMounted(() => {
    countryService.getCountries().then((data) => (countries.value = data));
});
</script>

<template>
    <div class="card">
        <div class="grid grid-nogutter">
            <div class="col-12 px-4 mt-4 md:mt-6 md:px-6">
                <span class="text-900 block font-bold text-xl">Checkout</span>
            </div>
            <div class="col-12 lg:col-6 h-full px-4 py-4 md:px-6">
                <ul class="flex list-none flex-wrap p-0 mb-6">
                    <li class="flex align-items-center text-primary mr-2">Cart <i class="pi pi-chevron-right text-500 text-xs ml-2"></i></li>
                    <li class="flex align-items-center text-500 mr-2">Information<i class="pi pi-chevron-right text-500 text-xs ml-2"></i></li>
                    <li class="flex align-items-center text-500 mr-2">Shipping<i class="pi pi-chevron-right text-500 text-xs ml-2"></i></li>
                    <li class="flex align-items-center text-500 mr-2">Payment</li>
                </ul>
                <div class="grid formgrid">
                    <div class="col-12 field mb-6">
                        <span class="text-900 text-2xl block font-medium mb-5">Contact Information</span>
                        <input id="email" placeholder="Email" type="text" class="p-inputtext w-full mb-4" />
                        <div class="field-checkbox">
                            <Checkbox name="checkbox-1" v-model="checked" binary inputId="checkbox-1"></Checkbox>
                            <label for="checkbox-1">Email me with news and offers</label>
                        </div>
                    </div>
                    <div class="col-12 field mb-4">
                        <span class="text-900 text-2xl block font-medium mb-5">Shipping</span>
                        <Dropdown :options="countries" v-model="selectedCountry" placeholder="Country / Region" optionLabel="name" showClear class="w-full"></Dropdown>
                    </div>
                    <div class="col-12 lg:col-6 field mb-4">
                        <input id="name" placeholder="Name" type="text" class="p-inputtext w-full" />
                    </div>
                    <div class="col-12 lg:col-6 field mb-4">
                        <input id="lastname" placeholder="Last Name" type="text" class="p-inputtext w-full" />
                    </div>
                    <div class="col-12 field mb-4">
                        <input id="address" placeholder="Address" type="text" class="p-inputtext w-full" />
                    </div>
                    <div class="col-12 field mb-4">
                        <input id="address2" placeholder="Apartment, suite, etc" type="text" class="p-inputtext w-full" />
                    </div>
                    <div class="col-12 lg:col-6 field mb-4">
                        <input id="pc" placeholder="Postal Code" type="text" class="p-inputtext w-full" />
                    </div>
                    <div class="col-12 lg:col-6 field mb-4">
                        <input id="city" placeholder="City" type="text" class="p-inputtext w-full" />
                    </div>
                    <div class="col-12 lg:col-6 field mb-4">
                        <div class="field-checkbox">
                            <Checkbox name="checkbox-2" v-model="checked2" binary inputId="checkbox-2"></Checkbox>
                            <label for="checkbox-2">Save for next purchase</label>
                        </div>
                    </div>
                    <div class="col-12 flex flex-column lg:flex-row justify-content-center align-items-center lg:justify-content-end my-6">
                        <Button class="mt-3 lg:mt-0 w-full lg:w-auto flex-order-2 lg:flex-order-1 lg:mr-4" severity="secondary" outlined label="Return to Cart" icon="pi pi-fw pi-arrow-left"></Button>
                        <Button class="w-full lg:w-auto flex-order-1 lg:flex-order-2" label="Continue to Shipping" icon="pi pi-fw pi-check"></Button>
                    </div>
                </div>
            </div>
            <div class="col-12 lg:col-6 px-4 py-4 md:px-6">
                <div class="pb-3 surface-border">
                    <span class="text-900 font-medium text-xl">Your Cart</span>
                </div>
                <div class="flex flex-column lg:flex-row flex-wrap lg:align-items-center py-2 mt-3 surface-border">
                    <img src="/demo/images/ecommerce/shop/shop-1.png" class="w-8rem h-8rem flex-shrink-0 mb-3" alt="product" />
                    <div class="flex-auto lg:ml-3">
                        <div class="flex align-items-center justify-content-between mb-3">
                            <span class="text-900 font-bold">Product Name</span>
                            <span class="text-900 font-bold">$123.00</span>
                        </div>
                        <div class="text-600 text-sm mb-3">Black | Large</div>
                        <div class="flex flex-auto justify-content-between align-items-center">
                            <InputNumber
                                showButtons
                                buttonLayout="horizontal"
                                :min="0"
                                inputClass="w-2rem text-center py-2 px-1 border-transparent outline-none shadow-none"
                                v-model="quantities[0]"
                                class="border-1 surface-border border-round"
                                decrementButtonClass="p-button-text text-600 hover:text-primary py-1 px-1"
                                incrementButtonClass="p-button-text text-600 hover:text-primary py-1 px-1"
                                incrementButtonIcon="pi pi-plus"
                                decrementButtonIcon="pi pi-minus"
                            ></InputNumber>
                            <Button icon="pi pi-trash" text rounded></Button>
                        </div>
                    </div>
                </div>
                <div class="py-2 mt-3 surface-border">
                    <InputGroup class="mt-3">
                        <InputText type="text" v-model="value" placeholder="Promo code" class="w-full" />
                        <Button type="button" label="Apply" :disabled="!value"></Button>
                    </InputGroup>
                </div>
                <div class="py-2 mt-3">
                    <div class="flex justify-content-between align-items-center mb-3">
                        <span class="text-900 font-medium">Subtotal</span>
                        <span class="text-900">$123.00</span>
                    </div>
                    <div class="flex justify-content-between align-items-center mb-3">
                        <span class="text-900 font-medium">Shipping</span>
                        <span class="text-primary font-bold">Free</span>
                    </div>
                    <div class="flex justify-content-between align-items-center mb-3">
                        <span class="text-900 font-bold">Total</span>
                        <span class="text-900 font-medium text-xl">$123.00</span>
                    </div>
                </div>
                <div class="py-2 mt-3 bg-yellow-100 flex align-items-center justify-content-center border-round">
                    <img src="/demo/images/ecommerce/shop/flag.png" class="mr-2" alt="Country Flag" />
                    <span class="text-black-alpha-90 font-medium">No additional duties or taxes.</span>
                </div>
            </div>
        </div>
    </div>
</template>
