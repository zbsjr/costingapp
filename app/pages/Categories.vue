<template>
    <div>
        <div class="w-full max-w-4xl mx-auto mt-8">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold text-gray-800">Product Categories</h2>
                <span class="text-sm text-gray-500">{{ categoryRecords?.length || 0 }} Items Total</span>
            </div>

            <div class="flex justify-between items-center mb-4">
                <input type="text" v-model="searchQuery" class="w-full rounded-lg border px-3.5 py-2 text-sm text-gray-900 transition-all duration-150 focus:outline-none focus:ring-2' border-gray-300 focus:border-indigo-500 focus:ring-indigo-100 shadow-sm" placeholder="Search categories..." />
            </div>
    
            <div class="overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm">
                <table class="min-w-full divide-y divide-gray-200 text-left">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500">ID</th>
                            <th scope="col" class="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500">Category Title</th>
                            <th scope="col" class="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500">Created At</th>
                            <th scope="col" class="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 text-right">Actions</th>
                        </tr>
                    </thead>
        
                    <tbody v-if="pending" class="divide-y divide-gray-200 bg-white">
                        <tr v-for="n in 3" :key="'skeleton-' + n" class="animate-pulse">
                            <td class="px-6 py-4"><div class="h-4 w-6 bg-gray-200 rounded"></div></td>
                            <td class="px-6 py-4"><div class="h-4 w-48 bg-gray-200 rounded"></div></td>
                            <td class="px-6 py-4"><div class="h-4 w-24 bg-gray-200 rounded"></div></td>
                            <td class="px-6 py-4 text-right"><div class="h-4 w-16 bg-gray-200 rounded ml-auto"></div></td>
                        </tr>
                    </tbody>
                    <tbody class="divide-y divide-gray-200 bg-white">
                        <tr v-if="!pending && (!categoryRecords || categoryRecords.length === 0)">
                            <td colspan="4" class="px-6 py-12 text-center text-gray-500">
                                <svg class="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                                </svg>
                                <p class="text-base font-medium text-gray-900">No categories found</p>
                                <p class="text-sm text-gray-400 mt-0.5">Get started by creating a brand new category above.</p>
                            </td>
                        </tr>
            
                        <tr 
                            v-else-if="!pending"
                            v-for="item in categoryRecords" 
                            :key="item.id" 
                            class="hover:bg-gray-50 transition-colors duration-150"
                        >
                            <td class="px-6 py-4 text-sm font-medium text-gray-400 whitespace-nowrap">
                                #{{ item.id }}
                            </td>
                            <td class="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                                {{ item.category_title }}
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                {{ formatDate(item.created_at) }}
                            </td>
                            <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap space-x-3">
                                <button 
                                    @click="populateForm(item)" 
                                    class="text-indigo-600 hover:text-indigo-900 focus:outline-none transition cursor-pointer"
                                >
                                    Edit
                                </button>
                                <button 
                                    @click="handleDelete(item.id)" 
                                    class="text-red-600 hover:text-red-900 focus:outline-none transition cursor-pointer"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="w-full max-w-4xl mx-auto mt-6 bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div class="mb-5">
              <h3 class="text-lg font-bold text-gray-900">{{ categoryForm.category_id != 0 ? 'Update Category' : 'Create New Category' }}</h3>
              <p class="text-sm text-gray-500">Add a unique identifier for grouping products together.</p>
            </div>
        
            <form @submit.prevent="categoryForm.category_id != 0 ? handleUpdate() : handleSubmit()" class="space-y-4">
              <div class="flex flex-col gap-1.5 max-w-md">
                <input type="hidden" v-model="categoryForm.category_id" />
                <label for="category_title" class="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Category Title
                </label>
                
                <input 
                  id="category_title"
                  v-model="categoryForm.category_title"
                  type="text" 
                  placeholder="e.g., Electronics, Home Decor..."
                  :class="[
                    'w-full rounded-lg border px-3.5 py-2 text-sm text-gray-900 transition-all duration-150 focus:outline-none focus:ring-2',
                    validationErrors.category_title 
                      ? 'border-red-300 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-100 shadow-sm'
                  ]"
                  :disabled="isSubmitting"
                />
        
                <!-- Animated/Smooth Transition Validation Box -->
                <div v-if="validationErrors.category_title" class="flex items-center gap-1.5 mt-1 text-red-600">
                  <svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span class="text-xs font-medium">
                    {{ validationErrors.category_title[0] }}
                  </span>
                </div>
              </div>
        
              <button v-if="categoryForm.category_id != 0" type="button" @click="cancelUpdate" class="me-2 inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-800 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50">
                <span>Cancel</span>
              </button>
              <button 
                type="submit" 
                :disabled="isSubmitting"
                class="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-800 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
              >
                <svg v-if="isSubmitting" class="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                
                <span>
                    {{ categoryForm.category_id != 0 ? isSubmitting ? 'Updating...' : 'Update Category' : isSubmitting ? 'Saving...' : 'Save Category' }}
                </span>
              </button>
            </form>
          </div>
    </div>
