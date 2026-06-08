<template>
    <div class="w-full max-w-4xl mx-auto mt-6 bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <!-- Header -->
        <div class="mb-5">
          <h3 class="text-lg font-bold text-gray-900">Update Project Costing</h3>
        </div>
      
        <div v-if="pending" class="animate-pulse space-y-6">
  
          <!-- SECTION A LOADING SKELETON -->
          <div>
            <!-- Section Title Line -->
            <div class="h-4 bg-gray-200 rounded w-1/3 mb-3 border-b border-transparent pb-1"></div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Project Name Skeleton -->
              <div class="flex flex-col gap-1.5 col-span-1 md:col-span-2">
                <div class="h-3 bg-gray-200 rounded w-20"></div>
                <div class="h-9 bg-gray-100 rounded-lg border border-gray-200 w-full"></div>
              </div>
        
              <!-- Quantity Skeleton -->
              <div class="flex flex-col gap-1.5">
                <div class="h-3 bg-gray-200 rounded w-16"></div>
                <div class="h-9 bg-gray-100 rounded-lg border border-gray-200 w-full"></div>
              </div>
        
              <!-- Blank Item Cost Skeleton -->
              <div class="flex flex-col gap-1.5">
                <div class="h-3 bg-gray-200 rounded w-44"></div>
                <div class="h-9 bg-gray-100 rounded-lg border border-gray-200 w-full"></div>
              </div>
        
              <!-- Packaging Cost Skeleton -->
              <div class="flex flex-col gap-1.5">
                <div class="h-3 bg-gray-200 rounded w-24"></div>
                <div class="h-9 bg-gray-100 rounded-lg border border-gray-200 w-full"></div>
              </div>
        
              <!-- Labor Cost Skeleton -->
              <div class="flex flex-col gap-1.5">
                <div class="h-3 bg-gray-200 rounded w-32"></div>
                <div class="h-9 bg-gray-100 rounded-lg border border-gray-200 w-full"></div>
              </div>
            </div>
          </div>
        
          <!-- SECTION B LOADING SKELETON -->
          <div>
            <!-- Section Title Line -->
            <div class="h-4 bg-gray-200 rounded w-2/5 mb-3 border-b border-transparent pb-1"></div>
            
            <div class="space-y-4">
              <!-- Category Dropdown Selector Skeleton -->
              <div class="flex flex-col gap-1.5 max-w-md">
                <div class="h-3 bg-gray-200 rounded w-36"></div>
                <div class="h-9 bg-gray-100 rounded-lg border border-gray-200 w-full"></div>
              </div>
        
              <!-- Dynamic Sub-Category Container Skeleton -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 border border-gray-100 rounded-xl p-4">
                <!-- Sub-cat Item 1 Placeholder -->
                <div class="flex flex-col gap-1.5">
                  <div class="h-3 bg-gray-200 rounded w-28"></div>
                  <div class="h-9 bg-white rounded-lg border border-gray-200 w-full"></div>
                </div>
                <!-- Sub-cat Item 2 Placeholder -->
                <div class="flex flex-col gap-1.5">
                  <div class="h-3 bg-gray-200 rounded w-24"></div>
                  <div class="h-9 bg-white rounded-lg border border-gray-200 w-full"></div>
                </div>
                <!-- Sub-cat Item 3 Placeholder -->
                <div class="flex flex-col gap-1.5">
                  <div class="h-3 bg-gray-200 rounded w-32"></div>
                  <div class="h-9 bg-white rounded-lg border border-gray-200 w-full"></div>
                </div>
              </div>
            </div>
          </div>
        
          <!-- SECTION C LOADING SKELETON -->
          <div>
            <!-- Section Title Line -->
            <div class="h-4 bg-gray-200 rounded w-1/4 mb-3 border-b border-transparent pb-1"></div>
            
            <div class="flex flex-col md:flex-row items-start md:items-center gap-6 bg-indigo-50/30 border border-indigo-100/50 rounded-xl p-5">
              <!-- Markup Percentage Input Skeleton -->
              <div class="flex flex-col gap-1.5 w-full md:w-1/4">
                <div class="h-3 bg-indigo-200 rounded w-36"></div>
                <div class="h-9 bg-white rounded-lg border border-indigo-100/70 w-full"></div>
              </div>
        
              <!-- Calculated COGS Block Skeleton -->
              <div class="flex flex-col justify-center h-full px-2 space-y-2">
                <div class="h-3 bg-gray-200 rounded w-36"></div>
                <div class="h-7 bg-gray-300 rounded w-24"></div>
              </div>
        
              <!-- Vertical Divider Placeholder -->
              <div class="hidden md:block h-10 w-px bg-indigo-100 self-center"></div>
        
              <!-- Calculated SRP Price Block Skeleton -->
              <div class="flex flex-col justify-center h-full px-2 space-y-2">
                <div class="h-3 bg-indigo-200 rounded w-48"></div>
                <div class="h-7 bg-indigo-300 rounded w-28"></div>
              </div>
            </div>
          </div>
        
        </div>
        
        <form v-else-if="!pending" @submit.prevent="handleUpdateProject" class="space-y-6">
          
          <!-- SECTION A: COMMON FIELDS (Grid for clean layout) -->
          <div>
            <h4 class="text-sm font-bold text-gray-900 mb-3 pb-1 border-b border-gray-100">Section A: General Details & Common Costs</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <!-- Project Name -->
              <div class="flex flex-col gap-1.5 col-span-1 md:col-span-2">
                <label for="project_name" class="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Project Name
                </label>
                <input 
                  id="project_name"
                  type="text" 
                  placeholder="e.g., Company XYZ Event Shirt Batch 1"
                  class="w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 transition-all duration-150 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 shadow-sm"
                  v-model="projectForm.project_name"
                />
              </div>
      
              <!-- Quantity -->
              <div class="flex flex-col gap-1.5">
                <label for="quantity" class="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Quantity
                </label>
                <input 
                  id="quantity"
                  type="number" 
                  placeholder="1"
                  class="w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 transition-all duration-150 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 shadow-sm"
                  v-model="projectForm.quantity"
                  
                />
              </div>
      
              <!-- Blank Item Cost -->
              <div class="flex flex-col gap-1.5">
                <label for="blank_cost" class="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Blank Item Cost (Raw Material)
                </label>
                <input 
                  id="blank_cost"
                  type="number" 
                  step="0.01"
                  placeholder="0.00"
                  class="w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 transition-all duration-150 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 shadow-sm"
                  v-model="projectForm.blank_item_cost"
                  
                />
              </div>
      
              <!-- Packaging Cost -->
              <div class="flex flex-col gap-1.5">
                <label for="packaging_cost" class="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Packaging Cost
                </label>
                <input 
                  id="packaging_cost"
                  type="number" 
                  step="0.01"
                  placeholder="0.00"
                  class="w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 transition-all duration-150 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 shadow-sm"
                  v-model="projectForm.packaging_cost"
                  
                />
              </div>
      
              <!-- Labor Cost -->
              <div class="flex flex-col gap-1.5">
                <label for="labor_cost" class="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Labor Cost (Per Unit)
                </label>
                <input 
                  id="labor_cost"
                  type="number" 
                  step="0.01"
                  placeholder="0.00"
                  class="w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 transition-all duration-150 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 shadow-sm"
                  v-model="projectForm.labor_cost"
                  
                />
              </div>
      
            </div>
          </div>
      
          <!-- SECTION B: CATEGORY SELECTION & DYNAMIC SUB-CATEGORIES -->
          <div>
            <h4 class="text-sm font-bold text-gray-900 mb-3 pb-1 border-b border-gray-100">Section B: Category & Sub-Category Costs</h4>
            <div class="space-y-4">
              
              <!-- Category Dropdown Selector -->
              <div class="flex flex-col gap-1.5 max-w-md">
                <label for="project_category" class="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Select Project Category
                </label>
                <select 
                  id="project_category"
                  class="w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 bg-white transition-all duration-150 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 shadow-sm"
                  v-model="projectForm.category_id"
                  @change="showSubCat"
                >
                  <option value="">-- Choose a Category --</option>
                  <option v-for="cat in categoryRecords" :key="cat.id"  :value="cat.id">{{ cat.category_title }}</option>
                </select>
              </div>
      
              <!-- Dynamic Sub-Category Inputs (Mock example for "Shirt & Tote Bag Printing") -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 border border-gray-150 rounded-xl p-4">
                
                <!-- Sub-category Item 1 -->
                <div class="flex flex-col gap-1.5" v-for="subcat in subCategoryRecords" :key="subcat.id">
                  <label class="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {{ subcat.sub_category_title }}
                  </label>
                  <input 
                    v-model="subCategoryCosts[subcat.id]"
                    type="number" 
                    step="0.01"
                    placeholder="0.00"
                    class="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 transition-all duration-150 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 shadow-sm"
                  />
                </div>
      
              </div>
            </div>
          </div>
      
          <!-- SECTION C: MARKUP & AUTOMATED METRICS SUMMARY -->
          <div>
            <h4 class="text-sm font-bold text-gray-900 mb-3 pb-1 border-b border-gray-100">Section C: Pricing & Totals</h4>
            
            <div class="flex flex-col md:flex-row items-start md:items-center gap-6 bg-indigo-50/50 border border-indigo-100 rounded-xl p-5">
              
              <!-- Markup Percentage Input -->
              <div class="flex flex-col gap-1.5 w-full md:w-1/4">
                <label for="markup_percentage" class="text-xs font-semibold text-indigo-900 uppercase tracking-wider">
                  Markup Percentage (%)
                </label>
                <input 
                  id="markup_percentage"
                  type="number" 
                  placeholder="e.g., 50"
                  class="w-full rounded-lg border border-indigo-200 bg-white px-3.5 py-2 text-sm text-gray-900 transition-all duration-150 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 shadow-sm"
                  v-model="projectForm.markup_percentage"
                  
                />
              </div>
      
              <!-- Calculated COGS Block -->
              <div class="flex flex-col justify-center h-full px-2">
                <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Unit Cost (COGS)</span>
                <span class="text-2xl font-black text-gray-900 mt-0.5">Php {{ totalCogs }}</span>
              </div>
      
              <!-- Vertical Divider (hidden on mobile) -->
              <div class="hidden md:block h-10 w-px bg-indigo-200 self-center"></div>
      
              <!-- Calculated SRP Price Block -->
              <div class="flex flex-col justify-center h-full px-2">
                <span class="text-xs font-semibold text-indigo-700 uppercase tracking-wider">Suggested Retail Price (SRP)</span>
                <span class="text-2xl font-black text-indigo-600 mt-0.5">Php {{ totalSrp }}</span>
              </div>
      
            </div>
          </div>
      
          <!-- SUBMIT BUTTONS -->
          <div class="pt-2 flex items-center gap-3">
            <NuxtLink to="/" 
              type="button" 
              class="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-100 border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-200 active:scale-[0.98]"
            >
              Cancel
            </NuxtLink>
            
            <button 
              type="submit" 
              class="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-800 active:scale-[0.98]"
            >
              <span>Update Project Costing</span>
            </button>
          </div>
      
        </form>
    </div>
