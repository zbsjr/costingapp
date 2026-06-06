<template>
    <header>
        <div class="flex justify-between mb-5">
            <span class="font-bold text-2xl">The Good Market PH</span>
            <ul class="flex gap-3 ms-auto">
                <li><RouterLink to="/" :class="`${isActivePage('/') ? 'bg-amber-950 text-amber-50' : 'hover:bg-amber-200'} border rounded px-5 py-2`">Projects</RouterLink></li>
                <li><RouterLink to="/categories" :class="`${isActivePage('/categories') ? 'bg-amber-950 text-amber-50' : 'hover:bg-amber-200'} border rounded px-5 py-2`">Categories</RouterLink></li>
                <li><RouterLink to="/subcategories" :class="`${isActivePage('/subcategories') ? 'bg-amber-950 text-amber-50' : 'hover:bg-amber-200'} border rounded px-5 py-2`">Sub-categories</RouterLink></li>
                <li><RouterLink to="/projects" :class="`${isActivePage('/projects') ? 'bg-amber-950 text-amber-50' : 'hover:bg-amber-200'} border rounded px-5 py-2`">Compute Project Costing</RouterLink></li>
            </ul>
        </div>
    </header>
</template>

<script setup>
const route = useRoute();
const isActivePage = (routePath) => {
    return route.path === routePath
}
</script>