</template>

<script setup>
const errorToast = useToast()
const validationErrors = ref({})
const pending = ref(true)
const isSubmitting = ref(false)
const searchQuery = ref('')
const categoryRecords = ref([])
const categoryForm = reactive({
    'category_id': 0,
    'category_title': '',
})

const debounceSearchQuery = refDebounced(searchQuery, 500)
watch(debounceSearchQuery, async (newQuery) => {
    pending.value = true;
    validationErrors.value = {}; 
    categoryForm.category_id = 0
    categoryForm.category_title = ''
    const {data: newData, error} = await fetchCategories(newQuery)
    categoryRecords.value = newData
    pending.value = false;
})

const formatDate = (dateString) => {
  if (!dateString) return '---';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

// Fetch categories
const { data: categories } = await fetchCategories();
categoryRecords.value = categories
pending.value = false

// Create new category
const handleSubmit = async () => {
    validationErrors.value = {}; 
    isSubmitting.value = true

    const newData = {
        category_title: categoryForm.category_title
    }

    const { data: category, error: submitError } = await createCategory(newData);

    isSubmitting.value = false

    if (submitError) {
        if (submitError.errors) {
            validationErrors.value = submitError.errors;
        } else {
            errorToast.error({ title: 'Error!', message: submitError.message || 'Something went wrong' })
        }
        return;
    }

    categoryForm.category_title = ''
    
    categoryRecords.value = [category, ...categoryRecords.value]
}

// Edit category
const populateForm = async (item) => {
    validationErrors.value = {}; 
    categoryForm.category_id = item.id
    categoryForm.category_title = item.category_title
}

const handleUpdate = async () => {
    validationErrors.value = {}; 
    isSubmitting.value = true

    const editedData = {
        category_title: categoryForm.category_title
    }

    const { data: category, error: submitError } = await editCategory(categoryForm.category_id, editedData);

    isSubmitting.value = false

    if (submitError) {
        if (submitError.errors) {
            validationErrors.value = submitError.errors;
        } else {
            errorToast.error({ title: 'Error!', message: submitError.message || 'Something went wrong' })
        }
        return;
    }

    categoryRecords.value = categoryRecords.value.map((item) => {
        if (item.id === categoryForm.category_id) {
            return category
        }

        return item
    })

    categoryForm.category_id = 0
    categoryForm.category_title = ''
}

// Cancel edit
const cancelUpdate = () => {
    categoryForm.category_id = 0
    categoryForm.category_title = ''
}

// Delete category
const handleDelete = async (id) => {
    if(confirm(`Are you sure you want to delete this record #${id}?`)) {
        await deleteCategory(id);
        categoryRecords.value = categoryRecords.value.filter((item) => item.id !== id)
        errorToast.success({ title: 'Deleted!', message: `Record #${id} successfully deleted` })
    }
}
</script>