</template>

<script setup>
const pending = ref(true)
const router = useRouter()
const route = useRoute()
const toast = useToast()
const categoryRecords = ref([])
const subCategoryRecords = ref([])
const subCategoryCosts = ref({})
const projectId = ref(0)
const projectForm = reactive({
    'project_name': '',
    'quantity': 1,
    'blank_item_cost': 0.00,
    'packaging_cost': 0.00,
    'labor_cost': 0.00,
    'category_id': '',
    'markup_percentage': 30,
})

// Fetch sub-categories when a category is selected
const showSubCat = async () => {
    const { data: subcategories } = await fetchSubCategories('', projectForm.category_id);
    subCategoryRecords.value = subcategories
}

// compute for COG
const totalCogs = computed(() => {
    const formattedSubCategories = Object.keys(subCategoryCosts.value).map(id => {
        return {
          sub_category_id: parseInt(id),
          cost: parseFloat(subCategoryCosts.value[id]) || 0
        };
    })

    const general_costs = Number(projectForm.blank_item_cost) + Number(projectForm.packaging_cost) + Number(projectForm.labor_cost)
    const sub_category_costs = formattedSubCategories.reduce((sum, item) => {
      return sum + Number(item.cost) || 0
    }, 0)

    return Number(projectForm.quantity) * (general_costs + sub_category_costs) || 0
})

