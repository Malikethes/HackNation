export const useFormSteps = () => {
  const currentStep = ref(1)
  const totalSteps = 5
  const itemTypes = ref<any[]>([])
  const { fetchCategories } = useApi()

  const formData = reactive({
    photo: null as File[] | null,
    itemType: '',
    description: '',
    uniqueIdentifiers: '',
    province: '',
    city: '',
    street: '',
    postalCode: '',
    dateDiscovery: '',
    timeDiscovery: '',
    latitude: '52.2297',
    longitude: '21.0122',
    finderName: '',
    finderPhone: '',
    finderEmail: '',
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
    storageAddress: '',
  })

  const provinces = [
    'Mazowieckie',
    'Małopolskie',
    'Śląskie',
    'Wielkopolskie',
    'Dolnośląskie',
    'Pomorskie',
    'Łódzkie',
    'Zachodniopomorskie',
  ]

  const loadCategories = async () => {
    try {
      const categories: any = await fetchCategories()
      itemTypes.value = categories.map((cat: any) => ({
        title: cat.name,
        value: cat.name.toLowerCase()
      }))
    } catch (error) {
      console.error('Failed to load categories:', error)
      // Fallback to default categories if API fails
      itemTypes.value = [
        { title: 'Wallet', value: 'wallet' },
        { title: 'Phone', value: 'phone' },
        { title: 'Keys', value: 'keys' },
        { title: 'Bag', value: 'bag' },
        { title: 'Other', value: 'other' },
      ]
    }
  }

  const rules = {
    required: (value: string) => !!value || 'This field is required',
    email: (value: string) => {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return pattern.test(value) || 'Invalid email address'
    },
    phone: (value: string) => {
      const pattern = /^[+]?[\d\s()-]+$/
      return pattern.test(value) || 'Invalid phone number'
    },
  }

  const getStepConfig = (step: number) => {
    const configs = {
      1: {
        title: 'Item Identification',
        heading: 'Tell us about the found item.',
        description: 'This information will help us categorize and identify the item correctly.',
        progress: 20,
      },
      2: {
        title: 'Location & Time Found',
        heading: 'Where and when did you find this item?',
        description: 'Please provide as many details as possible to help identify the location.',
        progress: 40,
      },
      3: {
        title: 'Finder Info',
        heading: 'Step 3: Finder Info',
        description: 'Provide the finder\'s details if available and permitted. All fields are optional.',
        progress: 60,
      },
      4: {
        title: 'Review',
        heading: 'Step 4: Review & Publish',
        description: 'Please review all information carefully before publishing.',
        progress: 80,
      },
      5: {
        title: 'Publish',
        heading: 'Summary of All Information',
        description: '',
        progress: 100,
      },
    }
    return configs[step as keyof typeof configs]
  }

  const nextStep = () => {
    if (currentStep.value < totalSteps) {
      currentStep.value++
    }
  }

  const prevStep = () => {
    if (currentStep.value > 1) {
      currentStep.value--
    }
  }

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      currentStep.value = step
    }
  }

  return {
    currentStep,
    totalSteps,
    formData,
    provinces,
    itemTypes,
    rules,
    getStepConfig,
    nextStep,
    prevStep,
    goToStep,
    loadCategories,
  }
}