// compute for SRP
const totalSrp = computed(() => {
    const markupMultiplier = 1 + (Number(projectForm.markup_percentage) / 100)
    return totalCogs.value * markupMultiplier || 0
})

// Save project
const handleUpdateProject = async () => {
    pending.value = true
    const formattedSubCategories = Object.keys(subCategoryCosts.value).map(id => {
        return {
          sub_category_id: parseInt(id),
          cost: parseFloat(subCategoryCosts.value[id]) || 0
        };
    })

    const formData = {
      'project_name': projectForm.project_name,
      'category_id': projectForm.category_id,
      'quantity': projectForm.quantity,
      'base_blank_cost': projectForm.blank_item_cost,
      'packaging_cost': projectForm.packaging_cost,
      'labor_cost': projectForm.labor_cost,
      'markup_percentage': projectForm.markup_percentage,
      'total_cogs': totalCogs.value,
      'total_srp': totalSrp.value,
      'sub_categories': formattedSubCategories,
    }

    const { data: project, loading, error } = await updateProject(formData, projectId.value)
    pending.value = loading
    if(project){
      toast.success({ title: 'Updated', message: `Project has been updated` })
      router.push(`/`)
    } else {
      toast.error({ title: 'Error', message: error.message })
      pending.value = loading
    }
}

onMounted(async () => {
    // Fetch categories
    const { data: categories } = await fetchCategories();
    categoryRecords.value = categories

    // Fetch project
    projectId.value = route.params.id
    const { data: project, loading } = await fetchProjects('', projectId.value)
    pending.value = loading
    projectForm.project_name = project[0].project_name
    projectForm.quantity = project[0].quantity
    projectForm.blank_item_cost = project[0].base_blank_cost
    projectForm.packaging_cost = project[0].packaging_cost
    projectForm.labor_cost = project[0].labor_cost
    projectForm.category_id = project[0].category_id
    projectForm.markup_percentage = project[0].markup_percentage
    showSubCat()

    project[0].project_sub_category_cost.forEach((v, i) => {
        subCategoryCosts.value[v.sub_category_id] = v.cost_value
    })
})
</script>